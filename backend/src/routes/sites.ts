import { Router, Response } from 'express';
import { Site, CreateSiteRequest, CreateSiteResponse } from '../types';
import { getTemplateById } from '../data/templates';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { deployToVercel } from '../services/vercelDeploy';

const router = Router();

const sites: Site[] = [];

const generateId = () => `site_${Math.random().toString(36).substring(2, 11)}`;

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const userSites = sites.filter(s => s.userId === req.userId);
  res.json({
    success: true,
    sites: userSites.map((site) => ({
      id: site.id,
      templateName: site.templateName,
      siteName: site.siteName,
      status: site.status,
      liveUrl: site.liveUrl,
      createdAt: site.createdAt,
    })),
  });
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { templateId, siteName, details } = req.body as CreateSiteRequest;

  const template = getTemplateById(templateId);
  if (!template) {
    return res.status(404).json({
      success: false,
      error: 'Template not found',
    });
  }

  const siteId = generateId();
  const now = new Date().toISOString();

  const site: Site = {
    id: siteId,
    userId: req.userId!,
    templateId,
    templateName: template.name,
    siteName: siteName || template.name,
    details,
    status: 'building',
    createdAt: now,
    updatedAt: now,
  };

  sites.push(site);

  res.json({
    success: true,
    siteId,
    status: 'building',
  } as CreateSiteResponse);

  const deployResult = await deployToVercel(
    req.userId!,
    siteId,
    templateId,
    details,
    siteName
  );

  console.log('Deploy result:', deployResult);

  const siteIndex = sites.findIndex((s) => s.id === siteId);
  if (siteIndex !== -1) {
    if (deployResult.success && deployResult.url) {
      sites[siteIndex].status = 'deployed';
      sites[siteIndex].liveUrl = deployResult.url;
    } else {
      sites[siteIndex].status = 'failed';
      (sites[siteIndex] as any).error = deployResult.error;
      console.error('Deployment failed:', deployResult.error);
    }
    sites[siteIndex].updatedAt = new Date().toISOString();
  }
});

router.get('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const site = sites.find((s) => s.id === req.params.id && s.userId === req.userId);

  if (!site) {
    return res.status(404).json({
      success: false,
      error: 'Site not found',
    });
  }

  res.json({
    success: true,
    site,
  });
});

router.get('/:id/build-logs', authMiddleware, (req: AuthRequest, res: Response) => {
  const site = sites.find((s) => s.id === req.params.id && s.userId === req.userId);

  if (!site) {
    return res.status(404).json({
      success: false,
      error: 'Site not found',
    });
  }

  const logs = [
    { message: 'Starting build...', type: 'info', timestamp: site.createdAt },
    { message: 'Installing dependencies...', type: 'info', timestamp: new Date(Date.now() + 1000).toISOString() },
    { message: 'Building application...', type: 'info', timestamp: new Date(Date.now() + 3000).toISOString() },
    { message: 'Deploying to Vercel...', type: 'info', timestamp: new Date(Date.now() + 4000).toISOString() },
    { message: site.status === 'deployed' ? 'Deployed successfully!' : 'Deployment failed', type: site.status === 'deployed' ? 'success' : 'error', timestamp: new Date(Date.now() + 5000).toISOString() },
  ];

  res.json({
    success: true,
    logs,
  });
});

export default router;

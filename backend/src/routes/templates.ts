import { Router, Request, Response } from 'express';
import { templates, getTemplateById } from '../data/templates';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    templates: templates.map(({ formSchema, ...template }) => template),
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const template = getTemplateById(req.params.id);
  
  if (!template) {
    return res.status(404).json({
      success: false,
      error: 'Template not found',
    });
  }

  res.json({
    success: true,
    template,
  });
});

router.get('/:id/schema', (req: Request, res: Response) => {
  const template = getTemplateById(req.params.id);
  
  if (!template) {
    return res.status(404).json({
      success: false,
      error: 'Template not found',
    });
  }

  res.json({
    success: true,
    schema: template.formSchema,
  });
});

export default router;

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/lib/authStore';
import { api } from '@/lib/api';
import { FolderOpen, ExternalLink, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Site {
  id: string;
  templateName: string;
  siteName: string;
  status: 'draft' | 'building' | 'deployed' | 'failed';
  liveUrl?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchSites();
  }, [isAuthenticated]);

  const fetchSites = async () => {
    try {
      const data = await api.sites.list();
      setSites(data.sites || []);
    } catch (error) {
      console.error('Failed to fetch sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    draft: { variant: 'default' as const, icon: FolderOpen, label: 'Draft' },
    building: { variant: 'warning' as const, icon: Loader2, label: 'Building' },
    deployed: { variant: 'success' as const, icon: CheckCircle, label: 'Deployed' },
    failed: { variant: 'error' as const, icon: XCircle, label: 'Failed' },
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#FAFAFA]">My Sites</h1>
            <p className="text-[#71717A] mt-1">Manage your created websites</p>
          </div>
          <Link href="/builder/templates">
            <Button>Create New Site</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#71717A] animate-spin" />
          </div>
        ) : sites.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#1C1C1F] flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-[#71717A]" />
              </div>
              <h3 className="text-lg font-medium text-[#FAFAFA]">No sites yet</h3>
              <p className="text-[#71717A] mt-1 max-w-sm">
                Create your first website by selecting a template and filling in your details.
              </p>
              <Link href="/builder/templates" className="mt-4">
                <Button>Get Started</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => {
              const status = statusConfig[site.status];
              const StatusIcon = status.icon;
              
              return (
                <Card key={site.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-indigo-400" />
                    </div>
                    <Badge variant={status.variant} className="gap-1">
                      <StatusIcon className={`w-3 h-3 ${site.status === 'building' ? 'animate-spin' : ''}`} />
                      {status.label}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-[#FAFAFA]">{site.siteName}</h3>
                  <p className="text-sm text-[#71717A] mt-0.5">{site.templateName}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-[#71717A] mt-3">
                    <Clock className="w-3 h-3" />
                    {new Date(site.createdAt).toLocaleDateString()}
                  </div>
                  
                  {site.liveUrl && site.status === 'deployed' && (
                    <a
                      href={site.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#1C1C1F] text-sm text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#252528] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Site
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

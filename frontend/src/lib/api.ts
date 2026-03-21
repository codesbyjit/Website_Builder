import { useAuthStore } from './authStore';

function getApiUrl() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('backend_url');
    if (stored) return stored;
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
}

const API_URL = getApiUrl();

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${getApiUrl()}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  auth: {
    register: (email: string, password: string) =>
      fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    
    login: (email: string, password: string) =>
      fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    
    me: () => fetchWithAuth('/auth/me'),
  },

  templates: {
    list: () => fetchWithAuth('/templates'),
    get: (id: string) => fetchWithAuth(`/templates/${id}`),
  },

  sites: {
    list: () => fetchWithAuth('/sites'),
    get: (id: string) => fetchWithAuth(`/sites/${id}`),
    create: (templateId: string, siteName: string, details: Record<string, string>) =>
      fetchWithAuth('/sites', {
        method: 'POST',
        body: JSON.stringify({ templateId, siteName, details }),
      }),
    getBuildLogs: (id: string) => fetchWithAuth(`/sites/${id}/build-logs`),
    redeploy: (id: string) =>
      fetchWithAuth(`/sites/${id}/redeploy`, {
        method: 'POST',
      }),
  },
};

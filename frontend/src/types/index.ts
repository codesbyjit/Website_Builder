export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'portfolio' | 'business' | 'blog' | 'ecommerce' | 'landing';
  thumbnail: string;
  features: string[];
  formSchema: FormField[];
}

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'url' | 'select' | 'image' | 'color';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  step?: number;
}

export interface Site {
  id: string;
  templateId: string;
  templateName: string;
  siteName: string;
  details: Record<string, string>;
  status: 'draft' | 'building' | 'deployed' | 'failed';
  previewUrl?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuildLog {
  id: string;
  siteId: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: string;
}

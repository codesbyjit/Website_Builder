'use client';

import { useState } from 'react';
import { Template, FormField } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Progress from '@/components/ui/Progress';
import { api } from '@/lib/api';
import { ArrowLeft, ArrowRight, Check, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DetailsFormProps {
  template: Template;
}

const DetailsForm = ({ template }: DetailsFormProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [error, setError] = useState('');

  const allSteps = [
    { id: 'basic', label: 'Basic Info', fields: ['siteName', 'companyName', 'tagline', 'brokerageName', 'licenseNumber'] },
    { id: 'hero', label: 'Hero Section', fields: ['heroImage', 'heroTitle', 'heroSubtitle'] },
    { id: 'stats', label: 'Stats', fields: ['homesSOLD', 'yearsExp', 'rating'] },
    { id: 'areas', label: 'Areas', fields: ['neighborhood1', 'price1', 'neighborhood2', 'price2'] },
    { id: 'reviews', label: 'Reviews', fields: ['review1Name', 'review1Text', 'review1Type', 'review2Name', 'review2Text', 'review2Type'] },
    { id: 'contact', label: 'Contact', fields: ['email', 'phone', 'city', 'province'] },
    { id: 'about', label: 'About & Services', fields: ['about', 'services'] },
  ];

  const steps = allSteps.filter(step => 
    template.formSchema.some(field => step.fields.includes(field.id))
  );

  const currentFields = template.formSchema.filter((field) => {
    return steps[currentStep]?.fields.includes(field.id) || false;
  });

  const allStepFields = template.formSchema.filter((field) => {
    return steps[currentStep]?.fields.includes(field.id) || false;
  });

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    allStepFields.forEach((field) => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() || currentFields.length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsBuilding(true);
    setBuildProgress(0);
    setError('');

    const interval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const data = await api.sites.create(
        template.id,
        formData.siteName || template.name,
        formData
      );
      
      if (data.success) {
        setTimeout(() => {
          router.push(`/dashboard?siteId=${data.siteId}`);
        }, 1500);
      }
    } catch (err: any) {
      console.error('Failed to create site:', err);
      setError(err.message || 'Failed to create site');
      clearInterval(interval);
      setIsBuilding(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={error}
            rows={3}
          />
        );
      case 'select':
        return (
          <Select
            key={field.id}
            label={field.label}
            options={field.options || []}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={error}
          />
        );
      case 'color':
        return (
          <div key={field.id} className="space-y-1.5">
            <label className="block text-sm font-medium text-[#A1A1AA]">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value || '#6366F1'}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="w-10 h-10 rounded-lg border border-[#2A2A2E] bg-[#1C1C1F] cursor-pointer"
              />
              <Input
                placeholder="#6366F1"
                value={value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        );
      default:
        return (
          <Input
            key={field.id}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={error}
          />
        );
    }
  };

  if (isBuilding) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-[#FAFAFA]">Building your site</h2>
          <p className="text-[#71717A]">This will only take a moment...</p>
        </div>
        <div className="w-full max-w-md">
          <Progress value={buildProgress} showLabel />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/builder/templates" 
          className="inline-flex items-center gap-2 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to templates
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#FAFAFA]">{template.name}</h1>
            <p className="text-[#71717A] mt-1">Fill in the details to customize your site</p>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      transition-all
                      ${index < currentStep
                        ? 'bg-emerald-500 text-white'
                        : index === currentStep
                        ? 'bg-indigo-500 text-white'
                        : 'bg-[#2A2A2E] text-[#71717A]'
                      }
                    `}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        w-12 sm:w-20 h-0.5 mx-2
                        ${index < currentStep ? 'bg-emerald-500' : 'bg-[#2A2A2E]'}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#FAFAFA]">
                {steps[currentStep].label}
              </h2>
              
              {currentFields.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentFields.map(renderField)}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#71717A]">No additional fields needed for this section.</p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-[#2A2A2E]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? 'Build Site' : 'Continue'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#A1A1AA] uppercase tracking-wider">Preview</h3>
          <Card className="overflow-hidden">
            <div className="aspect-[4/3] relative bg-[#1C1C1F]">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#0A0A0B]/80 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#A1A1AA]" />
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-medium text-[#FAFAFA]">{template.name}</h4>
              <p className="text-sm text-[#71717A]">{template.description}</p>
            </div>
          </Card>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#A1A1AA]">Features included</h4>
            <ul className="space-y-1">
              {template.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;

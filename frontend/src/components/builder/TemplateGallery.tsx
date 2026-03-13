'use client';

import { useState, useMemo } from 'react';
import { templates } from '@/data/templates';
import TemplateCard from './TemplateCard';
import { Search } from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const categories = [
  { value: 'all', label: 'All Templates' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'business', label: 'Business' },
  { value: 'blog', label: 'Blog' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'landing', label: 'Landing Page' },
];

const TemplateGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]">Choose a Template</h1>
          <p className="text-[#71717A] mt-1">Select a template to get started with your website</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <Input
              placeholder="Ctrl + K"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-5"
            />
          </div>
          {/* <div className="flex gap-1 p-1 bg-[#1C1C1F] rounded-lg border border-[#2A2A2E]">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${selectedCategory === category.value
                    ? 'bg-[#2A2A2E] text-[#FAFAFA]'
                    : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-[#1C1C1F] flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-[#71717A]" />
          </div>
          <h3 className="text-lg font-medium text-[#FAFAFA]">No templates found</h3>
          <p className="text-[#71717A] mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;

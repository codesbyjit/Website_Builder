'use client'

import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Template } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface TemplateCardProps {
  template: Template
}

const categoryColors: Record<string, string> = {
  portfolio: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  business: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blog: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  ecommerce: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  landing: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card hover className="group overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* <div className="absolute top-3 left-3">
          <span
            className={`text-xs px-2 py-1 rounded-md border backdrop-blur ${categoryColors[template.category]}`}
          >
            {template.category}
          </span>
        </div> */}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">

        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">
            {template.name}
          </h3>

          <p className="text-sm text-[#71717A] mt-1 line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-2">
          {template.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 rounded-md bg-[#18181B] text-[#A1A1AA]"
            >
              {feature}
            </span>
          ))}

          {template.features.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-md bg-[#18181B] text-[#71717A]">
              +{template.features.length - 3}
            </span>
          )}
        </div>

        {/* ACTION */}
        <Link href={`/builder/details/${template.id}`}>
          <Button className="w-full">
            Use Template
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

      </div>
    </Card>
  )
}
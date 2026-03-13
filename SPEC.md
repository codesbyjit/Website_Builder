# Website Builder - Technical Specification

## 1. Project Overview

**Project Name:** WebForge - Professional Website Builder  
**Type:** Full-stack Web Application (Next.js + Express)  
**Core Functionality:** A professional website builder where users select pre-defined templates, fill in their details, and the backend builds and deploys their website.  
**Target Users:** Small business owners, freelancers, and individuals who want to create professional websites without coding.

---

## 2. Architecture

### Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript, Node.js
- **Icons:** HugeIcons Pro (React)
- **State Management:** React Context + Zustand
- **API Communication:** REST API

### Flow Diagram
```
User → Frontend (Select Template) → Fill Details Form → Submit to Backend
                                                                    ↓
                                              Backend (Build & Deploy) → Return Live URL
```

---

## 3. UI/UX Specification (Bolt.new Style)

### Design Philosophy
- Dark theme with subtle gradients
- Clean, minimalist interface
- Smooth animations and transitions
- Professional, modern aesthetic

### Color Palette
```css
--bg-primary: #0A0A0B;        /* Deep black background */
--bg-secondary: #141416;      /* Card backgrounds */
--bg-tertiary: #1C1C1F;       /* Elevated surfaces */
--border-color: #2A2A2E;      /* Subtle borders */
--text-primary: #FAFAFA;      /* Primary text */
--text-secondary: #A1A1AA;    /* Secondary text */
--text-muted: #71717A;        /* Muted text */
--accent-primary: #6366F1;    /* Indigo accent */
--accent-secondary: #8B5CF6; /* Purple accent */
--accent-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
--success: #10B981;           /* Success green */
--error: #EF4444;            /* Error red */
--warning: #F59E0B;          /* Warning amber */
```

### Typography
- **Font Family:** "Satoshi", "General Sans", system-ui, sans-serif
- **Headings:** Bold, large sizes (h1: 48px, h2: 36px, h3: 24px)
- **Body:** Regular, 16px, line-height 1.6
- **Small:** 14px for captions and labels

### Layout Structure
- Full viewport height
- Sidebar navigation (collapsible)
- Main content area with max-width 1400px
- Responsive: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### UI Components

#### 1. Header
- Logo (left)
- Navigation links (center)
- User profile/actions (right)
- Height: 64px
- Sticky position

#### 2. Sidebar (Bolt.new style)
- Width: 280px (collapsible to 64px)
- Contains: Templates, My Sites, Settings
- Icon + label for each item
- Active state with accent color

#### 3. Template Cards
- 3-column grid on desktop
- Card size: 320px x 240px
- Preview image with overlay on hover
- Template name, description
- "Use Template" button
- Hover: scale(1.02), shadow elevation

#### 4. Form Builder
- Multi-step form wizard
- Progress indicator at top
- Fields: Text, Textarea, Select, File Upload
- Real-time validation
- Preview panel (split view)

#### 5. Buttons
- Primary: Gradient background, white text
- Secondary: Transparent with border
- Ghost: No border, hover background
- Sizes: sm (32px), md (40px), lg (48px)
- Border radius: 8px

#### 6. Input Fields
- Dark background (#1C1C1F)
- Border: 1px solid #2A2A2E
- Focus: border-color #6366F1
- Placeholder: #71717A
- Border radius: 8px

---

## 4. Page Structure

### Pages
1. **/** - Landing/Home (redirect to /builder)
2. **/builder** - Main builder interface
3. **/builder/templates** - Template selection gallery
4. **/builder/details/[templateId]** - Details form for specific template
5. **/dashboard** - User's created sites
6. **/dashboard/[siteId]** - View deployed site

### Components Structure
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   ├── Progress.tsx
│   └── Toast.tsx
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── AppLayout.tsx
├── builder/
│   ├── TemplateCard.tsx
│   ├── TemplateGallery.tsx
│   ├── DetailsForm.tsx
│   ├── FormSteps.tsx
│   └── Preview.tsx
└── icons/
    └── HugeIcons.tsx (wrapper)
```

---

## 5. Backend API Specification

### Express Server Structure
```
server/
├── src/
│   ├── index.ts          # Entry point
│   ├── routes/
│   │   ├── templates.ts  # Template CRUD
│   │   └── sites.ts      # Site management
│   ├── controllers/
│   │   ├── templateController.ts
│   │   └── siteController.ts
│   ├── services/
│   │   └── deployService.ts  # Build & deploy logic
│   └── types/
│       └── index.ts
├── package.json
└── tsconfig.json
```

### API Endpoints

#### Templates
- `GET /api/templates` - List all available templates
- `GET /api/templates/:id` - Get template details
- `GET /api/templates/:id/schema` - Get form schema for template

#### Sites
- `POST /api/sites` - Create new site (submit details)
- `GET /api/sites` - List user's sites
- `GET /api/sites/:id` - Get site status
- `GET /api/sites/:id/build-logs` - Get build logs

### Request/Response Formats

#### POST /api/sites
```typescript
Request:
{
  templateId: string,
  siteName: string,
  details: {
    // Template-specific fields
    title: string,
    description: string,
    heroTitle: string,
    heroSubtitle: string,
    contactEmail: string,
    // ... more fields
  }
}

Response:
{
  success: true,
  siteId: "site_abc123",
  status: "building",
  previewUrl: null,
  liveUrl: null,
  buildLogs: []
}
```

---

## 6. Templates Data

### Template Schema
```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: 'portfolio' | 'business' | 'blog' | 'ecommerce' | 'landing';
  thumbnail: string;
  formSchema: FormField[];
  files: TemplateFiles; // Files to be customized
}

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'url' | 'select' | 'image';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
}
```

### Initial Templates (5)
1. **Portfolio Pro** - Personal portfolio with projects
2. **Business Corp** - Corporate business website
3. **Blog Minimal** - Clean blog template
4. **Shop Lite** - Simple e-commerce store
5. **Landing Page** - High-conversion landing page

---

## 7. Deployment Logic (Backend Placeholder)

For now, the backend will:
1. Receive the site details
2. Validate the request
3. Simulate build process with delay
4. Return a mock "deployed" URL
5. Store site data in memory (later: database)

---

## 8. Acceptance Criteria

### Frontend
- [ ] Dark theme applied consistently
- [ ] HugeIcons used throughout
- [ ] Template gallery displays 5+ templates
- [ ] Template cards have hover effects
- [ ] Form wizard works with validation
- [ ] Responsive on all breakpoints
- [ ] Loading states for async operations
- [ ] Error handling with toast notifications

### Backend
- [ ] Express server runs on port 3001
- [ ] GET /api/templates returns template list
- [ ] POST /api/sites creates new site
- [ ] Build simulation with progress
- [ ] CORS enabled for frontend

### Integration
- [ ] Frontend successfully calls backend API
- [ ] Form submission triggers backend build
- [ ] Build status displayed in UI

---

## 9. File Structure

```
website-builder/
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── builder/
│   │   │   │   ├── templates/
│   │   │   │   └── details/
│   │   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── package.json
│   └── tailwind.config.ts
├── backend/                  # Express server
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── services/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

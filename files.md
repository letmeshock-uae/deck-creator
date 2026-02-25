root/
├── app/
│   ├── (auth)/
│   │   └── admin/
│   │       ├── login/page.tsx
│   │       └── dashboard/page.tsx
│   ├── api/
│   │   ├── slides/route.ts
│   │   └── upload/route.ts
│   ├── layout.tsx
│   └── page.tsx           <-- The Presentation View
├── components/
│   ├── admin/
│   │   ├── Editor.tsx
│   │   └── SortableList.tsx
│   ├── shared/
│   │   ├── Logo.tsx
│   │   └── GlassCard.tsx
│   └── vibe/
│       ├── SlideEngine.tsx
│       ├── SlideContent.tsx
│       └── MermaidBox.tsx
├── lib/
│   ├── db/
│   │   ├── schema.ts
│   │   └── index.ts
│   └── animations.ts      <-- Framer Motion configs
├── hooks/
│   └── useSlideNavigation.ts
└── public/
    └── fonts/             <-- Google Sans Flex
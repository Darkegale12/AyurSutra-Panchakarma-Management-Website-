# AyurSutra Next.js Setup Instructions

## Quick Setup (For Beginners)

### Step 1: Create a new Next.js project
```bash
npx create-next-app@latest ayursutra-app --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*"
cd ayursutra-app
```

### Step 2: Install dependencies
```bash
npm install lucide-react motion class-variance-authority clsx tailwind-merge tailwindcss-animate
npm install @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
npm install sonner@2.0.3 react-hook-form@7.55.0
```

### Step 3: Replace files
Copy the provided files to your project:

1. Replace `app/layout.tsx` with the provided layout
2. Replace `app/page.tsx` with the provided page  
3. Replace `app/globals.css` with the provided CSS
4. Replace `tailwind.config.ts` with the provided config
5. Copy all components from `/components/` to your project
6. Create `/lib/utils.ts` with the provided utils

### Step 4: Copy all UI components
You'll need to create all the shadcn/ui components. Here's the essential ones for this project:

Required UI components to copy:
- button.tsx (provided)
- card.tsx
- input.tsx  
- label.tsx
- select.tsx

You can get these from the shadcn/ui documentation or copy them from the original project.

### Step 5: Run the project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
ayursutra-app/
├── app/
│   ├── layout.tsx       # Root layout with dark theme
│   ├── page.tsx         # Main page component  
│   └── globals.css      # Global styles
├── components/
│   ├── LandingPage.tsx  # Landing page component
│   ├── PatientLogin.tsx # Patient login form
│   ├── DoctorLogin.tsx  # Doctor login form
│   ├── PatientRegister.tsx # Registration form
│   └── ui/             # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/
│   └── utils.ts        # Utility functions
└── tailwind.config.ts  # Tailwind configuration
```

## Key Changes from React to Next.js

1. **'use client' directive**: Added to components that use React hooks
2. **@/ import alias**: Used for clean imports (`@/components/ui/button`)
3. **Image component**: Replaced img tags with Next.js Image component
4. **App Router**: Using Next.js 13+ app directory structure
5. **TypeScript**: Full TypeScript setup with proper types

## Features Included

✅ Beautiful landing page with animations
✅ Patient/Doctor login systems
✅ Patient registration with form validation
✅ Responsive design with Tailwind CSS
✅ Dark theme with green accent colors
✅ Sanskrit quotes and Ayurveda theming
✅ Motion animations
✅ Form handling with proper validation

## Next Steps

1. Add more UI components as needed
2. Implement real authentication
3. Add database integration
4. Create patient/doctor dashboards
5. Add appointment booking system

## Troubleshooting

- If you get import errors, make sure all dependencies are installed
- If animations don't work, check that motion/react is properly installed
- If styles look wrong, verify the globals.css file is properly imported
- For any Radix UI component issues, check the specific component documentation

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Motion Documentation](https://motion.dev/)
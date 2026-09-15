# OpenLedger Master Design System

This document outlines the core design language, styling conventions, and component guidelines for the OpenLedger landing page. Every new page and component must adhere strictly to these principles to maintain consistency, premium aesthetics, and responsive behavior across the application.

---

## 1. Core Principles
- **Modern & Premium**: The UI should feel like a high-end, state-of-the-art developer tool (similar to Vercel, Linear, or Stripe).
- **Dark Mode First**: The primary visual aesthetic is dark mode, featuring deep blacks, subtle greys, and high-contrast glowing accents. Light mode is fully supported via CSS variable overrides.
- **Glassmorphism & Depth**: Extensive use of backdrop blurs (`backdrop-filter: blur()`), semi-transparent surfaces, and subtle inner/outer shadows to create depth.
- **Micro-Interactions**: All interactive elements (buttons, cards, links) must have smooth, cubic-bezier transitions on hover and active states (e.g., translating Y, scaling, and glowing).

---

## 2. Typography
The application uses two distinct typefaces.

- **Primary Font**: `Inter` (sans-serif)
  - Used for all headings, body text, buttons, and UI elements.
  - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
  - Letter spacing is typically tight on headings (e.g., `-0.02em` or `-0.03em`) and normal on body text.
- **Secondary Font**: `serif` (system-ui fallback)
  - Used strictly for elegant italicized sub-headlines (e.g., *"Your interface shouldn't."*).
  - Always used with `fontStyle: 'italic'` and a lighter weight (e.g., `400`).

---

## 3. Color Palette & Variables
Colors are managed globally via CSS variables in `src/styles/globals.css`. Never hardcode colors if a variable exists.

### Dark Theme (Default)
- **Backgrounds**:
  - Page/Main Section: `var(--bg-page)` (`#0A0C10`)
  - Elevated Card: `var(--bg-card)` (`#0E1015`)
  - Glass Surfaces: `var(--bg-glass)` (`rgba(255, 255, 255, 0.05)`)
- **Text**:
  - Primary (Headings): `var(--text-heading)` (`#FFFFFF`)
  - Body Text: `var(--text-primary)` (`#F1F5F9`)
  - Secondary/Muted: `var(--text-secondary)` (`rgba(255, 255, 255, 0.65)`)
- **Borders**:
  - Subtle: `var(--border-subtle)` (`rgba(255, 255, 255, 0.08)`)
  - Normal: `var(--border-normal)` (`rgba(255, 255, 255, 0.13)`)
- **Accents**:
  - Primary Brand Accent (OpenLedger Orange): `#FF6600` (used for active states, CTA buttons, eyebrows, glows, and indicators across all pages)
  - Glows & Ambient Highlights: `rgba(255, 102, 0, 0.35)`, `rgba(255, 102, 0, 0.15)`
  - Success (Status Dot): `#10B981`

### Light Theme
Automatically applied when `html[data-theme="light"]` is active.
- Page Background: `#F8F9FA`
- Card Background: `#FFFFFF`
- Primary Text: `#0F172A`
- Secondary Text: `#475569`

---

## 4. UI Components & Elements

### 4.1 Buttons
Buttons always use a `borderRadius` of `9999px` (Pill shape) to ensure a modern, soft aesthetic.

**Primary CTA (The "Orange Pill")**:
- **Background**: `#FF6600`
- **Text Color**: `#FFFFFF`
- **Font**: `fontWeight: 700`, `textTransform: 'none'`, `letterSpacing: '0.02em'`
- **Border**: `1px solid rgba(255, 102, 0, 0.4)` (Dark) / `0.2` (Light)
- **Shadow**: `0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
- **Hover State**: `backgroundColor: '#e65c00'`, `transform: translateY(-2px)`, enhanced glow shadow.

**High-Contrast Primary (The "White Pill")**:
- *Used in extremely dark banner areas (e.g., Footer).*
- **Background**: `#FFFFFF`
- **Text Color**: `#070D1A`
- **Hover**: `#F3F6FA`, scale up slightly, `translateY(-2px)`.

**Secondary CTA (Glass/Outlined Pill)**:
- **Background**: `rgba(255, 255, 255, 0.08)` (or `var(--bg-pill)`)
- **Backdrop Filter**: `blur(12px) saturate(180%)`
- **Border**: `1.5px solid rgba(255, 102, 0, 0.45)` (Orange tint) OR `rgba(255, 255, 255, 0.25)` (Neutral)
- **Text Color**: `var(--text-primary)`

### 4.2 Cards
- **Border Radius**: Substantial corners for large structural cards (`24px` to `32px`). Standard content cards use `16px`.
- **Background**: `var(--bg-card)` or `var(--bg-glass)`
- **Borders**: `1px solid var(--border-normal)`
- **Hover Effect**: Cards should often have a subtle `transform: translateY(-4px)` and elevate the border color (e.g., to `var(--border-strong)`) with a longer transition (`0.3s ease`).

### 4.3 Ambient Glows & Meshes
Advanced background lighting is a signature part of the OpenLedger aesthetic.
- Use `radial-gradient` or `conic-gradient` attached to `absolute` positioned pseudo-elements (or `Box` components).
- Example of a deep blue ambient mesh:
  ```css
  background-image: radial-gradient(ellipse 85% 65% at 50% 35%, rgba(68, 140, 255, 0.48) 0%, rgba(30, 85, 215, 0.22) 50%, rgba(7, 13, 26, 0.95) 85%);
  ```
- Always use `pointer-events: none` on glow layers to prevent blocking interactions.
- Blend modes (`mix-blend-mode: screen` or `color-dodge`) can be used in Dark Mode for vibrant light streaks.

---

## 5. Layout & Spacing
- **Container Max-Width**: The standard main container max-width is `lg` (1200px) via MUI's `<Container maxWidth="lg">`.
- **Section Padding**: Sections should have generous vertical padding (`py: { xs: 8, md: 14 }`) to allow content to breathe.
- **Flex/Grid Gaps**: Use standard MUI spacing multipliers (`gap: 2` = 16px, `gap: 4` = 32px).
- **Responsive Stacking**: Layouts should fluidly stack from 1 column on mobile (`xs`), to 2 on tablet (`sm`), to 3/4 on desktop (`md/lg`).

---

## 6. Implementation Rules
1. **Material-UI (MUI)**: All components must be built using MUI `v5` (`Box`, `Typography`, `Button`, `Container`). Avoid raw HTML tags (`div`, `span`) in favor of `<Box>`.
2. **`useThemeMode` Hook**: Always import `useThemeMode` from `@/context/ThemeContext` and extract `isDark` to toggle hardcoded dynamic colors (e.g., SVG filters or specific background hexes that aren't mapped to CSS variables).
3. **SVG Assets**: Prefer inline SVGs for simple icons (to easily manipulate `fill="currentColor"`). For complex logos (e.g., OpenLedger text logo), use `<img />` with `filter: isDark ? 'brightness(0) invert(1)' : 'none'`.
4. **Animations**: Keep animations snappy but smooth. Standard transition is `all 0.25s cubic-bezier(0.16, 1, 0.3, 1)`.

By following this Master Design System, every new page built for OpenLedger will feel natively integrated into the established premium, developer-focused aesthetic.

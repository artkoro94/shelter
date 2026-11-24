# Cozy House — Pet Shelter

A responsive fictional animal-shelter website with Russian as the default language and English as an additional option.

## Stack

- Vite
- TypeScript
- HTML and CSS
- ESLint and Prettier

## Features

- Russian and English interface with a persistent language preference
- Light and dark themes with a persistent theme preference
- Responsive home page and pet catalog
- Accessible mobile navigation
- Featured pets slider
- Reduced-motion support

## Project structure

```text
src/
  main.ts
  i18n.ts
  styles.css
  modules/
    navigation.ts
    featured-slider.ts
page_1/                 # Legacy home-page styles
page_2/                 # Legacy catalog styles and markup
assets/                 # Images, icons and illustrations
shelter_main_1.html     # Home page
page_2/shelter_main_2.html
index.html              # GitHub Pages entry point
```

The TypeScript entry point initializes small, page-aware modules. Each module checks that its target elements exist, so the home-page slider does not run on the catalog page.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build |
| `npm run type-check` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Format project files |
| `npm run format:check` | Check formatting |
| `npm run check` | Run type-check, lint, and build |

## Project notes

Cozy House is a fictional shelter. Names, animal statistics, contact details, addresses, donation details, and map links are illustrative placeholders, not real service information. Replace them with verified information before presenting the site as a real shelter.

## Deployment

The Vite base path is configured for the GitHub Pages repository at `/shelter/`.

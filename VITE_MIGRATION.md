# Vite Migration Notes

This project has been migrated from Create React App to Vite.

## Key Changes

### Environment Variables
- All environment variables now require the `VITE_` prefix
- Changed from `REACT_APP_*` to `VITE_REACT_APP_*`
- Access via `import.meta.env` instead of `process.env`
- Updated `.env` and `.env.example` files

### Files Changed
- `package.json` - Updated all dependencies to latest versions, replaced react-scripts with vite
- `index.html` - Moved from `public/` to root, updated for Vite
- `src/index.jsx` - Updated to use React 18's `createRoot` API
- `src/constants.js` - Updated env variable access from `process.env` to `import.meta.env`
- `src/react-app-env.d.ts` - Updated TypeScript definitions for Vite
- `tsconfig.json` - Updated for Vite compatibility
- `.gitignore` - Added `/dist`, cleaned up
- `src/layouts/DefaultLayout.jsx` - Updated `Switch` → `Routes`, Route syntax for React Router v6
- `src/components/Header.jsx` - Updated `useHistory` → `useNavigate`, fixed Bootstrap 5 `InputGroup.Append`
- `src/components/ArticleCard.jsx` - Updated `useHistory` → `useNavigate`
- `src/utils/index.js` - Updated routing functions to use `navigate` instead of `history.push`

### New Files
- `vite.config.js` - Vite configuration with React plugin, base path for GitHub Pages
- `vitest.config.js` - Vitest test configuration
- `tsconfig.node.json` - TypeScript config for Vite config files

### Removed Files
- `public/index.html` - Moved to root as `index.html`

### Dependencies Updated
Major version updates:
- React 17.0.1 → 18.3.1 ✅ UPDATED CODE
- React-DOM 17.0.1 → 18.3.1 ✅ UPDATED CODE
- React Router 5.2.0 → 6.30.2 ✅ UPDATED CODE
- Bootstrap 4.6.0 → 5.3.8 ✅ UPDATED CODE
- React Bootstrap 1.5.2 → 2.10.10 ✅ UPDATED CODE
- Apollo Client 3.3.13 → 3.14.0
- Redux 4.0.5 → 5.0.1
- React Redux 7.2.2 → 9.2.0
- TypeScript 4.2.3 → 5.9.3
- Axios 0.21.1 → 1.13.2
- React Icons 4.2.0 → 5.5.0
- React Markdown 5.0.3 → 9.0.1
- React Share 4.4.0 → 5.2.2
- GraphQL 15.5.0 → 16.12.0
- GraphQL Request 3.4.0 → 7.4.0

Removed:
- react-scripts (replaced with vite)
- node-sass (replaced with sass)
- react-router-scroll-top (still used but may need review)

Added:
- vite 6.0.7
- @vitejs/plugin-react 4.3.4
- vitest 3.0.7
- sass 1.87.0

### Code Changes Made

#### React Router v6 Migration
✅ `src/layouts/DefaultLayout.jsx`:
- Changed `Switch` → `Routes`
- Updated Route syntax: `<Route path={...} element={<Component />} />` instead of `<Route path={...}><Component /></Route>`
- Removed `exact` prop (no longer needed in v6)
- Changed catch-all route to `path="*"`

✅ `src/components/Header.jsx`:
- Changed `useHistory` → `useNavigate`
- Updated function calls from `history.push(path)` → `navigate(path)`

✅ `src/components/ArticleCard.jsx`:
- Changed `useHistory` → `useNavigate`
- Updated function calls

✅ `src/utils/index.js`:
- Updated helper functions: `openArticleById`, `openSearchByFilter`, `openInternalLink`
- Changed parameter from `history` → `navigate`
- Changed `history.push(...)` → `navigate(...)`

#### React 18 Migration
✅ `src/index.jsx`:
- Changed from `ReactDOM.render(...)` to `createRoot(...).render(...)`

#### Bootstrap 5 Migration
✅ `src/components/Header.jsx`:
- Removed `inline` prop from `Form` (deprecated in Bootstrap 5)
- Removed `InputGroup.Append` wrapper (deprecated in Bootstrap 5)
- `InputGroup.Text` is now a direct child of `InputGroup`

### Build & Scripts
- `npm start` - Start dev server (alias for `npm run dev`)
- `npm run dev` - Start dev server
- `npm run build` - Build for production (outputs to `build/` for GitHub Pages compatibility)
- `npm run preview` - Preview production build
- `npm test` - Run tests with Vitest

### Next Steps
1. Run `npm install` to install new dependencies
2. Test the application:
   ```bash
   npm start
   ```
3. Build and verify:
   ```bash
   npm run build
   npm run preview
   ```
4. If deploying to GitHub Pages, run:
   ```bash
   npm run deploy
   ```

### Potential Issues to Test

#### React Router v6
- ✅ Route definitions updated
- ✅ Navigation hooks updated
- ⚠️  Check `react-router-scroll-top` compatibility (may need replacement)
- ✅ `useParams` usage is compatible (no changes needed)

#### Bootstrap 5
- ✅ InputGroup fixed
- ⚠️  Check all form components for other deprecated props
- ⚠️  Test responsive behavior (some classes changed)
- ⚠️  Verify badge styles (`variant` prop may need updates)

#### React Markdown
- ⚠️  Version 5 → 9 has breaking changes in syntax and plugins
- May need to update markdown rendering component

#### Other Libraries
- ⚠️  react-router-scroll-top: may not be compatible with React Router v6
- ⚠️  GraphQL Request: major version update (3 → 7) may have API changes

### Testing Checklist
- [ ] Home page loads correctly
- [ ] Articles list displays
- [ ] Individual article pages work
- [ ] Search functionality works
- [ ] Navigation between pages
- [ ] Forms and search input
- [ ] Responsive design (mobile/desktop)
- [ ] Environment variables load correctly
- [ ] Production build works
- [ ] GitHub Pages deployment works

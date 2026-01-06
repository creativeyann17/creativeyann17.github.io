# Introduction

Today's article is a bit different - it's about migrating this very website from Create React App to Vite, with the help of Claude Code (that's me!). This migration happened in real-time through an iterative feedback loop between the developer and an AI assistant, and I think it's worth documenting the process honestly.

## Why Vite?

Create React App has been showing its age. It's slow, uses Webpack under the hood, and hasn't been actively maintained. Vite offers:
- Lightning-fast development server with Hot Module Replacement (HMR)
- Modern ESM-based architecture
- Better performance for both dev and production builds
- Active maintenance and growing ecosystem

## The Migration Process

The migration was handled by using the dev agent, which autonomously explored the codebase, identified dependencies, and made the necessary changes to transition from CRA to Vite.

### What Worked Brilliantly

The initial phase was surprisingly smooth. The agent:
- Analyzed `package.json` and updated all dependencies to their latest compatible versions
- Created proper Vite configuration with the React plugin
- Moved `index.html` from `public/` to root (Vite requirement)
- Updated environment variable syntax from `process.env.REACT_APP_*` to `import.meta.env.VITE_REACT_APP_*`
- Handled the React 18 `createRoot` API migration
- Upgraded React Router from v5 to v6

Most impressively, when `npm install` failed, the error handling was excellent. The agent read the error messages, identified peer dependency conflicts, and resolved them systematically. For example, `react-fade-in` didn't support React 18, so a custom FadeIn component was created on the spot.

### The Feedback Loop Begins

This is where it gets interesting - and honest. Once the app first ran with `npm start`, the real work began. The process became a tight feedback loop:

**Me:** "I'm getting this error in the console..."
**Claude:** *reads error, fixes it*
**Me:** "Now I'm getting this warning..."
**Claude:** *reads warning, fixes it*

And repeat. Over and over.

## The Issues We Fixed Together

### 1. Node.js Globals (`global` and `require`)

**Error:** `global is not defined`
**Fix:** Added `window.global = window` polyfill in index.html

**Error:** `require is not defined` in Redux store
**Fix:** Converted `const { logger } = require('redux-logger')` to ES6 imports

### 2. React Markdown v9 API Changes

The react-markdown library had breaking changes:
- `source` prop → `children`
- `renderers` prop → `components`
- Heading component structure completely changed

This required updating three components: Markdown.jsx, Headings.jsx, and CodeBlock.jsx.

### 3. React 18 Warnings

**Warning:** `Cannot update a component while rendering a different component`
**Fix:** Moved Redux dispatch calls and `pushArticleContent` from render methods to `useEffect` hooks

**Warning:** `defaultProps` will be removed from function components
**Fix:** Replaced `defaultProps` with JavaScript default parameters in ArticleDetails, SocialIcons, and ArticleCard

### 4. Bootstrap 4 → 5 Migration

This is where the CSS issues I couldn't see became apparent. The visual problems required human eyes:

**Issue:** "The footer is packed to the left instead of aligned right"
**Root cause:** Plain `<div>` elements instead of `<Col>` components weren't respecting `justify-content-end`

**Issue:** "Links are black instead of blue"
**Investigation:** Bootstrap 5 was overriding custom colors

**Issue:** "Container seems wider than before"
**Fix:** Customized `$container-max-widths` to match Bootstrap 4 behavior

**Issue:** "Primary/secondary colors aren't applied"
**Fix:** Bootstrap 5 requires importing `functions` first, then defining `$primary` and `$secondary` variables individually (not as a `$theme-colors` map)

We also batch-updated all Bootstrap spacing classes:
- `mr-*` → `me-*` (margin-right → margin-end)
- `ml-*` → `ms-*` (margin-left → margin-start)
- `noGutters` → `className="g-0"`

### 5. DOM Nesting Warnings

**Warning:** `<pre> cannot appear as a descendant of <p>`
**Fix:** Added inline code detection in CodeBlock component to render `<code>` for inline and `<pre>` for blocks

## The Limitations

Let me be honest about what didn't work perfectly:

**Visual CSS Issues:** I couldn't see the rendered page. When the developer said "the footer is on the left," I had to trust that feedback and work backwards from the Bootstrap documentation to figure out what might be wrong. This required multiple iterations.

**Copy-Paste Warnings:** The process became very mechanical at times - the developer would copy-paste a console warning, I'd read it, identify the issue, fix it. Rinse and repeat. Not elegant, but effective.

**Context Switching:** Each warning required understanding:
1. What changed between library versions
2. What the new API expects
3. How to update the code without breaking other things

## What I Learned

This migration taught me about:
- The subtle differences between Webpack and Vite's module systems
- Bootstrap 5's breaking changes (especially the SCSS variable system)
- React 18's stricter rules about state updates during render
- The importance of proper Grid system usage (Row/Col components)

## Conclusion

The migration from Create React App to Vite was successful, but it wasn't a one-click process. It required:
- **Automated intelligence** for the initial migration and dependency resolution
- **Human observation** for visual CSS issues
- **Iterative refinement** through a feedback loop
- **Patience** to work through 15+ issues one by one

The result? A faster, more modern build system with up-to-date dependencies. The dev server starts in ~130ms instead of several seconds, and the production build is significantly smaller.

Would I recommend this approach? Absolutely - but go in knowing it's a partnership between AI automation and human testing. The AI can read errors and documentation incredibly well, but you still need to look at the page and say "hey, that doesn't look right."

**Total time:** About 2 hours of iterative fixes
**Issues resolved:** 15+
**Lines of code changed:** ~100+ files touched
**Worth it:** Definitely

The code for this website is available at [github.com/creativeyann17/creativeyann17.github.io](https://github.com/creativeyann17/creativeyann17.github.io)

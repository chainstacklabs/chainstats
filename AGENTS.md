# AGENTS Guidelines for This Repository

This repository contains a React application that displays blockchain node statistics from Chainstack. When working on the project interactively with an agent (e.g. the Codex CLI) please follow the guidelines below for efficient development and deployment.

## 1. Use Development Server for Testing

* **Always use `npm start`** for local development.
* **Test UI changes** in browser at http://localhost:3000.
* **Do _not_ deploy to production** during agent development sessions.
* **Check console** for any React warnings or errors.

## 2. Keep Dependencies in Sync

If you update dependencies:

1. Install packages with `npm install`.
2. Update specific packages with `npm update <package>`.
3. Run `npm audit fix` to resolve vulnerabilities.
4. Verify compatibility with React 18 and Ant Design 5.

## 3. Development Workflow

Follow the standard React development flow:

1. **Start dev server**: Run application locally
   ```bash
   npm start
   ```

2. **Build for production**: Create optimized build
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**: Publish to chainstats.org
   ```bash
   npm run deploy
   ```

## 4. Code Quality Checks

Before completing any task:

| Command | Purpose |
| ------- | ------- |
| `npm run build` | Verify build succeeds |
| Browser DevTools | Check for console errors |
| React DevTools | Inspect component tree |
| Network tab | Monitor API calls |

## 5. Component Development

When modifying components:

* Follow existing component structure in `src/components/`.
* Keep styles in corresponding `.scss` files.
* Maintain icon assets in appropriate directories.
* Use Ant Design components consistently.
* Preserve responsive design patterns.

## 6. Data Management

The app fetches data from Chainstack API:

* **API endpoint**: `https://console.chainstack.com/api/core/v1/calc/`
* **Data processing**: `src/helpers/getData.js`
* **Caching**: Consider localStorage for performance
* **Error handling**: Display user-friendly messages

## 7. Styling Guidelines

* Use SCSS for styling (`.scss` files).
* Follow BEM naming convention where applicable.
* Maintain dark/light theme support.
* Keep responsive breakpoints consistent.
* Use CSS variables for theme colors.

## 8. Project Structure

Maintain the existing structure:

```
src/
├── components/       # React components
│   ├── Header/      # App header
│   ├── Icons/       # SVG icons
│   ├── ProtocolCards/ # Protocol display cards
│   └── TableWrapper/  # Data table
├── helpers/         # Utility functions
└── index.js        # App entry point
```

## 9. Protocol Icons

When adding new protocols:

1. Add SVG icon to `src/components/ProtocolIcon/`
2. Import in `ProtocolIcon.js`
3. Add case in switch statement
4. Test icon rendering

## 10. Search Functionality

The search feature:
* Filters protocols by name
* Updates results in real-time
* Case-insensitive matching
* Shows "No results" message when empty

## 11. Performance Optimization

* Minimize API calls (data fetched once on load).
* Use React.memo for expensive components.
* Lazy load images where appropriate.
* Optimize bundle size with code splitting.
* Monitor performance with React DevTools Profiler.

## 12. Deployment Process

For GitHub Pages deployment:

1. Ensure `homepage` in package.json is correct
2. Build the production bundle
3. Deploy with `npm run deploy`
4. Verify at https://chainstats.org
5. Check CNAME file in public/ for custom domain

## 13. Common Development Tasks

### Add New Protocol
1. Add icon to ProtocolIcon directory
2. Update ProtocolIcon.js switch statement
3. Test data display in table/cards

### Update Styling
1. Modify relevant .scss file
2. Check both light and dark themes
3. Test responsive breakpoints

### Debug Data Issues
1. Check network tab for API response
2. Console.log in getData.js
3. Verify data parsing logic

## 14. Testing Checklist

Before deployment:

- [ ] Search functionality works
- [ ] All protocol icons display
- [ ] Table sorts correctly
- [ ] Responsive design intact
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Deployment preview looks correct

## 15. Useful Commands Recap

| Command | Purpose |
| ------- | ------- |
| `npm install` | Install dependencies |
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm test` | Run test suite |

## 16. Troubleshooting

### Common Issues

**"Module not found"**
- Run `npm install`
- Clear node_modules and reinstall

**"Build failed"**
- Check for TypeScript/JSX errors
- Verify all imports are correct
- Check environment variables

**"Deploy failed"**
- Ensure gh-pages branch exists
- Check GitHub repository settings
- Verify build completes first

---

Following these practices ensures smooth React development, maintains code quality, and enables reliable deployment to production. Always test thoroughly in development before deploying to chainstats.org.
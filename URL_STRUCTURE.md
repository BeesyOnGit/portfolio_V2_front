# Portfolio URL Structure

This portfolio now uses React Router DOM for URL-based navigation instead of state-based navigation. Here's the complete URL structure:

## URL Routes

### Root Routes
- `/` - Mode chooser (if no mode selected) or redirects to current mode
- `/classic` - Classic UI mode (home page)
- `/terminal` - Terminal mode (home)

### Classic Mode Routes
- `/classic` or `/classic/home` - Home page
- `/classic/experience` - Experience page
- `/classic/projects` - Projects page  
- `/classic/contact` - Contact page

### Terminal Mode Routes
- `/terminal` - Terminal with home content
- `/terminal/home` - Terminal with home content
- `/terminal/experience` - Terminal with experience content
- `/terminal/projects` - Terminal with projects content
- `/terminal/contact` - Terminal with contact content

### Admin Routes
- `/admin` - Admin login/dashboard

## Navigation Features

### Classic Mode
- Navigation uses URL changes
- Active nav item highlights based on current URL
- Browser back/forward buttons work
- Bookmarkable URLs

### Terminal Mode
- Commands update URLs automatically
- `home`, `experience`, `projects`, `contact` commands navigate to respective URLs
- URLs are reflected in browser address bar
- Terminal history preserved across navigation

### Mode Switching
- Mode changes preserve current page context
- Switching from `/classic/projects` to terminal goes to `/terminal/projects`
- Browser history maintained

### Admin Panel
- Separate `/admin` route
- Login redirects stay on admin route
- Logout redirects to home
- Back to Portfolio button navigates to root

## Implementation Details

### Key Components Updated
1. **App.tsx** - Router setup with route definitions
2. **AppContext.tsx** - Added navigation helpers using React Router
3. **ClassicLayout.tsx** - Uses nested routes for pages
4. **Header.tsx** - Navigation uses `navigateToPage` helper
5. **Terminal.tsx** - Commands update URLs via React Router
6. **ModeChooser.tsx** - Uses `navigateToMode` helper

### Navigation Helpers
- `navigateToPage(page)` - Navigate within current mode
- `navigateToMode(mode)` - Switch modes and preserve current page
- `navigateToAdmin()` - Go to admin panel

### URL Synchronization
- Current page state syncs with URL automatically
- Mode selection persists in localStorage
- Theme preference persists in localStorage
- Admin authentication persists in sessionStorage

## Benefits

1. **SEO Friendly** - Each page has a unique URL
2. **Bookmarkable** - Users can bookmark specific pages
3. **Browser Navigation** - Back/forward buttons work as expected
4. **Shareable** - URLs can be shared to specific pages/modes
5. **Deep Linking** - Direct access to any page in any mode
6. **Better UX** - Standard web navigation patterns
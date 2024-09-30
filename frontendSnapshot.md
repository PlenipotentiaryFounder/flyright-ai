# FlyRight AI Frontend Snapshot

## Directory Overview
- **src/**: Main source directory
  - **components/**: Contains shared and feature-specific components
    - **pages/**: Page-level components
  - **admin/**: Admin-related components and pages
    - **components/**: Admin-specific components
    - **pages/**: Admin page components
    - **services/**: Admin-related services (e.g., authentication)
  - **styles/**: (Assumed) Global and shared styling

## Routing Overview
Main routing file: `App.tsx`

The application uses React Router for navigation. Routes are defined in `App.tsx`, including both user and admin routes. Some routes appear to be protected, likely using the `isAuthenticated` function from `admin/services/auth`.

User routes include:
- Gouge Page
- Mock Oral Page
- Register Page
- Login Page
- Profile Page
- Chat Page
- Flashcards Page
- Analytics Page

Admin routes include:
- Dashboard
- User Management
- Mock Oral Management
- Gouge Management
- Flashcard Management
- Analytics Management
- Admin Login Page

## Component Breakdown

### Page Components
- GougePage
- MockOralPage
- RegisterPage (missing)
- LoginPage (missing)
- ProfilePage (missing)
- ChatPage
- FlashcardsPage
- AnalyticsPage

### Admin Components
- Dashboard
- UserManagement
- MockOralManagement (missing)
- GougeManagement
- FlashcardManagement (missing)
- AnalyticsManagement (missing)
- AdminLoginPage

### Feature-Specific Components (based on GougePage.tsx)
- Select
- SelectTrigger
- SelectValue
- SelectContent
- Card

## Hooks Overview
No custom hooks are directly visible in the provided files, but they may exist in other parts of the application.

## Styling Approach
The application appears to use a combination of Tailwind CSS and custom classes. Examples from GougePage.tsx:
- Tailwind classes: `w-[200px]`, `p-4`, `mb-4`, `cursor-pointer`
- Custom classes: `border-sky-600`

## Integration Points
- The frontend interacts with backend APIs, but the specific implementation details are not visible in the provided files.
- State management seems to use React's built-in state management (useState hook is likely used based on the setSelectedStage function in GougePage.tsx).

## Existing Pages and Example Pages
No clear mapping between existing pages and example pages is visible in the provided files.

## Known Issues

1. Missing Modules:
   - './components/pages/RegisterPage'
   - './components/pages/LoginPage'
   - './components/pages/ProfilePage'
   - './admin/pages/MockOralManagement'
   - './admin/pages/FlashcardManagement'
   - './admin/pages/AnalyticsManagement'

2. Type Errors:
   - In GougePage.tsx:
     - SelectTrigger component doesn't accept a className prop
     - Card component doesn't accept an onClick prop

3. Potential Improvements:
   - Consistent error handling for missing modules
   - Type-safe props for custom components
   - Ensure all referenced components and pages are implemented

## Additional Notes
- The application seems to have a separate admin section with its own components and pages.
- There's a mix of user-facing and admin-facing functionalities.
- The project uses TypeScript, as evident from the .tsx file extensions.
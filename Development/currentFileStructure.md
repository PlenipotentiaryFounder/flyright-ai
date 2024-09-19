├── .git/ (ignored)
├── backend/
│   ├── __tests__/                   # Tests for the Django backend
│   ├── api/                         # Django app (rest framework API)
│   │   ├── migrations/              # Django migrations
│   │   ├── models.py                # Django models
│   │   ├── views.py                 # Django views
│   │   ├── urls.py                  # Django URL routing
│   │   ├── serializers.py           # Django REST framework serializers
│   │   └── admin.py                 # Django admin panel setup
│   ├── settings.py                  # Django settings
│   ├── manage.py                    # Django entry point
│   ├── .gitignore                   # Ignored files for backend
│   ├── requirements.txt             # Python dependencies
│   └── Dockerfile                   # Optional: Docker configuration for backend
├── Development/
│   ├── 01-project-overview.md
│   ├── 02-architecture.md
│   ├── 04-components.md
│   ├── 05-state-management.md
│   ├── 06-styling-and-theming.md
│   ├── 07-navigation.md
│   ├── 08-api-integration.md
│   ├── 09-authentication.md
│   ├── 10-testing.md
│   ├── 11-performance-optimization.md
│   ├── 12-glossary.md
│   ├── ai-development-checklist.md
│   └── README.md
├── frontend/
│   ├── __tests__/                   # Front-end tests (Jest/RTL)
│   ├── assets/
│   │   ├── fonts/                   # Web fonts
│   │   └── images/                  # Web images
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── constants/               # Constants for frontend
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── navigation/              # React Router navigation
│   │   ├── screens/                 # Screens for frontend
│   │   ├── services/                # API service calls (to backend)
│   │   ├── store/                   # Redux store
│   │   │   ├── slices/              # Redux slices
│   │   │   ├── index.ts             # Store index
│   │   │   └── rootReducer.ts       # Root reducer
│   │   ├── theme/                   # Theme (styled-components or CSS-in-JS)
│   │   └── utils/                   # Utility functions
│   ├── public/
│   │   └── index.html               # Web entry point
│   ├── App.tsx                      # Main React component
│   ├── index.js                     # React entry point (JS)
│   ├── package.json                 # Front-end dependencies
│   └── tsconfig.json                # TypeScript config (if using TypeScript)
├── shared/
│   ├── types/                       # Shared types (e.g., for API models)
│   └── utils/                       # Shared utilities across backend/frontend
├── .gitignore                       # General git ignore file
├── README.md                        # Project documentation
├── SETUP.txt                        # Setup instructions
└── Dockerfile                       # Optional: Docker configuration

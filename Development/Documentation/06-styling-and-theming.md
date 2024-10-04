Our project uses styled-components, a popular CSS-in-JS library, to handle styling and theming in a modular, scalable, and maintainable way. This approach allows us to scope styles to individual components and easily manage global themes for consistency throughout the application.

Key Concepts
1. CSS-in-JS with styled-components
styled-components allows us to define styles directly within our React components, keeping styling concerns isolated and reducing the chance of naming conflicts.
We use a component-based styling approach where each component is responsible for its own styles, making it easy to manage, scale, and reuse components across the application.
2. Theming with ThemeProvider
The global application theme is managed using ThemeProvider from styled-components. This allows us to define a centralized theme that includes color palettes, font styles, spacing, and other design tokens.
The theme is injected into all styled components, making it easy to access shared values and update styles consistently across the app.
3. Directory Structure
The directory structure for styling and theming is organized to keep global styles, themes, and individual component styles modular.

bash
Copy code
src/
├── theme/                       # Global theme files
│   ├── GlobalStyles.ts          # Global CSS reset and base styles
│   ├── theme.ts                 # Theme object with colors, typography, etc.
├── components/                  # Component-level styles
│   ├── Button.tsx               # Example styled component
│   └── InputField.tsx           # Example styled input field
4. Global Styles
We define global styles using createGlobalStyle from styled-components. This is useful for applying base styles (e.g., CSS resets, body margins) and applying consistent font settings across the entire app.

tsx
Copy code
// src/theme/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
  }
`;

export default GlobalStyles;
5. Theming
We use a theme object to manage colors, fonts, and spacing across the application. The theme object is passed through ThemeProvider in the root component, giving all styled-components access to these values.

tsx
Copy code
// src/theme/theme.ts
const theme = {
  colors: {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#F8F9FA',
    text: '#212529',
    link: '#007BFF',
    hover: '#0056b3',
  },
  fonts: {
    primary: 'Arial, sans-serif',
    secondary: 'Georgia, serif',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

export default theme;
We then wrap the root component of the application with ThemeProvider:

tsx
Copy code
// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';
import HomePage from './components/pages/HomePage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
6. Component-Level Styling
Each component can have its own styled version using styled-components. These styles are scoped to the specific component, ensuring no leakage of styles to other parts of the application.

Example: Button Component
tsx
Copy code
// src/components/Button.tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const Button: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
7. Dynamic Theming
If the application needs to support multiple themes (e.g., light and dark modes), we can easily switch themes by dynamically passing a different theme object to ThemeProvider.

tsx
Copy code
// Example: Switching between light and dark themes
const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007BFF',
    link: '#007BFF',
  },
};

const darkTheme = {
  colors: {
    background: '#212529',
    text: '#ffffff',
    primary: '#17A2B8',
    link: '#17A2B8',
  },
};
In the application, you can dynamically toggle between themes by maintaining a state that switches between the two theme objects:

tsx
Copy code
const [isDarkMode, setIsDarkMode] = useState(false);

return (
  <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <GlobalStyles />
    <HomePage />
    <button onClick={() => setIsDarkMode(!isDarkMode)}>Toggle Theme</button>
  </ThemeProvider>
);
8. Best Practices
Component Isolation: Each component should have its own styles, ensuring they are modular and reusable.
Avoid Inline Styles: Instead of inline styles or large CSS files, use styled-components to keep styles alongside your components, ensuring consistency and reducing complexity.
Use Design Tokens: Define common values (colors, fonts, spacing) in a global theme object. This will make it easier to maintain a consistent design across the app and quickly update styles when necessary.
Dynamic Themes: Implement dynamic theming (light/dark mode) early on to provide a flexible user experience.
9. Testing Styled Components
When testing components styled with styled-components, React Testing Library works well. Styles will be applied in the same way they are in the browser, so you can focus on functionality and visual elements in your tests:

tsx
Copy code
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from './Button';
import theme from '../theme/theme';

test('renders button with correct label', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button label="Click Me" onClick={() => {}} />
    </ThemeProvider>
  );
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
Conclusion
By using styled-components and a global theme, our application ensures consistent, modular, and maintainable styling. Theming makes it easy to manage design updates and provide a cohesive user experience across all screens. This approach ensures flexibility while keeping our styles organized and isolated.


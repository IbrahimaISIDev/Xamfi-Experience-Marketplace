# Xamfi Experience Marketplace

A modern marketplace for authentic African experiences, connecting travelers with local guides and boat owners.

## Recent Updates

### Authentication
- **Custom Login & Registration**: Replaced the default managed UI with custom-built `LoginPage` and `RegisterPage` for a seamless user experience.
- **Headless Auth**: Integrated `@blinkdotnew/sdk` in headless mode to handle authentication secureley while maintaining full control over the UI.
- **Navigation**: Added "Back to Home" buttons on auth pages for better usability.

### Branding
- **White-labeling**: Removed "Made with Blink" branding and updated page titles to "Xamfi Experience Marketplace".

### Navigation Controls
- **Restricted Access**: Temporarily disabled navigation to **Destinations** and **Guides** pages (links are visible but disabled) as per business requirements.

## Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Backend/Auth**: Blink SDK
- **Icons**: Lucide React

## Getting Started

1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

- `/src/pages`: Main application pages (Home, Login, Register, Marketplace, etc.)
- `/src/components`: Reusable UI components and layout elements.
- `/src/lib`: Utility functions and SDK initialization.
- `/src/hooks`: Custom React hooks (e.g., `useAuth`).# Xamfi-Experience-Marketplace

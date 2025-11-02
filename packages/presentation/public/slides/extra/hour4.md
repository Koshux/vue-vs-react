Hour 4: Hands-On Use Case 4

Shared Component Library

The Concept

Build a set of generic, reusable UI components (Buttons, Modals, Inputs) that can be shared across multiple projects. This is a common practice in larger organizations to ensure brand consistency and development speed.

--

Core Technologies

Storybook: An open-source tool for building UI components and pages in isolation. It provides a workshop environment to build, view, and test your components.

Monorepo: Essential for developing the component library and the applications that consume it side-by-side.

Vite / Rollup: Used to bundle your component library for publishing (e.g., to npm).

--

Workshop Goal

Scaffold a new package in our monorepo called ui-library.

Create a simple Button component in both Vue and React.

Set up Storybook to display and document our new button.

Import and use the button in our main vue-app and react-app.

D2.4: Theming & UI Libraries

branch: day-2/03-theming

Goal: Build a consistent, beautiful UI quickly.

Two Main Approaches:

Component Libraries: Pre-built components (Vuetify, MUI).

Utility-First CSS: Style with classes (Tailwind CSS).

Component Libraries

Vue: Vuetify (Material Design), PrimeVue

React: Material-UI (MUI) (Material), Chakra UI

Pros: Extremely fast, consistent, accessible.

Cons: Can all look the same, harder to customize.

Theming: Both Vuetify and MUI have a <ThemeProvider> to define custom colors, fonts, etc.

--

Utility-First (Tailwind)

Both: Tailwind is framework-agnostic.

Headless UI: Unstyled, accessible components (Toggles, Modals) designed to be styled with Tailwind.

Pros: Full custom control, fast development.

Cons: Can lead to "class soup" in HTML.

Your Task

Vue: Add Vuetify to your project. Replace your plain <button> with a <v-btn>.

React: Add MUI to your project. Replace your plain <button> with a <Button>.

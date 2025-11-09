# 📚 PTL Workshop 2025: Comprehensive Cheatsheet

This document is your high-level guide for post-workshop reference. It summarizes the key differences, best practices, and decision points from our 12-hour session.

---

## 1. 🧭 Framework Selection Decision Tree

This is a simple guide to help you (or your team) choose between Vue and React for a **new project**.

> **1. What is your team's primary existing expertise?**
>
> - **"My team already knows and likes React."**
>   - **✅ Use React.** The massive ecosystem and your team's existing knowledge will provide more value than switching.
> - **"My team already knows and likes Vue."**
>   - **✅ Use Vue.** Your team will be more productive and happier on the platform they know.
> - **"My team is new to both, or we're starting fresh."**
>   - **➡️ Continue to the next question.**

> **2. What is your team's core development philosophy?**
>
> - **"We want a 'batteries-included' framework."**
>   - We prefer an "all-in-one" solution where routing, global state, and core utilities are official, curated, and work together seamlessly. We value progressive adoption and an easier learning curve.
>   - **✅ Lean towards Vue.** (Vue + Vue Router + Pinia are all official and designed to feel like a single, cohesive system).
> - **"We want a flexible 'UI library' and "just JavaScript"."**
>   - We prefer a "bring-your-own-tools" approach. We want to hand-pick our libraries for routing, state, and styling. We value explicit logic over "magic" and prefer writing in a way that is closer to plain JavaScript (or TSX).
>   - **✅ Lean towards React.** (React is just a UI library. You add React Router, Redux, etc., as separate, independent libraries).

> **3. What is the project's primary goal?**
>
> - **"Rapid Prototyping / Small-to-Medium App."**
>   - Our main goal is _speed_. We need to build a beautiful, full-featured application (like an admin panel or dashboard) as fast as possible.
>   - **✅ Lean towards Vue + Vuetify.** The learning curve is generally gentler, and component libraries like Vuetify are incredibly fast for building high-quality UIs.
> - **"Massive-Scale Enterprise App."**
>   - Our main goal is _strictness and predictability_ for a huge, complex application with many developers. We need a rigid, testable, one-way data flow.
>   - **✅ Lean towards React + Redux Toolkit.** RTK's explicit `dispatch -> action -> reducer` pattern was built specifically for this level of complexity and scale.
> - **"Native Mobile App is a Must."**
>   - We need to share code, logic, and developers between our web platform and a native iOS/Android app.
>   - **✅ Lean towards React.** React Native is the undisputed, battle-tested leader in this space.

---

## 2. 📋 Best-Practices Cheat Sheet

This table directly compares the core concepts from the workshop.

| Concept                   | 🔵 Vue 3 (Pinia, Vuetify)                                                               | ⚛️ React 19 (RTK, MUI)                                                                                      |
| :------------------------ | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Component Syntax**      | **Single-File Component (`.vue`)**<br/>`<template>`, `<script setup>`, `<style scoped>` | **Functional Component (`.tsx`)**<br/>A JavaScript function that returns JSX.                               |
| **Local State**           | `const count = ref(0)`<br/>`count.value++`                                              | `const [count, setCount] = useState(0)`<br/>`setCount(count + 1)`                                           |
| **Complex Local State**   | `const form = reactive({ ... })`<br/>`form.email = '...'`                               | `const [state, dispatch] = useReducer(...)`<br/>`dispatch({ type: 'SET_EMAIL', ... })`                      |
| **Computed State**        | `const double = computed(...)`                                                          | Just calculate it in the render:<br/>`const double = count * 2;` (or `useMemo` for expensive calculations). |
| **Side Effects**          | `onMounted(() => { ... })`<br/>`watch(count, () => { ... })`                            | `useEffect(() => { ... }, [])` (for mount)<br/>`useEffect(() => { ... }, [count])` (for watch)              |
| **Routing (Layouts)**     | `App.vue` contains header/nav and **`<RouterView />`** to render the current page.      | `App.tsx` contains header/nav and **`<Outlet />`** to render the current page.                              |
| **Global State Setup**    | **Pinia:** `createPinia()`<br/>`app.use(pinia)`                                         | **Redux Toolkit:** `configureStore(...)`<br/>Wrap app in `<Provider store={store}>`                         |
| **Reading Global State**  | `const store = useTasksStore()`<br/>`const items = store.items`                         | `const items = useAppSelector(selectTasks)`                                                                 |
| **Writing Global State**  | **Direct mutation.**<br/>`store.add('My Task')`                                         | **Dispatch an action.**<br/>`dispatch(add('My Task'))`                                                      |
| **Testing: Find Element** | **Vue Test Utils (VTU)**<br/>`const btn = wrapper.find('button')`                       | **React Testing Library (RTL)**<br/>`const btn = screen.getByRole('button')`                                |
| **Testing: Interact**     | `await btn.trigger('click')`                                                            | `await userEvent.click(btn)`                                                                                |
| **Testing: Assert**       | `expect(wrapper.emitted()).toHaveProperty('click')`                                     | `expect(myMockFn).toHaveBeenCalled()`                                                                       |
| **Monorepo Commands**     | `pnpm -F vue-app add <pkg>`                                                             | `pnpm -F react-app add <pkg>`                                                                               |

---

## 3. 🎨 UI Library Comparison: Vuetify vs. Material-UI (MUI)

This compares the two specific libraries we used in the workshop.

| Feature             | 🔵 Vuetify (for Vue)                                                                                             | ⚛️ Material-UI (MUI) (for React)                                                                                             |
| :------------------ | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Design System**   | Google's **Material Design**. Very complete and opinionated.                                                     | Google's **Material Design**. The "original" and most popular implementation.                                                |
| **Ease of Use**     | **Very High.** "Batteries-included." You get a full app layout (`<v-app>`, `<v-main>`) from the start.           | **High.** Well-documented, but requires more manual composition. You build your own layout with `<Box>`, `<Container>`, etc. |
| **Customization**   | Good, but can be verbose. Uses SCSS variables and component "props" for styling.                                 | **Excellent.** The `sx` prop is a powerful "CSS-in-JS" shortcut. `ThemeProvider` allows deep, system-level customization.    |
| **Component Count** | **Massive.** Includes complex components like Data Tables, Calendars, and more out-of-the-box.                   | **Massive.** `MUI Core` has all the basics. `MUI X` (a separate package) adds complex Data Grids, Charts, etc.               |
| **State Handling**  | More "magic". Components like `<v-text-field>` often handle their own internal state (unless you use `v-model`). | More "explicit". You must control most component state (like text field values) with `useState`.                             |

### Final Verdict

- **Choose Vuetify if...** your priority is **speed**. You want to build a beautiful, full-featured Material Design app (like an admin panel or internal tool) _as fast as possible_.

- **Choose MUI if...** your priority is **customization**. You are building a large-scale React app and need deep, granular control over the look and feel while still using Material Design as a base.

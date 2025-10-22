Hour 3: Hands-On Use Case 3

Form Wizard with Validation

The Concept

Guide a user through a multi-step process, like a signup or checkout flow. We need to maintain the form's state across all steps and perform validation before allowing the user to proceed.

--

Core Technologies

Component-based State: Each step can be its own component.

Global State (Pinia/RTK): The perfect place to store the form data so it's accessible to all steps.

Schema Validation Library:

Zod: A modern, TypeScript-first schema declaration and validation library. Defines the "shape" of your data and provides parsing/validation.

Yup: An older, but still very popular, alternative.

--

Workshop Goal

Create a simple two-step form.

Store the data for both steps in a central Pinia/RTK store.

Use Zod to define a schema for the entire form.

Disable the "Next" button until the current step is valid.

Show validation errors to the user.

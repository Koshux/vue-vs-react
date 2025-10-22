Hour 1: Hands-On Use Case 1

E-commerce Micro-frontend

The Concept

Build separate, independently deployable apps for key e-commerce features (e.g., product listing, shopping cart, checkout) and compose them together into a single user experience.

--

Core Technologies

Module Federation: The underlying technology (popularized by webpack, also available in Vite) that allows separately bundled applications to share code and components at runtime.

Monorepo: Simplifies managing the different micro-frontend packages and any shared libraries.

--

Workshop Goal

We will scaffold two simple apps: products and cart.

The cart app will import and render a BuyButton component directly from the products app at runtime.

This demonstrates the power of decoupling teams and deployments.

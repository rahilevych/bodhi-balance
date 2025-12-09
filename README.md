# 🧘‍♀️ Bodhi Balance - Frontend

Welcome to the repository for the **frontend part** of the **Bodhi Balance** yoga studio website.

| Resource | Link |
| :--- | :--- |
| **Live Demo** | [Visit Bodhi Balance Live Site](https://bodhi-balance-back.onrender.com/) |
| **Backend Repository** | [Go to Backend Repo](https://github.com/rahilevych/bodhi-balance-back) |

## 🌟 Project Overview

The Bodhi Balance frontend is a **Single Page Application (SPA)** built with a focus on performance, reliability, and code cleanliness.

---

## 🛠️ Technologies

The project is built on a modern stack, leveraging **TypeScript** for strict typing and **React.js** for creating a dynamic user interface.

| Category | Technology |
| :--- | :--- |
| **Core Stack** | **React.js, TypeScript** |
| **State Management (UI)** | **Context API** |
| **State Management (Server)**| **TanStack Query** |
| **Styling** | **CSS Modules** |
| **Form Handling** | **React Hook Form, Zod** |
| **Testing** | **React Testing Library & Jest** |

---

## ✅ Key Features Implemented

The following key features and architectural solutions were implemented in the project:

* **User Authentication:** Fully implemented registration and login processes, including form validation.
* **Contact Form:** Created a contact form using **React Hook Form** and **Zod** 
* **Server State Management:** Utilized **TanStack Query** for **optimized caching**, background fetching, and **data synchronization** with the backend.
* **API Interaction:** Logic for fetching and displaying data from various backend endpoints.
* **Access Control:** Implementation of protected routes and user access control 
* **Responsive Design:** Applied Responsive Design principles to ensure correct rendering and usability across mobile and desktop devices.

---

## 🏗️ Code Structure

The project follows a **layered architecture** with a clear separation of concerns. The main directories within `src/` are:

| Folder | Purpose |
| :--- | :--- |
| `app` | Application configuration and routing. |
| `constants` | Global constants and configurations. |
| `context` | Global state management via Context API. |
| `features` | Feature/functional modules (e.g., `auth`, `pricing`). |
| `hooks` | Custom React Hooks. |
| `layouts` | Layout components (e.g., `Header`, `Footer`). |
| `pages` | Page-level components corresponding to routes. |
| `shared` | Reusable components that can be used throughout the application. |
| `styles` | Global styles, variables, mixins. |
| `types` | Global TypeScript types and interfaces. |
| `utils` | Utility, reusable functions. |

---

## 🚀 Getting Started

To run the project locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rahilevych/bodhi-balance/
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run in development mode:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will be available at `http://localhost:3000` (if the port is free).

---

## 🧪 Testing

Unit tests are implemented using **React Testing Library** and **Jest**.

To run the tests, use the command:

```bash
npm run test
# or
yarn test

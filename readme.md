# Book Store Application

This project is a full-stack book store application with a React frontend and a Node.js/Express backend.
## Demo

https://github.com/user-attachments/assets/92a684ea-160f-4a81-b177-cc85b2afd96d

## Table of Contents

* [Frontend](#frontend)
    * [Technologies Used](#frontend-technologies-used)
    * [Setup](#frontend-setup)
    * [Scripts](#frontend-scripts)
* [Backend](#backend)
    * [Technologies Used](#backend-technologies-used)
    * [Setup](#backend-setup)
    * [Scripts](#backend-scripts)
* [Getting Started](#getting-started)
* [Contributing](#contributing)
* [License](#license)

## Frontend

The frontend is built using React and Vite, providing a dynamic and responsive user interface for Browse and interacting with the book store.

### Technologies Used

* **React (v19.0.0):** A JavaScript library for building user interfaces.
* **React Router (v7.4.0):** For declarative routing in React applications, as library.
* **React Hook Form (v7.55.0):** For simple and robust form validation.
* **React Icons (v5.5.0):** A library of popular icons for React.
* **React Error Boundary (v5.0.0):** For catching JavaScript errors anywhere in their child component tree.
* **@tanstack/react-query (v5.69.0):** For fetching, caching, synchronizing and updating server state in React.
* **Axios (v1.8.4):** A promise-based HTTP client for making API requests.
* **Firebase (v11.5.0):** For authentication.
* **Chart.js (v4.4.8) & React-Chartjs-2 (v5.3.0):** For creating charts and graphs.
* **Swiper (v11.2.6):** A modern touch slider.
* **Tailwind CSS (v4.0.14):** A utility-first CSS framework for rapid UI development.
* **@tailwindcss/vite (v4.0.14):** Tailwind CSS integration with Vite.
* **Vite (v6.2.0):** A fast build tool and development server.
* **TypeScript (~5.7.2):** A typed superset of JavaScript.
* **Vitest (v3.1.1):** A fast unit test framework powered by Vite.
* **@testing-library/react (v16.3.0) & @testing-library/jest-dom (v6.6.3) & @testing-library/user-event (v14.6.1):** For testing React components.
* **ESLint (v9.21.0) & eslint-plugin-react-hooks (v5.1.0) & eslint-plugin-react-refresh (v0.4.19):** For code linting.

### Setup

1.  Navigate to the frontend directory: `cd front-end`
2.  Install dependencies: `npm install`
3.  Create a `.env.local` file in the frontend directory and add the following environment variables:

    ```
    VITE_API_KEY=<your_api_key>
    VITE_AUTH_DOMAIN=<your_auth_domain>
    VITE_PROJECT_ID=<your_project_id>
    VITE_STORAGE_BUCKET=<your_storage_bucket>
    VITE_MESSAGING_SENDER_ID=<your_messaging_sender_id>
    VITE_APP_ID=<your_app_id>
    VITE_API_URL=http://localhost:3030/api/v1
    ```

    Replace the `<your...>` placeholders with your actual Firebase project credentials.

### Scripts

* `dev`: Runs the development server using Vite.
* `test`: Runs unit tests using Vitest.
* `test:ui`: Opens the Vitest UI for interactive test watching.
* `build`: Builds the production-ready application using TypeScript and Vite.
* `lint`: Runs ESLint to check for code style issues.
* `preview`: Starts a local server to preview the production build.

### Testing

To run the unit tests, use the command: `npm run test` or `yarn test`. For an interactive UI, use: `npm run test:ui` or `yarn test:ui`.

## Backend

The backend is built using Node.js, Express, and MongoDB, providing the API endpoints for the frontend to interact with book data and other functionalities.

### Technologies Used

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express (v4.21.2):** A minimal and flexible Node.js web application framework.
* **Mongoose (v8.12.2):** An elegant MongoDB object modeling for Node.js.
* **Firebase Admin SDK (v13.2.0):** Enables interaction with Firebase services from the backend to vaildate the auth(token).
* **Cors (v2.8.5):** Provides Express middleware to enable CORS (Cross-Origin Resource Sharing).
* **Dotenv (v16.4.7):** Loads environment variables from a `.env` file.
* **Express Async Errors (v3.1.1):** Simplifies error handling in asynchronous Express routes.
* **Express Rate Limit (v7.5.0):** Basic rate-limiting middleware for Express.
* **Express XSS Sanitizer (v2.0.0):** Middleware to sanitize user input against XSS attacks.
* **Helmet (v8.1.0):** Helps secure Express apps by setting various HTTP headers.
* **TypeScript (v5.8.2):** A typed superset of JavaScript.
* **ESLint (v9.23.0):** For code linting.

### Setup

1.  Navigate to the backend directory: `cd back-end`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the backend directory and add the following environment variables:

    ```
    DB_URL=<your_mongodb_connection_string>
    GOOGLE_APPLICATION_CREDENTIALS=<path_to_your_google_credentials_json_file>
    CLIENT_URL=http://localhost:5173
    ```

    Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<path_to_your_google_credentials_json_file>` with the path to your Google Cloud service account credentials JSON file if you are using Firebase Admin SDK in a way that requires it.

### Scripts

* `start`: Starts the backend server using Node.js.
* `build`: Compiles the TypeScript code to JavaScript.
* `lint`: Runs ESLint to check for code style issues.

## Getting Started

1.  **Clone the repository:** `git clone https://github.com/Amr-Zain/book-store.git`
2.  **Navigate to the frontend directory:** `cd front-end`
3.  **Install frontend dependencies:** `npm install`
4.  **Create and configure the frontend environment variables** in a `.env.local` file as described in the [Frontend Setup](#frontend-setup) section.
5.  **Start the frontend development server:** `npm run dev` or `yarn dev`
6.  **Open a new terminal and navigate to the backend directory:** `cd back-end`
7.  **Install backend dependencies:** `npm install` 
8.  **Create and configure the backend environment variables** in a `.env` file as described in the [Backend Setup](#backend-setup) section.
9.  **Build the backend:** `npm run build` 
10. **Start the backend server:** `npm start` 

The frontend application will typically be accessible at `http://localhost:5173`, and the backend API will be running at `http://localhost:3030/api/v1`.



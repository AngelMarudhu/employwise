React User Management App

🚀 Live Demo

Deployed On Netlify:

# Project Overview

This is a React-based user management application that interacts with the Reqres API includes authentication user listing and CRUD (Create, Read, Update, Delete) operations and filtering functionality for admins for optimizing we've used React Router for navigation and Redux for state management and lazy loading for better performance and debounce function for optimizing the search functionality

# Featues

1. User Authentication (Login with API authentication)

2. User List (Paginated list of users from API)

3. Edit User (Update user details via API)

4. Delete User (Remove user via API)

5. Search & Filtering (Client-side search by first name) Bonus Features

6. State Management (Redux Toolkit used for managing global state)

7. Error Handling and Validation (Handles API failures gracefully)

8. Persisted Login (Token stored in local storage for session management)

9. Routing (Navigation between Login, User List, and Edit User pages)

10. Deployment (Hosted on Netlify)

# API Endpoints Used

Login: POST /api/login

Get Users: GET /api/users?page=1

Update User: PUT /api/users/{id}

Delete User: DELETE /api/users/{id}

# Getting Started

1. Clone the repository
2. Install dependencies npm install
3. Start the development server npm run dev
4. Open your browser and navigate to http://localhost:5173

# Tech Stack

Frontend: Reactjs, Redux Toolkit, Tailwind CSS

State Management: Redux Toolkit

HTTP Requests: Axios

Routing: React Router

Deployment: Netlify

Notifications: React Toastify

Api: Reqres API

Optimization: Lazy Loading, Debounce Function

# Folder Structure

📦 src
Components # Reusable UI components (ProtecteddRoute, Pagination, EditUser)
Redux # State management files
Pages # Page-level components
Features # API calls & business logic
App.js # Main React component
index.js # Entry point

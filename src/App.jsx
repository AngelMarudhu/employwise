import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // in future we can add more RBAC system with just pass as a role props the protected route will take care of it
            <ProtectedRoute authRequired={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute authRequired={true}>
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

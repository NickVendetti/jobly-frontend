import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyList from "./pages/CompanyList";
import JobList from "./pages/JobList";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProfileForm from "./pages/ProfileForm";
import PrivateRoute from "./components/PrivateRoute";  // ✅ Ensure it's imported
import NotFound from "./pages/NotFound";

function AppRoutes({ currentUser, login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      {/* 🔒 Protect these routes */}
      <Route 
        path="/companies" 
        element={
          <PrivateRoute currentUser={currentUser}>
            <CompanyList />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/companies/:handle" 
        element={
          <PrivateRoute currentUser={currentUser}>
            <CompanyDetail />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/jobs" 
        element={
          <PrivateRoute currentUser={currentUser}>
            <JobList />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute currentUser={currentUser}>
            <ProfileForm />
          </PrivateRoute>
        } 
      />

      {/* Redirect unknown routes to NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
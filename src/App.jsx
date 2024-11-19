import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthenticatedLayout from './layout/AuthenticatedLayout.jsx';

import UserLogin from './components/jwt_login/Login_page.jsx';

import Dashboard from './pages/dashboard/Dashboard.jsx';

import OfficeMas from './pages/officeMaster/Office.jsx';
import UpdateOffice from './pages/officeMaster/UpdateOffice.jsx';
import AddOffice from './pages/officeMaster/AddOffice.jsx';

import RoleMaster from './pages/roleMaster/Role.jsx';
import UpdateRole from './pages/roleMaster/UpdateRole.jsx';
import AddRole from './pages/roleMaster/AddRole.jsx';

import FunMaster from './pages/functionMaster/FunMaster.jsx';
import AddFunMaster from './pages/functionMaster/AddFunMaster.jsx';
import UpdateFunMas from './pages/functionMaster/UpdateFunMas.jsx';

import FunMapp from './pages/functionMapping/FunMapp.jsx';
import ViewUserFunction from './pages/functionMapping/ViewFunMapp.jsx';

import UserMaster from './pages/userMaster/User.jsx';
import UpdateUser from './pages/userMaster/UpdateUser.jsx';
import AddUser from './pages/userMaster/AddUser.jsx';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <UserLogin />}
        />

        {/* Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <Dashboard />
            </AuthenticatedLayout>
          }
        />

        {/* Office Management */}
        <Route
          path="/offmas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <OfficeMas />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/update_office"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <UpdateOffice />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/add_office"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <AddOffice />
            </AuthenticatedLayout>
          }
        />

        {/* Role Management */}
        <Route
          path="/rolemas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <RoleMaster />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/add_role"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <AddRole />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/update_role"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <UpdateRole />
            </AuthenticatedLayout>
          }
        />

        {/* Function Management */}
        <Route
          path="/funmas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <FunMaster />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/add_funmas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <AddFunMaster />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/update_funmas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <UpdateFunMas />
            </AuthenticatedLayout>
          }
        />

        {/* Function Mapping */}
        <Route
          path="/funmap"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <FunMapp />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/see_view/:id"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <ViewUserFunction />
            </AuthenticatedLayout>
          }
        />

        {/* User Management */}
        <Route
          path="/usermas"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <UserMaster />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/update_user"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <UpdateUser />
            </AuthenticatedLayout>
          }
        />
        <Route
          path="/add_user"
          element={
            <AuthenticatedLayout
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              isAuthenticated={isAuthenticated}
            >
              <AddUser />
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

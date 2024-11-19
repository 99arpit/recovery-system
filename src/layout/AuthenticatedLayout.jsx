import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/header/navbar.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';

const AuthenticatedLayout = ({ children, isOpen, toggleSidebar, isAuthenticated }) => {
  if (!isAuthenticated) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main d-flex">
        <div className="sidebarWrapper">
          <Sidebar isOpen={isOpen} />
        </div>
        <div className="content w-100">{children}</div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;

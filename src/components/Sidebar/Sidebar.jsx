import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} bg-white border-end vh-100 p-3`}>
      <ul className="list-unstyled mt-4">
        <li className="my-2">
          <Link to="/dashboard" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-house me-2 fs-4 "></i> Dashboard
            </Button>
          </Link>
        </li>
        <li className="my-2">
          <Link to="/usermas" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-people me-2 fs-4"></i> User Master
            </Button>
          </Link>
        </li>
        <li className="my-2">
          <Link to="/offmas" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-building me-2 fs-4"></i> Office Master
            </Button>
          </Link>
        </li>
        {/* <li className="my-2">
          <Link to="/rolemas" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-person-badge me-2"></i> Role Master
            </Button>
          </Link>
        </li> */}
        <li className="my-2">
          <Link to="/funmas" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-gear me-2 fs-4"></i> Function Master
            </Button>
          </Link>
        </li>
        <li className="my-2">
          <Link to="/funmap" className="text-decoration-none">
            <Button
              fullWidth
              variant="text"
              className="text-dark fw-bold text-start fs-6 d-flex align-items-center"
            >
              <i className="bi bi-diagram-2 me-2 fs-4"></i> User Function Mapping
            </Button>
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;

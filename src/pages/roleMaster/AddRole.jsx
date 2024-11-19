import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRole = () => {
  const [roleType, setRoleType] = useState('');
  const [status, setStatus] = useState('Active'); // Set default status to 'Active'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        id: 1, // Add id here
        role_type: roleType,
        status: status === 'Active' ? 1 : 0, // Map status to numeric (1 or 0)
      };

      // Ensure the API endpoint is correct
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/add_role_master`, newData);

      if (response.status === 200 || response.status === 201) {
        navigate('/rolemas');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError('Failed to add data');
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '650px', width: '650px' }}>
      <div className="card p-4" style={{ width: '100%' }}>
        <h2 className="mb-3 text-center">Add New Role</h2> {/* Change to Add New Role */}
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="roleType" className="form-label">Role Type</label>
              <input
                type="text"
                id="roleType"
                className="form-control"
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Role</button> {/* Change button text */}
        </form>
      </div>
    </div>
  );
};

export default AddRole;

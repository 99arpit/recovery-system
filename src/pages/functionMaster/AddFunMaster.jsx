import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFunMaster = () => {
  const [functionName, setFunctionName] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = { function_name: functionName, department, status };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/add_function`, newData);
  
      // Check for a successful response (200 or 201)
      if (response.status === 200 || response.status === 201) {
        console.log("Navigation triggered");
        navigate('/funmas');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError('Failed to add data');
      console.error('Error adding data:', error);
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '350px' }}>
        <h2 className="mb-3 text-center">Add New Function</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="functionName" className="form-label">Function Name</label>
            <input
              type="text"
              id="functionName"
              className="form-control"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              id="department"
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
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
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Function</button>
        </form>
      </div>
    </div>
  );
};

export default AddFunMaster;

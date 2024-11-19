import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatefunmas } from '../../APICall/PostAPI';

const UpdateFunMas= () => {
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.office) {
      const office = location.state.office;
      setRole(office.role_type); 
      setStatus(office.status);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = {
      role_type: role, // Use role instead of role_type
      status,
    };

    try {
      const response = await updatefunmas(location.state.office.id, update); // Use updated name here
      if (response.status === 200) {
        navigate('/funmas');
      } else {
        setError(`Update failed: ${response.statusText}`);
      }
    } catch (error) {
      setError('Failed to update data');
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '650px', width: '650px' }}>
      <div className="card p-4" style={{ width: '100%' }}>
        <h2 className="mb-3 text-center">Update Function Master</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="role" className="form-label">Function Name</label>
              <input
                type="text"
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="role" className="form-label">Department</label>
              <input
                type="text"
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Function</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFunMas
;

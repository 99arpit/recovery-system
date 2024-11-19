import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOffice = () => {
  const [name, setName] = useState('');
  const [officeCode, setOfficeCode] = useState('');
  const [officeType, setOfficeType] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [officeId, setOfficeId] = useState(null); // State to store the office_id
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    const newData = {
      name,
      office_code: officeCode,
      office_type: officeType,
      mobile_no: mobileNo,
      email,
      city,
      state,
      district,
      pincode,
      address,
      status: status === 'Active' ? 1 : 0, // Convert to numeric status if required
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/add_office`, newData);

      if (response.status === 200 && response.data.success) {
        const officeIdFromResponse = response.data.data.office_id;
        setOfficeId(officeIdFromResponse); // Save office_id to state
        console.log('Office added successfully with ID:', officeIdFromResponse);

        // Navigate to another page or clear the form
        navigate('/offmas');
      } else {
        throw new Error(response.data.message || 'Failed to add office.');
      }
    } catch (error) {
      console.error('Error adding office:', error);
      setError(error.response?.data?.message || 'Failed to add office.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '700px', width: '700px' }}>
      <div className="card p-4" style={{ width: '100%' }}>
        <h2 className="mb-3 text-center">Add New Office</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {officeId && <p className="text-success text-center">Office added successfully! ID: {officeId}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="officeCode" className="form-label">Office Code</label>
              <input
                type="text"
                id="officeCode"
                className="form-control"
                value={officeCode}
                onChange={(e) => setOfficeCode(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="officeType" className="form-label">Office Type</label>
              <input
                type="text"
                id="officeType"
                className="form-control"
                value={officeType}
                onChange={(e) => setOfficeType(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileNo" className="form-label">Mobile No</label>
              <input
                type="text"
                id="mobileNo"
                className="form-control"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                id="state"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="district" className="form-label">District</label>
              <input
                type="text"
                id="district"
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input
                type="text"
                id="pincode"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
          <button type="submit" className="btn btn-primary w-100">Add Office</button>
        </form>
      </div>
    </div>
  );
};

export default AddOffice;

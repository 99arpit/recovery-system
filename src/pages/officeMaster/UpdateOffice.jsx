import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateOffice } from '../../APICall/PostAPI';

const UpdateOffice = () => {
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.office) {
      const office = location.state.office;
      setName(office.name);
      setOfficeCode(office.office_code);
      setOfficeType(office.office_type);
      setMobileNo(office.mobile_no);
      setEmail(office.email);
      setCity(office.city);
      setState(office.state);
      setDistrict(office.district);
      setPincode(office.pincode);
      setAddress(office.address);
      setStatus(office.status);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const update = {
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
      status,
    };
    try {
        const response = await updateOffice(location.state.office.id, update);
        if (response.status === 200) {
        navigate('/offmas');
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
        <h2 className="mb-3 text-center">Update Office</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="officeCode" className="form-label">Office Code</label>
              <input type="text" id="officeCode" className="form-control" value={officeCode} onChange={(e) => setOfficeCode(e.target.value)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="officeType" className="form-label">Office Type</label>
              <input type="text" id="officeType" className="form-control" value={officeType} onChange={(e) => setOfficeType(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="mobileNo" className="form-label">Mobile No</label>
              <input type="text" id="mobileNo" className="form-control" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" id="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" id="state" className="form-control" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="district" className="form-label">District</label>
              <input type="text" id="district" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input type="text" id="pincode" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Office</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateOffice;

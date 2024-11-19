import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../../APICall/PostAPI';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.office) {
            const office = location.state.office;
            setName(office.name);
            setEmail(office.email);
            setMobileNo(office.mobile_no);
            setUsername(office.user_name);
            setStatus(office.status);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const update = {
            name,
            email,
            mobile_no: mobileNo,
            user_name: username,
            status,
        };
        try {
            const response = await updateUser(location.state.office.id, update);
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
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                            <input type="text" id="mobileNo" className="form-control" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
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

export default UpdateUser;

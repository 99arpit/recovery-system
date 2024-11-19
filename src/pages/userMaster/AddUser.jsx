import React, { useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate, useParams } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Destructure for clarity
    const [status, setStatus] = useState(false);
    const [dobDate, setDobDate] = useState(new Date());

    const [formData, setFormData] = useState({
        dataid: null,
        eid: "",
        user_role_type: "",
        name: "",
        mobile: "",
        email: "",
        dob: "",
        aadhar_no: "",
        password: "",
        home_city: "",
        home_state: "",
        home_district: "",
        home_pincode: "",
        home_local_address: "",
        city: "",
        state: "",
        district: "",
        pincode: "",
        current_local_address: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                try {
                    const response = await axios.post('/api/view_user', { id });
                    if (response.data.data && response.data.success === true) {
                        const userData = response.data.data[0];
                        setFormData({ ...userData, dataid: id });
                        setStatus(true);
                        setDobDate(userData.dob ? new Date(userData.dob) : new Date());
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    alert('Failed to load user data.');
                }
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === 'checkbox') {
            newValue = checked;
        }
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update dob in formData before submission
        const updatedFormData = {
            ...formData,
            dob: dobDate.toISOString(), // Adjust format as needed
        };

        try {
            let response;

            if (id) {
                // Update user API
                response = await axios.post('/api/update_user', updatedFormData);
                console.log('Update User Response:', response);

                if (response.status === 200 && response.data.success === true) {
                    alert('User updated successfully');
                    navigate(`/add_user/${id}`); // Corrected template literal
                } else if (response.status === 200 && response.data.success === false) {
                    alert('User not updated successfully');
                    navigate(`/add_user/${id}`);
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`); // Corrected syntax
                }
            } else {
                // Add user API
                response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/add_user`, updatedFormData);
                console.log('Add User Response:', response);

                if (response.status === 200 && response.data.success === true) {
                    alert('User added successfully');
                    navigate("/user"); // Corrected template literal
                } else if (response.status === 200 && response.data.success === false) {
                    alert('User already exists.');
                    navigate(`/user`);
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`); // Corrected syntax
                }
            }
        } catch (error) {
            console.error('Error occurred during form submission:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleDobChange = (date) => {
        setDobDate(date);
        setFormData((prevData) => ({
            ...prevData,
            dob: date.toISOString(), // Ensure dob is updated in formData
        }));
    };

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h4>User Form</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" id="dataid" name="dataid" value={formData.dataid} />
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td><label htmlFor="eid">EID</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="eid"
                                                className="form-control"
                                                name="eid"
                                                value={formData.eid}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="user_role_type">User Role Type</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="user_role_type"
                                                className="form-control"
                                                name="user_role_type"
                                                value={formData.user_role_type}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="name">Name</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="mobile">Mobile</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="mobile"
                                                className="form-control"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="email">Email</label></td>
                                        <td>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="aadhar_no">Aadhar No.</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="aadhar_no"
                                                className="form-control"
                                                name="aadhar_no"
                                                value={formData.aadhar_no}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="dob">Date of Birth</label></td>
                                        <td>
                                            <DatePicker
                                                selected={dobDate}
                                                onChange={handleDobChange}
                                                dateFormat="dd-MM-yyyy"
                                                className="form-control"
                                                name="dob"
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="home_city">Home City</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="home_city"
                                                className="form-control"
                                                name="home_city"
                                                value={formData.home_city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="home_state">Home State</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="home_state"
                                                className="form-control"
                                                name="home_state"
                                                value={formData.home_state}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="home_district">Home District</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="home_district"
                                                className="form-control"
                                                name="home_district"
                                                value={formData.home_district}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="home_pincode">Home Pincode</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="home_pincode"
                                                className="form-control"
                                                name="home_pincode"
                                                value={formData.home_pincode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="home_local_address">Home Local Address</label></td>
                                        <td>
                                            <textarea
                                                id="home_local_address"
                                                className="form-control"
                                                name="home_local_address"
                                                value={formData.home_local_address}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="city">City</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="city"
                                                className="form-control"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="state">State</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="state"
                                                className="form-control"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="district">District</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="district"
                                                className="form-control"
                                                name="district"
                                                value={formData.district}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td><label htmlFor="pincode">Pincode</label></td>
                                        <td>
                                            <input
                                                type="text"
                                                id="pincode"
                                                className="form-control"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor="current_local_address">Current Local Address</label></td>
                                        <td>
                                            <textarea
                                                id="current_local_address"
                                                className="form-control"
                                                name="current_local_address"
                                                value={formData.current_local_address}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </td>
                                        {status ? (
                                            <>
                                                <td><label htmlFor="status">Status</label></td>
                                                <td>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="active"
                                                            name="status"
                                                            value="1"
                                                            checked={formData.status === 1 || formData.status === "1"}
                                                            onChange={handleChange}
                                                        />
                                                        <label
                                                            htmlFor="active"
                                                            style={{ color: formData.status === 1 || formData.status === "1" ? 'green' : 'black', fontWeight: 'bold' }}
                                                        >
                                                            Active
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="inactive"
                                                            name="status"
                                                            value="0"
                                                            checked={formData.status === 0 || formData.status === "0"}
                                                            onChange={handleChange}
                                                            style={{ marginLeft: "20px" }}
                                                        />
                                                        <label
                                                            htmlFor="inactive"
                                                            style={{ color: formData.status === 0 || formData.status === "0" ? 'red' : 'black', fontWeight: 'bold' }}
                                                        >
                                                            Inactive
                                                        </label>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td><label htmlFor="password">Password</label></td>
                                                <td>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </td>
                                            </>
                                        )}
                                    </tr>

                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <button type="submit" className="btn btn-primary">
                                                {id ? 'Update' : 'Submit'}
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;


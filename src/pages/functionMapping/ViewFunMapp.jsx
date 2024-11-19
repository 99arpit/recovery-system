import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const ViewUserFunction = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Using destructuring for params.id

    const [assignedFunctions, setAssignedFunctions] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (id) {
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/get_user_function`, { user_id: id });
                    if (response.data.success) {
                        setAssignedFunctions(response.data.data);
                        setUserInfo(response.data.user[0]);
                    } else {
                        setAssignedFunctions([]);
                        setUserInfo({});
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleEdit = () => {
        navigate(`/add_user/${id}`);
    };

    const handleDelete = async (functionId) => {
        if (window.confirm("Are you sure you want to delete this function?")) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/delete_user_function`, { id: functionId });
                if (response.data.success) {
                    alert("Function deleted successfully.");
                    setAssignedFunctions((prev) => prev.filter((func) => func.id !== functionId));
                } else {
                    alert("Failed to delete function.");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting function.");
            }
        }
    };

    const handleChange = async (e, functionId, funcIndex) => {
        const newStatus = e.target.checked ? 1 : 0;

        if (window.confirm('Do you want to change status?')) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/update_user_assign_function`, {
                    id: functionId,
                    user_id: id,
                    function_id: functionId,
                    status: newStatus,
                });

                if (response.data.success) {
                    alert('Status updated successfully.');
                    setAssignedFunctions((prevFunctions) =>
                        prevFunctions.map((func, index) =>
                            index === funcIndex ? { ...func, status: newStatus } : func
                        )
                    );
                } else {
                    alert('Failed to update status');
                }
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Error updating status');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card mt-4">
                        <div className="card-header" >
                            <h4 className="mb-4">User Details</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{userInfo?.name || 'N/A'}</td>
                                        <th>Username</th>
                                        <td>{userInfo?.username || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{userInfo?.email || 'N/A'}</td>
                                        <th>Mobile</th>
                                        <td>{userInfo?.mobile || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-4">Assigned Functions</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>Function Name</th>
                                        <th>Status</th>
                                        <th>Assigned At</th>
                                        <th>Change Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedFunctions.length > 0 ? (
                                        assignedFunctions.map((func, index) => (
                                            <tr key={func.id}>
                                                <td>{index + 1}</td>
                                                <td>{func.function_name}</td>
                                                <td>
                                                    <span className={`badge bg-${func.status === 1 ? 'success' : 'danger'}`}>
                                                        {func.status === 1 ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>{new Date(func.created_at).toLocaleString()}</td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`statusSwitch${func.id}`}
                                                            checked={func.status === 1}
                                                            onChange={(e) => handleChange(e, func.id, index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <MdDelete
                                                        className="text-danger"
                                                        onClick={() => handleDelete(func.id)}
                                                        style={{ cursor: 'pointer', fontSize: 20 }}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No functions assigned.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserFunction;

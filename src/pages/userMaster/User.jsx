import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { userDelete } from '../../APICall/PostAPI';
import DeletePopup from '../../components/popup/DeletePopup';

const UserMas = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/get_all_user`);
        if (response.status === 200) {
          setUserData(response.data.data || []);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        setError(error.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => navigate('/add_user');

  const confirmDelete = (userId) => {
    setSelectedUser(userId);
    setShowPopup(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    setDeleting(true);
    try {
      const res = await userDelete(selectedUser);
      if (res.status === 200) {
        setUserData((prevData) => prevData.filter((user) => user.id !== selectedUser));
        setShowPopup(false);
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setError("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (user) => navigate('/update_user', { state: { user } });

  // Pagination calculations
  const totalItems = userData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = userData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>User Master Data</h5>
            </div>
            <div className="card-body">
              <div className="mb-1 mt-1">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Data
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Username</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : currentData.length > 0 ? (
                      currentData.map((user, index) => (
                        <tr key={user.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>{user.username}</td>
                          <td>
                            <span
                              className={`badge ${
                                user.status === 1 ? 'bg-success' : 'bg-danger'
                              }`}
                            >
                              {user.status === 1 ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleEdit(user)}
                              >
                                <CiEdit />
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => confirmDelete(user.id)}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No user data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-success"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-success"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <DeletePopup
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        handleConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  );
};

export default UserMas;

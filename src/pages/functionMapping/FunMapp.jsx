import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrView } from "react-icons/gr";

const Funmas = () => {
  const [userData, setUserData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Number of items per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/get_all_assign_function`);

        if (response.status === 200 && response.data && Array.isArray(response.data.data)) {
          setUserData(response.data.data);
        } else {
          setUserData([]);
          setError("No user data available.");
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          setError("Network Error: Unable to reach the server.");
        } else {
          setError(error.message);
        }
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    navigate('/add_user');
  };

  const handleView = (user_id = null) => {
    navigate(`/see_view/${user_id}`);
  };

  // Pagination Logic
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>User Data</h5>
            </div>
            <div className="card-body">
              <div className="mt-0 mb-1">
                <button onClick={handleAdd} className="btn btn-primary">Add New</button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Username</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((user, index) => (
                        <tr key={user.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{user.user_name}</td>
                          <td>{user.created_at}</td>
                          <td>
                            {user.status === 1 ? (
                              <span className="badge bg-danger">Inactive</span>
                            ) : (
                              <span className="badge bg-success">Active</span>
                            )}
                          </td>
                          <td>
                            <div className="action-btn">
                              <span
                                className="action-btn-edit text-primary"
                                onClick={() => handleView(user.user_id)}
                                style={{ cursor: 'pointer', fontSize: 20 }}
                              >
                                <GrView />
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                          No user data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funmas;

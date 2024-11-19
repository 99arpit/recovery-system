import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../APICall/PostAPI';
import DeletePopup from '../../components/popup/DeletePopup'; // Import popup component

const FunMaster = () => {
  const [officeData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Set the number of items per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/get_all_function`
        );
        if (response.status === 200) {
          const { data } = response.data;
          setOfficeData(Array.isArray(data) ? data : []);
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedOffice) return;

    setDeleting(true);
    try {
      const res = await deletePost(selectedOffice.id);
      setOfficeData((prevData) =>
        prevData.filter((item) => item.id !== selectedOffice.id)
      );
      setShowPopup(false);
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete function.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (office) => {
    navigate('/update_funmas', { state: { office } });
  };

  const handleAdd = () => {
    navigate('/add_funmas');
  };

  const confirmDelete = (office) => {
    setSelectedOffice(office);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedOffice(null);
  };

  // Pagination logic
  const totalItems = officeData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = officeData.slice(indexOfFirstItem, indexOfLastItem);

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
              <h5>Function Master Data</h5>
            </div>
            <div className="card-body">
              <div className="mt-0 mb-1">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Data
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Function Name</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((office, index) => (
                        <tr key={office.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{office.function_name}</td>
                          <td>{office.department}</td>
                          <td>
                            <span
                              className={`badge ${
                                office.status === 1 ? 'bg-danger' : 'bg-success'
                              }`}
                            >
                              {office.status === 1 ? 'Inactive' : 'Active'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-primary btn-md"
                                onClick={() => handleEdit(office)}
                              >
                                <CiEdit />
                              </button>
                              <button
                                className="btn btn-outline-danger btn-md"
                                onClick={() => confirmDelete(office)}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No function data available
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

      {/* Delete Confirmation Popup */}
      <DeletePopup
        show={showPopup}
        handleClose={closePopup}
        handleConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  );
};

export default FunMaster;

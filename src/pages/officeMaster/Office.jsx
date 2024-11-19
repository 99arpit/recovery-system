import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteoffice } from '../../APICall/PostAPI';
import DeletePopup from '../../components/popup/DeletePopup';

const OfficeMas = () => {
  const [officeData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/get_all_office`);
        if (response.status === 200 && response.data.data) {
          setOfficeData(response.data.data);
        } else {
          setOfficeData([]);
          setError("Failed to fetch office data.");
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          setError("Network Error: Unable to reach the server.");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => navigate('/add_office');

  const confirmDelete = (office) => {
    setSelectedOffice(office);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedOffice(null);
  };

  const handleDelete = async () => {
    if (!selectedOffice) return;

    setDeleting(true);
    try {
      const res = await deleteoffice(selectedOffice.id);
      if (res.status === 200) {
        setOfficeData((prevData) => prevData.filter((item) => item.id !== selectedOffice.id));
        closePopup();
      } else {
        setError("Failed to delete the office");
      }
    } catch (error) {
      setError("Failed to delete the office");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (office) => navigate('/update_office', { state: { office } });

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
              <h5>Office Data</h5>
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
                      <th>Name</th>
                      <th>Office Code</th>
                      <th>Office Type</th>
                      <th>Mobile No</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>State</th>
                      <th>District</th>
                      <th>Pincode</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((office, index) => (
                        <tr key={office.id}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>{office.name}</td>
                          <td>{office.office_code}</td>
                          <td>{office.office_type}</td>
                          <td>{office.mobile_no}</td>
                          <td>{office.email}</td>
                          <td>{office.city}</td>
                          <td>{office.state}</td>
                          <td>{office.district}</td>
                          <td>{office.pincode}</td>
                          <td>{office.address}</td>
                          <td>
                            <span
                              className={`badge ${
                                office.status === 1 ? 'bg-success' : 'bg-danger'
                              }`}
                            >
                              {office.status === 1 ? 'Active' : 'Inactive'}
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
                        <td colSpan="13" className="text-center">
                          No office data available
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
                <span>Page {currentPage} of {totalPages}</span>
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
      <DeletePopup
        show={showPopup}
        handleClose={closePopup}
        handleConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  );
};

export default OfficeMas;

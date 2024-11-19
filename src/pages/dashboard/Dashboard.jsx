import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 3; // Number of records per page

  // Example data
  const data = {
    male: {
      records: [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Mike Smith', age: 25 },
        { id: 3, name: 'Tom Brown', age: 35 },
        { id: 4, name: 'Alex Johnson', age: 28 },
      ],
    },
    female: {
      records: [
        { id: 1, name: 'Jane Doe', age: 28 },
        { id: 2, name: 'Emily Johnson', age: 22 },
        { id: 3, name: 'Sarah Parker', age: 30 },
        { id: 4, name: 'Anna Davis', age: 27 },
        { id: 5, name: 'Nina Wilson', age: 26 },
      ],
    },
  };

  const totalMale = data.male.records.length;
  const totalFemale = data.female.records.length;

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setCurrentPage(1); // Reset to the first page when a gender is selected
  };

  const closePopup = () => {
    setSelectedGender(null);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data[selectedGender].records.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Determine records to display based on the current page
  const currentRecords = selectedGender
    ? data[selectedGender].records.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="container mt-5 text-center">
      <h3>Gender Distribution</h3>
      <div
        className="position-relative mt-4 d-inline-block"
        style={{ width: '200px', height: '200px' }}
      >
        {/* Circular graph */}
        <svg viewBox="0 0 36 36" className="circular-chart">
          {/* Female segment */}
          <path
            className="circle"
            style={{
              stroke: '#28a745',
              strokeWidth: '4',
              fill: 'none',
            }}
            strokeDasharray={`${(totalFemale / (totalMale + totalFemale)) * 100}, 100`}
            d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Male segment */}
          <path
            className="circle"
            style={{
              stroke: '#007bff',
              strokeWidth: '4',
              fill: 'none',
            }}
            strokeDasharray={`${(totalMale / (totalMale + totalFemale)) * 100}, 100`}
            strokeDashoffset={`-${(totalFemale / (totalMale + totalFemale)) * 100}`}
            d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <div className="position-absolute top-50 start-50 translate-middle">
          <p className="fw-bold text-primary">Male: {totalMale}</p>
          <p className="fw-bold text-success">Female: {totalFemale}</p>
        </div>
      </div>

      {/* Buttons for selection */}
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => handleSelectGender('male')}>
          View Male Records
        </button>
        <button className="btn btn-success" onClick={() => handleSelectGender('female')}>
          View Female Records
        </button>
      </div>

      {/* Popup for selected gender */}
      {selectedGender && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)} Records
                </h5>
                <button type="button" className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="modal-body">
                <table className="table table-striped ">
                  <thead>
                    <tr className='table-primary'>
                      <th>#</th>
                      <th>Name</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.name}</td>
                        <td>{record.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <FaArrowLeft />
                  </button>
                  <span>
                    Page {currentPage} of {Math.ceil(data[selectedGender].records.length / itemsPerPage)}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(data[selectedGender].records.length / itemsPerPage)}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

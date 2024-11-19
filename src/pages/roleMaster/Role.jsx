import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleterole } from '../../APICall/PostAPI';

const RoleMaster = () => {
  const [officeData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/get_all_role`);
        if (response.status === 200) {
          setOfficeData(response.data.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAdd = () => {
    navigate('/add_role');
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleterole(id);
      setOfficeData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setError('Failed to delete role');
    }
  };

  const handleEdit = (office) => {
    navigate('/update_role', { state: { office } });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Role Data</h5>
            </div>
            <div className="card-body">
              <div className="mt-0 mb-1">
                <button className="btn btn-primary" onClick={handleAdd}>Add Data</button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>S.No</th>
                      <th>Role Type</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {officeData.length > 0 ? (
                      officeData.map((office, index) => (
                        <tr key={office.id}>
                          <td>{index + 1}</td>
                          <td>{office.role_type}</td>
                          <td>
                            <span className={`badge ${office.status === 1 ? 'bg-danger' : 'bg-success'}`}>
                              {office.status === 1 ? 'Inactive' : 'Active'}
                            </span>
                          </td>
                          <td>{office.created_at}</td>
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
                                onClick={() => handleDelete(office.id)}
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No role data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMaster;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.png';

const UserLogin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user_login`, {
            username: username,
            password: password,
        });

        console.log('Login response:', response.data);

        const { status, success, message, data } = response.data;

        if (status === 200 && success && data) {
            // Save token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            // Update authentication state
            setIsAuthenticated(true);

            // Redirect to the dashboard
            navigate('/dashboard');
        } else {
            setErrorMessage(message || 'Invalid username or password.');
        }
    } catch (error) {
        setErrorMessage('An error occurred during login.');
        console.error('Login error:', error);
    }
};


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="row w-100">
        <div className="col-12 col-md-6 mx-auto">
          {/* Login Card */}
          <div className="card shadow p-4 rounded">
            {/* Logo Section */}
            <div className="text-center mb-4">
              <img className="img-fluid" src={logo} width={200} alt="Logo" />
            </div>

            {/* Login Form Section */}
            <h2 className="mb-4 text-center">User Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Login</button>
              {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

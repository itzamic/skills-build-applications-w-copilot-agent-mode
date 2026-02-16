import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching Users from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Users list:', usersList);
        
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-dark">👥 Users</h1>
          <p className="lead text-muted">Manage and view all registered users</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <span className="badge bg-info fs-6">Total: {users.length}</span>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No users found</strong> - There are currently no users in the system.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-sm table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-primary">{user.id}</span>
                      </td>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="link-primary text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>{user.first_name || '-'}</td>
                      <td>{user.last_name || '-'}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-info me-2" title="View Details">
                          👁️
                        </button>
                        <button className="btn btn-sm btn-outline-warning" title="Edit">
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

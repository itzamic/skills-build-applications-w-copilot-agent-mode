import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching Activities from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Activities list:', activitiesList);
        
        setActivities(activitiesList);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading activities...</div>
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
          <h1 className="display-5 fw-bold text-dark">⚡ Activities</h1>
          <p className="lead text-muted">Track and monitor all fitness activities</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <span className="badge bg-success fs-6">Total: {activities.length}</span>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No activities found</strong> - Start logging your fitness activities now!
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
                    <th scope="col">Activity Type</th>
                    <th scope="col">User</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => {
                    let activityBadge = 'bg-primary';
                    if (activity.activity_type === 'Running') activityBadge = 'bg-danger';
                    if (activity.activity_type === 'Cycling') activityBadge = 'bg-info';
                    if (activity.activity_type === 'Swimming') activityBadge = 'bg-primary';
                    if (activity.activity_type === 'Yoga') activityBadge = 'bg-warning';

                    return (
                      <tr key={activity.id}>
                        <td>
                          <span className="badge bg-secondary">{activity.id}</span>
                        </td>
                        <td>
                          <span className={`badge ${activityBadge}`}>
                            {activity.activity_type}
                          </span>
                        </td>
                        <td>
                          <strong>{activity.user}</strong>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">{activity.duration} min</span>
                        </td>
                        <td>
                          <span className="badge bg-warning text-dark">{activity.calories_burned} cal</span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(activity.created_at || activity.date).toLocaleDateString()}
                          </small>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary me-2" title="View Details">
                            👁️
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete">
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;

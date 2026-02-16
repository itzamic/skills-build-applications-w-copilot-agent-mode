import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching Workouts from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Workouts list:', workoutsList);
        
        setWorkouts(workoutsList);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading workouts...</div>
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

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return <span className="badge bg-secondary">Unknown</span>;
    const diff = difficulty.toLowerCase();
    if (diff === 'easy') return <span className="badge bg-success">🟢 Easy</span>;
    if (diff === 'medium') return <span className="badge bg-warning text-dark">🟡 Medium</span>;
    if (diff === 'hard') return <span className="badge bg-danger">🔴 Hard</span>;
    return <span className="badge bg-secondary">{difficulty}</span>;
  };

  return (
    <div className="container-fluid py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-dark">💪 Personalized Workout Suggestions</h1>
          <p className="lead text-muted">Achieve your fitness goals with custom workouts</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <button className="btn btn-success me-2" title="Add Workout">
            + Add Workout
          </button>
          <span className="badge bg-success fs-6">Available: {workouts.length}</span>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No workouts found</strong> - Start exploring personalized workout suggestions!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-lg-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-header bg-gradient text-white py-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title mb-1 fw-bold">{workout.name || workout.title}</h5>
                      <span className="badge bg-light text-dark">ID: {workout.id}</span>
                    </div>
                    <span className="badge bg-info fs-6">💪</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">
                    {workout.description || 'No description provided'}
                  </p>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded text-center">
                        <div className="h6 mb-1 text-primary fw-bold">⏱️</div>
                        <div className="fw-bold">{workout.duration || 0}</div>
                        <small className="text-muted">Minutes</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded text-center">
                        <div className="h6 mb-1 text-success fw-bold">🔥</div>
                        <div className="fw-bold">{workout.calories || 0}</div>
                        <small className="text-muted">Calories</small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="mb-2">
                      <strong>Difficulty:</strong>
                    </p>
                    <div>{getDifficultyBadge(workout.difficulty)}</div>
                  </div>

                  <p className="card-text mb-0">
                    <small className="text-muted">
                      📅 Created: {new Date(workout.created_at || workout.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0 pt-0">
                  <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-primary" title="Start Workout">
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;

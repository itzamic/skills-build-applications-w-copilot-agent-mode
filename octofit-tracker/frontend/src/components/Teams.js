import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching Teams from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Teams list:', teamsList);
        
        setTeams(teamsList);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading teams...</div>
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
          <h1 className="display-5 fw-bold text-dark">👥 Teams</h1>
          <p className="lead text-muted">Build and manage competitive teams</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <button className="btn btn-primary me-2" title="Create Team">
            + Create Team
          </button>
          <span className="badge bg-info fs-6">Teams: {teams.length}</span>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No teams found</strong> - Create your first team to get started!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-lg-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-header bg-gradient text-white py-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title mb-1 fw-bold">{team.name}</h5>
                      <span className="badge bg-light text-dark">Team ID: {team.id}</span>
                    </div>
                    <span className="badge bg-info fs-6">👥</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{team.description || 'No description provided'}</p>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded text-center">
                        <div className="h5 mb-0 fw-bold text-primary">{team.members_count || 0}</div>
                        <small className="text-muted">Members</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded text-center">
                        <div className="h5 mb-0 fw-bold text-success">Active</div>
                        <small className="text-muted">Status</small>
                      </div>
                    </div>
                  </div>
                  {team.leader && (
                    <p className="card-text mb-2">
                      <strong>🎯 Leader:</strong> <span className="badge bg-warning text-dark">{team.leader}</span>
                    </p>
                  )}
                  <p className="card-text mb-0">
                    <small className="text-muted">
                      📅 Created: {new Date(team.created_at || team.date).toLocaleDateString()}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0 pt-0">
                  <div className="d-grid gap-2">
                    <button className="btn btn-sm btn-outline-primary" title="View Team">
                      View Team
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

export default Teams;

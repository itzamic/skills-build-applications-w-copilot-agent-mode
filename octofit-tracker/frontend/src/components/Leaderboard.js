import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching Leaderboard from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed Leaderboard list:', leaderboardList);
        
        setLeaderboard(leaderboardList);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info d-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading leaderboard...</div>
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

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '🏆';
  };

  return (
    <div className="container-fluid py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold text-dark">🥇 Leaderboard</h1>
          <p className="lead text-muted">Compete and climb the rankings</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <span className="badge bg-warning text-dark fs-6">Players: {leaderboard.length}</span>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No leaderboard data found</strong> - Complete activities to appear on the leaderboard!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-sm table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col" className="text-end">Points</th>
                    <th scope="col" className="text-end">Score</th>
                    <th scope="col" className="text-end">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const medalEmoji = getMedalEmoji(index);
                    const badgeColor =
                      index === 0 ? 'bg-warning text-dark' :
                      index === 1 ? 'bg-secondary' :
                      index === 2 ? 'bg-info' :
                      'bg-light text-dark';
                    
                    return (
                      <tr key={entry.id} className={index < 3 ? 'table-light fw-bold' : ''}>
                        <td className="text-center">
                          <span className={`badge ${badgeColor} fs-6`}>
                            {medalEmoji} #{index + 1}
                          </span>
                        </td>
                        <td>
                          <strong>{entry.user || entry.username}</strong>
                        </td>
                        <td className="text-end">
                          <span className="badge bg-primary">{entry.points || entry.score || 0}</span>
                        </td>
                        <td className="text-end">
                          <span className="badge bg-success">{entry.score || entry.points || 0}</span>
                        </td>
                        <td className="text-end">
                          <small className="text-muted">
                            {entry.updated_at ? new Date(entry.updated_at).toLocaleDateString() : 'N/A'}
                          </small>
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

export default Leaderboard;

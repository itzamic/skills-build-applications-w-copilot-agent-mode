import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Workouts from './components/Workouts';

function App() {
  console.log('App component loaded');
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img 
                src="/assets/logo.png" 
                alt="OctoFit Logo" 
                height="45" 
                className="me-3 logo-img"
                title="OctoFit Tracker"
              />
              <strong>OctoFit Tracker</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    ⚡ Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🤝 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="jumbotron">
                    <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      Track your fitness activities, compete with your team, and achieve your goals!
                    </p>
                    <hr className="my-4" />
                    <p>Use the navigation menu above to explore the application.</p>
                    {process.env.REACT_APP_CODESPACE_NAME && (
                      <p className="text-muted">
                        Connected to: https://{process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev
                      </p>
                    )}
                  </div>
                </div>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white mt-5 py-4 text-center">
          <p>&copy; 2024 OctoFit Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

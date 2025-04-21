import React, { useState } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Crime Reporter</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<h2>Welcome to the Crime Reporter App!</h2>} />
          </Routes>
        </main>

        <footer>
          <button onClick={handleLogout}>Logout</button>
          {isLoggedIn ? <p>You are logged in</p> : <p>You are not logged in</p>}
        </footer>
      </div>
    </Router>
  );
}

export default App;

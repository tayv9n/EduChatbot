import './Home.css';
import React, { useState } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { CreateLobby } from '../CreateLobby/CreateLobby';
import { JoinLobby } from '../JoinLobby/JoinLobby';


export function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState('');

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleLinkClick = () => {
    closePopup();

    // Create a temporary anchor element
    const encodedName = encodeURIComponent(name);
    window.location.href = `joinlobby?name=${encodedName}`;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleLinkClick();
    }
  };

  return (
    <div className="Home">
      <header>
        <img src="logo.jpg" alt="Your Logo" className="logohome" />
      </header>
      <main className="centerhome">
        <h1 className="welcome">Welcome to ChatBot!</h1>

          <button className="button" onClick={openPopup}>Join Chatroom</button>

        <a href="createlobby">
          <button className="button">Create Chatroom</button>
        </a>

        {isPopupOpen && (
        <div>
          <div className="popup-overlay"></div>
          <div className="popup">
            <h2>Name</h2>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleNameKeyPress}
              placeholder="Enter your name"
            />
            <button onClick={handleLinkClick}>Submit</button>
          </div>
        </div>
        )}

      </main>
    </div>
  );
}

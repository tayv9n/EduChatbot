import './Home.css';
import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { CreateLobby } from '../CreateLobby/CreateLobby';
import { JoinLobby } from '../JoinLobby/JoinLobby';


export function Home() {
  return (
    <div className="Home">
      <header>
        <img src="logo.jpg" alt="Your Logo" className="logohome" />
      </header>
      <main className="centerhome">
        <h1 className="welcome">Welcome to ChatBot!</h1>

        <a href="joinlobby">
          <button className="button">Join Chatroom</button>
        </a>

        <a href="createlobby">
          <button className="button">Create Chatroom</button>
        </a>

        <Link to="chatroom">chat</Link>
      </main>
    </div>
  );
}

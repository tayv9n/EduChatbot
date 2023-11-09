import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { CreateLobby } from '../CreateLobby/CreateLobby';
import { JoinLobby } from '../JoinLobby/JoinLobby';

export function Home() {
  return (
    <div>
      <h2> Hey </h2>
      <Link to="createlobby">Create Lobby</Link>

      <Link to="joinlobby">Join Lobby</Link>
      <Link to="chatroom">chat</Link>
    </div>
  );
}

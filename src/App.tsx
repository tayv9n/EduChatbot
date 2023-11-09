import React from 'react';
import { CreateLobby } from './pages/CreateLobby/CreateLobby';
import { Routes, Route } from 'react-router-dom';
import { JoinLobby } from './pages/JoinLobby/JoinLobby';
import { Home } from './pages/Home/Home';
import { Chatroom } from './pages/Chatroom/Chatroom';

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createlobby" element={<CreateLobby />} />
        <Route path="/joinlobby" element={<JoinLobby />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

function ErrorPage() {
  return (
    <div>
      <h1> Error </h1>
    </div>
  );
}

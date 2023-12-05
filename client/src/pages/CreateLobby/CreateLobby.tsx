import React, { useState, useEffect} from 'react';
import './CreateLobby.css';
import { Link } from 'react-router-dom';
import { BotSettings } from './BotSettings';
import { LobbySettings } from './LobbySettings';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000';
const socket = io(SERVER_URL);

export function CreateLobby() {
  const [name, setName] = useState('Guest');
  const [lobbyId, setLobbyId] = useState('. . . .');
  const [chatTime, setChatTime] = useState(10);

  useEffect(() => {
      socket.emit('createLobby');
  }, []);

  socket.on('lobbyCreated', (newLobbyId) => {
    setLobbyId(newLobbyId);
  });

  useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name') || 'Guest';

    const formattedName = nameFromURL.replace(/\b\w/g, match => match.toUpperCase());

    // Set the name
    setName(() => formattedName);
  }, [setName]);

  const handleChatroomStart = () => {


    // send bot settings thru socket
    
    if (lobbyId !== '. . . .') {
      const encodedId = encodeURIComponent(lobbyId);
      window.location.href = `chatroom?name=${name}&id=${encodedId}`;
    }
  };
  

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <h1 className="joinheader">CREATE CHATROOM</h1>
      </div>

      <div className="logo-container">
        <img src="logo.jpg" alt="Logo" className="logo" />
      </div>

      <button onClick={handleChatroomStart} className="top-right-buttoon">Start Chat</button>

      <div className={'main-header'}>
        <p style={{ fontSize: 25, color: '#527785', marginTop: 20 }}>Join Code</p>
        <div
          className={'box-container'}
          style={{ marginTop: 12, width: 285, height: 78, margin: 'auto' }}
        >
          <p style={{ fontSize: 36, color: '#383838' }}>{lobbyId}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 40 }}>
        <BotSettings />
        <LobbySettings setChatTime={setChatTime} userCount={5}/>
      </div>
    </div>
  );
}

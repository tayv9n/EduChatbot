import React, { useState, useEffect} from 'react';
import './CreateLobby.css';
import { Link } from 'react-router-dom';
import { BotSettings } from './BotSettings';
import { LobbySettings } from './LobbySettings';

export function CreateLobby() {
  const [name, setName] = useState('Guest');

  React.useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name') || 'Guest';

    const formattedName = nameFromURL.replace(/\b\w/g, match => match.toUpperCase());

    // Set the name
    setName(() => formattedName);
  }, [setName]);

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <h1 className="joinheader">CREATE CHATROOM</h1>
      </div>

      <div className="logo-container">
        <img src="logo.jpg" alt="Logo" className="logo" />
      </div>

      <Link to={`/chatroom?name=${name}`}>
        <button className="top-right-buttoon">Start Chat</button>
      </Link>

      <div className={'main-header'}>
        <p style={{ fontSize: 25, color: '#527785', marginTop: 20 }}>Join Code</p>
        <div
          className={'box-container'}
          style={{ marginTop: 12, width: 285, height: 78, margin: 'auto' }}
        >
          <p style={{ fontSize: 36, color: '#383838' }}>L P R B</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 40 }}>
        <BotSettings />
        <LobbySettings />
      </div>
    </div>
  );
}

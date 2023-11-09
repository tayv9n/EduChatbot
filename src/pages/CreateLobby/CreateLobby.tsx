import React from 'react';
import './CreateLobby.css';
import { BotSettings } from './BotSettings';
import { LobbySettings } from './LobbySettings';

export function CreateLobby() {
  return (
    <div style={{ backgroundColor: '#272727', height: '100%'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p style={{}}>Logo</p>
        <div className={'box-container'} style={{width: 200}}>
          <p>
            Start Chat
          </p>
        </div>
      </div>

      <div className={'main-header'}>
        <p style={{ fontSize: 36, fontWeight: 900 }}>{'CREATE CHATROOM'}</p>
        <p style={{ fontSize: 25 }}>{'Chatroom Code'}</p>
        <div
          className={'box-container'}
          style={{ width: 305, height: 120, margin: 'auto' }}
        >
          <p style={{ fontSize: 36 }}>L P R B</p>
        </div>
        <p> Join Link: </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: 40 }}>
        <BotSettings />
        <LobbySettings />
      </div>
    </div>
  );
}

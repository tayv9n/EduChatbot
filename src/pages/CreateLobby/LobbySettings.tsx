import React from 'react';

import './CreateLobby.css';

export function LobbySettings() {
  return (
    <div style={{ 
      backgroundColor: '#535353',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 468,
      width: 721,
      color: '#E3E3E3'
      }}>

      <p style={{ fontSize: 25, marginBottom: 20, marginTop: 20, textAlign: 'center'}}>Chatroom Settings</p>
      <hr style={{ borderTop: '2px solid #E3E3E3', borderLeft: 'none', width: 721 }} />
      
      <div style={{ margin: 20 }}>
        <p style={{ fontSize: 22, paddingBottom: 10}}>Chatroom Name</p>

        <input style={{ backgroundColor: '#F9F8F7', borderRadius: 20, width: 670, height: 34, border: 0, outline: 0, paddingLeft: 10 }}></input>
      </div>

      <div style={{ margin: 20 }}>
        <p style={{ fontSize: 22, paddingBottom: 10}}>Topic</p>

        <input style={{ backgroundColor: '#F9F8F7', borderRadius: 20, width: 670, height: 34, border: 0, outline: 0, paddingLeft: 10 }}></input>
      </div>

      <p
        style={{
          fontSize: 27,
          marginTop: 0,
          marginBottom: 15,
        }}
      >
        {'Members'}
      </p>
      <div className={'member-container'} style={{ overflowY: 'auto' }}>
        <MemberNames name={'Neeraja Kulkarni'} />
        <MemberNames name={'Kevin Zhang'} />
        <MemberNames name={'Neeraja Kulkarni'} />
        <MemberNames name={'Kevin Zhang'} />
        <MemberNames name={'Neeraja Kulkarni'} />
        <MemberNames name={'Kevin Zhang'} />
      </div>
    </div>
  );
}

interface MemberProps {
  name: string;
}

function MemberNames(props: MemberProps) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={'circle'} />
        <p style={{ fontSize: 20 }}>{props.name}</p>
      </div>
      <hr style={{ borderTop: '2px solid #D9D9D9', borderLeft: 'none' }} />
    </div>
  );
}

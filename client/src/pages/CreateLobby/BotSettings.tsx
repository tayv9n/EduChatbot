import React from 'react';
import { useState } from 'react';
import { Slider } from '@mui/material';

import './CreateLobby.css';

export function BotSettings() {
  const [messageLength, setMessageLength] = useState(50);
  const [messageFreq, setMessageFreq] = useState(50);

  const marks = [{label: 'Low', value: 1}, {label: 'Medium', value: 2}, {label: 'High', value: 3}];

  return (
    <div style={{ 
      backgroundColor: '#F9F8F7',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 468,
      width: 366,
      color: '#535353',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      paddingLeft: 10,
      paddingRight: 10
      }}>

      <p style={{ fontSize: 25, marginBottom: 20, marginTop: 20, textAlign: 'center', color: '#383838'}}>Bot Settings</p>
      <hr style={{ borderTop: '2px solid #E3E3E3', borderLeft: 'none', width: 366 }} />

      <div style={{ margin: 20 }}>
        <p style={{ fontSize: 22, paddingBottom: 10}}>{'Custom Name'}</p>

        <input style={{ backgroundColor: '#F9F8F7', borderRadius: 20, width: 306, height: 34, paddingLeft: 10, border: '1px solid #C4C4C4', outline: 0}}></input>
      </div>

      <div style={{margin: 20}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 22, marginTop: 0, marginBottom: 15 }}>Assertiveness</p>
            <div style={{ borderRadius: 50, height: 22, width: 22, backgroundColor: '#F9F8F7', textAlign: 'center', color: '#6E553D', marginRight: 10, border: '1px solid #C4C4C4', outline: 0}}><p>?</p></div>
        </div>
        <Slider
            aria-label="Assertiveness"
            defaultValue={2}
            step={null}
            marks={marks}
            min={1}
            max={3}
          />
      </div>
      
    </div>
  );
}
import './JoinLobby.css';
import React, { useState, useEffect } from 'react';

export function JoinLobby() {
  const [boxes, setBoxes] : any[] = useState([]);

  const addBox = () => {
    // Create a new box element (a div) with the desired content
    const newBox = (
      <div className="b" key={boxes.length}>
        <div className="profile-icon">
          <img src="logo.jpg" alt="Logo" className="logo-icon" />
        </div>
        <div className="box-content">New Box {boxes.length + 1}</div>
      </div>
    );

    // Update the state to include the new box
    setBoxes([...boxes, newBox]);
  };

  // Initialize the state with x boxes when the component is mounted
  React.useEffect(() => {
    const initialBoxes = [];
    for (let i = 0; i < 6; i++) {
      const newBox = (
        <div className="b" key={i}>
          <div className="profile-icon">
            <img src="logo.jpg" alt="Logo" className="logo-icon" />{' '}
          </div>
          <div className="box-content">New Box {i + 1}</div>
        </div>
      );
      initialBoxes.push(newBox);
    }
    setBoxes(initialBoxes);
  }, []);

  return (
    //three main sections: screen, content box, members box
    <div className="screen">
      <div>
        <h1 className="joinheader">JOIN CHATROOM</h1>
      </div>

      <div className="logo-container">
        <img src="logo.jpg" alt="Logo" className="logo" />
      </div>
      <a href="home">
        <button className="top-right-button">Quit Chatroom</button>
      </a>

      <div className="content-box">
        <h2>Enter Code</h2>
        <div className="joinbox">
          <input className="joininput" type="text" placeholder="" />
        </div>

        <p className="waiting-paragraph">Waiting for host . . .</p>
      </div>

      <div className="border-container">
        <p className="members-paragraph">Members</p>
        <div className="boxes">{boxes}</div>
      </div>
    </div>
  );
}


import './JoinLobby.css';
import React, { useState } from 'react';

interface LobbbyInformationProps {
  users : string[];
}

export function JoinLobby() {
  const [name, setName] = useState('Guest');
  const [code, setCode] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [lobbyState, setLobbyState] = useState('Not Joined');

  // Initialize the state with x boxes when the component is mounted
  React.useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name') || 'Guest';

    const formattedName = nameFromURL.replace(/\b\w/g, match => match.toUpperCase());

    // Set the name synchronously before initializing the boxes
    setName(() => formattedName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLobbyState('Waiting');

    // call api to JOIN LOBBY, RETURN CALL WILL INCLUDE LOBBY INFO AND LIST OF USERS INCLUDING THIS ONE

    // CHECK IF LOBBY EXISTS
    if (code === 'asdf') {
      setLobbyState('Joined');
      setDisabled(true);
      // SET LOBBY INFORMATION
    } else {
      setLobbyState('Error');
    }

    //TODO: ADD STATEMENT IF LOBBY CODE DOESNT EXIST AND IF API CALL RETURNS AN ERROR
  };

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
          <form onSubmit={handleSubmit}>
            <input 
              className="joininput" 
              type="text" placeholder="" 
              value={code} 
              onSubmit={handleSubmit} 
              disabled={disabled} 
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setCode(e.target.value);
                }}} />
          </form>
        </div>
      </div>

      {(lobbyState === 'Waiting') && <p className="waiting-paragraph">Attempting to join lobby...</p>}
      {(lobbyState === 'Joined') && <LobbyInformation users={['Tariq', 'Kai', name]}/>}
      {(lobbyState === 'Error') && <p className="waiting-paragraph">Error joining room. Please try again.</p>}
      
    </div>
  );
}

interface UserBoxProps {
  content: string;
  index : number;
}

function LobbyInformation(props : LobbbyInformationProps) {
  const [boxes, setBoxes] : any[] = useState([]);
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    let initialBoxes = [];
    for (let i = 0; i < props.users.length; i++) {
      initialBoxes.push(<UserBox content={props.users[i]} index={i}/>);
    }

    setBoxes(initialBoxes);
    setIndex(props.users.length-1);
  }, [props.users]);

  // NEED TO MAKE UPDATE WHEN NEW USERS JOIN


  const UserBox = (props : UserBoxProps) => {
    return (
      <div className="b" key={props.index}>
        <div className="profile-icon">
          <img src="logo.jpg" alt="Logo" className="logo-icon" />{' '}
        </div>
        <div className="box-content">{props.content}</div>
      </div>
    )
  }

  return (
    <div className='lobby-info'>

      <p className="waiting-paragraph">Waiting for host . . .</p>
      
      <div className="border-container">
        <p className="members-paragraph">Members</p>
        <div className="boxes">{boxes}</div>
      </div>
    </div>
  );
}
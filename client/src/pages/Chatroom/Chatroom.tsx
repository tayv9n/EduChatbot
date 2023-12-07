import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './Chatroom.css'
import { Socket } from 'socket.io-client';
// import { Socket } from 'socket.io';

interface ChatroomProps {
  socket: Socket;
}

export function Chatroom(props: ChatroomProps) {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const idFromURL = searchParams.get('id') || '....';

    // Set the name
    setCode(() => idFromURL);

    //socket recieve topic and name of chat

  }, [setCode]);

  return (
    <div style={{
      backgroundColor: 'white'
    }}>
      <div className='page-header'>
        <p>{'Menu'}</p>
        <p>{'Chatroom: ' + code}</p>
      </div>
      <div style={{ display: 'flex' }}>
        <div className='side-bar'><SideBar /></div>
        <div className='body-container'>
          <ChatHeader chatname='IN4MATX 117 Discussion' topic='Software Design' />
          <ChatBox socket={props.socket} code={code} />
        </div>
      </div>
    </div>
  );
}



function SideBar() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleExport = () => {
    // Add logic for export button
    console.log('Exported!');
  };

  return (
    <div style={{ padding: 20 }}>
      <div className='chatroom-box'>
        <div className='chatroom-img' />
        <p className='chatroom-word'>Chatroom</p>
      </div>

      <div className='settings-box'>
        <div className='settings-img' />
        <p className='settings-word'>Settings</p>
      </div>

      <div className='export-box'>
        <div className='export-img' />
        <p className='export-word' onClick={togglePopup}>Export</p>

        {/* Popup menu */}
        <div
          className='export-popup'
          style={{ display: isPopupVisible ? 'block' : 'none' }}
        >
          <p>Export As .csv</p>

          {/* Export button */}
          <button className='export-button' onClick={handleExport}>
            Export
          </button>
        </div>
      </div>

      <a href="home" className='exit-position'>
        <button className='exit-button'>Quit Chatroom</button>
      </a>
    </div>
  )
}

interface ChatHeaderProps {
  chatname: string,
  topic: string
}

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className='chat-header'>
      <p>{props.chatname}</p>
      <p>{'Topic: ' + props.topic}</p>
    </div>
  );
}

interface MessageProps {
  user: string;
  message: string;
}

interface MessageDataProps {
  text: string;
  sender: string;
  lobbyId: string;
};

interface ChatBoxProps {
  code: string;
  socket: Socket;
}

function ChatBox(props: ChatBoxProps) {

  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [name, setName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Emit joinRoom when the component mounts or roomId/socket changes
    if (props.socket && props.code && name !== '') {
      props.socket.emit('joinRoom', props.code, name);
    }

    // Optionally, handle leaving the room when the component unmounts
    return () => {
      if (props.socket && props.code) {
        props.socket.emit('leaveRoom', props.code);
      }
    };
  }, [props.socket, props.code, name]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name');


    if (nameFromURL !== null) {
      const decodedName = decodeURIComponent(nameFromURL);
      // Now decodedName is guaranteed to be a string
      setName(decodedName);
    } else {
      // Handle the case where 'name' parameter is not present in the URL
      // setName('Guest');
    }

    // alert(nameFromURL); // a
  }, [setName]);

  useEffect(() => {
    props.socket.on('connect', () => {
      console.log('Connected to server!');
    });
  }, [props.socket]);

  useEffect(() => {
    props.socket.on('message', (messageData: MessageDataProps) => {
      setMessages(prevMessages => [...prevMessages, <Message user={messageData.sender} message={messageData.text} />]);
    });

    return () => {
      props.socket.off('message');
    };
  }, [props.socket]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Message = (props: MessageProps) => {
    return (
      <div>
        <div className='message-position'>
          <div className='message-picture'>
            <img
              src="LOGO.jpg"
              alt="Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Keeps the aspect ratio and covers the entire div
              }}
            />
          </div>
          <div>
            <p className='message-user'>{props.user}</p>
            <p className='message-text'>{props.message}</p>
          </div>

        </div>
        <hr className='message-line' />
      </div>
    )
  }

  const MessageInput = () => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input === '') {
        return;
      }

      let messageData = {
        text: input,
        sender: name,
        lobbyId: props.code
      };

      console.log(` LOBBY ID: ${props.code}, sending ${input}`);

      props.socket.emit('lobbyMessage', props.code, messageData);

      // setMessages([...messages, <Message user={name} message={input} />]);
      setInput('');
    };

    return (
      <div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            className='message-input'
          />
          <button type="submit" className='message-button'>
            <img
              src="send.png"
              alt='Send'
              style={{
                width: '50%',
                height: '50%',
                objectFit: 'cover', // Keeps the aspect ratio and covers the entire button
              }}
            />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className='chatbox-container'>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  )
}

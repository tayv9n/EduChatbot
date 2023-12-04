import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './Chatroom.css'

export function Chatroom() {
  return (
    <div style={{
      backgroundColor: 'white'
    }}>
      <div className='page-header'>
        <p>{'Menu'}</p>
        <p>{'Chatroom: LPRB'}</p>
      </div>
      <div style={{display: 'flex'}}>
        <div className='side-bar'><SideBar /></div>
        <div className='body-container'>
          <ChatHeader chatname='IN4MATX 117 Discussion' topic='Software Design'/>
          <ChatBox />
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
    <div style={{padding: 20 }}>
      <div className='chatroom-box'>
        <div className='chatroom-img'/>
        <p className='chatroom-word'>Chatroom</p>
      </div>

      <div className='settings-box'>
      <div className='settings-img' />
        <p className='settings-word'>Settings</p>
      </div>

      <div style={{ display: 'flex', marginLeft: '20%', marginTop: 20, position: 'relative' }}>
      <div style={{ width: 30, height: 30, backgroundImage: 'url("export.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <p
        style={{
          marginLeft: 10,
          fontSize: 22,
          fontWeight: 600,
          color: '#383838',
          cursor: 'pointer',
        }}
        onClick={togglePopup}
      >
        Export
      </p>

      {/* Popup menu */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 30px)',
          left: 0,
          display: isPopupVisible ? 'block' : 'none',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <p>Export As .csv</p>

        {/* Export button */}
        <button
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#5A2C00', // Background color
            color: '#fff', // Text color
            borderRadius: '8px', // Border radius
            border: 'none', // Remove border
            outline: 'none', // Remove outline
            transition: 'background-color 0.3s', // Smooth background color transition
          }}
          onClick={handleExport}
        >
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

function ChatHeader(props : ChatHeaderProps) {
  return (
    <div className='chat-header'>
      <p>{props.chatname}</p>
      <p>{'Topic: '+ props.topic}</p>
    </div>
  );
}

interface MessageProps {
  message : string
}

function ChatBox() {

  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [name, setName] = useState('Guest');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name') || 'Guest';

    const formattedName = nameFromURL.replace(/\b\w/g, match => match.toUpperCase());

    // Set the name
    setName(() => formattedName);

  }, [setName]);

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

  const Message = (props : MessageProps) => {
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
            <p className='message-user'>{name}</p>
            <p className='message-text'>{props.message}</p>
          </div>

        </div>
        <hr className='message-line'/>
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
      setMessages([...messages, <Message message={input}/>]);
      setInput('')
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between'}}>
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

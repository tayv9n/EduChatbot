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

      <div className='export-box'>
      <div className='export-img'/>
        <p className='export-word'>Export</p>
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

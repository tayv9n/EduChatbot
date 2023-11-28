import React from 'react';
import { useState, useRef } from 'react';
import './Chatroom.css'

export function Chatroom() {
  return (
    <div style={{
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#383838', fontSize: 25, fontWeight: 600, padding: 30 }}>
        <p>{'Menu'}</p>
        <p>{'Chatroom: LPRB'}</p>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '20%', minWidth: 250}}><SideBar /></div>
        <div style={{paddingRight: 50, width: '100%'}}>
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
      <div style={{ 
        display: 'flex',
        height: 48,
        backgroundColor: '#D7DBDB',
        color: '#6C9EB1',
        borderRadius: 15,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center'
      }}>
        <div style={{width: 30,height: 30,backgroundImage: 'url("chatroom.png")', backgroundSize: 'cover',backgroundPosition: 'center'}} />
        <p style={{marginLeft: 8, fontWeight: 600, fontSize: 22 }}>Chatroom</p>
      </div>

      <div style={{ display: 'flex', marginLeft: '20%', marginTop: 20, marginBottom: 20}}>
      <div style={{width: 30,height: 30,backgroundImage: 'url("settings.png")', backgroundSize: 'cover',backgroundPosition: 'center'}} />
        <p style={{marginLeft: 10, fontSize: 22, fontWeight: 600, color: '#383838' }}>Settings</p>
      </div>

      <div style={{ display: 'flex', marginLeft: '20%', marginTop: 20}}>
      <div style={{width: 30,height: 30,backgroundImage: 'url("export.png")', backgroundSize: 'cover',backgroundPosition: 'center'}} />
        <p style={{marginLeft: 10, fontSize: 22, fontWeight: 600, color: '#383838' }}>Export</p>
      </div>

      <a href="home" style={{ position: 'relative', top: 470, left: 20 }}>
        <button style={{
          backgroundColor: '#F3F3F3',
          width: 150,
          height: 50,
          borderRadius: 10,
          marginBottom: 20,
          color: 'black',
          fontSize: 18,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          padding: '10px 20px', // Adjust padding as needed
        }}>Quit Chatroom</button>
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
    <div
      style={{
        backgroundColor: '#ECE7E0',
        color: '#383838',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        padding: 20
      }}
    >
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('Guest');

  React.useEffect(() => {
    // Retrieve the name parameter from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const nameFromURL = searchParams.get('name') || 'Guest';

    const formattedName = nameFromURL.replace(/\b\w/g, match => match.toUpperCase());

    // Set the name
    setName(() => formattedName);
  }, [setName]);

  const Message = (props : MessageProps) => {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{
          width: 56,
          height: 56,
          backgroundColor: '#B2B2B2',
          borderRadius: 50,
          marginRight: 0,
          marginTop: 15,
          marginBottom: 15,
          overflow: 'hidden', // Ensures the image doesn't overflow the div
      }}>
          <img
              src="LOGO.jpg" 
              style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Keeps the aspect ratio and covers the entire div
              }}
          />
        </div>
          <div>
            <p style={{ fontSize: 18, color: '#5C5C5C', fontWeight: 600, margin: 10}}>{name}</p>
            <p style={{ fontSize: 18, fontWeight: 600, margin: 10}}>{props.message}</p>
          </div>

        </div>
        <hr style={{ borderTop: '2px solid #D9D9D9', borderLeft: 'none' }} />
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            style={{
              height: 56,
              width: '100%',
              overflow: 'hidden',
              background: '#F3F3F3',
              borderRadius: 20,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 22,
              padding: 5,
              paddingLeft: 10
            }}
          />
          <button type="submit" style={{
              backgroundColor: '#F3F3F3',
              width: 70,
              height: 70,
              borderRadius: 20,
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 20,
              color: '#5A2C00',
              overflow: 'hidden', // Ensures the image doesn't overflow the button
          }}>
              <img
                  src="send.png"
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
      <div style={{
        backgroundColor: '#FBFBFB',
        height: 550,
        minWidth: 550,
        borderRadius: 20,
        paddingRight: 20,
        paddingLeft: 20,
        overflowY: 'auto'
      }}>
        {messages}
      </div>
      <MessageInput />
    </div>
  )
}

import React from 'react';
import { useState, useRef } from 'react';
import './Chatroom.css'

export function Chatroom() {
  return (
    <div style={{
      backgroundColor: '#272727'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#E3E3E3', fontSize: 25, fontWeight: 600, padding: 30 }}>
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
        backgroundColor: '#000000',
        color: '#6C9EB1',
        borderRadius: 15,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center'
      }}>
        <div style={{width: 30, height: 30, backgroundColor: '#527785'}}/>
        <p style={{ fontWeight: 600, fontSize: 22 }}>Chatroom</p>
      </div>

      <div style={{ display: 'flex', marginLeft: '20%', marginTop: 20, marginBottom: 20 }}>
        <div style={{width: 30, height: 30, backgroundColor: '#E3E3E3'}}/>
        <p style={{ fontSize: 22, fontWeight: 600, color: '#E3E3E3' }}>Settings</p>
      </div>

      <div style={{ display: 'flex', marginLeft: '20%', marginTop: 20}}>
        <div style={{width: 30, height: 30, backgroundColor: '#E3E3E3'}}/>
        <p style={{ fontSize: 22, fontWeight: 600, color: '#E3E3E3' }}>Export</p>
      </div>
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
        backgroundColor: '#251D16',
        color: '#FFC690',
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
              marginBottom: 15
          }}/>
          <div>
            <p style={{ fontSize: 18, color: '#5C5C5C', fontWeight: 600, margin: 10}}>Tariq Brown</p>
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
            color: '#5A2C00'
          }}>Send</button>
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

import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

const SUGGESTIONS = [
  { 
    icon: "📅", text: "i want to know about timetable" },
  { icon: "📝", text: "want to know about exams " },
  { icon: "🪙", text: "i want to know about fee details" },
  { icon: "🎓", text: "want to know about education?" },
]

function TypingIndicator() {
  return (
    <div className="msg-row">
      <div className="msg-avatar ai">🤖</div>
      <div className="bubble ai" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  )
}

function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="welcome">
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: 'linear-gradient(135deg, #359FA0, #4ecca3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '36px', marginBottom: '8px',
        boxShadow: '0 8px 32px rgba(108,99,255,0.3)'
      }}>
        🎓
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 8px' }}>
        Welcome to Eduro
      </h2>
      <p style={{
        color: '#8b8fa8', fontSize: '14px',
        maxWidth: '380px', lineHeight: '1.7', margin: 0
      }}>
        Your 24/7 academic assistant. Ask me anything about exams, fees, timetables, courses, or campus facilities!
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '12px', marginTop: '24px', width: '100%', maxWidth: '540px'
      }}>
        {SUGGESTIONS.map((s, i) => (
          <div
            key={i}
            onClick={() => onSuggestion(s.text)}
            style={{
              background: '#1e2029', border: '1px solid #2a2d3a',
              borderRadius: '14px', padding: '16px',
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', flexDirection: 'column', gap: '8px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = '#6c63ff'
              e.currentTarget.style.background = 'rgba(108,99,255,0.05)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#2a2d3a'
              e.currentTarget.style.background = '#1e2029'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{ fontSize: '22px' }}>{s.icon}</span>
            <span style={{ fontSize: '13px', color: '#8b8fa8', lineHeight: '1.4' }}>
              {s.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '24px', display: 'flex', alignItems: 'center',
        gap: '8px', color: '#8b8fa8', fontSize: '12px'
      }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#4ecca3', animation: 'pulse 2s infinite'
        }} />
        AI is online and ready to help
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, typing, onSuggestion }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <div className="messages-area">
      {messages.length === 0 && (
        <WelcomeScreen onSuggestion={onSuggestion} />
      )}

      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}

      {typing && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
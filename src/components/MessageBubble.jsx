import React from 'react'
import ReactMarkdown from 'react-markdown'

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  })
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`msg-row ${isUser ? 'user' : ''}`}
      style={{ animation: 'fadeUp 0.25s ease' }}>
      <div className={`msg-avatar ${isUser ? 'user-av' : 'ai'}`}>
        {isUser ? '👤' : ''}
      </div>
      <div style={{ maxWidth: '70%' }}>
        <div className={`bubble ${isUser ? 'user' : 'ai'}`}
          style={{ fontSize: '14px', lineHeight: '1.7' }}>
          {isUser ? (
            message.text
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p style={{ margin: '0 0 8px' }}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{ marginBottom: '4px' }}>{children}</li>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: '#8AD6D1' }}>{children}</strong>
                ),
                hr: () => (
                  <hr style={{ border: 'none', borderTop: '1px solid #FFF0C5', margin: '12px 0' }} />
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
        <div className="msg-time" style={{
          display: 'flex', alignItems: 'center',
          gap: '4px', fontSize: '11px', color: '#8b8fa8',
          marginTop: '4px', padding: '0 4px'
        }}>
          {formatTime(message.time)}
          {isUser && <span>✓✓</span>}
        </div>
      </div>
    </div>
  )
}
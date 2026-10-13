import React, { useState } from 'react'

export default function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState('')

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }
  function handleSend() {
    if (!input.trim() || disabled) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="input-area">
      <div className="input-box">
        <textarea rows={1} placeholder="Please ask an query "
          value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} />
        <button className="send-btn" onClick={handleSend} disabled={!input.trim() || disabled}>➤</button>
      </div>
      <div className="input-hint">Enter to send · Shift+Enter for new line</div>
    </div>
  )
}
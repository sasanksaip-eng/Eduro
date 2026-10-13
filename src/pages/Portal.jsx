import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import InputBox from '../components/InputBox'
import { askAI } from '../lib/api'
import { supabase } from '../lib/supabase'

export default function Portal({ user }) {
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)

  // Load chat history on startup
  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(20)

    if (!error && data) {
      setMessages(data.map(msg => ({
        role: msg.role,
        text: msg.message,
        time: new Date(msg.created_at)
      })))
    }
  }

  async function saveMessage(role, text) {
  console.log('Saving message:', role, text)
  const { data, error } = await supabase.from('chat_history').insert({
    user_id: user.id,
    role,
    message: text
  })
  console.log('Save result:', data, 'Error:', error)
}

  async function sendMessage(text) {
    const userMsg = { role: 'user', text, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setTyping(true)

    // Save user message
    await saveMessage('user', text)

    try {
      const reply = await askAI(text, messages)
      const aiMsg = { role: 'ai', text: reply, time: new Date() }
      setMessages(prev => [...prev, aiMsg])

      // Save AI reply
      await saveMessage('ai', reply)

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: "Sorry, I couldn't connect to AI right now. Please try again! 🙏",
        time: new Date()
      }])
    } finally {
      setTyping(false)
    }
  }

  async function handleNewChat() {
    // Clear chat history from DB
    await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', user.id)
    setMessages([])
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        onCategoryClick={sendMessage}
        onNewChat={handleNewChat}
        user={user}
      />
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Academic Assistant</div>
          <div className="status-pill">
            <div className="status-dot" /> AI Online
          </div>
        </div>
        <ChatWindow messages={messages} typing={typing} onSuggestion={sendMessage} />
        <InputBox onSend={sendMessage} disabled={typing} />
      </div>
    </div>
  )
}
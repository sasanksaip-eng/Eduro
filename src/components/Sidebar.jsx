import React from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIES = [
  { icon: "🗓️", label: "Timetable & Schedule" },

{ icon: "📊", label: "Exams & Results" },

{ icon: "💳", label: "Fees & Finance" },

{ icon: "📚", label: "Courses & Syllabus" },

{ icon: "🏫", label: "Campus & Facilities" },

{ icon: "🎓", label: "Admissions" },
]

export default function Sidebar({ onCategoryClick, onNewChat, user }) {
  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-name">Eduro </div>
        <div className="logo-tag">Student Support Portal by Sasank</div>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>＋ New Query</button>

      <div className="section-label">Categories</div>
      <div className="category-list">
        {CATEGORIES.map((c, i) => (
          <div key={i} className="category-item"
            onClick={() => onCategoryClick(c.label)}>
            <span>{c.icon}</span> {c.label}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">
            {user?.email?.[0]?.toUpperCase() || "S"}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.email}</div>
            <div className="user-role">Student</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', marginTop: '12px',
            padding: '8px', background: 'transparent',
            border: '1px solid #2a2d3a', borderRadius: '8px',
            color: '#8AD6D1', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.15s'
          }}
          onMouseOver={e => e.target.style.borderColor = '#ff5050'}
          onMouseOut={e => e.target.style.borderColor = '#2a2d3a'}
        >
           Sign Out
        </button>
      </div>
    </div>
  )
}
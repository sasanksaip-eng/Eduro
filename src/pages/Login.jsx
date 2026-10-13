import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')

    try {
      let result
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password })
      } else {
        result = await supabase.auth.signInWithPassword({ email, password })
      }

      if (result.error) {
        setError(result.error.message)
      } else {
        onLogin(result.data.user)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
 <div style={{
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#FCF0DA',
  boxSizing: 'border-box'
}}>
      <div style={{
        background: '#16181f', border: '1px solid #2a2d3a',
        borderRadius: '16px', padding: '40px', width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎓</div>
          <h1 style={{ color: '#eef0f7', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>
            Eduro AI
          </h1>
          <p style={{ color: '#8b8fa8', fontSize: '14px', margin: 0 }}>
            Student Support Portal
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)',
            borderRadius: '8px', padding: '12px', marginBottom: '16px',
            color: '#ff5050', fontSize: '13px'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#8b8fa8', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={{
              width: '100%', padding: '10px 14px',
              background: '#1e2029', border: '1px solid #2a2d3a',
              borderRadius: '8px', color: '#eef0f7',
              fontSize: '14px', outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#8b8fa8', 
            fontSize: '12px', 
            display: 'block',
             marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%', padding: '10px 14px',
              background: '#1e2029', border: '1px solid #2a2d3a',
              borderRadius: '8px', color: '#eef0f7',
              fontSize: '14px', outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{
            width: '100%',
             padding: '12px',
            background: '#6c63ff',
            border: 'none',
            borderRadius: '10px',
             color: '#fff',
            fontSize: '14px',
             fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center',
           marginTop: '20px', 
           color: '#8b8fa8',
            fontSize: '13px' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => { setIsSignUp(!isSignUp); setError('') }}
            style={{ color: '#6c63ff', cursor: 'pointer', marginLeft: '6px' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}
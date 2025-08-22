// src/components/RegistrationForm.jsx
import { useState } from 'react';
import { registerUser } from '../lib/api';

export default function RegistrationForm() {
  // Controlled inputs
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  // Local validation state
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = { username: '', email: '', password: '' };

    if (!username.trim()) next.username = 'Username is required.';
    if (!email.trim())    next.email    = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.';

    if (!password) next.password = 'Password is required.';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.';

    setErrors(next);
    return !next.username && !next.email && !next.password;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await registerUser({ username, email, password });
      setStatus({ type: 'success', message: `Registered as ${res.username}` });
      setUsername(''); setEmail(''); setPassword('');
      setErrors({ username: '', email: '', password: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', padding: '1rem', border: '1px solid #eee', borderRadius: 12 }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Registration (Controlled)</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>useState + manual validation</p>

      {status.message && (
        <div style={{
          padding: '0.75rem', borderRadius: 8, marginBottom: '1rem',
          background: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color:       status.type === 'success' ? '#065f46' : '#991b1b',
          border:      `1px solid ${status.type === 'success' ? '#a7f3d0' : '#fecaca'}`
        }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: 6 }}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            onBlur={validate}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ccc' }}
            placeholder="e.g. muthoni"
          />
          {errors.username && <div style={{ color: '#b91c1c', marginTop: 6 }}>{errors.username}</div>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            onBlur={validate}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ccc' }}
            placeholder="e.g. muthoni@example.com"
          />
          {errors.email && <div style={{ color: '#b91c1c', marginTop: 6 }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            onBlur={validate}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ccc' }}
            placeholder="min 6 characters"
          />
          {errors.password && <div style={{ color: '#b91c1c', marginTop: 6 }}>{errors.password}</div>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%', padding: '0.75rem', borderRadius: 8, border: 0,
            background: submitting ? '#93c5fd' : '#3b82f6', color: 'white', cursor: 'pointer'
          }}
        >
          {submitting ? 'Submitting…' : 'Register'}
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';

function AdminLogin({ apiUrl, onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      onLogin(data.token);
    } catch (err) {
      setError('Something went wrong.');
    }
  }

  return (
    <>
      <div className="admin-header">
        <h3>Admin Login 🔒</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-msg">⚠ {error}</p>}

        <button type="submit" className="submit-btn">Log in</button>
      </form>
    </>
  );
}

export default AdminLogin;
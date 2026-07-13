import { useState, useEffect } from 'react';

function AdminDashboard({ token, apiUrl, onLogout, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/api/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });
  }, [token, apiUrl]);

  function handleLogout() {
    localStorage.removeItem('adminToken');
    onLogout();
  }

  return (
    <>
      <div className="admin-header">
        <h3>Inbox ({messages.length})</h3>
        <div className="admin-actions">
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      {loading && <p className="section-note">Loading messages...</p>}

      {!loading && messages.length === 0 && (
        <p className="section-note">No messages yet.</p>
      )}

      {!loading && messages.map((msg) => (
        <div key={msg.id} className="msg-card">
          <p className="msg-name">{msg.name || 'Anonymous'}</p>
          <p className="msg-email">{msg.email}</p>
          <p className="msg-text">{msg.message}</p>
          {msg.createdAt && (
            <p className="msg-date">
              {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </>
  );
}

export default AdminDashboard;
import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    setEmailError('');
    setSending(true);

    try {
      const response = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setEmailError('Something went wrong — please try again');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-card">
        <div className="success-msg">
          ✓ Message sent! I'll get back to you soon 🌱
        </div>
      </div>
    );
  }

  return (
    <div className="contact-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">Your name</label>
          <input
            type="text"
            id="nameInput"
            placeholder="What's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailInput">
            Your email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="emailInput"
            placeholder="your@email.com"
            value={email}
            className={emailError ? 'input-error' : ''}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
          />
          {emailError && <p className="error-msg">⚠ {emailError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="messageInput">Your message</label>
          <textarea
            id="messageInput"
            placeholder="Say hello..."
            maxLength="280"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <p className={`char-count ${280 - message.length < 20 ? 'warning' : ''}`}>
            {280 - message.length} left
          </p>
        </div>

        <button type="submit" className="submit-btn" disabled={sending}>
          {sending ? 'Sending...' : 'Send it →'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
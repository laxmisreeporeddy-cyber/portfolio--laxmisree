import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
  if (!form.name || !form.email || !form.message) return alert('Please fill all fields');

  try {
    await emailjs.send(
      'service_a2xdq2c',    // replace this
      'template_abawz73',   // replace this
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      'E_FGLLtp7lso4ktT2'     // replace this
    );
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  } catch (err) {
    alert('Failed to send. Please try again.');
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        .con-wrap { padding: 5rem 3rem; max-width: 1100px; margin: 0 auto; }
        .con-label { font-size: 0.72rem; letter-spacing: 0.1em; color: #c8f542; text-transform: uppercase; margin-bottom: 0.75rem; font-family: 'DM Sans', sans-serif; }
        .con-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; color: #f0ede8; margin-bottom: 3rem; }
        .con-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .con-bio { font-family: 'DM Sans', sans-serif; font-size: 1rem; color: #888; font-weight: 300; line-height: 1.9; margin-bottom: 2rem; }
        .con-links { display: flex; flex-direction: column; gap: 1rem; }
        .con-link { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #888; font-size: 0.88rem; font-family: 'DM Sans', sans-serif; transition: color 0.2s; }
        .con-link:hover { color: #f0ede8; }
        .con-icon { width: 38px; height: 38px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .fg { margin-bottom: 1.25rem; }
        .fg label { display: block; font-size: 0.75rem; color: #666; letter-spacing: 0.05em; margin-bottom: 0.5rem; font-family: 'DM Sans', sans-serif; }
        .fg input, .fg textarea {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #f0ede8; font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 300; padding: 0.75rem 1rem; outline: none; resize: vertical;
          transition: border-color 0.2s;
        }
        .fg input:focus, .fg textarea:focus { border-color: rgba(200,245,66,0.4); }
        .fg input::placeholder, .fg textarea::placeholder { color: #333; }
        .btn-send { padding: 0.8rem 2rem; background: #c8f542; color: #0a0a0f; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .btn-send:hover { background: #d4ff4a; transform: translateY(-2px); }
        .success { background: rgba(200,245,66,0.1); border: 1px solid rgba(200,245,66,0.3); border-radius: 12px; padding: 1.5rem; color: #c8f542; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; text-align: center; }
        @media(max-width:700px){ .con-grid{grid-template-columns:1fr; gap:2.5rem;} .con-wrap{padding:4rem 1.5rem;} }
      `}</style>
      <div className="con-wrap">
        <p className="con-label">Get in touch</p>
        <h2 className="con-title">Contact</h2>
        <div className="con-grid">
          <div>
            <p className="con-bio">Open to full-time roles, internships, and freelance projects. If you have an interesting problem to solve, I'd love to hear about it.</p>
            <div className="con-links">
              {[
                { icon: '✉', label: 'laxmisreeporeddy@email.com', href: 'mailto:laxmisreeporeddy@email.com' },
                { icon: '⌂', label: 'github.com/laxmisree', href: 'https://github.com' },
                { icon: 'in', label: 'linkedin.com/in/laxmisree', href: 'www.linkedin.com/in/laxmi-sree-poreddy-090a80397' },
              ].map(l => (
                <a key={l.label} href={l.href} className="con-link" target="_blank" rel="noreferrer">
                  <div className="con-icon">{l.icon}</div>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div className="success">✓ Message sent! I'll get back to you soon.</div>
            ) : (
              <>
                <div className="fg"><label>Name</label><input name="name" value={form.name} onChange={handle} placeholder="Your name" /></div>
                <div className="fg"><label>Email</label><input name="email" value={form.email} onChange={handle} placeholder="your@email.com" /></div>
                <div className="fg"><label>Message</label><textarea name="message" value={form.message} onChange={handle} rows="5" placeholder="Tell me about your project..." /></div>
                <button className="btn-send" onClick={submit}>Send message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

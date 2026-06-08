import React, { useEffect, useRef, useState, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';

// ── Theme Context ────────────────────────────────────────────────────────────
export const ThemeCtx = createContext();

// ── Typewriter Hook ──────────────────────────────────────────────────────────
const ROLES = ['Full-Stack Developer', 'Node.js Engineer', 'Open Source Contributor'];
function useTypewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = ROLES[roleIdx];
    let t;
    if (!deleting && text.length < target.length)       t = setTimeout(() => setText(target.slice(0, text.length + 1)), 65);
    else if (!deleting && text.length === target.length) t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && text.length > 0)                t = setTimeout(() => setText(text.slice(0, -1)), 38);
    else { setDeleting(false); setRoleIdx((roleIdx + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);
  return text;
}

// ── Skill Progress Bar ────────────────────────────────────────────────────────
function SkillBar({ name, pct, color, dark }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(pct); }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: dark ? '#aaa' : '#555', fontWeight: 400 }}>{name}</span>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: color, fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: dark ? 'rgba(255,255,255,0.07)' : '#eee', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${color}, ${color}cc)`, width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, img, dark, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: dark ? (hov ? '#1a1a28' : '#13131e') : (hov ? '#f0f7ff' : '#fff'),
        border: `1px solid ${dark ? (hov ? 'rgba(200,245,66,0.25)' : 'rgba(255,255,255,0.07)') : (hov ? '#bde0ff' : '#e8ecf0')}`,
        borderRadius: 16, overflow: 'hidden',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov ? (dark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,100,255,0.08)') : 'none',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        animationDelay: `${idx * 0.1}s`, animation: 'fadeUp 0.6s ease both',
      }}
    >
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)', transition: 'background 0.3s' }} />
      </div>
      <div style={{ padding: '1.4rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: dark ? '#f4f0e8' : '#0d0d14', marginBottom: 6 }}>{title}</h3>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: dark ? '#666' : '#777', fontWeight: 300, lineHeight: 1.7, marginBottom: '1rem' }}>{desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.2rem' }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', padding: '3px 10px', borderRadius: 999, background: dark ? 'rgba(200,245,66,0.08)' : '#f0f7ff', color: dark ? '#c8f542' : '#0066cc', border: `1px solid ${dark ? 'rgba(200,245,66,0.15)' : '#cce0ff'}` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
export function ContactForm({ dark }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus('error'); return; }
    try {
      await fetch('http://localhost:5000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } catch (_) {}
    setStatus('sent'); setForm({ name: '', email: '', message: '' });
  };
  const inp = { width: '100%', padding: '0.8rem 1rem', borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', outline: 'none', transition: 'border-color 0.2s', background: dark ? 'rgba(255,255,255,0.04)' : '#f9f9f9', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e0e0e0'}`, color: dark ? '#f4f0e8' : '#0d0d14' };
  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      {status === 'sent' ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: dark ? 'rgba(200,245,66,0.07)' : '#f0fff4', border: `1px solid ${dark ? 'rgba(200,245,66,0.2)' : '#c8f542'}`, borderRadius: 16 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: dark ? '#c8f542' : '#2d7a2d' }}>Message sent! I'll reply within 24 hours.</p>
        </div>
      ) : (
        <>
          {status === 'error' && <p style={{ color: '#ff4444', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', marginBottom: '1rem' }}>Please fill all fields.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <input name="name" value={form.name} onChange={handle} placeholder="Your name" style={inp} />
            <input name="email" value={form.email} onChange={handle} placeholder="your@email.com" style={inp} />
          </div>
          <textarea name="message" value={form.message} onChange={handle} placeholder="Tell me about your project..." rows={5} style={{ ...inp, resize: 'vertical', marginBottom: 12 }} />
          <button onClick={submit} style={{ width: '100%', padding: '0.9rem', background: '#c8f542', color: '#0d0d14', border: 'none', borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}>
            Send Message →
          </button>
        </>
      )}
    </div>
  );
}

// ── MAIN HOME ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { dark, setDark } = useContext(ThemeCtx) || { dark: true, setDark: () => {} };
  const role = useTypewriter();
  const canvasRef = useRef();
  const [vis, setVis] = useState(false);

  // Particle BG
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3, dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark ? 'rgba(200,245,66,0.35)' : 'rgba(0,100,255,0.2)';
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = dark ? `rgba(200,245,66,${0.06 * (1 - d / 110)})` : `rgba(0,100,255,${0.06 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [dark]);

  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const bg    = dark ? '#080810' : '#f8f9ff';
  const txt   = dark ? '#f4f0e8' : '#0d0d14';
  const muted = dark ? '#666'    : '#888';
  const bdr   = dark ? 'rgba(255,255,255,0.07)' : '#e8ecf0';
  const sec   = dark ? '#0f0f1a' : '#f0f4ff';

  const PROJECTS = [
    {
      title: 'Women Safe Route Recommendation System',
      desc: 'Developed a smart safety-focused route recommendation system using location intelligence and emergency alert features.',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: 'https://www.innerdawn.in/wp-content/uploads/2024/09/Are-we-women-safe-in-our-own-environments.png',
    },
    {
      title: 'Ultrasonic Blind Assistance System',
      desc: 'Designed an obstacle detection system using ultrasonic sensors to assist visually impaired people.',
      tags: ['Embedded Systems', 'Arduino', 'Sensors'],
      img: 'https://resources.ampheo.com/static/20251014/maxresdefault%20(32).jpg',
    },
    {
      title: 'Personal Portfolio Website',
      desc: 'Responsive portfolio website built with React, Node.js and MongoDB Atlas showcasing projects and skills.',
      tags: ['React', 'Node.js', 'MongoDB'],
      img: './profile1.jpeg',
    },
  ];

  const SKILLS = [
    { name: 'React.js',           pct: 88, color: '#61dafb' },
    { name: 'Node.js / Express',  pct: 82, color: '#84cc16' },
    { name: 'MongoDB',            pct: 78, color: '#c8f542' },
    { name: 'JavaScript (ES6+)',  pct: 90, color: '#f7df1e' },
    { name: 'AI',                 pct: 92, color: '#e34f26' },
    { name: 'Java',               pct: 92, color: '#e34f26' },
    { name: 'Data Analytics',     pct: 92, color: '#e34f26' },
    { name: 'Git & GitHub',       pct: 85, color: '#f05032' },
  ];

  const fadeStyle = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(22px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${bg}; transition: background 0.3s; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(200,245,66,0.4)} 60%{box-shadow:0 0 0 8px rgba(200,245,66,0)} }
        .sec-label { font-family:'DM Sans',sans-serif; font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:#c8f542; margin-bottom:0.6rem; }
        .sec-title { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(1.8rem,3.5vw,2.8rem); letter-spacing:-0.03em; margin-bottom:2.5rem; }
      `}</style>

      <div style={{ background: bg, color: txt, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>

        {/* ── TOP NAV ── */}
        <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 200, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, padding: '1.1rem 2.5rem', background: dark ? 'rgba(8,8,16,0.85)' : 'rgba(248,249,255,0.85)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${bdr}` }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ padding: '6px 14px', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.06)' : '#f0f0f5', color: txt, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', border: `1px solid ${bdr}`, transition: 'all 0.2s' }}>⌥ GitHub</a>
          <a href="https://www.linkedin.com/in/laxmi-sree-poreddy-090a80397" target="_blank" rel="noreferrer" style={{ padding: '6px 14px', borderRadius: 8, background: '#0a66c2', color: '#fff', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', transition: 'all 0.2s' }}>in LinkedIn</a>
          <a href="Poreddy_Laxmisree_Resume.pdf" download="Poreddy_Laxmisree_Resume.pdf" style={{ padding: '6px 14px', borderRadius: 8, background: '#c8f542', color: '#0d0d14', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 500, transition: 'all 0.2s' }}>↓ Resume</a>
          <button onClick={() => setDark(!dark)} title="Toggle theme" style={{ width: 38, height: 38, borderRadius: 8, border: `1px solid ${bdr}`, background: dark ? 'rgba(255,255,255,0.06)' : '#f0f0f5', cursor: 'pointer', fontSize: '1rem', color: txt, transition: 'all 0.2s' }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* ── HERO ── */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '5rem' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

          {/* Glow orbs */}
          <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${dark ? 'rgba(200,245,66,0.06)' : 'rgba(0,100,255,0.06)'} 0%, transparent 65%)`, top: -200, right: -100, animation: 'float 9s ease-in-out infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${dark ? 'rgba(99,60,220,0.07)' : 'rgba(200,100,255,0.06)'} 0%, transparent 65%)`, bottom: -80, left: 60, animation: 'float 13s ease-in-out infinite reverse', pointerEvents: 'none' }} />

          {/* Hero content grid */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, margin: '0 auto', padding: '0 2.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>

            {/* LEFT side */}
            <div>
              <div style={{ ...fadeStyle(0), display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? 'rgba(200,245,66,0.08)' : 'rgba(0,150,100,0.08)', border: `1px solid ${dark ? 'rgba(200,245,66,0.2)' : 'rgba(0,150,100,0.2)'}`, borderRadius: 999, padding: '5px 14px 5px 8px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', color: dark ? '#c8f542' : '#0a7a50', marginBottom: '2rem', letterSpacing: '0.04em' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: dark ? '#c8f542' : '#0a7a50', animation: 'pulse 2s ease-in-out infinite', display: 'block' }} />
                Open to opportunities · Hyderabad, India
              </div>

              <div style={{ ...fadeStyle(0.1), fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(5rem,11vw,8.5rem)', lineHeight: 0.88, letterSpacing: '0.02em', color: txt, marginBottom: '0.5rem' }}>
                POREDDY<br /><span style={{ color: '#c8f542' }}>LAXMISREE</span>
              </div>

              <div style={{ ...fadeStyle(0.2), display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: muted, fontWeight: 300 }}>I'm a</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: txt, fontWeight: 400, minWidth: 230 }}>
                  {role}<span style={{ display: 'inline-block', width: 2, height: '1em', background: '#c8f542', marginLeft: 2, verticalAlign: 'middle', animation: 'blink 0.8s step-end infinite' }} />
                </span>
              </div>

              <p style={{ ...fadeStyle(0.3), fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: muted, fontWeight: 300, maxWidth: 460, lineHeight: 1.85, marginBottom: '2.5rem' }}>
                Crafting digital experiences that feel fast, look sharp, and work flawlessly — from pixel-perfect UIs to bulletproof backends.
              </p>

              <div style={{ ...fadeStyle(0.4), display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 2rem', background: '#c8f542', color: '#080810', borderRadius: 8, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, transition: 'all 0.2s' }}>See my work →</Link>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.85rem 2rem', background: 'transparent', color: txt, border: `1px solid ${bdr}`, borderRadius: 8, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, transition: 'all 0.2s' }}>Let's talk</Link>
              </div>

              <div style={{ ...fadeStyle(0.5), display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'REST APIs', 'Git', 'Tailwind'].map(s => (
                  <span key={s} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', padding: '4px 12px', borderRadius: 999, border: `1px solid ${bdr}`, color: muted, transition: 'all 0.2s', cursor: 'default' }}>{s}</span>
                ))}
              </div>
            </div>
            {/* END LEFT side */}

          </div>
          {/* END Hero content grid */}

          {/* RIGHT side — full half page image (absolutely positioned inside hero) */}
          <div style={{ ...fadeStyle(0.55), position: 'absolute', right: 0, top: 0, bottom: 0, width: '48%', zIndex: 1, overflow: 'hidden' }}>
            {/* left fade blend */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 220, background: `linear-gradient(to right, ${dark ? '#080810' : '#f8f9ff'}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
            {/* top fade */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, ${dark ? '#080810' : '#f8f9ff'}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

            <img
              src="/profile1.jpeg"
              alt="Poreddy Laxmisree"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'rgba(200,245,66,0.03)';
                e.target.parentNode.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:8rem;z-index:3;">👩‍💻</div>`;
              }}
            />

            {/* available badge */}
            <div style={{ position: 'absolute', bottom: 40, left: 40, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(200,245,66,0.25)', borderRadius: 999, padding: '8px 16px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8f542', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#c8f542', fontWeight: 400 }}>Available for work</span>
            </div>
          </div>
          {/* END RIGHT side */}

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4, animation: 'float 2.5s ease-in-out infinite', zIndex: 2 }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
            <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${dark ? 'rgba(200,245,66,0.5)' : 'rgba(0,100,255,0.4)'}, transparent)` }} />
          </div>
        </div>
        {/* ── END HERO ── */}

        {/* ── PROJECTS SECTION ── */}
        <div style={{ background: sec, padding: '5rem 2.5rem', transition: 'background 0.3s' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="sec-label">Selected work</p>
            <h2 className="sec-title" style={{ color: txt }}>Featured Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} dark={dark} idx={i} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/projects" style={{ display: 'inline-block', padding: '0.8rem 2.5rem', border: `1px solid ${dark ? 'rgba(200,245,66,0.3)' : '#cce0ff'}`, borderRadius: 8, color: dark ? '#c8f542' : '#0066cc', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', transition: 'all 0.2s' }}>View all projects →</Link>
            </div>
          </div>
        </div>

        {/* ── SKILLS SECTION ── */}
        <div style={{ padding: '5rem 2.5rem', background: bg, transition: 'background 0.3s' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <p className="sec-label">What I work with</p>
              <h2 className="sec-title" style={{ color: txt }}>Skills</h2>
              {SKILLS.map(s => <SkillBar key={s.name} {...s} dark={dark} />)}
            </div>
            <div>
              <p className="sec-label">My approach</p>
              <h2 className="sec-title" style={{ color: txt }}>How I Work</h2>
              {[
                { icon: '⚡', title: 'Performance first', desc: 'Every line of code is written with speed and efficiency in mind.' },
                { icon: '🎨', title: 'Design-aware', desc: 'I care deeply about UI/UX — beautiful and functional are not opposites.' },
                { icon: '🔒', title: 'Security minded', desc: 'Auth, validation, sanitization — security is never an afterthought.' },
              ].map(w => (
                <div key={w.title} style={{ display: 'flex', gap: 16, marginBottom: '1.5rem', padding: '1.2rem', borderRadius: 12, background: dark ? 'rgba(255,255,255,0.03)' : '#f8f9ff', border: `1px solid ${bdr}` }}>
                  <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{w.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: txt, marginBottom: 4 }}>{w.title}</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: muted, fontWeight: 300, lineHeight: 1.6 }}>{w.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

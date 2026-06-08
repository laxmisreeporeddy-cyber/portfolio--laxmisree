import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home, { ThemeCtx } from './pages/home';
import Projects from './pages/project';
import About from './pages/about';
import Contact from './pages/contact';
import ProjectDetails from "./pages/ProjectDetails";
import Adminpanel from "./pages/Adminpanel";
import Certificates from "./pages/Certificates";

function Nav({ dark, setDark }) {
  const loc = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/certificates', label: 'Certificates' },
  ];
  const bdr = dark ? 'rgba(255,255,255,0.07)' : '#e8ecf0';
  const txt = dark ? '#f4f0e8' : '#0d0d14';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
      padding: '1.1rem 2.5rem',
      background: dark ? 'rgba(8,8,16,0.88)' : 'rgba(248,249,255,0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${bdr}`,
      transition: 'background 0.3s',
    }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(l => (
          <Link key={l.path} to={l.path} style={{
            color: loc.pathname === l.path ? '#c8f542' : dark ? '#555' : '#999',
            textDecoration: 'none', fontSize: '0.83rem',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
            letterSpacing: '0.03em', transition: 'color 0.2s',
          }}>{l.label}</Link>
        ))}
        <button onClick={() => setDark(!dark)} style={{
          width: 34, height: 34, borderRadius: 8,
          border: `1px solid ${bdr}`,
          background: dark ? 'rgba(255,255,255,0.05)' : '#f0f0f5',
          cursor: 'pointer', fontSize: '0.9rem', color: txt, transition: 'all 0.2s'
        }}>
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <ThemeCtx.Provider value={{ dark, setDark }}>
      <Router>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${dark ? '#080810' : '#f8f9ff'}; transition: background 0.3s; }
        `}</style>
        <Nav dark={dark} setDark={setDark} />
        <div style={{ paddingTop: 60 }}>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/about"        element={<About />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/Adminpanel"   element={<Adminpanel />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </div>
      </Router>
    </ThemeCtx.Provider>
  );
}

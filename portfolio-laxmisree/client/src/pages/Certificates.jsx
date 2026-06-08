import React, { useState } from 'react';

const certs = [
  {
    id: 1,
    title: 'Basics of Python Programming',
    issuer: 'Infosys Springboard',
    duration: 'Self-Paced Course',
    year: '2026',
    description: 'Completed Infosys certified Python programming course covering variables, data types, loops, functions, and file handling.',
    image: '/certs/Basics of python---INFOSYS.png',
    color: '#3776ab',
  },
  {
    id: 2,
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    duration: 'Self-Paced Course',
    year: '2024',
    description: 'Earned IBM certification in AI Fundamentals covering core concepts of artificial intelligence, machine learning, deep learning, and neural networks.',
    image: '/certs/certificate_laxmisree.png',
    color: '#054ada',
  },
  {
    id: 3,
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte-Australia',
    duration: 'Forage build',
    year: '2026',
    description: 'Excited to share that I have successfully completed the Deloitte Data Analytics Job Simulation on Forage.Through this virtual experience, I worked on practical tasks involving,Data Analysis,Forensic Technology.This simulation provided valuable insights into how data-driven decision-making is applied in real-world business scenarios and helped strengthen my analytical and problem-solving skills.',
    image: '/certs/Deloitte.jpeg',
    color: '#42f578',
  },
  {
    id: 4,
    title: 'JIJNASA Tech Event — BRECW',
    issuer: 'Bhoj Reddy Engineering College for Women',
    duration: 'Technical Event',
    year: '2023',
    description: 'Participated in JIJNASA inter-college tech fest. Presented a poster on Cyber Security and participated in the Blind Coding challenge.',
    image: '/certs/jijnasa.jpeg',
    color: '#c8f542',
  },
  {
    id: 5,
    title: 'Python Programming — Level 1',
    issuer: 'Infosys Springboard',
    duration: 'Self-Paced Course',
    year: '2026',
    description: 'Completed Infosys Python Level 1 certification covering foundational programming concepts, object-oriented programming basics, and practical Python applications.',
    image: '/certs/python 1 ---INFOSYS.jpeg',
    color: '#f7c948',
  },
];

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cert-root { min-height: 100vh; background: #06060f; font-family: 'DM Sans', sans-serif; padding: 5rem 0 7rem; position: relative; overflow: hidden; }
        .cert-glow { position: fixed; top: 10%; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(200,245,66,0.05) 0%, transparent 65%); pointer-events: none; }
        .cert-wrap { max-width: 1000px; margin: 0 auto; padding: 0 2.5rem; }

        .cert-eyebrow { font-size: 0.7rem; letter-spacing: 0.18em; color: #c8f542; text-transform: uppercase; margin-bottom: 0.8rem; opacity: 0; animation: fadeUp 0.6s 0.1s forwards; }
        .cert-heading { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 5.5rem); color: #f0ede8; line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.7s 0.2s forwards; }
        .cert-heading span { color: #c8f542; }
        .cert-sub { font-size: 0.95rem; color: #444; font-weight: 300; margin-bottom: 4rem; opacity: 0; animation: fadeUp 0.6s 0.3s forwards; }

        .cert-timeline { position: relative; }
        .cert-timeline::before { content: ''; position: absolute; left: 18px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, rgba(200,245,66,0.3) 10%, rgba(200,245,66,0.15) 90%, transparent); }

        .cert-row { display: grid; grid-template-columns: 36px 1fr; gap: 0 2rem; margin-bottom: 3.5rem; opacity: 0; animation: fadeUp 0.7s forwards; }
        .cert-row:nth-child(1) { animation-delay: 0.4s; }
        .cert-row:nth-child(2) { animation-delay: 0.55s; }
        .cert-row:nth-child(3) { animation-delay: 0.7s; }
        .cert-row:nth-child(4) { animation-delay: 0.85s; }
        .cert-row:nth-child(5) { animation-delay: 1.0s; }

        .cert-dot-col { display: flex; flex-direction: column; align-items: center; padding-top: 6px; }
        .cert-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #c8f542; background: #06060f; flex-shrink: 0; box-shadow: 0 0 10px rgba(200,245,66,0.4); }

        .cert-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; display: grid; grid-template-columns: 280px 1fr; transition: border-color 0.3s, transform 0.3s; }
        .cert-card:hover { border-color: rgba(200,245,66,0.25); transform: translateX(6px); }

        .cert-img-box { position: relative; background: rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.06); min-height: 200px; overflow: hidden; cursor: pointer; }
        .cert-img-box::after { content: '🔍 View'; position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; color: #c8f542; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; opacity: 0; transition: opacity 0.3s; font-family: 'DM Sans', sans-serif; }
        .cert-img-box:hover::after { opacity: 1; }
        .cert-img-box img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
        .cert-card:hover .cert-img-box img { transform: scale(1.04); }

        .cert-img-placeholder { width: 100%; height: 100%; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: #333; font-size: 13px; font-weight: 300; text-align: center; padding: 1rem; }
        .cert-img-placeholder span { font-size: 2rem; }

        .cert-info { padding: 1.8rem 2rem; display: flex; flex-direction: column; justify-content: center; gap: 0.6rem; }
        .cert-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .cert-year { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
        .cert-duration { font-size: 0.72rem; color: #444; font-weight: 300; letter-spacing: 0.06em; text-transform: uppercase; }
        .cert-title { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800; color: #f0ede8; line-height: 1.3; }
        .cert-issuer { font-size: 0.82rem; color: #555; font-weight: 300; }
        .cert-desc { font-size: 0.85rem; color: #555; font-weight: 300; line-height: 1.8; margin-top: 0.4rem; }

        .lb-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fadeIn 0.25s ease; }
        .lb-box { position: relative; max-width: 860px; width: 100%; background: #0f0f1a; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; animation: scaleIn 0.25s ease; }
        .lb-img { width: 100%; max-height: 75vh; object-fit: contain; display: block; background: #080810; }
        .lb-footer { padding: 1.2rem 1.8rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .lb-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: #f0ede8; margin-bottom: 4px; }
        .lb-issuer { font-size: 0.82rem; color: #555; font-weight: 300; }
        .lb-close { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #aaa; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .lb-close:hover { background: rgba(200,245,66,0.15); color: #c8f542; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }

        @media(max-width: 720px) {
          .cert-card { grid-template-columns: 1fr; }
          .cert-img-box { min-height: 180px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .cert-timeline::before { left: 14px; }
          .cert-wrap { padding: 0 1.2rem; }
        }
      `}</style>

      <div className="cert-root">
        <div className="cert-glow" />
        <div className="cert-wrap">

          <p className="cert-eyebrow">My Achievements</p>
          <h1 className="cert-heading">CERTI<span>FICATES</span></h1>
          <p className="cert-sub">{certs.length} certifications earned through courses, internships & events</p>

          <div className="cert-timeline">
            {certs.map((c) => (
              <div className="cert-row" key={c.id}>
                <div className="cert-dot-col">
                  <div className="cert-dot" style={{ borderColor: c.color, boxShadow: `0 0 10px ${c.color}55` }} />
                </div>
                <div className="cert-card">
                  <div className="cert-img-box" onClick={() => setSelected(c)}>
                    <img
                      src={c.image}
                      alt={c.title}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="cert-img-placeholder"><span>🏅</span><div>Add image:<br/><code style="font-size:11px;color:#444">public${c.image}</code></div></div>`;
                      }}
                    />
                  </div>
                  <div className="cert-info">
                    <div className="cert-meta">
                      <span className="cert-year" style={{ color: c.color, background: `${c.color}15`, border: `1px solid ${c.color}30` }}>{c.year}</span>
                      <span className="cert-duration">{c.duration}</span>
                    </div>
                    <h3 className="cert-title">{c.title}</h3>
                    <p className="cert-issuer">Issued by {c.issuer}</p>
                    <p className="cert-desc">{c.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="lb-overlay" onClick={() => setSelected(null)}>
          <div className="lb-box" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setSelected(null)}>✕</button>
            <img className="lb-img" src={selected.image} alt={selected.title} />
            <div className="lb-footer">
              <div className="lb-title">{selected.title}</div>
              <div className="lb-issuer">Issued by {selected.issuer}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import React, { useEffect, useRef } from 'react';

const skills = [
  { cat: 'Languages',        icon: '⌨', items: ['C (Basics)', 'Python (Basics)', 'Java (Basics)'] },
  { cat: 'Web Technologies', icon: '🌐', items: ['HTML', 'CSS', 'JSP', 'React', 'Flutter'] },
  { cat: 'Database',         icon: '🗄', items: ['SQL (Basics)', 'MySQL'] },
  { cat: 'Tools',            icon: '🛠', items: ['MS Word', 'MS Excel', 'MS PowerPoint', 'Power BI (Basics)'] },
];

const facts = [
  { icon: '📍', label: 'Location',  value: 'Hyderabad, Telangana' },
  { icon: '🎓', label: 'Education', value: 'B.Tech IT — BRECW (81%)' },
  { icon: '📅', label: 'Born',      value: '17 November 2006' },
  { icon: '🗣️', label: 'Languages', value: 'Telugu, Hindi,English' },
  { icon: '📧', label: 'Email',     value: 'laxmisreeporeddy@gmail.com' },
  { icon: '📞', label: 'Phone',     value: '7416598126' },
];

export default function About() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let frame = 0;

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.4 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,245,66,${d.o})`;
        ctx.fill();
      });
      // draw lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(200,245,66,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    }

    draw();
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ab-root { position: relative; min-height: 100vh; background: #06060f; overflow: hidden; font-family: 'DM Sans', sans-serif; }

        /* canvas bg */
        .ab-canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }

        /* orbs */
        .ab-orb1 { position: fixed; top: -120px; right: -80px; width: 480px; height: 480px; border-radius: 50%; background: radial-gradient(circle, rgba(200,245,66,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .ab-orb2 { position: fixed; bottom: -100px; left: -60px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(100,180,255,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }

        .ab-content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 5rem 3rem 6rem; }

        /* hero */
        .ab-hero { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 2rem; margin-bottom: 5rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 3rem; }
        .ab-eyebrow { font-size: 0.7rem; letter-spacing: 0.18em; color: #c8f542; text-transform: uppercase; margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.6s 0.1s forwards; }
        .ab-name { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3.5rem, 9vw, 7rem); color: #f0ede8; line-height: 0.9; letter-spacing: 0.02em; opacity: 0; animation: fadeUp 0.7s 0.2s forwards; }
        .ab-name span { color: #c8f542; }
        .ab-tagline { margin-top: 1.2rem; font-size: 1rem; color: #555; font-weight: 300; max-width: 480px; line-height: 1.8; opacity: 0; animation: fadeUp 0.7s 0.35s forwards; }
        .ab-badge { background: rgba(200,245,66,0.08); border: 1px solid rgba(200,245,66,0.2); border-radius: 12px; padding: 1.2rem 1.8rem; text-align: center; opacity: 0; animation: fadeUp 0.7s 0.4s forwards; }
        .ab-badge-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; color: #c8f542; line-height: 1; }
        .ab-badge-txt { font-size: 0.72rem; color: #555; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; }

        /* two col */
        .ab-two { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; margin-bottom: 5rem; align-items: start; }

        /* bio */
        .ab-bio-label { font-size: 0.68rem; letter-spacing: 0.14em; color: #c8f542; text-transform: uppercase; margin-bottom: 1rem; opacity: 0; animation: fadeUp 0.6s 0.5s forwards; }
        .ab-bio-text { font-size: 0.95rem; color: #666; font-weight: 300; line-height: 2; opacity: 0; animation: fadeUp 0.7s 0.6s forwards; }
        .ab-bio-text b { color: #c8f542; font-weight: 500; }

        /* facts */
        .ab-facts { display: flex; flex-direction: column; gap: 0; opacity: 0; animation: fadeUp 0.7s 0.55s forwards; }
        .ab-fact { display: grid; grid-template-columns: 28px 90px 1fr; align-items: center; gap: 10px; padding: 0.85rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.83rem; }
        .ab-fact:last-child { border-bottom: none; }
        .ab-fact-icon { font-size: 0.95rem; }
        .ab-fact-lbl { color: #444; font-weight: 300; text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.7rem; }
        .ab-fact-val { color: #aaa; font-weight: 300; }

        /* skills */
        .ab-skills-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; opacity: 0; animation: fadeUp 0.6s 0.7s forwards; }
        .ab-skills-title { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #f0ede8; }
        .ab-skills-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .ab-skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem; opacity: 0; animation: fadeUp 0.7s 0.8s forwards; }
        .ab-skill-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 1.4rem; transition: border-color 0.3s, transform 0.3s; }
        .ab-skill-card:hover { border-color: rgba(200,245,66,0.3); transform: translateY(-4px); }
        .ab-skill-top { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
        .ab-skill-icon { font-size: 1.1rem; }
        .ab-skill-cat { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #c8f542; }
        .ab-skill-item { font-size: 0.83rem; color: #555; font-weight: 300; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.03); transition: color 0.2s; }
        .ab-skill-item:last-child { border-bottom: none; }
        .ab-skill-item:hover { color: #c8f542; }

        /* strengths strip */
        .ab-strengths { margin-top: 4rem; padding: 2rem; background: rgba(200,245,66,0.04); border: 1px solid rgba(200,245,66,0.1); border-radius: 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; opacity: 0; animation: fadeUp 0.7s 0.9s forwards; }
        .ab-strength { display: flex; align-items: flex-start; gap: 10px; }
        .ab-strength-dot { width: 5px; height: 5px; border-radius: 50%; background: #c8f542; margin-top: 7px; flex-shrink: 0; }
        .ab-strength-txt { font-size: 0.85rem; color: #666; font-weight: 300; line-height: 1.6; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:700px) { .ab-hero { grid-template-columns: 1fr; } .ab-two { grid-template-columns: 1fr; gap: 2.5rem; } .ab-content { padding: 4rem 1.5rem; } }
      `}</style>

      <div className="ab-root">
        <canvas ref={canvasRef} className="ab-canvas" />
        <div className="ab-orb1" />
        <div className="ab-orb2" />

        <div className="ab-content">

          {/* ── Hero ── */}
          <div className="ab-hero">
            <div>
              <p className="ab-eyebrow">Full-Stack Developer · Hyderabad, India</p>
              <h1 className="ab-name">POREDDY<br /><span>LAXMISREE</span></h1>
              <p className="ab-tagline">
                Passionate about building real-world web applications — from clean UIs to robust backends.
                Currently pursuing B.Tech IT at BRECW with 81% till 6th Semester.
              </p>
            </div>
            <div>
              <div className="ab-badge">
                <div className="ab-badge-num">81%</div>
                <div className="ab-badge-txt">Academic Score</div>
              </div>
            </div>
          </div>

          {/* ── Bio + Facts ── */}
          <div className="ab-two">
            <div>
              <p className="ab-bio-label">About Me</p>
              <p className="ab-bio-text">
                <b>Hi!, I'm Poreddy Laxmisree</b> an aspiring web developer with a passion for building innovative and user-friendly web applications.
                I am constantly exploring technologies and currently strengthening my skills in <b>React, Node.js, and MongoDB</b>.<br></br>I am eager to take on new challenges and learn from every experience.<br></br>I'm 
                <b> open to internships and freelance oppurtunities</b> where i can gain valuable experience and continue my journey in the tech industry.
              </p>
            </div>
            <div className="ab-facts">
              {facts.map((f, i) => (
                <div className="ab-fact" key={i}>
                  <span className="ab-fact-icon">{f.icon}</span>
                  <span className="ab-fact-lbl">{f.label}</span>
                  <span className="ab-fact-val">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Skills ── */}
          <div className="ab-skills-head">
            <h2 className="ab-skills-title">Skills</h2>
            <div className="ab-skills-line" />
          </div>
          <div className="ab-skills-grid">
            {skills.map(s => (
              <div className="ab-skill-card" key={s.cat}>
                <div className="ab-skill-top">
                  <span className="ab-skill-icon">{s.icon}</span>
                  <span className="ab-skill-cat">{s.cat}</span>
                </div>
                {s.items.map(item => <div className="ab-skill-item" key={item}>{item}</div>)}
              </div>
            ))}
          </div>

          {/* ── Strengths ── */}
          <div className="ab-strengths">
            {['Self-confidence and hardworking personality', 'Fast learning ability and willingness to learn', 'Interested in facing new challenges and growing every day'].map((s, i) => (
              <div className="ab-strength" key={i}>
                <div className="ab-strength-dot" />
                <span className="ab-strength-txt">{s}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
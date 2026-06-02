'use client';
/* eslint-disable */
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Positions are carefully placed so NO card is cut off at edges.
// x/y = center of card in %, adjusted so card stays within bounds with padding.
// sz = card width/height in px. fa = float animation variant.
const TECHS = [
  // Row 1 — top, 3 large primary techs, well inset from edges
  { name:'Python',     emoji:'🐍', color:'#3b82f6', cat:'Language',   x:26,  y:12,  sz:108, fa:'a', dur:6.2 },
  { name:'Django',     emoji:'🟢', color:'#22c55e', cat:'Framework',  x:55,  y:12,   sz:108, fa:'b', dur:7.1 },
  { name:'FastAPI',    emoji:'⚡', color:'#06b6d4', cat:'Framework',  x:84,  y:12,  sz:108, fa:'c', dur:5.8 },
  // Row 2
  { name:'DRF',        emoji:'🔗', color:'#22c55e', cat:'Framework',  x:35,  y:30,  sz:90,  fa:'c', dur:6.8 },
  { name:'PostgreSQL', emoji:'🐘', color:'#3b82f6', cat:'Database',   x:65,  y:30,  sz:90,  fa:'a', dur:7.5 },
  { name:'Flask',      emoji:'🫙', color:'#94a3b8', cat:'Framework',  x:91,  y:33,  sz:84,  fa:'b', dur:8.2 },
  // Row 3
  { name:'MySQL',      emoji:'🗄️', color:'#f59e0b', cat:'Database',   x:20,  y:48,  sz:88,  fa:'b', dur:5.6 },
  { name:'MongoDB',    emoji:'🍃', color:'#22c55e', cat:'Database',   x:43,  y:50,  sz:88,  fa:'a', dur:9.0 },
  { name:'Redis',      emoji:'🔴', color:'#ef4444', cat:'Cache',      x:71,  y:47,  sz:88,  fa:'c', dur:6.3 },
  { name:'Celery',     emoji:'🌿', color:'#22c55e', cat:'Task Queue', x:92,  y:52,  sz:82,  fa:'a', dur:7.3 },
  // Row 4
  { name:'Docker',     emoji:'🐳', color:'#0ea5e9', cat:'DevOps',     x:18,  y:67,  sz:80,  fa:'c', dur:8.1 },
  { name:'Scrapy',     emoji:'🕷️', color:'#0ea5e9', cat:'Scraping',   x:37,  y:69,  sz:78,  fa:'b', dur:8.8 },
  { name:'Selenium',   emoji:'🤖', color:'#94a3b8', cat:'Scraping',   x:56,  y:67,  sz:78,  fa:'a', dur:5.2 },
  { name:'Pandas',     emoji:'🐼', color:'#3b82f6', cat:'Data',       x:74,  y:69,  sz:78,  fa:'c', dur:7.2 },
  { name:'OpenCV',     emoji:'👁️', color:'#ef4444', cat:'AI/CV',      x:91,  y:67,  sz:76,  fa:'b', dur:6.7 },
  // Row 5 — bottom
  { name:'Stripe',     emoji:'💳', color:'#6366f1', cat:'Payment',    x:10,  y:86,  sz:74,  fa:'a', dur:7.1 },
  { name:'NGINX',      emoji:'🔧', color:'#22c55e', cat:'DevOps',     x:28,  y:88,  sz:72,  fa:'b', dur:5.9 },
  { name:'Linux',      emoji:'🐧', color:'#f59e0b', cat:'DevOps',     x:47,  y:86,  sz:72,  fa:'c', dur:9.1 },
  { name:'Git',        emoji:'📦', color:'#f97316', cat:'Tools',      x:67,  y:88,  sz:70,  fa:'a', dur:6.4 },
  { name:'Postman',    emoji:'🚀', color:'#f97316', cat:'Tools',      x:86,  y:86,  sz:70,  fa:'b', dur:5.3 },
];

const CATS = ['All', 'Language', 'Framework', 'Database', 'DevOps'];

export default function TechEcosystem() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active,  setActive]  = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);

  const list = active === 'All' ? TECHS : TECHS.filter(t => t.cat === active);

  return (
    <section id="tech" ref={ref} style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Float keyframes */}
      <style>{`
        @keyframes fA { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-13px) rotate(1deg)} 70%{transform:translateY(-5px) rotate(-0.5deg)} }
        @keyframes fB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(1.8deg)} }
        @keyframes fC { 0%,100%{transform:translateY(0) rotate(0deg)} 35%{transform:translateY(-9px) rotate(-1deg)} 65%{transform:translateY(-3px) rotate(0.4deg)} }
        .fa { animation: fA var(--dur,6s) ease-in-out infinite; }
        .fb { animation: fB var(--dur,7s) ease-in-out infinite; }
        .fc { animation: fC var(--dur,5s) ease-in-out infinite; }
      `}</style>

      <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: .18 }} />
      <div className="orb"    style={{ width: 500, height: 500, background: 'rgba(37,99,235,0.05)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="chip" style={{ marginBottom: 14, display: 'inline-flex' }}>Tech Stack</span>
          <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f0f2f8', marginTop: 12 }}>
            Technology <span className="gt">Ecosystem</span>
          </h2>
          <p style={{ color: '#475569', fontSize: 16, marginTop: 10 }}>Tools and technologies powering every production system I build</p>
        </motion.div>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{ padding: '6px 18px', borderRadius: 99, border: '1px solid', borderColor: active === c ? 'rgba(37,99,235,0.55)' : 'rgba(37,99,235,0.15)', background: active === c ? 'rgba(37,99,235,0.14)' : 'transparent', color: active === c ? '#60a5fa' : '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}
            >{c}</button>
          ))}
        </div>

        {/* ── Floating canvas ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: .5, delay: .2 }}
          style={{
            position: 'relative',
            width: '100%',
            height: 560,
            // borderRadius: 28,
            // Clip overflow so nothing pokes out
            overflow: 'hidden',
            // background: 'linear-gradient(180deg, rgba(11,15,26,0.55) 0%, rgba(6,9,18,0.80) 100%)',
            // border: '1px solid rgba(37,99,235,0.09)',
            // boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          {/* Subtle grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(37,99,235,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

          {/* Ambient glow blobs */}
          <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'rgba(37,99,235,0.04)', filter: 'blur(60px)', top: '25%', left: '35%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(14,165,233,0.04)', filter: 'blur(50px)', bottom: '15%', right: '15%', pointerEvents: 'none' }} />

          {list.map((t, i) => {
            const isH  = hovered === t.name;
            // Convert center% to actual pixels for absolute positioning
            // We'll use calc() so the card is centered at x%,y% regardless of container size
            // Card is already clipped by overflow:hidden above, so no cut-off
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: .3, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: .5, ease: [.34, 1.56, .64, 1] }}
                className={`f${t.fa}`}
                style={{
                  position: 'absolute',
                  // Center the card at the specified x/y percentage
                  left: `calc(${t.x}% - ${t.sz / 2}px)`,
                  top:  `calc(${t.y}% - ${t.sz / 2}px)`,
                  '--dur': `${t.dur}s`,
                  animationDelay: `${(i * 0.28) % 3.5}s`,
                  zIndex: isH ? 20 : 1,
                  cursor: 'default',
                } as React.CSSProperties}
                onMouseEnter={() => setHovered(t.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  width:  t.sz,
                  height: t.sz,
                  borderRadius: Math.round(t.sz * 0.22),
                  // Transparent normally — no box visible
                  background: isH ? `${t.color}16` : 'transparent',
                  // No border at all normally; only appears on hover
                  border: isH ? `1.5px solid ${t.color}50` : '1.5px solid transparent',
                  backdropFilter: isH ? 'blur(8px)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                  boxShadow: isH ? `0 10px 36px ${t.color}22` : 'none',
                  transition: 'background .25s, border .25s, box-shadow .25s, transform .25s',
                  transform: isH ? 'scale(1.16)' : 'scale(1)',
                }}>
                  {/* Emoji icon */}
                  <span style={{
                    fontSize: Math.round(t.sz * 0.40),
                    lineHeight: 1,
                    filter: isH
                      ? `drop-shadow(0 0 10px ${t.color}70)`
                      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.65))',
                    transition: 'filter .25s',
                    display: 'block',
                    textAlign: 'center',
                  }}>
                    {t.emoji}
                  </span>

                  {/* Label */}
                  <span style={{
                    fontSize: Math.max(10, Math.round(t.sz * 0.115)),
                    fontWeight: 600,
                    color: isH ? '#f0f2f8' : 'rgba(148,163,184,0.92)',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    textShadow: '0 1px 5px rgba(0,0,0,0.85)',
                    transition: 'color .25s',
                    userSelect: 'none',
                  }}>
                    {t.name}
                  </span>

                  {/* Category — only on hover */}
                  {isH && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .15 }}
                      style={{ fontSize: 9, color: t.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '2px 7px', background: `${t.color}20`, borderRadius: 99 }}
                    >
                      {t.cat}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Size legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginTop: 16, flexWrap: 'wrap' }}>
          {[{ l: 'Core techs', d: 14 }, { l: 'Primary stack', d: 11 }, { l: 'Supporting tools', d: 8 }].map(({ l, d }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#334155' }}>
              <div style={{ width: d, height: d, borderRadius: 3, background: 'rgba(37,99,235,0.28)', border: '1px solid rgba(37,99,235,0.4)' }} />
              {l}
            </div>
          ))}
          <span style={{ fontSize: 12, color: '#1e293b' }}>· Hover to reveal · Filter by category</span>
        </div>
      </div>
    </section>
  );
}

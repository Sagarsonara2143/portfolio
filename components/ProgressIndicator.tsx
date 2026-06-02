'use client';
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id:'home',         label:'Home' },
  { id:'about',        label:'About' },
  { id:'expertise',    label:'Expertise' },
  { id:'experience',   label:'Experience' },
  { id:'projects',     label:'Projects' },
  { id:'architecture', label:'Architecture' },
  { id:'tech',         label:'Tech Stack' },
  { id:'github',       label:'GitHub' },
  { id:'philosophy',   label:'Philosophy' },
  { id:'testimonials', label:'Testimonials' },
  { id:'resume',       label:'Resume' },
  { id:'contact',      label:'Contact' },
];

export default function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:200, damping:30 });
  const [active, setActive] = useState('home');
  const [tooltip, setTooltip] = useState<string|null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin:'-40% 0px -55% 0px' },
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin:'0%', position:'fixed', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#2563eb,#0ea5e9,#38bdf8)', zIndex:100 }}
      />

      {/* Side capsule navigation */}
      <div
        className="side-dots"
        style={{ position:'fixed', right:16, top:'50%', transform:'translateY(-50%)', zIndex:40, display:'flex', flexDirection:'column', gap:4, alignItems:'flex-end' }}
      >
        {/* Capsule track */}
        <div style={{ position:'relative', display:'flex', flexDirection:'column', gap:4, padding:'8px 6px', background:'rgba(11,15,26,0.75)', backdropFilter:'blur(10px)', border:'1px solid rgba(37,99,235,0.1)', borderRadius:99 }}>
          {SECTIONS.map(s => (
            <div key={s.id} style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
              {/* Tooltip on hover */}
              <AnimatePresence>
                {tooltip === s.id && (
                  <motion.div
                    initial={{ opacity:0, x:6, scale:.95 }}
                    animate={{ opacity:1, x:0, scale:1 }}
                    exit={{ opacity:0, x:6, scale:.95 }}
                    transition={{ duration:.15 }}
                    style={{ position:'absolute', right:20, background:'rgba(11,15,26,0.97)', border:'1px solid rgba(37,99,235,0.25)', borderRadius:8, padding:'4px 12px', fontSize:12, fontWeight:500, color:'#f0f2f8', whiteSpace:'nowrap', pointerEvents:'none', boxShadow:'0 4px 16px rgba(0,0,0,.4)' }}
                  >
                    {s.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dot / capsule */}
              <motion.button
                onClick={() => scrollTo(s.id)}
                onMouseEnter={() => setTooltip(s.id)}
                onMouseLeave={() => setTooltip(null)}
                animate={{
                  width:  active === s.id ? 20 : 6,
                  height: active === s.id ? 8  : 6,
                  backgroundColor: active === s.id ? '#2563eb' : 'rgba(255,255,255,0.12)',
                  borderRadius: active === s.id ? 99 : 99,
                }}
                transition={{ duration:.25, ease:'easeInOut' }}
                style={{ border:'none', cursor:'pointer', padding:0, display:'block', boxShadow: active===s.id ? '0 0 10px rgba(37,99,235,0.7)' : 'none' }}
                aria-label={`Go to ${s.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

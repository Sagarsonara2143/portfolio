'use client';
/* eslint-disable */
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      style={{
        width: 380,
        flexShrink: 0,
        background: 'rgba(11,15,26,0.92)',
        border: '1px solid rgba(37,99,235,0.12)',
        borderRadius: 20,
        padding: '28px',
        margin: '0 12px',
        transition: 'border-color .25s, transform .25s',
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = t.color + '45'; el.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(37,99,235,0.12)'; el.style.transform = 'none'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
        <Quote size={26} color={t.color} style={{ opacity:.4 }}/>
        <div style={{ display:'flex', gap:3 }}>
          {[...Array(t.rating)].map((_,i) => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b"/>)}
        </div>
      </div>
      <p style={{ fontSize:15, color:'#94a3b8', lineHeight:1.82, marginBottom:22, fontStyle:'italic' }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:12, borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:18 }}>
        <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg,'+t.color+','+t.color+'70)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', flexShrink:0, boxShadow:'0 0 16px '+t.color+'40' }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'#f0f2f8' }}>{t.name}</div>
          <div style={{ fontSize:12, color:'#475569' }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [paused, setPaused] = useState(false);

  // Single row — duplicate for seamless loop
  const row = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.15 }}/>

      <motion.div
        initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
        style={{ textAlign:'center', marginBottom:52, padding:'0 24px' }}
      >
        <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Testimonials</span>
        <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
          What People <span className="gt">Say</span>
        </h2>
        <p style={{ color:'#475569', fontSize:16, marginTop:12 }}>Feedback from managers, colleagues, and clients</p>
      </motion.div>

      {/* Single scrolling row */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ overflow:'hidden', position:'relative' }}
      >
        <div className={paused ? 'scroll-track paused' : 'scroll-track'}>
          {row.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>

      {/* Edge fades */}
      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:140, background:'linear-gradient(to right,#060912,transparent)', pointerEvents:'none', zIndex:2 }}/>
      <div style={{ position:'absolute', top:0, right:0, bottom:0, width:140, background:'linear-gradient(to left,#060912,transparent)', pointerEvents:'none', zIndex:2 }}/>

      <style>{`
        @keyframes scrollL { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .scroll-track { display:flex; width:max-content; animation:scrollL 40s linear infinite; }
        .scroll-track.paused { animation-play-state:paused; }
      `}</style>
    </section>
  );
}

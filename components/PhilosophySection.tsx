'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Layers, CheckSquare, Zap, Lightbulb, BookOpen } from 'lucide-react';
import { philosophyCards } from '@/lib/data';

const ICONS: Record<string, React.FC<{size:number;color:string}>> = {
  Code2, Layers, CheckSquare, Zap, Brain: Lightbulb, BookOpen,
};
const COLORS = ['#3b82f6','#0ea5e9','#38bdf8','#22c55e','#f59e0b','#60a5fa'];

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="philosophy" ref={ref} style={{ padding:'100px 24px', background:'#0b0f1a', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Engineering Principles</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            How I <span className="gt">Work</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12, maxWidth:480, margin:'12px auto 0' }}>The principles that guide every architectural decision and line of code</p>
        </motion.div>

        <div className="phil-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
          {philosophyCards.map((card, i) => {
            const color = COLORS[i % COLORS.length];
            const Icon = ICONS[card.icon] || Code2;
            return (
              <motion.div key={card.title} initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:.08+i*.07 }}
                style={{ background:'rgba(11,15,26,0.9)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:'26px 22px', cursor:'default', transition:'all .25s' }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=color+'35'; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 16px 48px '+color+'0f'; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.06)'; el.style.transform='none'; el.style.boxShadow='none'; }}
              >
                <div style={{ width:46, height:46, borderRadius:13, background:color+'18', border:'1px solid '+color+'28', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <Icon size={20} color={color}/>
                </div>
                <h3 style={{ fontSize:16, fontWeight:700, color:'#f0f2f8', marginBottom:10, letterSpacing:'-0.01em' }}>{card.title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.75 }}>{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Database, Zap, Terminal } from 'lucide-react';
import { expertise } from '@/lib/data';

const ICONS: Record<string, React.FC<{size:number;color:string}>> = {
  Server, Database, Zap, Terminal,
};

export default function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  return (
    <section id="expertise" ref={ref} style={{ padding:'100px 24px', background:'#0b0f1a', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>What I Do</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            Core <span className="gt">Expertise</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12, maxWidth:480, margin:'12px auto 0' }}>Technical areas where I deliver the most value</p>
        </motion.div>

        <div className="expertise-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {expertise.map((card, i) => {
            const Icon = ICONS[card.icon] || Server;
            return (
              <motion.div key={card.title} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.5, delay:.1+i*.1 }}
                style={{ background:'rgba(11,15,26,0.9)', border:'1px solid rgba(37,99,235,0.1)', borderRadius:20, padding:'32px', cursor:'default', transition:'all .25s' }}
                onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=card.color+'45'; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 20px 60px '+card.color+'12'; }}
                onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(37,99,235,0.1)'; el.style.transform='none'; el.style.boxShadow='none'; }}
              >
                <div style={{ width:52, height:52, borderRadius:14, background:card.color+'18', border:'1px solid '+card.color+'30', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <Icon size={22} color={card.color}/>
                </div>
                <h3 style={{ fontSize:18, fontWeight:700, color:'#f0f2f8', marginBottom:10, letterSpacing:'-0.01em' }}>{card.title}</h3>
                <p style={{ fontSize:14, color:'#64748b', lineHeight:1.75, marginBottom:20 }}>{card.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {card.skills.map(s => (
                    <span key={s} style={{ padding:'4px 10px', background:card.color+'10', border:'1px solid '+card.color+'25', borderRadius:6, fontSize:12, fontWeight:500, color:card.color }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

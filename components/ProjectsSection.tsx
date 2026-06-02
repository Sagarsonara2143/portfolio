'use client';
/* eslint-disable */
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '@/lib/data';

function Card({ p, i, inView }: { p: typeof projects[0]; i:number; inView:boolean }) {
  const [exp, setExp] = useState(false);
  return (
    <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6, delay:i*.12 }}
      style={{ background:'rgba(11,15,26,0.92)', border:'1px solid '+p.color+'22', borderRadius:24, overflow:'hidden', transition:'border-color .25s' }}
      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=p.color+'50'; }}
      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=p.color+'22'; }}
    >
      <div style={{ height:3, background:'linear-gradient(90deg,'+p.color+','+p.color+'60)' }}/>
      <div style={{ padding:'26px 30px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:22 }}>
          <div>
            <div style={{ display:'flex', gap:8, marginBottom:8, flexWrap:'wrap' }}>
              <span style={{ padding:'3px 10px', background:p.color+'18', border:'1px solid '+p.color+'30', borderRadius:99, fontSize:11, fontWeight:700, color:p.color, letterSpacing:'.06em' }}>{p.tag}</span>
              <span style={{ padding:'3px 10px', background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.15)', borderRadius:99, fontSize:11, fontWeight:600, color:'#60a5fa' }}>{p.company}</span>
            </div>
            <h3 style={{ fontSize:19, fontWeight:800, color:'#f0f2f8', margin:0, letterSpacing:'-0.02em' }}>{p.title}</h3>
          </div>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.18)', borderRadius:8, fontSize:12, color:'#60a5fa', textDecoration:'none', transition:'background .2s', flexShrink:0 }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.18)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.08)'; }}
          ><GitBranch size={13}/>GitHub</a>
        </div>

        {/* Content */}
        <div className="proj-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8 }}>Problem</div>
            <p style={{ fontSize:14, color:'#64748b', lineHeight:1.75, marginBottom:18 }}>{p.problem}</p>
            <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8 }}>Solution</div>
            <p style={{ fontSize:14, color:'#64748b', lineHeight:1.75 }}>{p.solution}</p>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Business Impact</div>
            <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:18 }}>
              {p.impact.map(im => (
                <div key={im} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                  <span style={{ color:'#22c55e', fontSize:13, fontWeight:700, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:13, color:'#86efac', lineHeight:1.5 }}>{im}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:8 }}>Stack</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {p.tech.map(t => <span key={t} style={{ padding:'3px 9px', background:p.color+'12', border:'1px solid '+p.color+'28', borderRadius:5, fontSize:11, fontWeight:600, color:p.color }}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* Features expand */}
        <AnimatePresence>
          {exp && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
              style={{ overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:16, marginBottom:16 }}
            >
              <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10 }}>Key Features</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {p.features.map(f => <span key={f} style={{ padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, fontSize:13, color:'#cbd5e1' }}>{f}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setExp(v => !v)}
          style={{ display:'flex', alignItems:'center', gap:5, background:'none', border:'none', cursor:'pointer', color:'#334155', fontSize:13, padding:0, transition:'color .2s' }}
          onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='#60a5fa'; }}
          onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='#334155'; }}
        >
          {exp ? <><ChevronUp size={13}/>Hide details</> : <><ChevronDown size={13}/>View details</>}
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all'|'featured'>('all');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const list = filter === 'featured' ? projects.filter(p => p.featured) : projects;

  return (
    <section id="projects" ref={ref} style={{ padding:'100px 24px', background:'#0b0f1a', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:44 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Portfolio</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            Key Projects & <span className="gt">Impact</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12 }}>Production systems built to solve real business problems</p>
        </motion.div>

        <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:36 }}>
          {(['all','featured'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:'7px 20px', borderRadius:10, border:'1px solid', borderColor:filter===f?'rgba(37,99,235,0.5)':'rgba(37,99,235,0.12)', background:filter===f?'rgba(37,99,235,0.1)':'transparent', color:filter===f?'#60a5fa':'#64748b', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all .2s', textTransform:'capitalize' }}
            >{f === 'all' ? 'All Projects' : 'Featured'}</button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
          {list.map((p, i) => <Card key={p.id} p={p} i={i} inView={inView}/>)}
        </div>
      </div>
    </section>
  );
}

'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { experience } from '@/lib/data';

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="experience" ref={ref} style={{ padding:'100px 24px', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div style={{ maxWidth:960, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:64 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Career</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            Work <span className="gt">Experience</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12 }}>3+ years building production systems across multiple companies</p>
        </motion.div>

        <div style={{ position:'relative' }}>
          {/* Timeline line */}
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:'linear-gradient(to bottom,#2563eb,#0ea5e9,rgba(14,165,233,0.1))', borderRadius:2 }}/>

          {experience.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity:0, x:-28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.15+i*.15 }}
              style={{ marginLeft:28, marginBottom: i<experience.length-1 ? 32 : 0, position:'relative' }}
            >
              {/* Timeline dot */}
              <div style={{ position:'absolute', left:-36, top:26, width:16, height:16, borderRadius:'50%', background:job.color, border:'3px solid #060912', boxShadow:'0 0 16px '+job.color+'70', zIndex:2 }}/>

              <div style={{ background:'rgba(11,15,26,0.9)', border:'1px solid '+job.color+'22', borderRadius:20, padding:'24px 28px', transition:'border-color .25s' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=job.color+'50'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=job.color+'22'; }}
              >
                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10, marginBottom:18 }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:5 }}>
                      <h3 style={{ fontSize:19, fontWeight:800, color:'#f0f2f8', letterSpacing:'-0.02em', margin:0 }}>{job.company}</h3>
                      {job.current && (
                        <span style={{ padding:'3px 10px', background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:99, fontSize:11, fontWeight:700, color:'#22c55e' }}>CURRENT</span>
                      )}
                    </div>
                    <div style={{ fontSize:15, fontWeight:600, color:job.color, marginBottom:7 }}>{job.role}</div>
                    <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                      <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:'#475569' }}><Calendar size={13}/>{job.duration}</span>
                      <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:'#475569' }}><MapPin size={13}/>{job.location}</span>
                      <span style={{ padding:'2px 8px', background:'rgba(37,99,235,0.09)', borderRadius:4, fontSize:12, color:'#60a5fa' }}>{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="exp-inner" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:10 }}>Responsibilities</div>
                    {job.desc.map(d => (
                      <div key={d} style={{ display:'flex', gap:9, marginBottom:7 }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:job.color, marginTop:7, flexShrink:0 }}/>
                        <span style={{ fontSize:13, color:'#94a3b8', lineHeight:1.65 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#1e293b', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:10 }}>Impact</div>
                    {job.impact.map(im => (
                      <div key={im} style={{ display:'flex', gap:8, marginBottom:7 }}>
                        <span style={{ color:'#22c55e', fontSize:13, flexShrink:0 }}>✓</span>
                        <span style={{ fontSize:13, color:'#86efac', lineHeight:1.65 }}>{im}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech */}
                <div style={{ marginTop:18, paddingTop:16, borderTop:'1px solid rgba(37,99,235,0.07)', display:'flex', flexWrap:'wrap', gap:5 }}>
                  {job.tech.map(t => <span key={t} className="pill">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

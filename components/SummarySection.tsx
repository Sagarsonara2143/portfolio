'use client';
/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats } from '@/lib/data';

function Counter({ target, suffix }: { target:number; suffix:string }) {
  const [n, setN] = useState(0);
  const r = useRef<HTMLSpanElement>(null);
  const inView = useInView(r, { once:true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / 45;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(t); }
      else setN(Math.floor(v));
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={r}>{n}{suffix}</span>;
}

export default function SummarySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="about" ref={ref} style={{ padding:'100px 24px', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.22 }}/>
      <div className="orb" style={{ width:500, height:500, background:'rgba(14,165,233,0.05)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:60 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>About Me</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            Who I <span className="gt">Am</span>
          </h2>
        </motion.div>

        <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          {/* Bio */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.2 }}>
            <p style={{ fontSize:17, color:'#94a3b8', lineHeight:1.85, marginBottom:22 }}>
              I&apos;m <strong style={{ color:'#f0f2f8', fontWeight:700 }}>Sagar Sonara</strong> — a Python Developer with <strong style={{ color:'#60a5fa' }}>3+ years</strong> of hands-on experience building scalable backend systems, RESTful APIs, and enterprise-grade web applications from Ahmedabad, India.
            </p>
            <p style={{ fontSize:17, color:'#94a3b8', lineHeight:1.85, marginBottom:28 }}>
              I specialize in <strong style={{ color:'#60a5fa' }}>Django REST Framework, FastAPI, and Flask</strong>, with deep expertise in multi-tenant SaaS architecture, Stripe payment integration, subscription management, web scraping, and process automation. Currently building <strong style={{ color:'#38bdf8' }}>DwERP</strong> — a multi-tenant ERP for the fenestration industry — at MSBC Group.
            </p>

            {/* Key skills */}
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {[
                'Multi-tenant SaaS with schema-based & row-level tenancy',
                'Stripe payment integration, commissions & subscriptions',
                'REST APIs with JWT auth & Role-Based Access Control',
                'Celery/Redis task queues & automation pipelines',
                'PostgreSQL stored procedures & query optimization',
              ].map(item => (
                <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:'linear-gradient(135deg,#2563eb,#0ea5e9)', flexShrink:0, marginTop:7 }}/>
                  <span style={{ color:'#cbd5e1', fontSize:15, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats + availability */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.3 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity:0, scale:.9 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:.4+i*.1 }}
                  style={{ background:'rgba(11,15,26,0.85)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:16, padding:'26px 20px', textAlign:'center', cursor:'default', transition:'border-color .25s, transform .25s' }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(37,99,235,0.4)'; el.style.transform='translateY(-3px)'; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(37,99,235,0.14)'; el.style.transform='none'; }}
                >
                  <div style={{ fontSize:38, fontWeight:900, letterSpacing:'-0.04em', marginBottom:6, lineHeight:1 }} className="gt">
                    <Counter target={s.value} suffix={s.suffix}/>
                  </div>
                  <div style={{ fontSize:13, color:'#64748b', fontWeight:500, lineHeight:1.4 }}>{s.label}</div>
                </motion.div>
              ))}

              <motion.div initial={{ opacity:0, scale:.9 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:.8 }}
                style={{ gridColumn:'1/-1', background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.15)', borderRadius:16, padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}
              >
                <div style={{ width:10, height:10, borderRadius:'50%', background:'#22c55e', flexShrink:0, boxShadow:'0 0 10px rgba(34,197,94,0.6)' }}/>
                <span style={{ color:'#86efac', fontSize:14, fontWeight:500 }}>
                  Open to full-time & freelance · {personalInfo.location} · Remote-friendly
                </span>
              </motion.div>

              {/* Currently building */}
              <motion.div initial={{ opacity:0, scale:.9 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:.9 }}
                style={{ gridColumn:'1/-1', background:'rgba(37,99,235,0.06)', border:'1px solid rgba(37,99,235,0.15)', borderRadius:16, padding:'16px 20px' }}
              >
                <div style={{ fontSize:11, color:'#334155', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Currently Building</div>
                <div style={{ fontSize:14, color:'#93c5fd', fontWeight:600 }}>DwERP — Multi-tenant Fenestration ERP @ MSBC Group</div>
                <div style={{ fontSize:13, color:'#475569', marginTop:4 }}>Multi-tenant isolation · Production workflows · Inventory management</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

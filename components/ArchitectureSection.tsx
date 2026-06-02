'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NODES = [
  { label:'Client Application', sub:'Browser · Mobile · Third-party', color:'#3b82f6', icon:'🌐', detail:'React, Next.js, Mobile Apps, Partner APIs, Postman' },
  { label:'API Gateway',         sub:'Auth · Rate Limiting · Routing',  color:'#2563eb', icon:'⚡', detail:'NGINX, FastAPI Gateway, JWT Auth, RBAC, CORS' },
  { label:'Backend Services',    sub:'Business Logic · Processing',      color:'#0ea5e9', icon:'⚙️', detail:'Django DRF, FastAPI, Flask, Celery Workers, Async' },
  { label:'Database Layer',      sub:'Primary DB · Cache · NoSQL',       color:'#38bdf8', icon:'🗄️', detail:'PostgreSQL, MySQL, MongoDB, Redis — with stored procs & indexing' },
  { label:'External Integrations', sub:'APIs · Webhooks · Payment',    color:'#7dd3fc', icon:'🔌', detail:'Stripe, Google APIs, WhatsApp, Email, Third-party REST APIs' },
  { label:'Monitoring & Deployment', sub:'Docker · NGINX · Cloudflare', color:'#bae6fd', icon:'📊', detail:'Docker, NGINX, NSSM, Cloudflare SSL, GitLab CI, 99.9% uptime' },
];

const STATS = [
  { value:'99.9%', label:'Uptime SLA' },
  { value:'<150ms', label:'API Response' },
  { value:'1000+', label:'Concurrent Users' },
  { value:'0', label:'Downtime Deploys' },
];

export default function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="architecture" ref={ref} style={{ padding:'100px 24px', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div className="orb" style={{ width:500, height:500, background:'rgba(37,99,235,0.06)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>System Design</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            How I Build <span className="gt">Systems</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12, maxWidth:480, margin:'12px auto 0' }}>A layered architecture approach for every production system</p>
        </motion.div>

        <div className="arch-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          {/* Flow diagram */}
          <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.2 }}>
            <div style={{ background:'rgba(11,15,26,0.92)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:24, padding:'26px', overflow:'hidden' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:22 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>)}
                <span style={{ marginLeft:8, fontSize:12, color:'#1e293b', fontFamily:'monospace' }}>system.architecture</span>
              </div>

              {NODES.map((node, i) => (
                <div key={node.label}>
                  <motion.div initial={{ opacity:0, x:-16 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.3+i*.09 }}
                    style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', background:node.color+'0e', border:'1px solid '+node.color+'22', borderRadius:11, cursor:'default', transition:'all .2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=node.color+'55'; (e.currentTarget as HTMLElement).style.background=node.color+'18'; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=node.color+'22'; (e.currentTarget as HTMLElement).style.background=node.color+'0e'; }}
                  >
                    <span style={{ fontSize:18 }}>{node.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'#e2e8f0' }}>{node.label}</div>
                      <div style={{ fontSize:11, color:'#64748b' }}>{node.sub}</div>
                    </div>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:node.color, boxShadow:'0 0 8px '+node.color+'80', flexShrink:0 }}/>
                  </motion.div>

                  {i < NODES.length-1 && (
                    <div style={{ position:'relative', height:20, display:'flex', alignItems:'center', paddingLeft:24 }}>
                      <div style={{ width:2, height:'100%', background:'linear-gradient(to bottom,'+node.color+'50,'+NODES[i+1].color+'50)', position:'absolute', left:21 }}/>
                      <motion.div animate={{ y:[0,5,0], opacity:[.4,1,.4] }} transition={{ duration:1.4, repeat:Infinity, delay:i*.25 }}
                        style={{ width:5, height:5, borderRadius:'50%', background:node.color, position:'absolute', left:18.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Layer details */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.3 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {NODES.map((node, i) => (
                <motion.div key={node.label} initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.4+i*.07 }}
                  style={{ display:'flex', gap:12, padding:'13px 16px', background:'rgba(11,15,26,0.85)', border:'1px solid rgba(37,99,235,0.08)', borderRadius:12, transition:'border-color .2s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=node.color+'35'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.08)'; }}
                >
                  <div style={{ width:34, height:34, borderRadius:9, background:node.color+'18', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:15 }}>{node.icon}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#e2e8f0', marginBottom:3 }}>{node.label}</div>
                    <div style={{ fontSize:12, color:'#64748b' }}>{node.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.8 }}
          style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:36, padding:'22px', background:'rgba(11,15,26,0.85)', border:'1px solid rgba(37,99,235,0.1)', borderRadius:20 }} className="stat-strip"
        >
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontSize:26, fontWeight:900, letterSpacing:'-0.03em', marginBottom:4 }} className="gt">{s.value}</div>
              <div style={{ fontSize:13, color:'#475569' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

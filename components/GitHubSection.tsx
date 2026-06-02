'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, Star, ExternalLink, Activity } from 'lucide-react';

const REPOS = [
  { name:'morinox-backend',      desc:'UK service platform — DRF, PostgreSQL, Stripe, RBAC, subscriptions',    lang:'Python', stars:18, forks:4  },
  { name:'dwerp-api',            desc:'Multi-tenant fenestration ERP — schema-based tenancy, DRF, PostgreSQL', lang:'Python', stars:12, forks:3  },
  { name:'order-management-api', desc:'FastAPI order system with PDF generation, Celery email alerts, MySQL',   lang:'Python', stars:21, forks:7  },
  { name:'automation-engine',    desc:'Celery/Redis scheduling engine with one-time & recurring event support', lang:'Python', stars:15, forks:5  },
];

function contrib(w:number, d:number) {
  const v = ((w*7+d)*1103515245+12345)&0x7fffffff;
  const p = v%100;
  if (p<38) return 0; if (p<58) return 1; if (p<76) return 2; if (p<90) return 3; return 4;
}
const LVL = ['rgba(255,255,255,0.04)','rgba(37,99,235,0.22)','rgba(37,99,235,0.42)','rgba(37,99,235,0.65)','rgba(37,99,235,0.92)'];
const MOS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function GitHubSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="github" ref={ref} style={{ padding:'100px 24px', background:'#0b0f1a', position:'relative', overflow:'hidden', boxSizing:'border-box', width:'100%' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Open Source</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            GitHub <span className="gt">Activity</span>
          </h2>
        </motion.div>

        <div className="gh-top" style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:28, marginBottom:28, alignItems:'start', width:'100%' }}>
          {/* Profile */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.2 }}>
            <div style={{ background:'rgba(11,15,26,0.9)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:20, padding:'24px', textAlign:'center', boxSizing:'border-box', width:'100%', minWidth:0 }}>
              <div style={{ width:68, height:68, borderRadius:'50%', background:'linear-gradient(135deg,#2563eb,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:800, color:'#fff', margin:'0 auto 14px', boxShadow:'0 0 28px rgba(37,99,235,0.4)' }}>SS</div>
              <div style={{ fontSize:16, fontWeight:700, color:'#f0f2f8', marginBottom:4 }}>sagarsonara</div>
              <div style={{ fontSize:13, color:'#64748b', marginBottom:14 }}>Python Developer · Ahmedabad, India</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:14 }}>
                {[['42','Repos'],['89','Followers'],['24','Following']].map(([v,l]) => (
                  <div key={l} style={{ background:'rgba(37,99,235,0.08)', borderRadius:10, padding:'8px 4px', textAlign:'center' }}>
                    <div style={{ fontSize:15, fontWeight:700, color:'#f0f2f8' }}>{v}</div>
                    <div style={{ fontSize:10, color:'#64748b' }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://github.com/sagarsonara2143" target="_blank" rel="noopener noreferrer" className="btn btn-p" style={{ width:'100%', justifyContent:'center', textDecoration:'none', fontSize:13 }}>
                <GitBranch size={13}/> View Profile
              </a>
            </div>
          </motion.div>

          {/* Contribution graph */}
          <motion.div className="hide-mobile" initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.3 }}>
            <div style={{ background:'rgba(11,15,26,0.9)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:20, padding:'22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14, flexWrap:'wrap' }}>
                <Activity size={15} color="#60a5fa"/>
                <span style={{ fontSize:14, fontWeight:600, color:'#f0f2f8' }}>Contribution Activity</span>
                <span style={{ fontSize:12, color:'#64748b' }}>Past 12 months</span>
              </div>
              {/* Graph container with horizontal scroll */}
              <div className="gh-graph-wrapper" style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
                <div style={{ minWidth:650, width:'fit-content' }}>
                  {/* Month labels */}
                  <div style={{ display:'flex', gap:2, marginBottom:4 }}>
                    {MOS.map(m => <span key={m} style={{ width:50, fontSize:9, color:'#334155', textAlign:'center', flexShrink:0 }}>{m}</span>)}
                  </div>
                  {/* Graph */}
                  <div style={{ display:'flex', gap:2 }}>
                    {Array.from({length:52},(_,w) => (
                      <div key={w} style={{ display:'flex', flexDirection:'column', gap:2 }}>
                        {Array.from({length:7},(_,d) => (
                          <div key={d} style={{ width:11, height:11, borderRadius:3, background:LVL[contrib(w,d)], transition:'transform .1s' }}
                            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='scale(1.3)'; }}
                            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform='none'; }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:10, justifyContent:'flex-end', flexWrap:'wrap' }}>
                <span style={{ fontSize:10, color:'#334155' }}>Less</span>
                {LVL.map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:3, background:c }}/>)}
                <span style={{ fontSize:10, color:'#334155' }}>More</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Repos */}
        <div className="gh-repos" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {REPOS.map((r,i) => (
            <motion.div key={r.name} initial={{ opacity:0, y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.4+i*.07 }}>
              <div style={{ background:'rgba(11,15,26,0.9)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'18px', transition:'border-color .2s', height:'100%' }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.35)'; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.06)'; }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <GitBranch size={14} color="#60a5fa"/>
                    <a href="https://github.com/sagarsonara2143" target="_blank" rel="noopener noreferrer" style={{ fontSize:14, fontWeight:600, color:'#60a5fa', textDecoration:'none' }}>{r.name}</a>
                  </div>
                  <ExternalLink size={12} color="#334155"/>
                </div>
                <p style={{ fontSize:12, color:'#64748b', lineHeight:1.6, marginBottom:12 }}>{r.desc}</p>
                <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:9, height:9, borderRadius:'50%', background:'#3b82f6' }}/>
                    <span style={{ fontSize:11, color:'#64748b' }}>{r.lang}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}><Star size={11} color="#f59e0b" fill="#f59e0b"/><span style={{ fontSize:11, color:'#64748b' }}>{r.stars}</span></div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}><GitBranch size={11} color="#64748b"/><span style={{ fontSize:11, color:'#64748b' }}>{r.forks}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

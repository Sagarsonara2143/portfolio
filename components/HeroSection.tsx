'use client';
/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, GitBranch, Link2, ChevronDown } from 'lucide-react';

const TITLES = ['Python Developer', 'Django Engineer', 'FastAPI Specialist', 'Backend Architect', 'Automation Expert', 'API Engineer'];

const CODE: [string, string][] = [
  ['from', 'fastapi import FastAPI, Depends'],
  ['from', '.auth import get_current_user, rbac'],
  ['', ''],
  ['code', 'app = FastAPI(title="Morinox API")'],
  ['', ''],
  ['deco', '@app.get("/api/v1/engineers")'],
  ['def', 'async def list_engineers('],
  ['param', '    user = Depends(rbac("admin")),'],
  ['param', '    db   = Depends(get_db),'],
  ['code', '):'],
  ['comment', '    # Tenant-aware query with RBAC'],
  ['code', '    return await db.engineers.filter('],
  ['code', '        tenant_id=user.tenant_id'],
  ['code', '    ).all()'],
];

function colorize([type, text]: [string, string]): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (type === 'comment') return `<span style="color:#334155;font-style:italic">${esc}</span>`;
  return esc
    .replace(/\b(from|import|async|def|return|await|filter|all)\b/g, '<span style="color:#38bdf8;font-weight:600">$1</span>')
    .replace(/(@\w+(\.\w+)*)/g,   '<span style="color:#f59e0b">$1</span>')
    .replace(/"([^"]*)"/g,         '<span style="color:#86efac">"$1"</span>')
    .replace(/\b(FastAPI|Depends|get_current_user|rbac|get_db)\b/g, '<span style="color:#7dd3fc">$1</span>')
    .replace(/\b(app|user|db)\b/g, '<span style="color:#f0f2f8">$1</span>');
}

export default function HeroSection() {
  const [ti, setTi] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-300,300],[8,-8]),  { stiffness:100, damping:20 });
  const ry = useSpring(useTransform(mx, [-300,300],[-8,8]),  { stiffness:100, damping:20 });

  useEffect(() => {
    const id = setInterval(() => setTi(i => (i+1) % TITLES.length), 2700);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width/2);
    my.set(e.clientY - r.top  - r.height/2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', padding:'100px 24px 60px' }}>
      {/* Background */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(37,99,235,0.13) 0%, transparent 70%)' }}/>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.3 }}/>
      <div className="orb" style={{ width:560, height:560, background:'rgba(37,99,235,0.05)', top:'-120px', left:'-100px' }}/>
      <div className="orb" style={{ width:400, height:400, background:'rgba(14,165,233,0.05)', bottom:'0', right:'-80px' }}/>

      <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

          {/* ── LEFT ── */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7, ease:'easeOut' }}>
            {/* Status */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }} style={{ marginBottom:28 }}>
              <span className="chip">
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 8px rgba(34,197,94,.6)' }}/>
                Open to opportunities · Ahmedabad, India
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }}
              style={{ fontSize:'clamp(34px,4.5vw,56px)', fontWeight:900, lineHeight:1.06, letterSpacing:'-0.04em', marginBottom:18, color:'#f0f2f8' }}
            >
              Building{' '}
              <span className="gt-anim">Scalable</span>
              <br/>Backend Systems
            </motion.h1>

            {/* Role */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
              style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, fontSize:18, color:'#64748b' }}
            >
              <span>I&apos;m a</span>
              <div style={{ overflow:'hidden', height:27 }}>
                <AnimatePresence mode="wait">
                  <motion.span key={ti}
                    initial={{ y:27, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:-27, opacity:0 }}
                    transition={{ duration:.3, ease:[.4,0,.2,1] }}
                    style={{ display:'block', color:'#60a5fa', fontWeight:700, fontSize:18 }}
                  >{TITLES[ti]}</motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sub */}
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.5 }}
              style={{ fontSize:16, color:'#64748b', lineHeight:1.8, marginBottom:36, maxWidth:460 }}
            >
              3+ years building production-grade APIs, multi-tenant SaaS systems, and automation platforms with Python, Django, and FastAPI — engineered for scale and reliability.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6 }}
              style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:32 }}
            >
              <button onClick={() => go('#experience')} className="btn btn-p">
                View Experience <ArrowRight size={15}/>
              </button>
              <a href="/resume.pdf" download="Sagar-Sonara-Resume.pdf" className="btn btn-s" style={{ textDecoration:'none' }}>
                <Download size={14}/> Resume
              </a>
              <button onClick={() => go('#contact')} className="btn btn-s">Contact</button>
            </motion.div>

            {/* Social */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.7 }}
              style={{ display:'flex', gap:10 }}
            >
              {[
                { icon:GitBranch, label:'GitHub',   href:'https://github.com/sagarsonara2143' },
                { icon:Link2,     label:'LinkedIn',  href:'https://linkedin.com/in/sagarsonara' },
              ].map(({ icon:Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', fontSize:13, fontWeight:500, textDecoration:'none', transition:'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.4)'; (e.currentTarget as HTMLElement).style.color='#60a5fa'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color='#94a3b8'; }}
                ><Icon size={14}/>{label}</a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — code card ── */}
          <motion.div ref={cardRef} initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.8, ease:'easeOut', delay:.2 }}
            onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective:1200, position:'relative' }}
          >
            <motion.div style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d' }}>
              <div style={{ background:'#090e1b', border:'1px solid rgba(37,99,235,0.18)', borderRadius:20, overflow:'hidden', boxShadow:'0 32px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,.04)' }}>
                {/* Chrome */}
                <div style={{ padding:'13px 18px', background:'rgba(37,99,235,0.06)', borderBottom:'1px solid rgba(37,99,235,0.1)', display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ display:'flex', gap:6 }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }}/>)}
                  </div>
                  <span style={{ marginLeft:8, fontSize:12, color:'#334155', fontFamily:'monospace', flex:1 }}>api/routes/engineers.py · Morinox</span>
                  <span style={{ padding:'2px 8px', background:'rgba(34,197,94,.12)', border:'1px solid rgba(34,197,94,.2)', borderRadius:4, fontSize:11, color:'#22c55e', fontWeight:700 }}>● Live</span>
                </div>

                {/* Code */}
                <div style={{ padding:'18px 18px 6px', fontFamily:'"JetBrains Mono","Fira Code",monospace', fontSize:12.5, lineHeight:1.85, overflowX:'auto' }}>
                  {CODE.map(([type, text], i) => (
                    <div key={i} style={{ display:'flex', gap:16, minHeight:'1.85em' }}>
                      <span style={{ color:'#1e293b', minWidth:18, textAlign:'right', userSelect:'none', fontSize:11 }}>{i+1}</span>
                      <span style={{ color:'#c0d4f0' }} dangerouslySetInnerHTML={{ __html: colorize([type,text]) }}/>
                    </div>
                  ))}
                  <div style={{ display:'flex', gap:16 }}>
                    <span style={{ color:'#1e293b', minWidth:18, textAlign:'right', fontSize:11 }}>{CODE.length+1}</span>
                    <span style={{ display:'inline-block', width:2, height:14, background:'#2563eb', verticalAlign:'middle', marginTop:4 }} className="blink"/>
                  </div>
                </div>

                {/* API panel */}
                <div style={{ margin:'8px 14px', background:'rgba(6,9,18,.9)', border:'1px solid rgba(37,99,235,0.1)', borderRadius:10, padding:'12px 14px', fontFamily:'monospace', fontSize:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ background:'#2563eb', color:'#fff', padding:'2px 8px', borderRadius:5, fontSize:10, fontWeight:800 }}>GET</span>
                      <span style={{ color:'#60a5fa' }}>/api/v1/engineers</span>
                    </div>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ color:'#22c55e', fontWeight:700 }}>200 OK</span>
                      <span style={{ color:'#334155', fontSize:11 }}>118ms</span>
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:'#334155', lineHeight:1.7 }}>
                    <span style={{ color:'#1e3a5f' }}>{'{ '}</span>
                    <span style={{ color:'#60a5fa' }}>"data"</span>
                    <span style={{ color:'#1e3a5f' }}>: [{'{'}id:1, name:"John", role:"Engineer"{'}'}, ...], </span>
                    <span style={{ color:'#60a5fa' }}>"total"</span>
                    <span style={{ color:'#1e3a5f' }}>: 24 {'}'}</span>
                  </div>
                </div>

                {/* Tech pills */}
                <div style={{ padding:'10px 14px 16px', display:'flex', gap:6, flexWrap:'wrap' }}>
                  {[['Python','#3b82f6'],['Django','#22c55e'],['FastAPI','#06b6d4'],['PostgreSQL','#2563eb'],['Redis','#ef4444'],['Stripe','#6366f1']].map(([n,c]) => (
                    <span key={n} style={{ padding:'3px 10px', borderRadius:5, fontSize:11, fontWeight:600, background:c+'15', border:'1px solid '+c+'30', color:c }}>{n}</span>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y:[0,-9,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
                style={{ position:'absolute', top:-18, right:-22, background:'#0b0f1a', border:'1px solid rgba(34,197,94,.25)', borderRadius:12, padding:'10px 14px', boxShadow:'0 8px 32px rgba(0,0,0,.45)', backdropFilter:'blur(10px)' }}
              >
                <div style={{ fontSize:10, color:'#334155', marginBottom:2, textTransform:'uppercase', letterSpacing:'.06em' }}>Response</div>
                <div style={{ fontSize:20, fontWeight:800, color:'#22c55e', fontVariantNumeric:'tabular-nums' }}>118ms</div>
              </motion.div>

              <motion.div animate={{ y:[0,9,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut', delay:.8 }}
                style={{ position:'absolute', bottom:-14, left:-20, background:'#0b0f1a', border:'1px solid rgba(37,99,235,.25)', borderRadius:12, padding:'10px 14px', boxShadow:'0 8px 32px rgba(0,0,0,.45)', backdropFilter:'blur(10px)' }}
              >
                <div style={{ fontSize:10, color:'#334155', marginBottom:2, textTransform:'uppercase', letterSpacing:'.06em' }}>Experience</div>
                <div style={{ fontSize:20, fontWeight:800 }} className="gt">3+ yrs</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }} style={{ display:'flex', justifyContent:'center', marginTop:60 }}>
          <motion.button animate={{ y:[0,7,0] }} transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }} onClick={() => go('#about')}
            style={{ background:'none', border:'none', cursor:'pointer', color:'#1e293b', display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}
          >
            <span style={{ fontSize:10, letterSpacing:'.12em', textTransform:'uppercase' }}>scroll</span>
            <ChevronDown size={16}/>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

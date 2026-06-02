'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, GitBranch, Link2, AlertCircle, Copy, Check } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const CONTACTS = [
  { icon:Mail,     label:'Email',    value:personalInfo.email,            href:'mailto:'+personalInfo.email,   color:'#3b82f6', copyable:true },
  { icon:Phone,    label:'Phone',    value:personalInfo.phone,            href:'tel:+917801950401',             color:'#0ea5e9' },
  { icon:Link2,    label:'LinkedIn', value:'linkedin.com/in/sagarsonara', href:personalInfo.linkedin,           color:'#2563eb' },
  { icon:GitBranch,label:'GitHub',   value:'github.com/sagarsonara2143',  href:personalInfo.github,             color:'#22c55e' },
  { icon:MapPin,   label:'Location', value:personalInfo.location,         href:undefined,                       color:'#f59e0b' },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once:true, margin:'-80px' });
  const [form,  setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [status,setStatus] = useState<Status>('idle');
  const [errMsg,setErrMsg] = useState('');
  const [copied,setCopied] = useState(false);

  const inp: React.CSSProperties = {
    width:'100%', padding:'11px 14px',
    background:'rgba(6,9,18,0.85)',
    border:'1px solid rgba(37,99,235,0.15)',
    borderRadius:10, color:'#f0f2f8', fontSize:14,
    outline:'none', boxSizing:'border-box', fontFamily:'inherit',
  };
  const onF = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor='rgba(37,99,235,0.5)'; };
  const onB = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor='rgba(37,99,235,0.15)'; };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Failed to send. Please email directly.');
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrMsg('');
    setForm({ name:'', email:'', subject:'', message:'' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} style={{ padding:'100px 24px', background:'#0b0f1a', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div className="orb"    style={{ width:500, height:500, background:'rgba(37,99,235,0.05)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:60 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Get In Touch</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            {"Let's Build Something"} <span className="gt">Great</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12 }}>Open to full-time roles, freelance projects, and interesting collaborations</p>
        </motion.div>

        <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:36, alignItems:'start' }}>

          {/* ── Left: contact cards ── */}
          <motion.div initial={{ opacity:0, x:-28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.2 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:18 }}>
              {CONTACTS.map((c,i) => (
                <motion.div key={c.label} initial={{ opacity:0, x:-16 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.3+i*.06 }}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 16px', background:'rgba(11,15,26,0.85)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:14, transition:'border-color .2s, transform .2s' }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=c.color+'40'; el.style.transform='translateX(4px)'; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(255,255,255,0.06)'; el.style.transform='none'; }}
                >
                  <div style={{ width:40, height:40, borderRadius:11, background:c.color+'18', border:'1px solid '+c.color+'28', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <c.icon size={17} color={c.color}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:'#334155', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:3 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith('http')||c.href.startsWith('mailto')?'_blank':undefined} rel="noopener noreferrer"
                          style={{ fontSize:13, color:'#cbd5e1', textDecoration:'none', transition:'color .2s' }}
                          onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color=c.color; }}
                          onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='#cbd5e1'; }}
                        >{c.value}</a>
                      : <span style={{ fontSize:13, color:'#cbd5e1' }}>{c.value}</span>
                    }
                  </div>
                  {c.copyable && (
                    <button onClick={copyEmail} style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 10px', background:copied?'rgba(34,197,94,0.15)':'rgba(37,99,235,0.08)', border:'1px solid '+(copied?'rgba(34,197,94,0.3)':'rgba(37,99,235,0.15)'), borderRadius:8, cursor:'pointer', color:copied?'#22c55e':'#60a5fa', fontSize:12, fontWeight:500, transition:'all .2s', flexShrink:0 }}
                      onMouseEnter={e=>{ if(!copied) { (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.15)'; } }}
                      onMouseLeave={e=>{ if(!copied) { (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.08)'; } }}
                    >
                      {copied ? <><Check size={12}/>Copied</> : <><Copy size={12}/>Copy</>}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <div style={{ padding:'14px 16px', background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.14)', borderRadius:12, display:'flex', gap:10, alignItems:'center' }}>
              <CheckCircle size={15} color="#22c55e"/>
              <span style={{ fontSize:13, color:'#86efac' }}>Typically responds within 24 hours</span>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div initial={{ opacity:0, x:28 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.3 }}>
            <div style={{ background:'rgba(11,15,26,0.92)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:24, padding:'30px' }}>

              {/* Success */}
              {status === 'success' && (
                <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', padding:'32px 16px' }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', boxShadow:'0 0 24px rgba(34,197,94,0.2)' }}>
                    <CheckCircle size={30} color="#22c55e"/>
                  </div>
                  <h3 style={{ fontSize:22, fontWeight:800, color:'#f0f2f8', marginBottom:10 }}>Message Sent! 🎉</h3>
                  <p style={{ color:'#64748b', fontSize:15, lineHeight:1.7, marginBottom:24 }}>
                    Your message has been delivered to{' '}
                    <a href={'mailto:'+personalInfo.email} style={{ color:'#60a5fa', textDecoration:'none' }}>{personalInfo.email}</a>.
                    <br/>I&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={reset} className="btn btn-s" style={{ margin:'0 auto' }}>Send another message</button>
                </motion.div>
              )}

              {/* Error */}
              {status === 'error' && (
                <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
                  style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'14px 16px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:12, marginBottom:20 }}
                >
                  <AlertCircle size={16} color="#f87171" style={{ flexShrink:0, marginTop:1 }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#f87171', marginBottom:4 }}>Failed to send</div>
                    <div style={{ fontSize:13, color:'#94a3b8' }}>{errMsg}</div>
                    <div style={{ fontSize:12, color:'#64748b', marginTop:6 }}>
                      Or email directly: <a href={'mailto:'+personalInfo.email} style={{ color:'#60a5fa' }}>{personalInfo.email}</a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form — shown when idle or error */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
                    <div>
                      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', marginBottom:6, textTransform:'uppercase', letterSpacing:'.07em' }}>Your Name</label>
                      <input type="text" required placeholder="John Doe" value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} style={inp} onFocus={onF} onBlur={onB}/>
                    </div>
                    <div>
                      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', marginBottom:6, textTransform:'uppercase', letterSpacing:'.07em' }}>Your Email</label>
                      <input type="email" required placeholder="you@company.com" value={form.email} onChange={e=>setForm(v=>({...v,email:e.target.value}))} style={inp} onFocus={onF} onBlur={onB}/>
                    </div>
                  </div>

                  <div style={{ marginBottom:12 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', marginBottom:6, textTransform:'uppercase', letterSpacing:'.07em' }}>Subject</label>
                    <input type="text" required placeholder="Backend Developer opportunity at [Company]" value={form.subject} onChange={e=>setForm(v=>({...v,subject:e.target.value}))} style={inp} onFocus={onF} onBlur={onB}/>
                  </div>

                  <div style={{ marginBottom:22 }}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', marginBottom:6, textTransform:'uppercase', letterSpacing:'.07em' }}>Message</label>
                    <textarea required rows={5} placeholder="Tell me about the role, project, or opportunity..." value={form.message} onChange={e=>setForm(v=>({...v,message:e.target.value}))} style={{ ...inp, resize:'none' }} onFocus={onF} onBlur={onB}/>
                  </div>

                  <button type="submit" className="btn btn-p"
                    disabled={status==='sending'}
                    style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'13px 24px', opacity:status==='sending'?0.75:1, cursor:status==='sending'?'not-allowed':'pointer' }}
                  >
                    {status === 'sending'
                      ? <><Spinner/>Sending message...</>
                      : <><Send size={15}/>Send Message</>
                    }
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @media(max-width:768px) { .contact-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}

function Spinner() {
  return (
    <span style={{ display:'inline-block', width:15, height:15, border:'2px solid rgba(255,255,255,0.25)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin .65s linear infinite', marginRight:8, flexShrink:0 }}/>
  );
}

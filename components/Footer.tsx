'use client';
/* eslint-disable */
import React from 'react';
import { Download, ArrowUp, MapPin, Terminal, GitBranch, Link2, Mail, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const NAV = ['About','Experience','Projects','Architecture','Tech','Contact'];

export default function Footer() {
  const top  = () => window.scrollTo({ top:0, behavior:'smooth' });
  const go   = (id: string) => document.querySelector('#'+id.toLowerCase())?.scrollIntoView({ behavior:'smooth' });

  return (
    <footer style={{ background:'#04060e', borderTop:'1px solid rgba(37,99,235,0.1)', padding:'52px 24px 28px', position:'relative', overflow:'hidden' }}>
      <div className="orb" style={{ width:360, height:360, background:'rgba(37,99,235,0.04)', bottom:'-80px', left:'50%', transform:'translateX(-50%)' }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr', gap:44, marginBottom:44 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#2563eb,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 18px rgba(37,99,235,0.4)' }}><Terminal size={16} color="#fff"/></div>
              <span style={{ fontWeight:700, fontSize:16, color:'#f0f2f8' }}>Sagar<span style={{ color:'#60a5fa' }}>.dev</span></span>
            </div>
            <p style={{ fontSize:14, color:'#475569', lineHeight:1.8, marginBottom:18, maxWidth:280 }}>
              Python Developer building scalable REST APIs, multi-tenant SaaS, and automation systems with Django, FastAPI, and PostgreSQL.
            </p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
              {[
                { icon:GitBranch, href:personalInfo.github, label:'GitHub' },
                { icon:Link2,     href:personalInfo.linkedin, label:'LinkedIn' },
                { icon:Mail,      href:'mailto:'+personalInfo.email, label:'Email' },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                  style={{ width:34, height:34, borderRadius:9, background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.14)', display:'flex', alignItems:'center', justifyContent:'center', color:'#60a5fa', textDecoration:'none', transition:'all .2s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.2)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.4)'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.14)'; }}
                ><s.icon size={14}/></a>
              ))}
            </div>
            <div style={{ fontSize:13, color:'#334155', display:'flex', alignItems:'center', gap:5 }}>
              <Phone size={12}/>{personalInfo.phone}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:700, color:'#334155', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Navigation</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {NAV.map(n => (
                <button key={n} onClick={() => go(n)} style={{ background:'none', border:'none', cursor:'pointer', color:'#64748b', fontSize:14, textAlign:'left', padding:0, transition:'color .2s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='#60a5fa'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='#64748b'; }}
                >{n}</button>
              ))}
            </div>
          </div>

          {/* Professional */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:700, color:'#334155', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Professional</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <a href="/resume.pdf" download="Sagar-Sonara-Resume.pdf" className="btn btn-p" style={{ padding:'9px 16px', fontSize:13, textDecoration:'none' }}><Download size={13}/>Download Resume</a>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#475569' }}><MapPin size={12}/>{personalInfo.location}</div>
              <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px rgba(34,197,94,0.6)', display:'inline-block' }}/>
                <span style={{ fontSize:13, color:'#86efac', fontWeight:500 }}>Open to opportunities</span>
              </div>
              <div style={{ fontSize:12, color:'#334155' }}>Currently @ MSBC Group India Pvt Ltd</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:22, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:13, color:'#334155' }}>© 2025 {personalInfo.fullName}. All rights reserved.</span>
          <button onClick={top} style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.14)', borderRadius:8, cursor:'pointer', color:'#60a5fa', fontSize:13, transition:'all .2s' }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.18)'; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.08)'; }}
          ><ArrowUp size={13}/>Back to top</button>
        </div>
      </div>
    </footer>
  );
}

'use client';
/* eslint-disable */
import React from 'react';
import { Download, ArrowUp, MapPin, Terminal, GitBranch, Link2, Mail, Phone, ExternalLink } from 'lucide-react';
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
                { icon:GitBranch, href:personalInfo.github, label:'GitHub', tooltip:'View my code' },
                { icon:Link2,     href:personalInfo.linkedin, label:'LinkedIn', tooltip:'Connect with me' },
                { icon:Mail,      href:'mailto:'+personalInfo.email, label:'Email', tooltip:'Send me an email' },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
                  style={{ width:34, height:34, borderRadius:9, background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.14)', display:'flex', alignItems:'center', justifyContent:'center', color:'#60a5fa', textDecoration:'none', transition:'all .2s', position:'relative' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.2)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.4)'; const tip=e.currentTarget.querySelector('.tooltip') as HTMLElement; if(tip) tip.style.opacity='1'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(37,99,235,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.14)'; const tip=e.currentTarget.querySelector('.tooltip') as HTMLElement; if(tip) tip.style.opacity='0'; }}
                >
                  <s.icon size={14}/>
                  <span className="tooltip" style={{ position:'absolute', bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.95)', color:'#fff', fontSize:11, padding:'6px 10px', borderRadius:6, whiteSpace:'nowrap', opacity:0, transition:'opacity .2s', pointerEvents:'none', zIndex:10, border:'1px solid rgba(37,99,235,0.4)' }}>
                    {s.tooltip}
                    <div style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%) rotate(45deg)', width:6, height:6, background:'rgba(0,0,0,0.95)', borderRight:'1px solid rgba(37,99,235,0.4)', borderBottom:'1px solid rgba(37,99,235,0.4)', marginTop:-3 }}/>
                  </span>
                </a>
              ))}
            </div>
            <a href={'tel:'+personalInfo.phone.replace(/\s/g,'')} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 14px', background:'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(37,99,235,0.08))', border:'1px solid rgba(14,165,233,0.3)', borderRadius:8, fontSize:14, color:'#0ea5e9', fontWeight:600, textDecoration:'none', transition:'all .2s', marginBottom:4 }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='linear-gradient(135deg, rgba(14,165,233,0.2), rgba(37,99,235,0.15)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(14,165,233,0.5)'; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='linear-gradient(135deg, rgba(14,165,233,0.1), rgba(37,99,235,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(14,165,233,0.3)'; }}
            >
              <Phone size={13}/>{personalInfo.phone}
            </a>
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

          {/* Location & Map */}
          <div>
            <h4 style={{ fontSize:11, fontWeight:700, color:'#334155', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:14 }}>Location</h4>
            <div style={{ background:'rgba(11,15,26,0.8)', border:'1px solid rgba(245,158,11,0.14)', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
              <div style={{ padding:'10px 12px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', gap:8 }}>
                <MapPin size={12} color="#f59e0b"/>
                <span style={{ fontSize:12, color:'#cbd5e1', fontWeight:500 }}>Iscon, Ahmedabad, India</span>
              </div>
              <div style={{ position:'relative', height:140 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3671.9876543210!2d72.5063017!3d23.0288299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDAxJzQzLjgiTiA3MsKwMzAnMjIuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="140"
                  style={{ border:0, filter:'invert(0.92) hue-rotate(180deg) saturate(0.7)', opacity:0.8 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(4,6,14,0.3))', pointerEvents:'none' }}/>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:10, height:10, borderRadius:'50%', background:'#f59e0b', border:'2px solid rgba(255,255,255,0.9)', boxShadow:'0 0 16px rgba(245,158,11,0.7)', animation:'pulse-pin 2s infinite', pointerEvents:'none' }}/>
              </div>
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
      <style>{`
        @keyframes pulse-pin { 0%, 100% { transform:translate(-50%, -50%) scale(1); opacity:1; } 50% { transform:translate(-50%, -50%) scale(1.4); opacity:0.6; } }
        @media(max-width:768px) { .footer-grid { grid-template-columns:1fr !important; } .tooltip { display:none !important; } }
      `}</style>
    </footer>
  );
}

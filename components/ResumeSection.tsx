'use client';
/* eslint-disable */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, CheckCircle, Eye, Printer } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const FEATURES = [
  { icon: CheckCircle, title:'ATS Optimized',      desc:'Formatted and structured to pass applicant tracking systems cleanly.',          color:'#22c55e' },
  { icon: FileText,    title:'PDF Format',          desc:'Clean, professional PDF — ready for download and sharing with hiring teams.',    color:'#3b82f6' },
  { icon: Printer,     title:'Print Friendly',      desc:'Optimized for printing with clean typography and proper page breaks.',          color:'#0ea5e9' },
  { icon: CheckCircle, title:'Quantified Impact',   desc:'Every role includes measurable results and real business outcomes.',            color:'#38bdf8' },
  { icon: Eye,         title:'Comprehensive Skills',desc:'Full breakdown of technical skills, tools, frameworks, and expertise levels.',  color:'#f59e0b' },
];

export default function ResumeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="resume" ref={ref} style={{ padding:'100px 24px', position:'relative', overflow:'hidden' }}>
      <div className="dot-bg" style={{ position:'absolute', inset:0, opacity:.18 }}/>
      <div className="orb" style={{ width:400, height:400, background:'rgba(37,99,235,0.05)', top:'50%', right:'-100px', transform:'translateY(-50%)' }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }} style={{ textAlign:'center', marginBottom:56 }}>
          <span className="chip" style={{ marginBottom:16, display:'inline-flex' }}>Resume</span>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-0.03em', color:'#f0f2f8', marginTop:12 }}>
            Professional <span className="gt">Profile</span>
          </h2>
          <p style={{ color:'#475569', fontSize:16, marginTop:12 }}>Everything you need to evaluate my background</p>
        </motion.div>

        <div className="resume-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }}>
          {/* Features */}
          <motion.div className="resume-features" initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.2 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {FEATURES.map((f,i) => (
                <motion.div key={f.title} initial={{ opacity:0, x:-18 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.3+i*.07 }}
                  style={{ display:'flex', gap:14, padding:'14px 18px', background:'rgba(11,15,26,0.85)', border:'1px solid rgba(37,99,235,0.09)', borderRadius:14, transition:'border-color .2s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=f.color+'35'; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(37,99,235,0.09)'; }}
                >
                  <div style={{ width:38, height:38, borderRadius:10, background:f.color+'18', border:'1px solid '+f.color+'28', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><f.icon size={16} color={f.color}/></div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:'#f0f2f8', marginBottom:4 }}>{f.title}</div>
                    <div style={{ fontSize:13, color:'#64748b', lineHeight:1.6 }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:.6, delay:.3 }}>
            <div style={{ background:'rgba(11,15,26,0.95)', border:'1px solid rgba(37,99,235,0.18)', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,.45)' }}>
              {/* Chrome */}
              <div style={{ background:'rgba(37,99,235,0.06)', borderBottom:'1px solid rgba(37,99,235,0.1)', padding:'12px 18px', display:'flex', alignItems:'center', gap:8 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }}/>)}
                <span style={{ marginLeft:8, fontSize:12, color:'#334155', flex:1, fontFamily:'monospace' }}>Sagar-Sonara-Resume.pdf</span>
                <span style={{ fontSize:11, color:'#22c55e', fontWeight:600 }}>● PDF</span>
              </div>

              {/* Mockup */}
              <div style={{ padding:'22px 26px' }}>
                <div style={{ borderBottom:'2px solid rgba(37,99,235,0.18)', paddingBottom:14, marginBottom:18 }}>
                  <div style={{ fontSize:22, fontWeight:900, color:'#f0f2f8', letterSpacing:'-0.03em', marginBottom:4 }}>{personalInfo.fullName}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#60a5fa', marginBottom:8 }}>Python Developer | Backend &amp; API Engineering | Ahmedabad, India</div>
                  <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                    {[personalInfo.phone, personalInfo.email, 'linkedin.com/in/sagarsonara'].map(item => (
                      <span key={item} style={{ fontSize:11, color:'#475569' }}>{item}</span>
                    ))}
                  </div>
                </div>

                {[
                  { label:'WORK EXPERIENCE', lines:[85,65,75,55,60] },
                  { label:'TECHNICAL SKILLS', lines:[90,80,70] },
                  { label:'KEY PROJECTS',     lines:[80,60,70] },
                  { label:'EDUCATION',        lines:[65,50] },
                ].map(sec => (
                  <div key={sec.label} style={{ marginBottom:14 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#334155', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:7 }}>{sec.label}</div>
                    {sec.lines.map((w,i) => (
                      <div key={i} style={{ height:7, background:'rgba(37,99,235,0.07)', borderRadius:4, marginBottom:5, width:w+'%' }}/>
                    ))}
                  </div>
                ))}

                <div style={{ fontSize:11, color:'#1e293b', marginTop:6 }}>Last updated: Dec 2026</div>
              </div>

              {/* CTAs */}
              <div style={{ padding:'14px 26px 26px', display:'flex', gap:10 }}>
                <a href="/resume.pdf" download="Sagar-Sonara-Resume.pdf" className="btn btn-p" style={{ flex:1, justifyContent:'center', textDecoration:'none' }}>
                  <Download size={14}/>Download
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-s" style={{ textDecoration:'none', flexShrink:0 }}>
                  <Eye size={14}/>Preview
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

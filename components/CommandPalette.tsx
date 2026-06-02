'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Download, Mail, ExternalLink, GitBranch, X, Sun, Moon } from 'lucide-react';

const CMDS = [
  { id:'about', label:'Go to About', icon: Hash, category:'Navigate', action:()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'}) },
  { id:'experience', label:'Go to Experience', icon: Hash, category:'Navigate', action:()=>document.getElementById('experience')?.scrollIntoView({behavior:'smooth'}) },
  { id:'projects', label:'Go to Projects', icon: Hash, category:'Navigate', action:()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) },
  { id:'contact', label:'Go to Contact', icon: Hash, category:'Navigate', action:()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) },
  { id:'resume', label:'Download Resume', icon: Download, category:'Action', action:()=>{ const a=document.createElement('a'); a.href='/resume.pdf'; a.download='sagar_sonara_python_3_yrs_exp.pdf'; a.click(); } },
  { id:'email', label:'Send Email', icon: Mail, category:'Action', action:()=>window.open('mailto:sagarsonara@example.com') },
  { id:'github', label:'Open GitHub', icon: GitBranch, category:'Links', action:()=>window.open('https://github.com/sagarsonara2143','_blank') },
  { id:'linkedin', label:'Open LinkedIn', icon: ExternalLink, category:'Links', action:()=>window.open('https://linkedin.com/in/sagarsonara','_blank') },
];

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = CMDS.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (isOpen) { setQ(''); setSel(0); setTimeout(()=>inputRef.current?.focus(),50); } }, [isOpen]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key==='ArrowDown') { e.preventDefault(); setSel(s=>Math.min(s+1,filtered.length-1)); }
      if (e.key==='ArrowUp') { e.preventDefault(); setSel(s=>Math.max(s-1,0)); }
      if (e.key==='Enter') { e.preventDefault(); if (filtered[sel]) { filtered[sel].action(); onClose(); } }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, sel, filtered, onClose]);

  const catColor: Record<string,string> = { Navigate:'#6366f1', Action:'#22c55e', Links:'#0ea5e9' };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}
          style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(8px)',zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'16px',paddingTop:'clamp(20px, 15vh, 100px)' }}
        >
          <motion.div initial={{ opacity:0,scale:0.95,y:-20 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.95,y:-20 }} transition={{ duration:0.18 }}
            onClick={e=>e.stopPropagation()}
            style={{ width:'100%',maxWidth:520,background:'rgba(13,13,26,0.98)',border:'1px solid rgba(99,102,241,0.25)',borderRadius:'clamp(12px, 4vw, 20px)',overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.6)' }}
          >
            {/* Search input */}
            <div style={{ display:'flex',alignItems:'center',gap:12,padding:'16px 20px',borderBottom:'1px solid rgba(99,102,241,0.1)' }}>
              <Search size={18} color="#4a4a6a"/>
              <input ref={inputRef} value={q} onChange={e=>{ setQ(e.target.value); setSel(0); }} placeholder="Search commands..." style={{ flex:1,background:'none',border:'none',outline:'none',color:'#f1f1f5',fontSize:15 }}/>
              <button onClick={onClose} style={{ background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:6,padding:'4px',cursor:'pointer',color:'#6b6b80',display:'flex' }}><X size={14}/></button>
            </div>

            {/* Results */}
            <div style={{ maxHeight:'min(340px, 50vh)',overflowY:'auto' }}>
              {filtered.length===0?(
                <div style={{ padding:'32px',textAlign:'center',color:'#4a4a6a',fontSize:14 }}>No commands found</div>
              ):(
                filtered.map((cmd,i)=>(
                  <button key={cmd.id} onClick={()=>{ cmd.action(); onClose(); }}
                    style={{ display:'flex',alignItems:'center',gap:12,padding:'12px 20px',width:'100%',background:sel===i?'rgba(99,102,241,0.12)':'transparent',border:'none',cursor:'pointer',borderLeft:sel===i?'2px solid #6366f1':'2px solid transparent',transition:'all 0.1s' }}
                    onMouseEnter={()=>setSel(i)}
                  >
                    <div style={{ width:32,height:32,borderRadius:8,background:catColor[cmd.category]+'15',border:'1px solid '+catColor[cmd.category]+'25',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      <cmd.icon size={15} color={catColor[cmd.category]}/>
                    </div>
                    <span style={{ fontSize:14,color:sel===i?'#f1f1f5':'#a1a1b5',flex:1,textAlign:'left' }}>{cmd.label}</span>
                    <span style={{ padding:'2px 8px',background:catColor[cmd.category]+'15',borderRadius:4,fontSize:11,fontWeight:600,color:catColor[cmd.category] }}>{cmd.category}</span>
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div style={{ padding:'10px 20px',borderTop:'1px solid rgba(99,102,241,0.08)',display:'flex',gap:16,fontSize:11,color:'#3d3d5c' }}>
              <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        @media(max-width:768px) {
          .command-palette-overlay { padding-top: 60px !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}

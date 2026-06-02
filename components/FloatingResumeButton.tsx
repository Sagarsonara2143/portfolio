'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export default function FloatingResumeButton() {
  const [show, setShow]       = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.a
          key="floating-resume"
          href="/resume.pdf"
          download="sagar_sonara_python_3_yrs_exp.pdf"
          initial={{ opacity:0, y:20, scale:.9 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:20, scale:.9 }}
          whileHover={{ scale:1.05 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="floating-resume-btn"
          style={{
            position:'fixed', bottom:28, right:28, zIndex:40,
            display:'flex', alignItems:'center', gap:8,
            padding: hovered ? '12px 20px' : '13px',
            background:'linear-gradient(135deg,#2563eb,#0ea5e9)',
            borderRadius:14, color:'#fff', textDecoration:'none',
            boxShadow:'0 8px 28px rgba(37,99,235,0.45)',
            overflow:'hidden', whiteSpace:'nowrap',
            transition:'padding .25s',
          }}
        >
          <Download size={18} style={{ flexShrink:0 }}/>
          <AnimatePresence mode="wait">
            {hovered && (
              <motion.span
                key="resume-text"
                initial={{ width:0, opacity:0 }}
                animate={{ width:'auto', opacity:1 }}
                exit={{ width:0, opacity:0 }}
                style={{ fontSize:14, fontWeight:600, overflow:'hidden', display:'inline-block' }}
              >Download Resume</motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
      <style>{`
        @media(max-width:768px) {
          .floating-resume-btn { bottom: 80px !important; right: 16px !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}

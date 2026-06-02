'use client';
/* eslint-disable */
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
    <AnimatePresence>
      {show && (
        <motion.a
          href="/resume.pdf"
          download="Sagar-Sonara-Resume.pdf"
          initial={{ opacity:0, y:20, scale:.9 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:20, scale:.9 }}
          whileHover={{ scale:1.05 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
          <AnimatePresence>
            {hovered && (
              <motion.span initial={{ width:0, opacity:0 }} animate={{ width:'auto', opacity:1 }} exit={{ width:0, opacity:0 }}
                style={{ fontSize:14, fontWeight:600, overflow:'hidden', display:'inline-block' }}
              >Download Resume</motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

'use client';
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 2200);
    const t2 = setTimeout(() => onComplete(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="ls" initial={{ opacity:1 }} exit={{ opacity:0, scale:1.04 }} transition={{ duration:.3 }}
          style={{ position:'fixed', inset:0, zIndex:9999, background:'#060912', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}
        >
          {/* Background radial */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 70%)' }}/>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, position:'relative' }}>
            {/* Logo */}
            <motion.div initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.5 }}
              style={{ width:72, height:72, borderRadius:20, background:'linear-gradient(135deg,#2563eb,#0ea5e9)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 40px rgba(37,99,235,0.5)', marginBottom:4 }}
            >
              <span style={{ fontSize:28, fontWeight:900, color:'#fff', letterSpacing:'-0.04em' }}>SS</span>
            </motion.div>

            {/* Name */}
            <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }}
              style={{ color:'#e2e8f0', fontSize:17, fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', margin:0 }}
            >Sagar Sonara</motion.p>

            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
              style={{ color:'#334155', fontSize:12, letterSpacing:'.06em', margin:0 }}
            >Python Developer · Backend Engineer</motion.p>

            {/* Progress bar */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
              style={{ width:200, height:2, background:'rgba(37,99,235,0.15)', borderRadius:99, overflow:'hidden', marginTop:8 }}
            >
              <motion.div initial={{ width:'0%' }} animate={{ width:'100%' }} transition={{ duration:1.7, ease:'easeInOut', delay:.5 }}
                style={{ height:'100%', background:'linear-gradient(90deg,#2563eb,#0ea5e9,#38bdf8)', borderRadius:99 }}
              />
            </motion.div>

            {/* Dots */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.6 }}
              style={{ color:'rgba(148,163,184,0.6)', fontSize:12, display:'flex', alignItems:'center', gap:1 }}
            >
              <span>Loading</span>
              {[0,1,2].map(i => (
                <motion.span key={i} animate={{ opacity:[.2,1,.2] }} transition={{ duration:1.2, repeat:Infinity, delay:i*.2 }}>.</motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Terminal } from 'lucide-react';

const LINKS: { label: string; href: string; desktopOnly?: boolean }[] = [
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Architecture', href: '#architecture', desktopOnly: true },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1));
    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = '#' + id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: .5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
          background: scrolled ? 'rgba(6,9,18,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(37,99,235,0.12)' : '1px solid transparent',
          transition: 'background .3s, border-color .3s',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563eb,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(37,99,235,0.4)' }}>
              <Terminal size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#f0f2f8', letterSpacing: '-0.02em' }}>
              Sagar<span style={{ color: '#60a5fa' }}>.dev</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {LINKS.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active === l.href ? 'rgba(37,99,235,0.12)' : 'transparent', color: active === l.href ? '#60a5fa' : '#94a3b8', fontSize: 14, fontWeight: 500, transition: 'all .18s' }}
                onMouseEnter={e => { if (active !== l.href) (e.target as HTMLElement).style.color = '#f0f2f8'; }}
                onMouseLeave={e => { if (active !== l.href) (e.target as HTMLElement).style.color = '#94a3b8'; }}
              >{l.label}</button>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="/resume.pdf" download="sagar_sonara_python_3_yrs_exp.pdf" className="btn btn-p hide-mobile" style={{ padding: '8px 16px', fontSize: 13 }}>
              <Download size={14} /> Resume
            </a>
            <button onClick={() => setOpen(v => !v)} style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#60a5fa', display: 'none' }} className="mobile-menu-btn">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}
            style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49, background: 'rgba(6,9,18,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(37,99,235,0.12)', padding: '12px 24px 20px' }}
          >
            {LINKS.filter(l => !l.desktopOnly).map((l, i) => (
              <motion.button key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .05 }} onClick={() => go(l.href)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', background: active === l.href ? 'rgba(37,99,235,0.1)' : 'transparent', color: active === l.href ? '#60a5fa' : '#94a3b8', fontSize: 15, fontWeight: 500, marginBottom: 4 }}
              >{l.label}</motion.button>
            ))}
            <a href="/resume.pdf" download="sagar_sonara_python_3_yrs_exp.pdf" className="btn btn-p" style={{ marginTop: 12, width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
              <Download size={14} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px) {
          .hide-mobile { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
        }
      `}</style>
    </>
  );
}

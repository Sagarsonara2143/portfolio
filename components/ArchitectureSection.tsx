'use client';
/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const LAYERS = [
  {
    name: 'Client Application',
    sub: 'Browser · Mobile · Third-party',
    icon: '🌐',
    icClass: 'ic-blue',
    tags: ['React', 'Next.js', 'Mobile Apps', 'Partner APIs', 'Postman'],
  },
  {
    name: 'API Gateway',
    sub: 'Auth · Rate Limiting · Routing',
    icon: '⚡',
    icClass: 'ic-amber',
    tags: ['NGINX', 'FastAPI Gateway', 'JWT Auth', 'RBAC', 'CORS'],
  },
  {
    name: 'Backend Services',
    sub: 'Business Logic · Processing',
    icon: '⚙️',
    icClass: 'ic-purple',
    tags: ['Django DRF', 'FastAPI', 'Flask', 'Celery Workers', 'Async'],
  },
  {
    name: 'Database Layer',
    sub: 'Primary DB · Cache · NoSQL',
    icon: '🗄️',
    icClass: 'ic-teal',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Stored Procs'],
  },
  {
    name: 'External Integrations',
    sub: 'APIs · Webhooks · Payments',
    icon: '🔌',
    icClass: 'ic-coral',
    tags: ['Stripe', 'Google APIs', 'WhatsApp', 'Email', 'REST APIs'],
  },
  {
    name: 'Monitoring & Deployment',
    sub: 'Docker · NGINX · Cloudflare',
    icon: '📊',
    icClass: 'ic-green',
    tags: ['Docker', 'NGINX', 'NSSM', 'Cloudflare SSL', 'GitLab CI', '99.9% uptime'],
  },
];

const IC_STYLES: Record<string, { bg: string; color: string }> = {
  'ic-blue':   { bg: 'rgba(55,138,221,0.12)',   color: '#5fa8ed' },
  'ic-amber':  { bg: 'rgba(239,159,39,0.12)',    color: '#f0a83a' },
  'ic-purple': { bg: 'rgba(124,111,205,0.15)',   color: '#a89fe8' },
  'ic-teal':   { bg: 'rgba(29,158,117,0.12)',    color: '#2ecfa0' },
  'ic-coral':  { bg: 'rgba(216,90,48,0.12)',     color: '#e8835a' },
  'ic-green':  { bg: 'rgba(62,203,148,0.12)',    color: '#3ecb94' },
};

export default function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % LAYERS.length);
    }, 1800);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAuto]);

  const handleClick = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setActive(idx);
  };

  return (
    <section
      id="architecture"
      ref={ref}
      className="hide-mobile"
      style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}
    >
      <div className="dot-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
      <div
        className="orb"
        style={{ width: 500, height: 500, background: 'rgba(124,111,205,0.06)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
            Architecture
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 800, letterSpacing: '-1px', color: '#f0eefc', marginBottom: 8 }}>
            How I Build <span className="gt">Systems</span>
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            A layered approach to every production system I ship
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch', minWidth: 0 }}>

          {/* LEFT — terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: '#111120', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden', minWidth: 0 }}
          >
            {/* Traffic lights bar */}
            <div style={{ padding: '11px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginLeft: 6, fontFamily: 'monospace' }}>system.architecture</span>
            </div>

            {/* Layer rows */}
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {LAYERS.map((layer, i) => {
                const ic = IC_STYLES[layer.icClass];
                const isActive = active === i;
                return (
                  <div key={layer.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <div
                      onClick={() => handleClick(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: isActive ? 'rgba(124,111,205,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `0.5px solid ${isActive ? '#7c6fcd' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                        transition: 'border-color .2s, background .2s',
                      }}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: ic.bg, color: ic.color }}>
                        {layer.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e6f8' }}>{layer.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{layer.sub}</div>
                      </div>
                      <div style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: isActive ? '#7c6fcd' : 'rgba(124,111,205,0.4)',
                        border: '1px solid rgba(124,111,205,0.6)',
                      }} />
                    </div>

                    {i < LAYERS.length - 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 30, height: 18, position: 'relative' }}>
                        <div style={{ content: '', position: 'absolute', left: 30, top: 0, bottom: 0, width: 1, background: 'rgba(124,111,205,0.25)' }} />
                        <div style={{ width: 6, height: 6, borderRight: '1.5px solid rgba(124,111,205,0.5)', borderBottom: '1.5px solid rgba(124,111,205,0.5)', transform: 'rotate(45deg)', marginTop: 6, marginLeft: -3 }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — detail cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0, height: '100%' }}
          >
            {LAYERS.map((layer, i) => {
              const ic = IC_STYLES[layer.icClass];
              const isActive = active === i;
              return (
                <div
                  key={layer.name}
                  onClick={() => handleClick(i)}
                  style={{
                    background: isActive ? 'rgba(124,111,205,0.09)' : 'rgba(255,255,255,0.03)',
                    border: `0.5px solid ${isActive ? '#7c6fcd' : 'rgba(255,255,255,0.07)'}`,
                    borderLeft: isActive ? '2px solid #7c6fcd' : '0.5px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: '14px 16px',
                    display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1,
                    cursor: 'pointer', transition: 'border-color .2s, background .2s',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: ic.bg, color: ic.color }}>
                    {layer.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#e8e6f8', marginBottom: 3 }}>{layer.name}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {layer.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10, fontWeight: 600,
                            color: isActive ? '#a89fe8' : 'rgba(255,255,255,0.35)',
                            background: isActive ? 'rgba(124,111,205,0.12)' : 'rgba(255,255,255,0.05)',
                            border: `0.5px solid ${isActive ? 'rgba(124,111,205,0.25)' : 'rgba(255,255,255,0.09)'}`,
                            padding: '2px 7px', borderRadius: 5,
                            transition: 'color .2s, background .2s, border-color .2s',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

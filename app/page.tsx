'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SummarySection from '@/components/SummarySection';
import ExpertiseSection from '@/components/ExpertiseSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubSection from '@/components/GitHubSection';
import PhilosophySection from '@/components/PhilosophySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });
const FloatingResumeButton = dynamic(() => import('@/components/FloatingResumeButton'), { ssr: false });
const ProgressIndicator = dynamic(() => import('@/components/ProgressIndicator'), { ssr: false });
const TechEcosystem = dynamic(() => import('@/components/TechEcosystem'), { ssr: false });
const ArchitectureSection = dynamic(() => import('@/components/ArchitectureSection'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Navbar />
          <main>
            <HeroSection />
            <SummarySection />
            <ExpertiseSection />
            <ExperienceSection />
            <ProjectsSection />
            <ArchitectureSection />
            <TechEcosystem />
            <GitHubSection />
            <PhilosophySection />
            <TestimonialsSection />
            <ResumeSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingResumeButton />
          <ProgressIndicator />
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />
        </motion.div>
      )}
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sagar Sonara | Software Developer & Backend Engineer',
  description:
    'Python, Django, FastAPI backend developer specializing in scalable APIs, automation systems, and backend architecture. Available for opportunities in Ahmedabad, India.',
  keywords: [
    'Sagar Sonara',
    'Python Developer',
    'Django Developer',
    'FastAPI',
    'Backend Engineer',
    'API Developer',
    'Ahmedabad',
    'India',
  ],
  openGraph: {
    title: 'Sagar Sonara | Software Developer & Backend Engineer',
    description:
      'Python, Django, FastAPI backend developer specializing in scalable APIs, automation systems, and backend architecture. Available for opportunities in Ahmedabad, India.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Sonara | Software Developer & Backend Engineer',
    description:
      'Python, Django, FastAPI backend developer specializing in scalable APIs, automation systems, and backend architecture. Available for opportunities in Ahmedabad, India.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

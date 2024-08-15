// src/components/ClientLayout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import Header from '../components/header';
import localFont from 'next/font/local';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FirstLoadProvider } from '@/context/FirstLoadContext';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { getPortfolio } from '@/utils/getPortfolio';

const neueHaasDisplay = localFont({
  src: [
    { path: '/fonts/NeueHaasDisplayBlack.ttf', weight: '900', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayBlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayBold.ttf', weight: '700', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayLight.ttf', weight: '300', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayLightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayMediu.ttf', weight: '500', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayMediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '/fonts/NeueHaasDisplayRomanItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayRoman.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/NeueHaasDisplayThin.ttf', weight: '100', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayXThin.ttf', weight: '50', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayXThinItalic.ttf',
      weight: '50',
      style: 'italic',
    },
    { path: '/fonts/NeueHaasDisplayXXThin.ttf', weight: '25', style: 'normal' },
    {
      path: '/fonts/NeueHaasDisplayXXThinItalic.ttf',
      weight: '25',
      style: 'italic',
    },
  ],
});

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PortfolioProvider>
        <FirstLoadProvider>
          <CssBaseline />
          <Header videoLoaded={true} />
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </FirstLoadProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default ClientLayout;

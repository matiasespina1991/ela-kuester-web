// src/app/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import styles from './page.module.css';
import { getHomePageVideo } from '../utils/getHomePageVideo';
import Header from '../components/header';
import { Box, Typography } from '@mui/material';
import { easeIn, easeOut, motion } from 'framer-motion';
import { useFirstLoad } from '@/context/FirstLoadContext';
import { getPortfolio } from '@/utils/getPortfolio';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  const searchParams = useSearchParams();

  const page = searchParams?.get('page');

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await getHomePageVideo();
      setVideoUrl(url);
    };
    fetchVideo();
  }, []);

  return (
    <main className={styles.main}>
      <Box height="4rem"></Box>
      <motion.div
        initial={{ opacity: page != 'home' ? 0 : 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 6.45,
          ease: easeIn,
        }}
      >
        <Typography className={styles.motto}>
          LONDON BASED FASHION DESIGNER, STYLIST, AND ARTIST
        </Typography>
      </motion.div>

      {/* {videoUrl && (
        <video
          onLoadedData={handleBackgroundVideoLoaded}
          preload="true"
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )} */}
    </main>
  );
};

export default Home;

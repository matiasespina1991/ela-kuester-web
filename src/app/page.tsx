// src/app/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import styles from './page.module.css';
import { getHomePageVideo } from '../utils/getHomePageVideo';
import Header from '../components/header';
import { Typography } from '@mui/material';
import { easeIn, easeOut, motion } from 'framer-motion';
import { useFirstLoad } from '@/context/FirstLoadContext';

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] =
    useState<boolean>(false);
  const [showMotto, setShowMotto] = useState<boolean>(false);
  const { firstLoad, setFirstLoad } = useFirstLoad();

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await getHomePageVideo();
      setVideoUrl(url);
    };
    fetchVideo();
  }, []);

  const handleBackgroundVideoLoaded = () => {
    setBackgroundVideoLoaded(true);
  };

  useEffect(() => {
    setShowMotto(true);
  }, []);

  return (
    <>
      {/* <Header videoLoaded={backgroundVideoLoaded} /> */}
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: firstLoad ? 0 : 3.95,
            ease: easeIn,
          }}
        >
          <Typography className={styles.motto}>
            LONDON BASED FASHION DESIGNER, STYLIST, AND ARTIST
          </Typography>
        </motion.div>

        {videoUrl && (
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
        )}
      </main>
    </>
  );
};

export default Home;

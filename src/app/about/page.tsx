'use client';

import Link from 'next/link';
import styles from '../page.module.css';
import { db, collection, getDocs } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { getAboutDescription } from '@/utils/getAboutDescription';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import RootLayout from '@/app/layout';
import ClientLayout from '@/app/ClientLayout';

const About = () => {
  const [aboutDescription, setAboutDescription] = useState<String | null>(
    localStorage.getItem('aboutDescription')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /// get about description from local storage
    const aboutDescriptionFromLocalStorage =
      localStorage.getItem('aboutDescription');
    if (aboutDescriptionFromLocalStorage) {
      setAboutDescription(JSON.parse(aboutDescriptionFromLocalStorage));
      setLoading(false);
    } else {
      getAboutDescription().then((aboutDescription) => {
        setAboutDescription(aboutDescription);
        setLoading(false);

        localStorage.setItem(
          'aboutDescription',
          JSON.stringify(aboutDescription)
        );
      });
    }
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Box
          sx={{
            justifyContent: 'center',
            px: '1.6rem',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '45rem',
              position: 'relative',
              marginBottom: {
                xs: '27rem',
                sm: '12rem',
                md: '12rem',
              },
            }}
          >
            <Box position="absolute">
              <AnimatePresence>
                {!loading && (
                  <motion.div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        maxWidth: '45rem',
                        fontSize: '13pt',
                        lineHeight: '2.1rem',
                      }}
                    >
                      {aboutDescription && aboutDescription}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
            <Box position="absolute" width={'100%'}>
              <motion.div
                style={{
                  width: '100%',
                  maxWidth: '45rem',
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: loading ? 1 : 0 }}
                transition={{ duration: loading ? 0.2 : 0.8, ease: 'easeOut' }}
              >
                <Stack marginTop="2px" gap={1.5}>
                  <Skeleton variant="text" width="84%" />
                  <Skeleton variant="text" width="94%" />
                  <Skeleton variant="text" width="74%" />
                  <Skeleton variant="text" width="96%" />
                  <Skeleton variant="text" width="86%" />
                  <Skeleton variant="text" width="15%" />
                </Stack>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default About;

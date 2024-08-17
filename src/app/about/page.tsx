'use client';

import Link from 'next/link';
import styles from '../page.module.css';
import { db, collection, getDocs } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { getAboutDescription } from '@/utils/getAboutDescription';
import { use } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import React from 'react';
import RootLayout from '@/app/layout';
import ClientLayout from '@/app/ClientLayout';

const About = () => {
  const [aboutDescription, setAboutDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutDescription = async () => {
      const aboutDescription = await getAboutDescription();

      setAboutDescription(aboutDescription);
      setLoading(false);
    };
    fetchAboutDescription();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Box
          sx={{
            justifyContent: 'center',
            px: '1.6rem',

            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100%',
          }}
        >
          <Box sx={{ pt: '1rem' }}></Box>

          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            animate={{ opacity: loading ? 0 : 1 }}
          >
            <Typography
              variant="h6"
              sx={{
                maxWidth: '45rem',
                fontSize: '13pt',
                lineHeight: '2rem',
              }}
            >
              {aboutDescription}
            </Typography>
          </motion.div>
        </Box>
      </main>
    </>
  );
};

export default About;

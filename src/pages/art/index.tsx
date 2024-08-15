'use client';

import Link from 'next/link';
import styles from '../../app/page.module.css';
import { db, collection, getDocs } from '../../utils/firebase';
import Header from '../../components/header';
import { Typography } from '@mui/material';
import React from 'react';
import ClientLayout from '@/app/ClientLayout';

const Art = () => {
  return (
    <>
      <ClientLayout>
        <main className={styles.main}>
          <Typography className={styles.comingSoon}>Coming Soon</Typography>
        </main>
      </ClientLayout>
    </>
  );
};

export default Art;

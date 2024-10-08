'use client';

import Link from 'next/link';
import styles from '../page.module.css';
import { db, collection, getDocs } from '../../utils/firebase';
import Header from '../../components/header';
import { Typography } from '@mui/material';
import React from 'react';
import ClientLayout from '@/app/ClientLayout';

const Art = () => {
  return (
    <>
      <main className={styles.main}>
        <Typography className={styles.comingSoon}>Coming Soon</Typography>
      </main>
    </>
  );
};

export default Art;

'use client';

import Link from 'next/link';
import styles from '../page.module.css';
import { db, collection, getDocs } from '../../utils/firebase';
import Header from '../../components/header';
import { Typography } from '@mui/material';

const Fashion = () => {
  return (
    <>
      <main className={styles.main}>
        <Typography className={styles.comingSoon}>Coming Soon</Typography>
      </main>
    </>
  );
};

export default Fashion;

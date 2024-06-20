// src/components/header.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>Ela Kuester</Link>
        <div className={styles.hamburger}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Header;

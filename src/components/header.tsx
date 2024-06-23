// src/components/header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isWhite, setIsWhite] = useState<boolean>(false);

  useEffect(() => {
    const whiteRoutes = ['/'];
    setIsWhite(whiteRoutes.includes(pathname));
  }, [pathname]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${isOpen ? styles.active : ''}`}>
        <div className={styles.navContent}>
          <Link href="/" className={`${styles.logo} ${isOpen ? styles.logoActive : ''} ${isWhite ? styles.forceWhite : ''}`}>
            Ela Kuester
          </Link>
          <div className={styles.hamburger}>
            <Hamburger color={isOpen || !isWhite ? 'black' : 'white'} toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        <div className={styles.menu}>
          <Link href="/" className={styles.menuItem} onClick={handleLinkClick}>Home</Link>
          <Link href="/fashion" className={styles.menuItem} onClick={handleLinkClick}>Fashion</Link>
          <Link href="/art" className={styles.menuItem} onClick={handleLinkClick}>Art</Link>
          <Link href="/portfolio" className={styles.menuItem} onClick={handleLinkClick}>Portfolio</Link>
          <Link href="/about" className={styles.menuItem} onClick={handleLinkClick}>About</Link>
          <Link href="/contact" className={styles.menuItem} onClick={handleLinkClick}>Contact</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;

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
    //set a little timeout to close the menu after clicking a link
    setTimeout(() => {
      setOpen(false);
    }, 200);
    // setOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${isOpen ? styles.active : ''}`}>
        <div className={styles.navContent}>
          <Link href="/" className={`${styles.logo} ${isOpen ? styles.logoActive : ''} ${isWhite ? styles.forceWhite : ''}`}>
            Ela Kuester
          </Link>
          <div className={styles.hamburger}>
            <Hamburger duration={0.4} rounded={true} color={isOpen || !isWhite ? 'black' : 'white'} toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        <div className={styles.menu}>
          <Link prefetch={true} href="/" className={styles.menuItem} onClick={handleLinkClick}>Home</Link>
          <Link prefetch={true} href="/fashion" className={styles.menuItem} onClick={handleLinkClick}>Fashion</Link>
          <Link prefetch={true} href="/art" className={styles.menuItem} onClick={handleLinkClick}>Art</Link>
          <Link prefetch={true} href="/portfolio" className={styles.menuItem} onClick={handleLinkClick}>Portfolio</Link>
          <Link prefetch={true} href="/about" className={styles.menuItem} onClick={handleLinkClick}>About</Link>
          <Link prefetch={true} href="/contact" className={styles.menuItem} onClick={handleLinkClick}>Contact</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;

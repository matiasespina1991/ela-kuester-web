// src/components/header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';

interface HeaderProps {
  videoLoaded: boolean;
}

const Header: React.FC<HeaderProps> = ({ videoLoaded }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isWhite, setIsWhite] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [logoClass, setLogoClass] = useState<string>(

    pathname === '/' ? styles.logoInitial : styles.logoFinal
  );

  useEffect(() => {
    const whiteRoutes = ['/'];
    setIsWhite(whiteRoutes.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsVisible(true), 300);
    };

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Change logo class after a delay to trigger the transition
    const timeout = setTimeout(() => {
      setLogoClass(styles.logoFinal);
    }, 1500); // delay of 3 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleLinkClick = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <>
      <nav className={`${styles.nav} ${isOpen ? styles.active : ''} ${isVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.navContent}>
          <Link href="/" className={`${styles.logo} ${logoClass} ${isOpen ? styles.logoActive : ''} 
          
        
          
          `}

          
          >
            Ela Kuester
          </Link>
          <div className={styles.hamburger}>
            <Hamburger duration={0.4} rounded={true} color={isOpen || !isWhite || !videoLoaded ? 'black' : 'black'} toggled={isOpen} toggle={setOpen} />
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

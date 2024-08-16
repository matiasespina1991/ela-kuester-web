// src/components/header.tsx
'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';

import { motion } from 'framer-motion';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';

interface HeaderProps {
  videoLoaded: boolean;
}

const Header: React.FC<HeaderProps> = ({ videoLoaded }) => {
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams?.get('page');

  const [isWhite, setIsWhite] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [logoClass, setLogoClass] = useState<string>(
    pathname === '/' && page != 'home' ? styles.logoInitial : styles.logoFinal
  );
  const [hamburgerClass, setHamburgerClass] = useState<string>(
    pathname === '/' && page != 'home'
      ? styles.hamburgerHidden
      : styles.hamburgerVisible
  );
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);

  useEffect(() => {
    const whiteRoutes = ['/'];
    if (pathname) {
      setIsWhite(whiteRoutes.includes(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (pathname === '/portfolio/') {
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
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/' && page != 'home') {
      const timeout = setTimeout(() => {
        setLogoClass(`${styles.logoInitial} ${styles.logoInitialVisible}`);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pathname, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoClass(styles.logoFinal);
      setHamburgerClass(styles.hamburgerVisible);
    }, 3500);

    const timeout2 = setTimeout(() => {
      setFinishedLoading(true);
    }, 6000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

  const handleLinkClickMenuLink = () => {
    setTimeout(() => {
      setOpenHamburgerMenu(false);
    }, 200);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${openHamburgerMenu ? styles.active : ''} ${isVisible ? styles.visible : styles.hidden}`}
      >
        <div className={styles.navContent}>
          <Link
            href="/?page=home"
            className={`${styles.logo} ${logoClass} ${openHamburgerMenu ? styles.logoActive : ''}`}
          >
            <Stack whiteSpace={'pre-wrap'} direction="row">
              <motion.div>Ela </motion.div>
              <Box position="relative">
                {!finishedLoading && pathname === '/' && page !== 'home' ? (
                  <>
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1] }}
                      transition={{ delay: 1.6 }}
                    >
                      K
                    </motion.div>
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 15.5 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: 1.6, duration: 1, ease: 'easeOut' }}
                    >
                      üster
                    </motion.div>
                    <motion.div
                      style={{ position: 'absolute', top: 0, left: 15.5 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2, duration: 1, ease: 'easeIn' }}
                    >
                      uester
                    </motion.div>
                  </>
                ) : (
                  <>Kuester</>
                )}
              </Box>
            </Stack>
          </Link>
          <div className={`${styles.hamburger} ${hamburgerClass}`}>
            <Hamburger
              size={27}
              duration={0.4}
              rounded={true}
              color={
                openHamburgerMenu || !isWhite || !videoLoaded
                  ? 'black'
                  : 'black'
              }
              toggled={openHamburgerMenu}
              toggle={setOpenHamburgerMenu}
            />
          </div>
        </div>
        <div className={styles.menu}>
          <Link
            prefetch={true}
            href="/?page=home"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            Home
          </Link>
          <Link
            prefetch={true}
            href="/fashion"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            Fashion
          </Link>
          <Link
            prefetch={true}
            href="/art"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            Art
          </Link>
          <Link
            prefetch={true}
            href="/portfolio"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            Portfolio
          </Link>
          <Link
            prefetch={true}
            href="/about"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            About
          </Link>
          <Link
            prefetch={true}
            href="/contact"
            className={styles.menuItem}
            onClick={handleLinkClickMenuLink}
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;

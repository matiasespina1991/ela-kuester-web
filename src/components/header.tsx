import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';

import { AnimatePresence, motion } from 'framer-motion';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import useTypewriter from '../utils/useTypewriter';
import Typewriter from 'typewriter-effect';

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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoClass(styles.logoFinal);
      setHamburgerClass(styles.hamburgerVisible);
    }, 5500);

    const timeout2 = setTimeout(() => {
      setFinishedLoading(true);
    }, 8000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

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
    } else {
      setIsVisible(true);
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
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Ela Küster')
                      .pauseFor(800)

                      .deleteChars(5)
                      .typeString('uester')
                      .start();
                  }}
                  options={{
                    deleteSpeed: 45,
                    delay: 170,
                    autoStart: true,
                    cursor: '',
                    loop: false,
                  }}
                />
              </motion.div>
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

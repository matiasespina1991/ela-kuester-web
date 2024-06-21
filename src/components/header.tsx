"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Spin as Hamburger } from 'hamburger-react';
import styles from './header.module.css';
import AnimatedCursor from 'react-animated-cursor';

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

        {
isOpen && (
  <AnimatedCursor
          innerSize={10}
          outerSize={45}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          trailingSpeed={10}
          innerStyle={{
            backgroundColor: 'transparent',
            filter: 'opacity(0.9)',
            backdropFilter: 'invert(1)',
            zIndex: 1000,
          }}
          outerStyle={{
            backdropFilter: 'invert(1)',
            zIndex: 1000,
          }}
        />
)
        }
            
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

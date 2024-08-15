'use client';

// src/components/PageTransition.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.0 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { getAboutDescription } from "@/utils/getAboutDescription";
import { use } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const About = () => {
  const [aboutDescription, setAboutDescription] = useState('');
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchAboutDescription = async () => {
    const aboutDescription = await getAboutDescription();
    
    setAboutDescription(aboutDescription);
    setLoading(false);
  };
  fetchAboutDescription();
}
, []);

  return (
    <>
      <main className={styles.main}>
        <Box
          sx={{
            pt: "10rem",
            px: "0.5rem",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
        <motion.div style={{opacity: 0}} animate={{ opacity: loading ? 0 : 1 }}>
            <Typography variant="h3">About</Typography>
        </motion.div>
        <Box
        sx={{pt: "1rem"}}
        >

        </Box>

        <motion.div    animate={{ opacity: loading ? 0 : 1 }}>
           <Typography variant="h6" sx={{
            
            lineHeight: "1.8rem",
           }}>
          {aboutDescription}
            </Typography>
        </motion.div>
        </Box>
       
        
       
        
      </main>
    </>
  );
};

export default About;

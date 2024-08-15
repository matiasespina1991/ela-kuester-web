"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";

import { Box, Stack, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { ContactData, getContactData } from "@/utils/getContactData";


const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    phone: "",
    email: ""
  });
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [chipPosition, setChipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    getContactData().then((contactData) => {
      setContactData(contactData);
      setLoading(false);
    });
  }, []);

  const handleCopy = (text: string, event: React.MouseEvent) => {
    navigator.clipboard.writeText(text).then(() => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setChipPosition({ top: rect.bottom - 25 + window.scrollY, left: rect.left + 60 + window.scrollX });
      setCopiedText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <main className={styles.main}>
        <Stack
          spacing={3}
          direction={"column"}
          sx={{
            pt: "12rem",
            px: "1.6rem",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}>
            <Typography variant="h3" fontSize="2.7rem" >Contact</Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}>
            <Typography variant="h3" fontSize="2.7rem" fontWeight="bold">{contactData.name}</Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} className={styles.contactInfo}>
            <Typography
              variant="h3"
              fontSize="2.7rem" 
              className={styles.phone}
               fontWeight="bold"
              onClick={(e) => handleCopy(contactData.phone, e)}
              sx={{ cursor: "pointer"
               }}
            >
              {contactData.phone}
            </Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} className={styles.contactInfo}>
            <Typography
              variant="h3"
              fontSize="2.7rem" 
               fontWeight="bold"
              className={styles.email}
              onClick={(e) => handleCopy(contactData.email, e)}
              sx={{ cursor: "pointer" }}
            >
              {contactData.email}
            </Typography>
          </motion.div>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: "absolute",
                  top: chipPosition.top,
                  left: chipPosition.left,
                }}
              >
                <Chip label={`Copied ${copiedText} to clipboard`} sx={{backgroundColor: 'black', color: 'white'}} />
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      </main>
    </>
  );
};

export default Contact;

"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";
import Header from "../../components/header";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { get } from "http";
import { ContactData, getContactData } from "@/utils/getContactData";
import { set } from "firebase/database";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    getContactData().then((contactData) => {
      setContactData(contactData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <main className={styles.main}>
        <Stack
          spacing={5}
          direction={"column"}
          sx={{
            pt: "10rem",
            px: "0.5rem",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}>
            <Typography variant="h3">Contact</Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }}>
            <Typography variant="h3">{contactData.name}</Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} className={styles.contactInfo}>
            <Typography variant="h3" className={styles.phone}>{contactData.phone}</Typography>
          </motion.div>
          <motion.div style={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} className={styles.contactInfo}>
            <Typography variant="h3" className={styles.email}>{contactData.email}</Typography>
          </motion.div>
        </Stack>
      </main>
    </>
  );
};

export default Contact;

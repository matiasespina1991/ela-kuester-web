"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";
import Header from "../../components/header";

const About = () => {


  return (
    <>
      <main className={styles.main}>
        <h1>About</h1>
        
      </main>
    </>
  );
};

export default About;

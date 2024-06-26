"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";
import Header from "../../components/header";

const Art = () => {


  return (
    <>
      <main className={styles.main}>
        <h1>Art</h1>
     
      </main>
    </>
  );
};

export default Art;

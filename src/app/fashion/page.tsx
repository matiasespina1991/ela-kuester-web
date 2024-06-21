"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { db, collection, getDocs } from "../../utils/firebase";
import Header from "../../components/header";

const Fashion = () => {


  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Fashion</h1>
       
      </main>
    </>
  );
};

export default Fashion;

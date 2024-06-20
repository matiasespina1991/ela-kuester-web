// src/pages/second-page.tsx

"use client";

import Link from "next/link";
import styles from "../app/page.module.css";
import { db, collection, getDocs } from "../utils/firebase";
import Header from "@/components/header";

export default function SecondPage() {
  const fetchPhotos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "photos"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>Second Page</h1>
        <Link href="/">
          <button className={styles.button}>Go to Home</button>
        </Link>
        <button className={styles.button} onClick={fetchPhotos}>Fetch Photos</button>
      </main>
    </>
  );
}

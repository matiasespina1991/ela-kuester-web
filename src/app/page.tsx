"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { getHomePageVideo } from "../utils/getHomePageVideo";

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await getHomePageVideo();
      setVideoUrl(url);
    };
    fetchVideo();
  }, []);

  return (
    <main className={styles.main}>
      {videoUrl && (
        <video className={styles.backgroundVideo} autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <Link href="/second-page">
        <button className={styles.button}>Go to Second Page</button>
      </Link>
    </main>
  );
};

export default Home;

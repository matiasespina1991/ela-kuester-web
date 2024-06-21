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
        <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
    </main>
  );
};

export default Home;

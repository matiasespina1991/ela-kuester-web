// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getHomePageVideo } from "../utils/getHomePageVideo";
import Header from "../components/header";

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await getHomePageVideo();
      setVideoUrl(url);
    };
    fetchVideo();
  }, []);

  const handleBackgroundVideoLoaded = () => {
    setBackgroundVideoLoaded(true);
  };

  return (
    <>
      <Header videoLoaded={backgroundVideoLoaded} />
      <main className={styles.main}>
        {videoUrl && (
          <video onLoadedData={handleBackgroundVideoLoaded} preload="true" className={styles.backgroundVideo} autoPlay loop muted playsInline>
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </main>
    </>
  );
};

export default Home;

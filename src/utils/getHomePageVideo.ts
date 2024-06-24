import { db, collection, getDocs, query, where, orderBy, limit } from "./firebase";

export const getHomePageVideo = async (): Promise<string> => {
  try {

    
    
    console.log('Loading home page video...')

    const q = query(
      collection(db, "home_page_video"),
      where("use", "==", true),
      orderBy("created_at", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    let videoUrl = '';

    if (querySnapshot.empty) {
      console.error("No home page video found");
      return '';
    } else if (querySnapshot.size >= 1) {
      console.log("Video loaded.");
    }

    querySnapshot.forEach((doc) => {
      videoUrl = doc.data().video_url;
    });

    return videoUrl;
  } catch (error) {
    console.error("Error fetching home page video:", error);
    return '';
  }
};

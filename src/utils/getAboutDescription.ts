import { db, collection, getDocs, query, where, orderBy, limit } from "./firebase";

export const getAboutDescription = async (): Promise<string> => {
  try {

    
    
    console.log('Loading about description...')

    const q = query(
      collection(db, "about"),
      where("main", "==", true),
      limit(1)
    );

    console.log(q);

    const querySnapshot = await getDocs(q);
    let aboutDescription = '';

    if (querySnapshot.empty) {
      console.error("No about description doc found");
      return '';
    } else if (querySnapshot.size >= 1) {
      console.log("About description loaded.");
    }

    querySnapshot.forEach((doc) => {
      aboutDescription = doc.data().content;
    });

    return aboutDescription;
  } catch (error) {
    console.error("Error fetching home page video:", error);
    return '';
  }
};

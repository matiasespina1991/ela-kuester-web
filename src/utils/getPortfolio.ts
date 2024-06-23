import { collection, db, getDocs, limit, orderBy, query, where } from "./firebase";

interface Portfolio {
  active: boolean;
  created_at: any; // Puedes usar Timestamp si lo importas de firebase/firestore
  file_url: string;
  name: string;
}

export const getPortfolio = async (): Promise<Portfolio | null> => {
  const q = query(
    collection(db, 'portfolio'),
    where('active', '==', true),
    orderBy('created_at', 'desc'),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return doc.data() as Portfolio;
};

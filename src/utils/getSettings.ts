import { db, collection, query, where, orderBy, limit, getDocs } from "./firebase"; 

export const getSettings = async () => {
  const settingsCollection = collection(db, 'settings');

  const activeSettingsQuery = query(settingsCollection, where('active', '==', true), orderBy('created_at', 'desc'), limit(1));
  const activeSettingsSnapshot = await getDocs(activeSettingsQuery);

  if (!activeSettingsSnapshot.empty) {
    const activeSettingsDoc = activeSettingsSnapshot.docs[0];
    return {
      id: activeSettingsDoc.id,
      ...activeSettingsDoc.data()
    };
  } else {
    const latestSettingsQuery = query(settingsCollection, orderBy('created_at', 'desc'), limit(1));
    const latestSettingsSnapshot = await getDocs(latestSettingsQuery);
    const latestSettingsDoc = latestSettingsSnapshot.docs[0];
    return {
      id: latestSettingsDoc.id,
      ...latestSettingsDoc.data()
    };
  }
};

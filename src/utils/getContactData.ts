import { db, collection, getDocs, query, where, orderBy, limit } from "./firebase";


  ///ContactData type
    export type ContactData = {
        name: string,
        phone: string,
        email: string
    }

export const getContactData = async (): Promise<ContactData> => {
     var contactData: ContactData = {
        name: "",
        phone: "",
        email: ""
    };

  try {


    
    console.log('Loading contact data...')

    const q = query(
      collection(db, "contact")
    );


    const querySnapshot = await getDocs(q);
    

    if (querySnapshot.empty) {
      console.error("No contact data doc found");
      return contactData;
    } else if (querySnapshot.size >= 1) {
      console.log("Contact data loaded.");
    }

    querySnapshot.forEach((doc) => {
       if(doc.data().field_id == "contact_phone"){
        contactData.phone = doc.data().content;
       }
         if(doc.data().field_id == "contact_email"){
          contactData.email = doc.data().content;
         }
            if(doc.data().field_id == "contact_full_name"){
            contactData.name = doc.data().content;
            }
    });

    return contactData;
  } catch (error) {
    console.error("Error fetching home page video:", error);
    return contactData;
  }
};

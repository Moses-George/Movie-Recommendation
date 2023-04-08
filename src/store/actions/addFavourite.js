import { showPopUpMessage } from "../features/popupMessageSlice";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


export const addToFavourite = (data, userId) => {
    return async (dispatch) => {
        try {
            const docRef = doc(db, 'users', userId);
            const colRef = collection(docRef, "favourites");
            const docs = await getDocs(colRef);
            const favourite = docs?.docs.find(doc => doc.data().title === data.title);

            if (favourite) {
                dispatch(showPopUpMessage("Already exist in Favourite List!"));
            } else {
                await addDoc(colRef, data);
                dispatch(showPopUpMessage("Added to Favourite List!"));
            }
        } catch (error) {
            console.log(error);
        }

    }
}
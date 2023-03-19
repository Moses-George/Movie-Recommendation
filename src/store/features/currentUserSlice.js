import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const currentUserApi = createApi({
    reducerPath: "currentUser",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query({
            async queryFn(userId) {
                try {
                    if (userId) {
                        const q = query(collection(db, "users"), where("uid", "==", userId));
                        const doc = await getDocs(q);
                        const data = { data: doc.docs[0].data(), docId: doc.docs[0].id };
                        // const docId = doc.docs[0].id;
                        // console.log(doc.docs[0])
                        return { data };
                    }
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["User"],
        })
    })
})

export const { useFetchCurrentUserQuery } = currentUserApi;
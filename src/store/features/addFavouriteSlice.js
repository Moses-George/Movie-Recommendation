import { createSlice } from "@reduxjs/toolkit";

const addFavouriteSlice = createSlice({
    name: "favouriteMessage",
    initialState: { message: "" },
    reducers: {
        showPopUpMessage: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { showPopUpMessage } = addFavouriteSlice.actions;

export default addFavouriteSlice; 
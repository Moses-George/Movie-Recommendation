import { createSlice } from "@reduxjs/toolkit";

const popupMessageSlice = createSlice({
    name: "popupMessage",
    initialState: { message: "" },
    reducers: {
        showPopUpMessage: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { showPopUpMessage } = popupMessageSlice.actions;

export default popupMessageSlice;  
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "popupMessage",
    initialState: { message: JSON.parse(localStorage.getItem("notifCount")) || [] },
    reducers: {
        setNotificationCount: (state, action) => {
            state.message = action.payload;
        }
    }
});

export const { setNotificationCount } = notificationSlice.actions;

export default notificationSlice;  
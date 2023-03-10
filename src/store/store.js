import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { movieApi } from "./features/movieApiSlice";
import { newsApi } from "./features/newsApiSlice";
import {currentUserApi} from "./features/currentUserSlice"; 

const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer, 
        [currentUserApi.reducerPath]: currentUserApi.reducer 
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware).concat(newsApi.middleware).concat(currentUserApi.middleware)
});

setupListeners(store.dispatch);

export default store
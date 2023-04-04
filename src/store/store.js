import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { movieApi } from "./service/movieApiSlice";
import { newsApi } from "./service/newsApiSlice";
import { currentUserApi } from "./service/currentUserSlice";
import theme from "./features/Theme/themeSlice";
import addFavouriteSlice from "./features/addFavouriteSlice";
// import favourite from "./features/addFavouriteSlice";

const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [currentUserApi.reducerPath]: currentUserApi.reducer,
        theme,
        favouriteMessage: addFavouriteSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware).concat(newsApi.middleware).concat(currentUserApi.middleware)
});

setupListeners(store.dispatch);

export default store
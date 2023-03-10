import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "f44cadec838242449ce858377402d8d5";

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
    endpoints: (builder) => ({
        getTopStories: builder.query({
            query: () => `top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`,
        }),
    })
});

export const { 
    useGetTopStoriesQuery
} = newsApi;
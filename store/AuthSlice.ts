import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const AuthSlice = createApi({
    reducerPath: "authSlice",
    tagTypes: ["App"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: '/login'
            }),
            providesTags: [{type: 'App', id: 'Auth'}]
        }),
        addCurrentUser: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Auth'}]
        }),
        quitCurrentUser: builder.mutation({
            query: (userId) => ({
                url: `/login/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Auth'}]
        }),
        getUsers: builder.query({
            query: () => ({
                url: '/register'
            }),
            providesTags: [{type: 'App', id: 'Auth'}]
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Auth'}]
        })
        
    }),
});

export const {
    useAddCurrentUserMutation,
    useGetCurrentUserQuery,
    useQuitCurrentUserMutation,
    useAddUserMutation,
    useGetUsersQuery
} = AuthSlice;


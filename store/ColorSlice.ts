import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const ColorsSlice = createApi({
    reducerPath: "colorsSlice",
    tagTypes: ["App"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getColors: builder.query({
            query: () => ({
                url: 'colors',
            }),
            providesTags: [{type: 'App', id: 'Col'}]
        }),
        getColorById: builder.query({
            query: (colorId: number) => ({
                url: `colors/${colorId}`,
            })
        }),
        addColor: builder.mutation({
            query: (body) => ({
                url: 'colors',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Col'}]
        }),
        deleteColor: builder.mutation({
            query: (id: number) => ({
                url: `colors/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Col'}]
        }),
        updateColor: builder.mutation({
            query: (body) => ({
                url: `colors/${body.colorId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Col'}]
        }),
    }),
});

export const {
    useGetColorByIdQuery,
    useGetColorsQuery,
    useAddColorMutation,
    useUpdateColorMutation,
    useDeleteColorMutation
} = ColorsSlice;


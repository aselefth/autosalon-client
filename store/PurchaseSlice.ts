import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const PurchaseSlice = createApi({
    reducerPath: "purchaseSlice",
    tagTypes: ["App"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getPurchases: builder.query({
            query: () => ({
                url: '/purchases'
            }),
            providesTags: [{type: 'App', id: 'Purch'}]
        }),
        getPurchaseById: builder.query({
            query: (purchaseId: number) => ({
                url: `/purchases/${purchaseId}`
            }),
            providesTags: [{type: 'App', id: 'Purch'}]
        }),
        addPurchase: builder.mutation({
            query: (body) => ({
                url: '/purchases',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Purch'}]
        }),
        updatePurchase: builder.mutation({
            query: (body) => ({
                url: `/purchases/${body.purchaseId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Purch'}]
        }),
        deletePurchase: builder.mutation({
            query: (purchaseId: number) => ({
                url: `/purchases/${purchaseId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Purch'}]
        })
    }),
});

export const {
    useGetPurchaseByIdQuery,
    useGetPurchasesQuery,
    useAddPurchaseMutation,
    useDeletePurchaseMutation,
    useUpdatePurchaseMutation
} = PurchaseSlice;


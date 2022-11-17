import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const ClientSlice = createApi({
    reducerPath: "clientsSlice",
    tagTypes: ["App"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getClients: builder.query({
            query: () => ({
                url: '/clients'
            }),
            providesTags: [{type: 'App', id: 'Clients'}]
        }),
        addClient: builder.mutation({
            query: (body) => ({
                url: `clients`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Clients'}]
        }),
        getClientById: builder.query({
            query: (clientId: number) => ({
                url: `clients/${clientId}`,
            })
        }),
        deleteClient: builder.mutation({
            query: (clientId: number) => ({
                url: `clients/${clientId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Clients'}]
        }),
        updateClient: builder.mutation({
            query: (body) => ({
                url: `clients/${body.clientId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Clients'}]
        }),
    }),
});

export const {
    useGetClientsQuery,
    useGetClientByIdQuery,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useAddClientMutation
} = ClientSlice;


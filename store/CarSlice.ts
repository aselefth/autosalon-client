import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const CarSlice = createApi({
    reducerPath: "carSlice",
    tagTypes: ["App"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => ({
                url: `/cars`,
            }),
            providesTags: [{ type: "App", id: "Cars" }],
        }),
        getCarByVin: builder.query({
            query: (vin: string) => ({
                url: `/cars/car/${vin}`,
            }),
            providesTags: [{ type: "App", id: "Cars" }],
        }),
        addCar: builder.mutation({
            query: (body) => ({
                url: "/cars",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "App", id: "Cars" }],
        }),
        updateCar: builder.mutation<
            string,
            {
                vin: string;
                carName: string;
                engineId: number;
                transmissionId: number;
                colorId: number;
                bodyTypeId: number;
                img: string;
            }
        >({
            query: (body) => ({
                url: `/cars/${body.vin}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: [{ type: "App", id: "Cars" }],
        }),
        deleteCar: builder.mutation({
            query: (vin: string) => ({
                url: `/cars/${vin}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "App", id: "Cars" }],
        }),
        getCarsByName: builder.query({
            query: (q: {name: string}) => ({
                url: `/cars/search/${q.name}`
            }),
            providesTags: [{type: 'App', id: 'Cars'}]
        })
    }),
});

export const {
    useGetCarsQuery,
    useGetCarByVinQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useGetCarsByNameQuery
} = CarSlice;


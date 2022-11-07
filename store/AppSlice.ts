import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const AppSlice = createApi({
    reducerPath: 'appSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['App'],
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
        getEngines: builder.query({
            query: () => ({
                url: '/engines'
            }),
            providesTags: [{type: 'App', id: 'Eng'}]
        }),
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
        getBodyTypes: builder.query({
            query: () => ({
                url: '/bodyTypes'
            }),
            providesTags: [{type: 'App', id: 'BodyTypes'}]
        }),
        getBodyTypeById: builder.query({
            query: (bodyTypeId: number) => ({
                url: `/bodyTypes/${bodyTypeId}`
            }),
            providesTags: [{type: 'App', id: 'BodyTypes'}] 
        }),
        getTransmissions: builder.query({
            query: () => ({
                url: '/transmissions'
            }),
            providesTags: [{type: 'App', id: 'Transmissions'}]
        }),
        getTransmissionById: builder.query({
            query: (transmissionId: number) => ({
                url: `/transmissions/${transmissionId}`
            }),
            providesTags: [{type: 'App', id: 'Transmissions'}] 
        }),
        getCars: builder.query({
            query: () => ({
                url: '/cars'
            }),
            providesTags: [{type: 'App', id: 'Cars'}]
        }),
        getCarByVin: builder.query({
            query: (vin: string) => ({
                url: `/cars/${vin}`
            }),
            providesTags: [{type: 'App', id: 'Cars'}]
        }),
        addCar: builder.mutation({
            query: (body) => ({
                url: '/cars',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Cars'}]
        }),
        updateCar: builder.mutation<string, {vin: string,carName: string, engineId: number, transmissionId: number, colorId: number, bodyTypeId: number, img: string}>({
            query: (body) => ({
                url: `/cars/${body.vin}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Cars'}]
        }),
        deleteCar: builder.mutation({
            query: (vin: string) => ({
                url: `/cars/${vin}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Cars'}]
        }),
        getDepartments: builder.query({
            query: () => ({
                url: '/departments'
            }),
            providesTags: [{type: 'App', id: 'Deps'}]
        }),
        getEquipmentTypes: builder.query({
            query: () => ({
                url: '/equipmentTypes'
            }),
            providesTags: [{type: 'App', id: 'EquipTypes'}]
        }),
        getEquipment: builder.query({
            query: () => ({
                url: '/equipment'
            }),
            providesTags: [{type: 'App', id: 'Equip'}]
        }),
        getEquipmentById: builder.query({
            query: (equipmentId: number) => ({
                url: `equipment/${equipmentId}`
            }),
            providesTags: [{type: 'App', id: 'Equip'}]
        }),
        addEquipment: builder.mutation({
            query: (body) => ({
                url: '/equipment',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Equip'}]
        }),
        updateEquipment: builder.mutation({
            query: (body) => ({
                url: `/equipment/${body.equipmentId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Equip'}]
        }),
        deleteEquipment: builder.mutation({
            query: (equipmentId: number) => ({
                url: `equipment/${equipmentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Equip'}]
        }),
        getEmployee: builder.query({
            query: () => ({
                url: '/employees'
            }),
            providesTags: [{type: 'App', id: 'Empl'}]
        }),
        getEmployeeById: builder.query({
            query: (employeeId: number) => ({
                url: `/employees/${employeeId}`
            }),
            providesTags: [{type: 'App', id: 'Empl'}]
        }),
        addEmployee: builder.mutation({
            query: (body) => ({
                url: '/employees',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Empl'}]
        }),
        updateEmployee: builder.mutation({
            query: (body) => ({
                url: `/employees/${body.employeeId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{type: 'App', id: 'Empl'}]
        }),
        deleteEmployee: builder.mutation({
            query: (employeeId: number) => ({
                url: `/employees/${employeeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'App', id: 'Empl'}]
        }),
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
    })
})

export const {
    useGetColorsQuery, 
    useAddColorMutation, 
    useDeleteColorMutation, 
    useUpdateColorMutation, 
    useGetColorByIdQuery,
    useGetEnginesQuery,
    useGetClientsQuery,
    useGetClientByIdQuery,
    useAddClientMutation,
    useDeleteClientMutation,
    useUpdateClientMutation,
    useGetBodyTypesQuery,
    useGetBodyTypeByIdQuery,
    useGetTransmissionsQuery,
    useGetTransmissionByIdQuery,
    useGetCarsQuery,
    useGetCarByVinQuery,
    useAddCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useGetDepartmentsQuery,
    useGetEquipmentTypesQuery,
    useGetEquipmentQuery,
    useGetEquipmentByIdQuery,
    useAddEquipmentMutation,
    useUpdateEquipmentMutation,
    useDeleteEquipmentMutation,
    useGetEmployeeQuery, 
    useGetEmployeeByIdQuery,
    useAddEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useGetPurchasesQuery,
    useGetPurchaseByIdQuery,
    useAddPurchaseMutation,
    useDeletePurchaseMutation,
    useUpdatePurchaseMutation
} = AppSlice;
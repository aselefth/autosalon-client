import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const AppSlice = createApi({
    reducerPath: 'appSlice',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['App'],
    endpoints: (builder) => ({
        getEngines: builder.query({
            query: () => ({
                url: '/engines'
            }),
            providesTags: [{type: 'App', id: 'Eng'}]
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
    })
})

export const {
    useGetEnginesQuery,
    useGetBodyTypesQuery,
    useGetBodyTypeByIdQuery,
    useGetTransmissionsQuery,
    useGetTransmissionByIdQuery,
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
} = AppSlice;
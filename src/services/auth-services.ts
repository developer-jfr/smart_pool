import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://babylon-api.aitrix.online/'}),
    tagTypes: ['Register', 'Login', 'UpdateME', 'Notification'], 
    endpoints: (build) => ({
       
    })
})



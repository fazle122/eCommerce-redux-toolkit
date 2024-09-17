/* eslint-disable no-unused-vars */
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';


const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,credentials:"include"});
// const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,prepareHeaders: (headers) => {
//     return headers;}});

export const apiSLice = createApi({
    baseQuery,
    tagTypes:['Products','Product','Order','Users'],
    endpoints:(builder) => ({
        
    })
})
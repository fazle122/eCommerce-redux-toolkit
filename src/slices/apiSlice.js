/* eslint-disable no-unused-vars */
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';


// const baseQuery = fetchBaseQuery({baseUrl:BASE_URL}); //// will work with local environment only
// const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,prepareHeaders: (headers) => {return headers;}}); ///// will work with remote environment but have to set - credentials:"include" in each api call individually
const baseQuery = fetchBaseQuery({baseUrl:BASE_URL,credentials:"include"});  ///// will work with remote environment


export const apiSLice = createApi({
    baseQuery,
    tagTypes:['Products','Product','Order','Users'],
    endpoints:(builder) => ({
        
    })
})

import { PRODUCTS_URL } from "../constant";
import { apiSLice } from "./apiSlice";


export const productSlice = apiSLice.injectEndpoints({
    endpoints:(builder) => ({
        // getProducts:builder.query({
        //     query: ({keyword,pageNumber}) => ({
        //         url:PRODUCTS_URL,
        //         // url:`${USERS_URL}/test`,
        //         params:{
        //             keyword,
        //             pageNumber
        //         }
        //     }),
        //     providesTags:['Products'], 
        //     keepUnusedDataFor:5
        // }),
        getProducts:builder.query({
            query: (params) => ({
                url:PRODUCTS_URL,
                params:{
                    keyword:params?.keyword,
                    pageNumber:params?.pageNumber,
                    "category":params?.category,
                    "rating":params?.rating,
                    "price[gte]":params.min,
                    "price[lte]":params.max,
                },
                // credentials:"include"
            }),
            providesTags:['Products'], 
            keepUnusedDataFor:5
        }),
        getProductDetail:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/${productId}`,
                // credentials:"include"
            }),
            providesTags: ["Product"],
            keepUnusedDataFor:5
        }),
        getProductDetailBySlug:builder.query({
            query:(slugs) => ({
                url:`${PRODUCTS_URL}/${slugs}`,
                // credentials:"include"
            }),
            providesTags: ["Product"],
            keepUnusedDataFor:5
        }),
        getTopProducts:builder.query({
            query:() => ({
                url:`${PRODUCTS_URL}/top`,
                // credentials:"include"
            }),
            keepUnusedDataFor:5
        }),
        createProduct:builder.mutation({
            query:(data) =>({
                url:`${PRODUCTS_URL}`,
                method:'POST',   
                body:data,
                // credentials:"include"
            }),
            invalidatesTags:['Products']
        }),
        uploadProductImage:builder.mutation({
            query:({id,body})=>({
                url:`${PRODUCTS_URL}/${id}/upload_images`,
                method:'PUT',
                body,
                // credentials:"include"
            }),
            invalidatesTags:['Product']
        }),
        deleteProductImage:builder.mutation({
            query:({id,body})=>({
                url:`${PRODUCTS_URL}/${id}/delete_image`,
                method:'PUT',
                body,
                // credentials:"include"
            }),
            invalidatesTags:['Product']
        }),
        updateProduct:builder.mutation({
            query({ id, body }) {
                return {
                  url: `${PRODUCTS_URL}/${id}`,
                  method: "PUT",
                  body,
                //   credentials:"include"
                };
              },
            invalidatesTags:['Products']
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE',
                // credentials:"include"
            })
        }),
        // createReview:builder.mutation({
        //     query:(data)=>({
        //         url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        //         method:'POST',
        //         body:data
        //     }),
        //     invalidatesTags:['Products']
        // })
        canUserReview:builder.query({
            query:(productId) => ({
                url:`${PRODUCTS_URL}/canReview?productId=${productId}`,
                // credentials:"include"
            }),
            invalidatesTags: ['Products'],
        }),
        createReviews: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            //   credentials:"include"
            }),
            invalidatesTags: ['Products'],
          }),
    })
});

export const { 
    useGetProductsQuery,
    useGetProductDetailQuery,
    useGetProductDetailBySlugQuery,
    useGetTopProductsQuery,
    useCreateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductImageMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCanUserReviewQuery,
    useCreateReviewsMutation
    
 } = productSlice;
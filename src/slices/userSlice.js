import { USERS_URL } from "../constant";
import { apiSLice } from "./apiSlice";

export const userSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => ({
    getClientId: builder.query({
      query: () => ({
        url: `${USERS_URL}/clientId`,
        // credentials:"include"
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        // credentials:"include"
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/googleLogin`,
        method: "POST",
        body: data,
        // credentials:"include"
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        // credentials:"include"
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        // credentials:"include"
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        // credentials:"include"
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        credentials: "include",
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/password`,
        method: "PUT",
        body: data,
        // credentials:"include"
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
        // credentials:"include"
      }),
    }),
    // getUserById:builder.query({
    //     query:(userId)=>({
    //         url:`${USERS_URL}/${userId}`
    //     }),
    //     keepUnusedDataFor:5
    // }),
    // updateUser:builder.mutation({
    //     query:(data)=>({
    //         url:`${USERS_URL}/${data._id}`,
    //         method:'PUT',
    //         body:data
    //     }),
    //     invalidatesTags:['Users']
    // }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        //   credentials:"include"
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
        //   credentials:"include"
      }),
      invalidatesTags: ["Users"],
    }),
    addFavProduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addToFav`,
        method: "PUT",
        body: data,
        //   credentials:"include"
      }),
      invalidatesTags: ["Users"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/password/forgot`,
        method: "POST",
        body: data,
      }),
    }),
    // deleteProductImage: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `${PRODUCTS_URL}/${id}/delete_image`,
    //     method: "PUT",
    //     body,
    //     // credentials:"include"
    //   }),
    //   invalidatesTags: ["Product"],
    // }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL}/password/reset/${token}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetClientIdQuery,
  useLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetProfileQuery,
  useUpdatePasswordMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  // useGetUserByIdQuery,
  // useUpdateUserMutation
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useAddFavProductMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userSlice;

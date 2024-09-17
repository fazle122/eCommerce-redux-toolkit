
import { USERS_URL } from "../constant";
import { apiSLice } from "./apiSlice";


export const userSlice = apiSLice.injectEndpoints({
    endpoints:(builder) => ({
        getClientId:builder.query({
            query:() =>({
                url:`${USERS_URL}/clientId`,
                credentials:"include"
            })
        }),
        login:builder.mutation({
            
            query: (data) => ({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data,
                credentials:"include"
            }),
        }),
        googleLogin:builder.mutation({
            query:(data) =>({
                url:`${USERS_URL}/googleLogin`,
                method:'POST',
                body:data,
                credentials:"include"
            })
        }),
        register:builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data,
                credentials:"include"
            }),
        }),
        logout:builder.mutation({
            query:() => ({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        }),
        profile:builder.mutation({
            query:(data) =>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data,
                credentials:"include"
            })
        }),
        getUsers:builder.query({
            query:()=>({
                url:`${USERS_URL}`,
                credentials:"include"
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5,
        }),
        
        deleteUser:builder.mutation({
            query:(userId) =>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE',
                credentials:"include"

            })
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
              credentials:"include"
            }),
            keepUnusedDataFor: 5,
          }),
          updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/${data.userId}`,
              method: 'PUT',
              body: data,
              credentials:"include"
            }),
            invalidatesTags: ['Users'],
          }),
    })
});

export const { 
    useGetClientIdQuery,
    useLoginMutation,
    useGoogleLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    // useGetUserByIdQuery,
    // useUpdateUserMutation
    useGetUserDetailsQuery,
    useUpdateUserMutation
 } = userSlice;


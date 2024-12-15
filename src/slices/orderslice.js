import { apiSLice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "@/constant";

export const orderSlice = apiSLice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
        credentials: "include",
      }),
    }),
    getOrderDetail: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
        credentials: "include",
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/userOrders`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = orderSlice;

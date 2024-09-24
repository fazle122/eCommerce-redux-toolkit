// import Loader from "@/components/Loader";
// import { useGetUserOrdersQuery } from "@/slices/orderslice"
// import { Link } from "react-router-dom";


// export default function UserOrders(){

//     const {data:orders,isLoading,error} = useGetUserOrdersQuery();
//     console.log(orders);


//     if(isLoading) return <Loader />
//     if(error) return <p>some thing went wrong</p>
//     return (
//         <div>
//             <h1 className="underline text-xl">Order list</h1>
//             <div >
//                 {
//                     orders.map((order,index) => <div key={index} className="flex space-x-4 border-b-2">
//                         <p>{`Order no: ${order._id}`}</p>
//                         <p>{`Total amount: ${order.totalPrice}`}</p>
//                         <p>{`User name: ${order?.user?.name}`}</p>
//                         <p>{`Address: ${order.shippingAddress.address}`}</p>
//                         <p>{!order.isDelivered ? "Not delivered" : `Delivered at ${order.deliveredAt} `}</p>
//                         <Link className="underline" to={`/orders/${order._id}`}>Detail</Link>

//                     </div>)
//                 }
//             </div>
//         </div>
//     )
// }


import Loader from "@/components/Loader";
import { useGetUserOrdersQuery } from "@/slices/orderslice"
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHeadr from "@/components/CommonTableHeadr";
import OrderItemRow from "./OrderItemRow";


export default function UserOrderList(){

    const {data:orders,isLoading,error} = useGetUserOrdersQuery();
    // console.log(orders);


    if(isLoading) return <Loader minHeight={"min-h-screen"}/>
    if(error) return <p>some thing went wrong</p>
    return (
        <div>
            {/* <h1 className="underline text-xl">Order list</h1> */}
            <Container>
                    <Card>
                        {/* <Scrollbar> */}
                        <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHeadr
                            rowCount={orders.length}
                            headLabel={[
                                { id: "orderId", label: "Order ID" },
                                { id: "totalPrice", label: "Total Price" },
                                { name: "name", label: "Name"},
                                { id: "address", label: "Address" },
                                { id: "" },
                            ]}
                            />
                            <TableBody>
                            {orders.map((order) => (
                                <OrderItemRow key={order.id} data={order} />
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        {/* </Scrollbar> */}

                        {/* <TablePagination
                            page={page}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                    </Card>
                </Container>
        </div>
    )
}

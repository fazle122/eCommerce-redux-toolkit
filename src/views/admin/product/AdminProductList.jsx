/* eslint-disable no-unused-vars */
import Loader from "@/components/Loader";
import Paginate from "@/components/Paginate";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "@/slices/productSlice"
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import ProductTableRow from "./TableRow";
import ProductTableHead from "./TableHead";
import Modal from "@/components/Modal";
import CreateProduct from "@/views/product/CreateProduct";




export default function AdminProducts(){

    const [open, setOpen] = useState(false); 
    const handleOpen = () => setOpen(!open);

    const {pageNumber} = useParams();
    const {data,refetch,isLoading,error} = useGetProductsQuery({pageNumber});
    // const [deleteProduct,{isLoading:deleteLoading}] = useDeleteProductMutation();
    const [createProduct] = useCreateProductMutation();




    if(isLoading) return <Loader minHeight={"min-h-screen"}/>

    async function  handelCreateProduct() {
        // if(window.confirm('Are you sure to create a new product?')){
            try{
                await createProduct();
                refetch();
            }catch(err){
                console.log(err);
            }
        // }
    }

    

    return(
        <div>
            <div className="flex flex-col space-y-6"> 
                <div className="flex justify-between">
                    <h1 className="underline">Product list for admin</h1>
                    <div>
                        <button onClick={handleOpen} disabled={isLoading} className="rounded-md bg-black text-white px-5 py-2">Create product</button>
                        { 
                            <Modal isOpen={open} handleOpen={handleOpen}>
                                <CreateProduct handleOpen={handleOpen} />
                            </Modal>
                        }
                    </div>
                    


                </div>
                <Container>
                    <Card>
                        {/* <Scrollbar> */}
                        <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <ProductTableHead
                            rowCount={data.products.length}
                            headLabel={[
                                { id: "name", label: "Name" },
                                { id: "brand", label: "Brand" },
                                { id: "category", label: "Category" },
                                { id: "price", label: "Price" },
                                { id: "" },
                            ]}
                            />
                            <TableBody>
                            {data.products.map((product) => (
                                <ProductTableRow key={product.id} data={product} />
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
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </div>
        </div>
    )
}






























// import Loader from "@/components/Loader";
// import Paginate from "@/components/Paginate";
// import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "@/slices/productSlice"
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";




// export default function AdminProducts(){

//     const {pageNumber} = useParams();
//     const {data,refetch,isLoading,error} = useGetProductsQuery({pageNumber});
//     const [deleteProduct,{isLoading:deleteLoading}] = useDeleteProductMutation();
//     const [createProduct] = useCreateProductMutation();




//     if(isLoading) return <Loader minHeight={"min-h-screen"}/>

//     async function  handelCreateProduct() {
//         // if(window.confirm('Are you sure to create a new product?')){
//             try{
//                 await createProduct();
//                 refetch();
//             }catch(err){
//                 console.log(err);
//             }
//         // }
//     }

//     async function handleDelete(id){
//         if(window.confirm('Are you sure?')){
//             try{
//                 await deleteProduct(id);
//                 refetch();
//                 toast.success('product deleted successfully');
//             }catch(err){
//                 toast.error(err?.data?.message || err.error)
//             }
//         }

//     }

//     return(
//         <div>
//             <div className="flex flex-col space-y-6"> 
//                 <div className="flex justify-between">
//                     <h1 className="underline">Product list for admin</h1>
//                     <div>
//                         <button onClick={handelCreateProduct} disabled={isLoading} className="rounded-md bg-black text-white px-5 py-2">Create product</button>
//                         {error &&  <p>some thing went wrong</p>}

//                     </div>
                    


//                 </div>
//                 <div className="space-y-6">
//                 {data.products.map((product,index) => 
//                         <div className="flex space-x-4 md:space-x-12 border-b-4" key={index}>
//                             <p>{product.name}</p>
//                             <p>{product.brand}</p>
//                             <p>{product.price}</p>
//                             <p>{product.category}</p>
//                             <Link className="underline" to={`/admin/product/${product.slug}/edit`}>view detail</Link>
//                             <button disabled={deleteLoading} className="bg-black text-white rounded-md px-2 py-1" onClick={()=> handleDelete(product._id)}>Delete</button>
//                         </div>
//                     )}
                
//                 </div>
//                 <Paginate pages={data.pages} page={data.page} isAdmin={true} />
//             </div>
//         </div>
//     )
// }
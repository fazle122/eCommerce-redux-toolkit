// import {  useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import CartRow from "./CartRow";
import TableHeadr from "@/components/CommonTableHeadr";


export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  function handleCheckOut() {
    navigate("/login?redirect=/shipping");
  }
  function handleShopping() {
    navigate("/");
  }

  return (
    <div className="space-y-2">
      <h1 className="px-4 underline text-xl">Cart items</h1>
      <div className="md:grid md:grid-cols-2">

        <Container sx={{ maxWidth:900}}>
            <Card>
                <TableContainer>
                    <Table>
                    <TableHeadr
                        rowCount={cartItems.length}
                        headLabel={[
                        { id: "productName", label: "Name" },
                        { id: "price", label: "Price " },
                        { id: "quantity", label: "Quantity" },
                        { id: "" },
                        ]}
                    />
                    <TableBody>
                        {cartItems.map((item) => (
                          <CartRow key={item._id} item={item} />
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
        <div className="px-4">
              <div className="my-2 border-2 px-4 py-1 w-72">
                  <h1>
                      Total items: {cartItems.reduce((acc,item) => acc + item.qty,0)}
                  </h1>
                  <h2>
                      Total cost: $ {cartItems.reduce((acc,item) => acc + item.qty * item.price,0).toFixed(2)}
                  </h2>
              </div>
              <button disabled={cartItems.length === 0} className="w-72 h-12 my-1 px-2 border-2  bg-gray-600 text-white rounded-md" onClick={handleShopping}>Purchase more</button>
              <button disabled={cartItems.length === 0} className="w-72 h-12 my-1 px-2 border-2  bg-gray-600 text-white rounded-md" onClick={handleCheckOut}>Check out</button>
        </div>
      </div>

    </div>
  );
}








































// // import {  useDispatch } from "react-redux";
// import {  useSelector } from "react-redux";
// import {Link, useNavigate,} from "react-router-dom"
// import CartRow from "../../components/CartRow";
// // import { addToCart } from "../../slices/cartSlice";

// export default function Cart(){

//     const navigate = useNavigate();
//     const cart = useSelector((state) => state.cart);
//     const {cartItems} = cart;

//     // const dispatch = useDispatch();
//     // const [currentQuantity,setCurrentQuantity] = useState(item.qty);

//     // function handleAddItem(){
//     //     setCurrentQuantity(currentQuantity+1);
//     //     dispatch(addToCart({...item,currentQuantity}));

//     // }

//     // function handleDeleteItem(){
//     //     setCurrentQuantity(currentQuantity-1);
//     //     dispatch(addToCart({...item,currentQuantity}));
//     // }

//     function handleCheckOut(){
//         navigate('/login?redirect=/shipping');
//     }

//     return (
//         <div>
//             <h1 className="text-2xl">Cart items</h1>

//             {cartItems.length <=0 &&
//                 <div className="flex flex-col">
//                     <span> No items added to cart</span>
//                     <Link className="underline" to="/">Please add item to cart</Link>
//                 </div>
//             }
//             {
//                 cartItems.map((item) => <CartRow key={item._id} item={item} />)
//                 // cartItems.map((item) => <div key={item._id}>
//                 //     <img className="my-2 w-16 px-2 py-2 rounded-sm border-2 " src={item.images[0].url} alt={item.name} />
//                 //     <h2>{`Name: ${item.name}`}</h2>
//                 //     <h2>{`Quantity: ${item.qty}`}</h2>
//                 //     <div className="space-x-2">
//                 //         <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={handleAddItem} >+</button>
//                 //         <span>{item.qty}</span>
//                 //         <button className="border-2 rounded-lg bg-gray-400 text-white px-2 text-2xl" onClick={handleDeleteItem}>-</button>
//                 //     </div>
//                 //     <Link to={`/product/${item._id}`} className="underline">view detail</Link>
//                 //     <button className="text-white bg-black px-1 py-1 w-16 h-8 rounded-md">Delete</button>
//                 // </div>)
//             }
//             <div className="grid grid-cols-2" >
//                 <div className="my-5 border-2 px-4 py-2 w-72">
//                     <h1>
//                         Subtotal ({cartItems.reduce((acc,item) => acc + item.qty,0)}) items
//                     </h1>
//                     <h2>
//                         Total cost: $ {cartItems.reduce((acc,item) => acc + item.qty * item.price,0).toFixed(2)}
//                     </h2>
//                 </div>
//                 <button disabled={cartItems.length === 0} className="w-36 h-12  my-5 px-2 py-3 border-2  bg-gray-600 text-white rounded-md" onClick={handleCheckOut}>Check out</button>
//             </div>
//         </div>
//     )
// }

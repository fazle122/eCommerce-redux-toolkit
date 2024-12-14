import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/slices/orderslice";
import { clearCartItems  }  from "@/slices/cartSlice";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


export default function PlaceOrder(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createOrder,{isLoading,error}] = useCreateOrderMutation();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/Shipping');
        }else if(!cart.paymentMethod){
            navigate('/Shipping');
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate])


    async function handlePlaceOrder(){
        try{
            const res = await createOrder({
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`)
        }catch(err){
            console.log(err);
            toast.error(err);
        }
        
    }



    return(
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
            {/* <CheckoutSteps step1 step2 step3 step4 /> */}
            <div className="md:grid md:grid-cols-2">
                <div className="space-y-2">
                    <Card className="flex flex-col m-2 space-y-4">
                        <CardHeader className="bg-gray-400 w-full text-white" title="Shipping detail" />
                        <CardContent className="space-y-8">
                            <span>{cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postCode},{cart.shippingAddress.country}</span>
                            <h2>Payment method: <span>{cart.paymentMethod}</span></h2>

                        </CardContent>
                    </Card>
                    <Card className="flex flex-col m-2 space-y-4">
                        <CardHeader className="bg-gray-400 w-full text-white" title="Order items" />
                        <CardContent className="space-y-8">
                        <div className="space-y-2">
                            {cart.cartItems.length === 0 ? <p>No item added to cart</p> :
                                cart.cartItems.map((item,index) => (
                                    <div className="flex space-x-6" key={index}>
                                        <img className="w-16" src={item.images[0].url} alt={item.name} />
                                        <Link to={`/product/${item._id}`} className="underline">{item.name}</Link>
                                        <p>{`Qty: ${item.qty}`}</p>
                                        <p>{`Total: ${item.price}`}</p>

                                    </div>

                            ))}
                        </div>

                        </CardContent>
                    </Card>   
                    
                </div>
                <Card className="flex flex-col m-2 space-y-4">
                    <CardHeader className="bg-gray-400 w-full text-white" title="Order summary" />
                    <CardContent className="space-y-8">
                    <div className="border px-2 py-2 rounded-md">
                        <p>{`Items: $${cart.itemsPrice}`}</p>
                        <p>{`Shipping: $${cart.shippingPrice}`}</p>
                        <p>{`Tax: $${cart.taxPrice}`}</p>
                        <p>{`Total Price: $${cart.totalPrice}`}</p>
                        
                    </div>
                    {isLoading ? <Loader /> : <button className="bg-black px-2 py-1 text-white rounded-md w-full" onClick={handlePlaceOrder}>Confirm Order</button> }
                        {error && <p>error?.message</p>}

                    </CardContent>
                </Card> 
                
            </div>

        </div>
    )
}
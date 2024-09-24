/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "@/slices/cartSlice";
import toast from "react-hot-toast";
import { useAddFavProductMutation } from "@/slices/userSlice";


export default function Product({product}){
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const [qty,setQty] = useState(1);
  const dispatch = useDispatch()
  const [addToFav,{isLoading:updateLoading}] = useAddFavProductMutation();

  let existItem;


  useEffect(() => {
    if(cartItems.length>0){
        // console.log('cartItems',cartItems);
        // console.log('product ',product);
        // existItem = cartItems.find((ct) => ct._id === productId);
        // existItem = cartItems.find((ct) => ct._id === product?._id);
        existItem = cartItems.find((ct) => ct._id === product?._id);
        if(existItem){
            setQty(existItem.qty + 1)
        }
    }
},[qty])

  function handleClick(){
    dispatch(addToCart({...product,image:product.images[0].url,qty}));
    toast.success("Item added to cart successfully")
}


async function handleAddFav(data){
  console.log(data);
  try{
      const res = await addToFav(product);
      console.log(res);
      toast.success('Product added to favourite list successfully');

  }catch(err){
      toast.error(err?.data?.message || err.error);
  }

}


return(
    <div className="flex flex-col m-2 justify-center items-center border-2 rounded-md  space-y-2 w-44 md:w-52">
        <span className="text-ellipsis px-2">{product.name}</span>

        {/* <Link className="h-min overflow-hidden relative group" to={`/product/${product.slug}`}> */}
        <Link className="h-min overflow-hidden relative group">
            <img className="w-36 md:w-48 rounded-md hover:scale-125 transition-all duration-500 cursor-pointer" src={product.images.length > 0 ? product?.images[0]?.url :'/default_product.png'} alt={product.name} />
            <div className="absolute bottom-0 left-0 right-0 p-2 px-4 space-y-1 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-transparent bg-opacity-40">
                <button className="flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-400" onClick={() => handleClick()}>
                  <img src="cart.svg" className="w-4" alt="bookmark" />
                </button>
                <button disabled={updateLoading} className="flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-400" onClick={() => handleAddFav()}>
                  <img src="like.svg" className="w-4" alt="bookmark" />
                </button>
                <Link to={`/product/${product.slug}`} className="flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-400" onClick={() => console.log('test')}>
                  <img src="view.svg" className="w-4" alt="bookmark" />
                </Link>
            </div>
        </Link>         

        <Rating value={product.rating} text={product.numReviews}/>
        <span>{`$${product.price}`}</span>
    </div>
)
}
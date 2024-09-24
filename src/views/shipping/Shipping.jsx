import { savePaymentMethod, saveShippingAddress } from "@/slices/cartSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';




export default function Shipping(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector((state) => state.cart); 
    // console.log(shippingAddress);
    const navigate = useNavigate();





    // const {register,handleSubmit,formState:{errors}} = useForm();
    // const cart = useSelector((state) => state.cart) 
    // console.log(cart);
    // const {shippingAddress} = cart;

    const options = [
        { value: 'Paypal', label: 'Paypal' },
        { value: 'Stripe', label: 'Stripe' },
        { value: 'COD', label: 'COD' },
      ]


    useEffect(() =>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])

    // function submitHandler(data){
    //     console.log(data['paymentMethod']);
    //     // setPaymentMethod();
    //     console.log(data);
    //     dispatch(savePaymentMethod(data["paymentMethod"]))
    //     navigate('/checkout')

    // }


    function createAddress(data){
        dispatch(saveShippingAddress({address:data['address'],city:data['city'],postCode:data['postCode'],country:data['country']}));
        // console.log(data['paymentMethod']);
        // console.log(data);
        dispatch(savePaymentMethod(data["paymentMethod"]))
        navigate('/checkout');
    }


    return (
        <form onSubmit={handleSubmit(createAddress)} className="flex flex-col space-y-2">

        <div className="md:grid md:grid-cols-2 ">
                
            <Card className="flex flex-col m-2 space-y-4">
                <CardHeader className="bg-gray-400 w-full text-white" title="Shipping address" />
                <CardContent className="space-y-8">
                    <input 
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("address",{
                            required:'pleas enter address'
                        })}
                    />
                    {errors?.address?.message && <p>{errors.address.message}</p>}
                    <input 
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("city",{
                            required:'pleas enter city'
                        })}
                    />
                    {errors?.city?.message && <p>{errors.city.message}</p>}
                    
                    <input 
                        type="number"
                        name="postCode"
                        placeholder="Enter your postCode"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("postCode",{
                            required:'pleas enter postCode'
                        })}
                    />
                    {errors?.postCode?.message && <p>{errors.postCode.message}</p>}

                    <input 
                        type="text"
                        name="country"
                        placeholder="Enter your country"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("country",{
                            required:'pleas enter country'
                        })}
                    />
                    {errors?.country?.message && <p>{errors.country.message}</p>}

                </CardContent>
            </Card>

            <div>
                <Card className="flex flex-col m-2  space-y-4">
                    <CardHeader className="bg-gray-400 w-full text-white" title="Payment options" />
                    <CardContent>
                        <div>
                            {options.map((option) => 
                            <div key={option.value} className="space-y-8 space-x-2">
                                <input
                                    // defaultValue={options[2]}
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    value={option.value}
                                    onChange={(e) => e.preventDefault}
                                    {...register('paymentMethod',{required:"Payment method is required"})}
                                />
                                <label className="">{option.label}</label>
                            </div>
                            )}
                            
                            {errors?.paymentMethod?.message && <p>{errors.paymentMethod.message}</p> }
                        </div>
                    </CardContent>
                </Card>
                <button disabled={isSubmitting} className="rounded-md bg-black text-white px-5 py-2 w-full">Place order</button>

            </div>
            
        </div>
        </form>

    )
}
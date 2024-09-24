

import { useForm } from "react-hook-form"
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Loader from '../../components/Loader';
import { useRegisterMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
// import toast from "react-hot-toast";
import { useEffect } from "react";
import toast from "react-hot-toast";



export default function Register(){

    const {register,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const dispatch = useDispatch();
    const [registerUser,{isLoading}] = useRegisterMutation();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'; 

    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);


    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,navigate,redirect])


    async function userRegistration(data){
        if(data['password'] !== data['confirmPassword']){
                toast.error('confirm password did not match');
                return;
        }else{
            try{
            
                const response = await registerUser({name:data['name'],email:data['email'],password:data['password']}).unwrap();
                // console.log(response);
                dispatch(setCredentials({...response}));
                navigate(redirect);
                toast.success('logged in successfully')
                reset();
    
            }catch(err){
                // console.log(err);
                toast.error(err?.data.message);
            }
        }

        
    }
    
    if(isLoading) return <Loader />

    return (

        <>
        {/* <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(userRegistration)} className="flex flex-col space-y-2">
                <input type="text" name="name" placeholder="user name" className="border-4 border-red-100 rounded-md w-300"
                {...register("name",{
                    required:'please enter name'
                })} />

                {errors?.name?.message && <p>{errors.name.message}</p>}
                <input type="email" name="email" placeholder="email" className="border-4 border-red-100 rounded-md w-300"
                {...register("email",{
                    required:'please enter email address'
                })} />

                {errors?.email?.message && <p>{errors.email.message}</p>}
                <input type="password" name="password" placeholder="password" className="border-4 border-red-100 rounded-md w-300"
                {...register("password",{
                    required:'pleas enter password'
                })} />
                {errors?.password?.message && <p>{errors.password.message}</p>}
                <input type="password" name="confirmPassword" placeholder="confirm password" className="border-4 border-red-100 rounded-md w-300"
                {...register("confirmPassword",{
                    required:'pleas enter confirm password'
                })} />
                {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}
                <div>
                    <button disabled={isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Register</button>
                </div>
                
                <div>
                    Already have an account ? <Link className="underline" to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
                </div>
            </form>
        </div> */}




        <div className="flex items-center justify-center min-h-screen bg-rose-50">
            <div className="relative flex flex-col m-6 space-y-10 bg-white rounded-2xl md:flex-row md:space-y-0 md:m-0">
            
            <div className="p-6 md:p-20 space-y-5">

                <h2 className="text-4xl font-mono mb-5 font-bold">Register</h2>
                <form onSubmit={handleSubmit(userRegistration)} className="space-y-5">
                        <input 
                        type="text"
                        name="name"
                        placeholder="Enter user name"
                        className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("name",{
                            required:'pleas enter name'
                        })}
                        />
                        {errors?.name?.message && <p>{errors.name.message}</p>}

                        <input 
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("email",{
                            required:'please enter email address'
                        })}
                        />
                        {errors?.email?.message && <p>{errors.email.message}</p>}

                        <input 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("password",{
                            required:'pleas enter password'
                        })}
                        />
                        {errors?.password?.message && <p>{errors.password.message}</p>}

                        <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter confirm password"
                        className="w-full p-6 h-12 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("confirmPassword",{
                            required:'pleas enter confirm password'
                        })}
                        />
                        {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}

                        

                        <div className="flex flex-col md:flex-row md:my-8 justify-between space-y-8 md:space-y-0">
                            <button disabled={isSubmitting && isLoading} className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100">Register </button>
                        </div>

                </form>
                <div className="flex items-center justify-center">
                    Already have an account ? <Link className="underline" to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
                </div>

                
            </div>
            </div>
        </div>





        </>
    )
}




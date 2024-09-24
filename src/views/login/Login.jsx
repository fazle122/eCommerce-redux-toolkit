

import { useForm } from "react-hook-form"
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
// import Loader from '../../components/Loader';
import { useGoogleLoginMutation, useLoginMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
// import toast from "react-hot-toast";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";



export default function Login(){

    const {register,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm();
    const dispatch = useDispatch();
    
    const [login,{isLoading}] = useLoginMutation();
    const [googleLogin,{isLoading:isGoogleAuthLoading}] = useGoogleLoginMutation();

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


    async function loginUser(data){
        try{
            const response = await login({email:data['email'],password:data['password']}).unwrap();
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

    const handleGoogleLogin = useGoogleLogin({

        onSuccess: async(authResponse) =>{
            // console.log('authResponse',authResponse);
            try{
                const userInfo = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers:{
                            Authorization: `Bearer ${authResponse.access_token}`
                        }
                    }
                )
                // console.log(userInfo.data);
                const {sub,email,name,picture} = userInfo.data;
                // console.log(sub);

                const response = await googleLogin({googleId:sub,email:email,name:name,googleImage:picture}).unwrap()
                // console.log(response);
                dispatch(setCredentials({...response}));
                navigate(redirect);
                toast.success('logged in successfully')
            }catch(error){
                // console.log(error);
            }   
        },
        onError:(err) =>{
            console.log(err.message);
        }
        
})
    

    return (
        <>
        {/* <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit(loginUser)} className="flex flex-col space-y-2">
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
                <div>
                    <button disabled={isSubmitting && isLoading} className="rounded-md bg-black text-white px-5 py-2">Log in</button>
                </div>
                <div>
                    New user? <Link className="underline" to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
                </div>

            </form>
            {isGoogleAuthLoading ? <p>Loading...</p> :
            <button className='border rounded-md text-white bg-black px-2 py-1 my-2' onClick={handleGoogleLogin}>
                    Sign In With Google
            </button>}
            
        </div> */}

        <div className="flex items-center justify-center min-h-screen bg-rose-50">
            <div className="relative flex flex-col m-6 space-y-10 bg-white rounded-2xl md:flex-row md:space-y-0 md:m-0">
            
            <div className="p-6 md:p-20">

                <h2 className="text-4xl font-mono mb-5 font-bold">Log In</h2>
                <form onSubmit={handleSubmit(loginUser)}>
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
                className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                {...register("password",{
                    required:'pleas enter password'
                })}
                />
                {errors?.password?.message && <p>{errors.password.message}</p>}

                <div className="flex flex-col md:flex-row md:my-8 justify-between space-y-8 md:space-y-0">
                <a href="#" className="py-6 text-center">Forgot password</a>
                <button disabled={isSubmitting && isLoading} className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100">Log in </button>
                </div>

                <div className="mt-12 border-b border-grey-200"></div>
                <p className="py-6 text-sm font-thin text-center text-gray-400"> or log in with</p>
                </form>

                <div className="flex flex-col items-center justify-center space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0 ">

                {/* <button className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded md:w-1/2">
                    <img src="images/facebook.png" alt=""  className="w-9"/>
                    <p>Facebook</p>
                </button> */}
    
                <button disabled={isGoogleAuthLoading} className="flex items-center justify-center px-2 py-2 space-x-3 border border-gray-300 rounded md:w-1/2" onClick={handleGoogleLogin}>
                    <img src="google.png" alt=""  className="w-9"/>
                    <p>Google</p>
                </button>
                </div>

                <div className="py-2 flex items-center justify-center">
                    New user? <Link className="underline px-1" to={redirect ? `/register?redirect=${redirect}` : `/register`}>Sign up</Link>
                </div>
                
            </div>
            </div>
        </div>
    

        </>
        
    )
}



















// // import { useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { loginUser } from "./AuthSlice";
// // import { GoogleLogin } from "@react-oauth/google";
// // import { useGoogleLogin } from "@react-oauth/google";
// // import axios from "axios";

// import { useForm } from "react-hook-form";




// export default function Login(){

//     const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();
//     // const dispatch = useDispatch();
//     // const {token} = useSelector((state) => state.auth)
//     // const navigate = useNavigate();

//     // useEffect(() =>{
//     //     if(token) navigate('/leads')
//     // },[token,navigate])

//     function loginUser(data){ 
//         console.log('data');
//         console.log(data);
//         // dispatch()
//         // reset();
//     }

//     // function handleGoogleLogin(credential){ 
//     //     // console.log('handleGoogleLogin');
//     //     console.log(credential);
//     //     // const auth = dispatch(loginUser({googleCredential:credential}));
//     //     // // const auth = authenticate(email,password);
//     //     // console.log(auth);
//     // }


//     // const loginwithgoogle = useGoogleLogin({
//     //     // flow: 'auth-code',
//     //     onSuccess: async(tokenResponse) =>{
//     //         console.log(tokenResponse);
//     //         try{
//     //             const res = await axios.get(
//     //                 "https://www.googleapis.com/oauth2/v3/userinfo",
//     //                 {
//     //                     headers:{
//     //                         Authorization: `Bearer ${tokenResponse.access_token}`
//     //                     }
//     //                 }
//     //             )
//     //             console.log(res);
//     //         }catch(error){
//     //             console.log(error);
//     //         }   
//     //     },
//     //     onError:(err) =>{
//     //         console.log(err);
//     //     }
//     // })

//     return (
//         <div className="flex flex-col items-center justify-center h-screen text-center xl:text-left">
//             <form onSubmit={handleSubmit(loginUser)} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" >
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username" name="email" >
//                         Username
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
//                         name="email" 
//                         type="text" 
//                         placeholder="Username" 
//                         {...register("email",{
//                             required:'please enter email address'
//                         })}
//                     />
//                     {errors?.email?.message && <p>{errors.email.message}</p>}
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                         name="password" 
//                         type="password" 
//                         placeholder="******************" 
//                         {...register("password",{
//                             required:'pleas enter password'
//                         })}
//                     />
//                     {errors?.password?.message && <p>{errors.password.message}</p>}
//                 </div>
//                 <button disabled={isSubmitting} className={`bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">
//                     Sign In
//                 </button>
               
//                 {/* </div> */}
//             </form>
//             <div>
        
//             {/* <GoogleLogin 
//                 onSuccess={(credentialResponse) => {
//                     console.log(credentialResponse);
//                     // var decodedResponse = jwtDecode(credentialResponse.credential);
//                     // console.log(decodedResponse);
//                     const auth = handleGoogleLogin(credentialResponse.credential);
//                     console.log(auth);
//                 }}
//                 // onSuccess={(credentialResponse) => successResponse(credentialResponse)}
//                 onError={(err) => {
//                     console.log(err);
//                 }}
                
//                 theme="filled_blue"
                
//             /> */}
//             {/* <button className='login-with-google-btn' >
//                     Sign In With Google
//             </button> */}
//             </div>
            
//         </div>
       
//     )
// }


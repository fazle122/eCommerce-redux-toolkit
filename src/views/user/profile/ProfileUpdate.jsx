import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "@/slices/userSlice";
import toast from "react-hot-toast";
import { setCredentials } from "@/slices/authSlice";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';



export default function ProfileUpdate(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile,{isLoading,error}] = useProfileMutation();
    const dispatch = useDispatch();



    useEffect(()=>{
         if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email); 
         }
    },[userInfo,userInfo.name,userInfo.email])


    async function updateUser(data) {
        if(data['password'] !== data['confirmPassword']){
            toast.error('password did not match');
        }else{
            try{
                const response = await updateProfile({_id:userInfo._id,name:data['name'],email:data['email'],password:data['password']}).unwrap();
                console.log(response);
                dispatch(setCredentials(response));
                toast.success('profile updated successfully')
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.message)
            }
        }
    }


    

    return (
        <Card className="flex flex-col m-2 space-y-4">
            <CardHeader className="bg-gray-400 w-full text-white" title="Profile information" />
            <CardContent className="space-y-8">
                <div>
                    <div>
                    <form onSubmit={handleSubmit(updateUser)} className="flex flex-col space-y-2">
                        <input type="name" name="email" defaultValue={name} className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("name",{
                            required:'please enter name'
                        })} />

                        {errors?.name?.message && <p>{errors.name.message}</p>}
                        <input type="email" name="email" defaultValue={email} className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("email",{
                            required:'please enter email address'
                        })} />

                        {errors?.email?.message && <p>{errors.email.message}</p>}
                        {/* <input type="password" name="password" defaultValue={password} className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("password",{
                            // required:'pleas enter password'
                        })} />
                        {errors?.password?.message && <p>{errors.password.message}</p>}
                        <input type="password" name="confirmPassword" defaultValue={password} className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("confirmPassword",{
                            // required:'pleas enter confirm password'
                        })} />
                        {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>} */}
                        <div>
                            <button disabled={isSubmitting && isLoading} className="rounded-md bg-black text-white px-5 py-2">Update profile</button>
                        </div>
                        {error && <p>{error?.message}</p>}                    

                        
                    </form>
                    </div>
                    

                </div>
            </CardContent>
        </Card>

    )
} 
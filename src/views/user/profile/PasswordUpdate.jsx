import { useForm } from "react-hook-form"
import { useUpdatePasswordMutation } from "@/slices/userSlice";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';



export default function PasswordUpdate(){
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm();


    const [updatePassword,{isLoading:isPasswordUpdating,error:isPasswordError}] = useUpdatePasswordMutation();




    async function updateUserPassword(data) {
        if(data['password'] !== data['confirmPassword']){
            toast.error('password did not match');
        }else{
            try{
                const response = await updatePassword({oldPassword:data['oldPassword'],password:data['password']}).unwrap();
                console.log(response);
                reset();
                toast.success('password updated successfully')
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.message)
            }
        }
    }


    return (
        <Card className="flex flex-col m-2 space-y-4">
            <CardHeader className="bg-gray-400 w-full text-white" title="Password" />
            <CardContent className="space-y-8">
                <div>
                    <div>
                    <form onSubmit={handleSubmit(updateUserPassword)} className="flex flex-col space-y-2">
                        {errors?.name?.message && <p>{errors.name.message}</p>}
                        <input type="password" name="oldPassword" placeholder="Old password"className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("oldPassword",{
                            required:'please enter old Password'
                        })} />

                        {errors?.email?.message && <p>{errors.email.message}</p>}
                        <input type="password" name="password" placeholder="New password" className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("password",{
                            required:'pleas enter password'
                        })} />
                        {errors?.password?.message && <p>{errors.password.message}</p>}
                        <input type="password" name="confirmPassword" placeholder="Confirm password" className="w-full p-6 h-12 mt-5 placeholder:font-thin border border-grey-200 rounded-md"
                        {...register("confirmPassword",{
                            required:'pleas enter confirm password'
                        })} />
                        {errors?.confirmPassword?.message && <p>{errors.confirmPassword.message}</p>}
                        <div>
                            <button disabled={isPasswordUpdating || isSubmitting} className="rounded-md bg-black text-white px-5 py-2">Update password</button>
                        </div>   
                        {isPasswordError && <p>{isPasswordError?.message}</p>}                    
                    </form>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
} 
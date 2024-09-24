/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation, useUpdatePasswordMutation } from "@/slices/userSlice";
import toast from "react-hot-toast";
import { setCredentials } from "@/slices/authSlice";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ProfileUpdate from "./ProfileUpdate";
import PasswordUpdate from "./PasswordUpdate";



export default function Profile(){
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm();

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    // const [confirmPassword,setConfirmPassword] = useState();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile,{isLoading,error}] = useProfileMutation();
    const [updatePassword,{isLoading:isPasswordUpdating,error:isPasswordError}] = useUpdatePasswordMutation();
    const dispatch = useDispatch();



    useEffect(()=>{
         if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email); 
            setPassword(userInfo.password)   
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

    async function updateUserPassword(data) {
        if(data['password'] !== data['confirmPassword']){
            toast.error('password did not match');
        }else{
            try{
                const response = await updatePassword({oldPassworx:data['oldPassword'],password:data['newPassword']}).unwrap();
                console.log(response);
                dispatch(setCredentials(response));
                toast.success('profile updated successfully')
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || err.message)
            }
        }
    }


    if(error) return <p>something went wrong</p>
    

    return (
        <>
            <ProfileUpdate />
            <PasswordUpdate />
        </>

    )
} 
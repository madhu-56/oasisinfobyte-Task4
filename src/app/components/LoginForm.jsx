"use client"
import {useForm} from "react-hook-form"
import { loginAction } from "./action/loginAction";
import {useState} from "react";
import { TiInfo } from "react-icons/ti";
const LoginForm = () => {
    const {handleSubmit,register,reset,formState:{errors},} = useForm();
    const [errorMessage,setErrorMessage] = useState(null);
    const onSubmit = async (data) =>{
        const res= await loginAction(data);
        setErrorMessage(res?.error);
        console.log("Response:",res);
    }
  return (
    <div className='max-w-xl mt-20 bg-gray-800 rounded-lg min-h-[450px] p-10'>
        
        {
        errorMessage &&(
            <div className='bg-orange-600 p-1 my-3 rounded-lg flex flex-row gap-3 justify-center items-center'>
                <span>
                <TiInfo />
            </span>
            <span>{errorMessage}</span>
                
            
            </div>

        )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex flex-col gap-3 w-full'>
            <label className='text-white'>Username</label>
            <input type='text' className='rounded-lg p-1 outline-none border border-gray-100'
            {...register("username",{required:true})}
            />
            {
                errors.username?.type == "required" && (
                    <p className="text-yellow-600">Username Required</p>
                )
            }
        </fieldset>
        <fieldset className=' my-2 flex flex-col gap-3 w-full'>
            <label className='text-white'>Password</label>
            <input type='password' className='rounded-lg p-1 outline-none border border-gray-100'
            {...register("password",{required:true})}
            />
            {
                errors.password?.type == "required" &&(
                    <p className="text-yellow-600">password required</p>
                )
            }
        </fieldset>
        <fieldset>
            <button type='submit' className='px-5 py-1 bg-blue-400 rounded-lg'>Login</button>
        </fieldset>
      </form>
      
    </div>
  )
}

export default LoginForm

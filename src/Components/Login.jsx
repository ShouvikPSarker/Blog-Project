import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {login as authlogin} from '../Store/authslice'
import {Button , Input , Logo} from './index'
import { useDispatch } from 'react-redux'
import { authService } from '../Appwrite/auth'
import {useForm} from 'react-hook-form'
function Login() {
    const navigate = useNavigate()
    const dispatch =  useDispatch()
    const {register , handleSubmit} = useForm()
    const [error , seterror] = useState() 
    const login = async(data) =>{
        seterror("")
        try{
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authlogin(userData))
                navigate("/")
            }

        }catch(error){
            seterror(error.message)

        }
    } 
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='w-full max-w-lg rounded-xl bg-gray-100 p-10 mx-auto border border-black/10'>
                <div className='mb-2 flex justify-center'> 
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
            <h2 className='text-center text- 2xl font-bold leading-tight'>
                Sign into Your Account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}>
            </form>
                <div className='mt-6'>
                    <Input
                        label='Email'
                        type='email'
                        placeholder='Enter Your Email'
                        {...register('email'),{
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        }}
                    />
                    <Input 
                        label='Password'
                        type='password'
                        placeholder='Enter Your Password'
                        {...register('password') , {
                            required: true
                        }}
                    />
                    <Button className = 'w-full' type='submit'>
                        Sign IN
                    </Button>
                </div>

            </div>
        </div>
     )
}

export default Login
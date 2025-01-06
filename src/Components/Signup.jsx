import React , {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {Button , Input , Logo} from './index'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../Store/authslice'
import {authService} from '../Appwrite/auth'

function Signup() {
  const navigate = useNavigate()
  const {register , handleSubmit} = useForm()
  const [error , seterror] = useState()
  const dispatch = useDispatch()
  const signup = async(data) =>{
    seterror("")
    try {
      const userData = await authService.CreateAccount(data)
      if(userData){
        const userDATA = await authService.getCurrentUser(userData)
        if(userDATA) dispatch(authlogin(userDATA))
        navigate('/')
    }
    } catch (error) {
      seterror(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>} 
        <form onSubmit={handleSubmit(signup)}>
          <div className='space-y-5'>
            <Input 
              label=" Full Name"
              type="text"
              placeholder="Enter Your Full Name"
              {...register('name',{
                required: true
              })}
            />
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
            Submit
          </Button>
          </div>

        </form>
      </div>
    </div>

  )
}

export default Signup
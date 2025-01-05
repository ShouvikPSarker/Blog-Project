import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth'
import { logout } from '../../Store/authslice'

function Logout() {
    const dispatch = useDispatch()
    const logouthandler = ()=>{
        authService.logOut().then(()=>{
          dispatch(logout())
        })
    }
  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logouthandler}
    >LogOut</button>
  ) 
}

export default Logout
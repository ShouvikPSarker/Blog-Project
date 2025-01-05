import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import { authslice, login, logout } from './Store/authslice'
import authService from './Appwrite/auth'
import Footer from './Components/Footer'
import Header from './Components/Header/Header'


function App() {
  // console.log(import.meta.env.VITE_APP_APPWRITE_URL)

  const [loading , setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) =>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).finally(() => setloading(false))
  }, [])
  

  return !loading ? 
    <div className='min-h-screen flex flex-wrap content-between bg-gray-300'>
      <div className='w-full-block'>
        <Header/>
        <main>
          TODO : {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  : null
}

export default App

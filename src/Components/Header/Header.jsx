import React from 'react'
import {Container , Logout , Logo} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state)=> state.Authslice.status)
  const navigate = useNavigate()
  const navitems = [
    {
      name : "Home",
      url : "/",
      active : true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header>
      <Container>
        <nav className='flex'>
          <div>
            <Link to = '/'>
              <Logo/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navitems.map((item) => item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.url)}
                   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null )
            }
            {authStatus && (
              <li>
                <Logout/>
              </li>
            )}
          </ul>
        </nav>
      </Container>

    </header>
  )
}

export default Header
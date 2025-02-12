import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout , Login } from './Components/index.js'
import AddPosts from './Pages/AddPosts.jsx'
import AllPosts from './Pages/AllPosts'
import EditPosts from './Pages/EditPosts'
import Home from './Pages/Home'
import Post from './Pages/Post'
import Signup from './Pages/Signup'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element : (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element : (
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPosts />
            </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPosts />
            </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]  
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)

import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider} from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Shop from './Components/Shop/Shop'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import LogIn from './Components/LogIn/LogIn'
import { TokenContext } from './Context/TokenContext'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'



const App = () => {

  const {setToken} = useContext(TokenContext);




  const routes = createHashRouter([
    { path : "" , element : <LayOut/> , children : [
    
    { path : '' , element : <ProtectedRoutes><Shop/></ProtectedRoutes>  } ,
    { path : 'shop' , element : <ProtectedRoutes><Shop/></ProtectedRoutes>  } ,
    { path : "details/:id" , element : <ProtectedRoutes><ProductDetails /></ProtectedRoutes>   },
    {path :"login" , element :<LogIn/>}
    ]
     }
  ])

  useEffect(()=>{
    if (localStorage.getItem("authToken") !== null) {
        setToken(localStorage.getItem("authToken"))
    } 
  })
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App

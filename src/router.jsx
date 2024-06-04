import { useEffect } from 'react'

import { 
  createBrowserRouter, 
  RouterProvider, 
  Route, 
  Link,
  useNavigation
} from 'react-router-dom'

import views from './views'
import vcommerceRoutes from '@/vcommerce/routes.jsx'
// import { loader as HomeLoader, action as HomeAction } from './views/Home.jsx'
import { action as GameAction } from './views/GameDashboard'

let routes = [
  {
    path: '', 
    element: <views.Home />, 
    errorElement: <views.PublicMainNavigationError />,
    // loader: HomeLoader,
    // action: HomeAction,
  },
  {
    path:'game',  
    element:< views.GameDashboard />, 
    errorElement: <views.PublicMainNavigationError />,
    action:GameAction,

    children:[

      { path:'', element: <views.GameLounge /> },
      { path:'profiles/:pid', element: <views.GamePlayerProfile /> },
      { path:'quests', element: <views.GameQuests /> },
    
    ] 
  
  },

  // {path: 'game', element: <views.GameDashboard /> },
  // { path: 'game/:pid', element: <views.GamePlayerProfile /> },
  { path:'*', element: ( <div className='text-bg-danger p-5'>Not Found</div> ) }
]

routes = [ 
  ...routes, 
  ...vcommerceRoutes,
]

const browserRouter = createBrowserRouter( routes )


export function RouterLoadingCompo({ children })
{
  const navigation = useNavigation()
  // console.log('hello LoadingCompo')

  useEffect( () =>{
    console.log(`RouterLoadingCompo - Navigation State is ${ navigation.state.toUpperCase() }`)
  }, [])


  return (
    <>
      { children }
    </>
  )
}



export function PublicRoutes({ children })
{
  // console.log('hello Public Routes')

	return ( 
    <RouterProvider router={ browserRouter }>
      { children }
    </RouterProvider>
  )
}
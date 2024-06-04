import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import views from './views'


const routes = createBrowserRouter([
  {path: '', element: <views.Home />, errorElement: <views.PublicMainNavigationError />, },
  {
    path:'game',  element:< views.GameDashboard />, errorElement: <views.PublicMainNavigationError />,
    children:[

      { path:'', element: <views.GameLounge /> },
      { path:'profiles/:pid', element: <views.GamePlayerProfile /> },
      { path:'quests', element: <views.GameQuests /> },
    
    ] 
  
  },

  // {path: 'game', element: <views.GameDashboard /> },
  // { path: 'game/:pid', element: <views.GamePlayerProfile /> },
  { path:'*', element: ( <div className='text-bg-danger p-5'>Not Found</div> ) }
  
])

export function PublicRoutes({ children })
{
	return <RouterProvider router={ routes }>{ children }</RouterProvider>

}
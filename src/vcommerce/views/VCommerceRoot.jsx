import { useEffect, useState } from 'react'
import { Outlet , useLocation } from 'react-router-dom'
import PublicMainNavigation from '@/views/PublicMainNavigation'
import BasePage from '@/views/BasePage'

export default function VCommerceRoot()
{
	const location = useLocation()
	const [ displayLocation, setDisplayLocation ] = useState( location )

	useEffect(()=>{
		console.info(`ACTUAL location is ${location.pathname}`, location)
		console.info(`DISPLAY location is ${displayLocation.pathname}`, displayLocation)
		
	}, [location, displayLocation])



	return (
		<BasePage>
			<h1 className='p-3 border-bottom border-3 mb-3 '>
				Welcome to VCommerce
			</h1>
			<Outlet />
		</BasePage>
	)
}
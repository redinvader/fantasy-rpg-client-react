import { NavLink } from 'react-router-dom'
import './PublicMainNavigation.module.css'

import CustomerWidget from '@/customer/compos/CustomerWidget.jsx'
import VCoinCompo from '@/vcommerce/compos/VCoinCompo.jsx'

export default function PublicMainNavigation()
{
	return <nav className='w-100 text-bg-light p-3 d-flex justify-content-end'>
		<CustomerWidget />
		<VCoinCompo />
		<NavLink to='/' className='nav-link mx-2'>Home</NavLink>
		<NavLink to='/game' className='nav-link mx-2'>Game</NavLink>
		<NavLink to='/vcommerce' className='nav-link mx-2'>VCommerce</NavLink>
		
	</nav>
}
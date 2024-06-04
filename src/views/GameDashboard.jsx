import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams, Outlet } from 'react-router-dom'
import BasePage from './BasePage'
import { ProvideLevelupContext } from '../contexts/LevelupContext'
import { GameDescription, GameCheatLevel } from './game'



export default function GameDashboard()
{
	const [ level, setLevel ] = useState(1)
	const ctx_value = { level, setLevel }

	return <BasePage>

		<div className='text-light p-5' style={ { backgroundColor:'blueviolet' }}>
			<span className='fs-2'>Welcome to game dashboard</span>
			
			<ProvideLevelupContext value = {ctx_value}>
				<GameDescription />
				<GameCheatLevel />
			</ProvideLevelupContext>

		</div>
		<div className='text-bg-dark p-2 mb-2 border-3 border-bottom d-flex justify-content-end gap-3'>

			<Link to='/' >HomePage</Link>
			<Link to=''>Lounge</Link>
			<Link to='quests'>Quests</Link>

		</div>
		
		<Outlet />

	</BasePage>
}
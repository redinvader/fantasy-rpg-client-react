import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import BasePage from './BasePage'


export default function GameLounge()
{


	return <>

		<div className='text-bg-warning p-5'>
			<div>Game Lounge</div>
			<div className='d-flex flex-column gap-4 my-2'>
				<Link to='/'>Homepage</Link>
				<Link to='profiles/133?type=public'>public info about player 133</Link>
				<Link to='profiles/42?type=private'>all information about agent 42</Link>
			</div>
		</div>
	</>
}
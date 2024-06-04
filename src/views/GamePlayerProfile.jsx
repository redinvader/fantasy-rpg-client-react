import { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import BasePage from './BasePage'


export default function GamePlayerProfile()
{
	const params = useParams()
	const [ query, setQuery ] = useSearchParams()
	const navigation = useNavigate()

	// useEffect(()=>{
	// 	console.log('params is ', params )
	// 	console.log('search params is ', query )
		
	// }, [])

	return <>
		<div className='text-bg-danger p-5 '>
			{ params.pid && <span className='fs-2'>Detailed information about Player : <strong>{params.pid}</strong>  </span> }
			{ !params.pid && <span className='fs-2'>no player id informed - why?</span> }
		</div>
		<div className='text-bg-secondary p-2 d-flex flex-row-reverse justify-content-between align-items-center gap-3'>
			<div>
				<span>type of information is { query.get('type')?.toUpperCase() || 'ALL' }</span>
			</div>
			<div>
				<button className='btn btn-primary' onClick={ () => navigation(-1) }> go back </button>
			</div>
		</div>		
	</>
}
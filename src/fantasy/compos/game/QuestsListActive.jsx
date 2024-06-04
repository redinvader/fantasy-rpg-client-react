import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadQuests } from '@/fantasy/stores/fantasy'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { activeQuests } from '@/requests'
import anime from 'animejs'
import Button from 'react-bootstrap/Button'

export default function QuestsListActive({ onComplete })
{
	const qclient = useQueryClient()
	
	/* load queries aqui mesmo - pode isso ? */
	const quests = useQuery({
		queryKey: ['quests', 'active'],
		queryFn: activeQuests
	})
	const dispatch = useDispatch()

	const animBegin = ( anim ) =>{
		// console.info('anim BEGIN ', anim )
	}

	const animComplete = ( anim ) => {
		// console.info('anim COMPLETE ', anim )
	}

	 const rowAnim = {
		targets: '.quest-row',
		rotateX: [90,0],
		backgroundColor: ['#000', '#535'],
		// rotateX: anime.stagger([90,0]), 
		duration: 1000,
		direction: 'alternate',
		loop:3,
		delay: anime.stagger(500, { start: 500, from:'last', direction:'reverse'}),
		// endDelay: 1000,
		begin: animBegin,
		complete: animComplete,
		easing:'linear',

	}

	 const containerAnim = {
	 	targets:'.quests-container',
	 	rotateZ: [0,45],
	 	duration: 1000,
	 	loop:2,
	 	direction:'alternate'
	 }

	const animation = anime.timeline({ autoplay: false, direction:'alternate' })
	animation.add( rowAnim ).add( containerAnim )
	animation.finished.then(() => { console.log("timeline ended", animation ) ; animation.reverse() })

	useEffect(() =>{
		if ( quests.data?.data.payload )
		{
			dispatch( loadQuests( quests.data.data.payload ) )
			
		}	
	}, [ quests ])



	const renderQuestRow = ( quest ) =>{
		return <div key={ quest._id } className='quest-row row my-2 p-2'>
			<div className='col-sm-3'>{ quest.name }</div>
			<div className='col'>{ quest.description }</div>
			<div className='col-sm-1 text-center'>{ quest.minLevel }</div>
			<div className='col-sm-2'>
				<button className='btn btn-primary w-100' onClick={ () => onComplete( quest._id ) }>
					completed?
				</button>
			</div>
		</div>
	}

	return (
		<>
		<div className=''>
			<Button variety='danger' onClick={() => animation.play() }>Show quests</Button>
		</div>
		<div className='quests-container container border border-primary border-3 rounded my-2'>

			<div className=' text-bg-primary row p-2'>
				<div className='col-sm-3'>
					<span>Quest</span>
					<span className='text-bg-danger mx-2 rounded px-2 py-1'>{ quests.status }</span>
				</div>
				<div className='col'>Description</div>
				<div className='col-sm-1 text-center'>Level</div>
				<div className='col-sm-2 text-center'>Status</div>
			</div>


			{ quests.data?.data.payload.map( quest => renderQuestRow( quest )) }
		</div>
		</>
	)
}
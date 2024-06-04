import { useState, useEffect, useReducer } from 'react'
import Container from '@/compos/Container'

import style from './GameConfig.module.css'

const setup = {
	'easy' : { test: ( val ) => val < 30, value:29 },
	'normal':{ test:  ( val ) => val >=30 && val < 50, value:49 },
	'hard': { test: (val) => val >=50 && val <80, value:79 },
	'nightmare': { test: (val) => val >=80, value: 100 } 
}

const initial = {
	mode: 'normal',
	value: 50
}

const difficultyReducer = ( state = initial, action ) =>{
	switch( action.type )
	{
		case 'SET_MODE':
			// console.log( action )
			return { mode: action.mode, value: setup[ action.mode ].value }
		case 'UPDATE_LEVEL':
			const value = Number( action.value )
			let updated_state = initial
			Object.keys( setup ).forEach( ( mode ) =>{
				if ( setup[mode].test( value ) )
					updated_state = { mode, value }
			})
			return updated_state
		default:
			return state
	}
} 



export function GameConfig ({})
{
	// unused
	const [ level, setLevel ] = useState( ()=>{ 
		// console.log( localStorage.getItem('saved-level') )
		return 30 
	})

	const [ gameconfig, dispatch ] = useReducer( difficultyReducer, initial )


	/* TEST MOUNT UPDATE E UNMOUNT
	useEffect(() =>{
		console.info('GameConfig mounted')
		return () =>{
			console.info('GameConfig unmounted')
		}
	}, [])

	useEffect( ()=>{
		console.info('GameConfig updated')
	})
	*/
	// watcher mode
	// useEffect( ()=>{
	// 	console.info('game config updated ', gameconfig.mode )
	// 	if ( gameconfig.mode == 'nightmare')
	// 		confirm('NIGHTMARE MODE - Are you sure?')
	// }, [ gameconfig.mode ])



	return <Container>
		      <div className='form-group d-flex align-items-center gap-2'>
		        <input id='dificulty' type='range' min='0' max = '100' value={ gameconfig.value } onChange={ (e) => dispatch({ type:'UPDATE_LEVEL', value: e.target.value }) }  />
		        <label htmlFor ='dificulty' className={style.bloat}>
		        	Select dificulty level - { gameconfig.mode.toUpperCase() }
		        </label>
		      </div>
		      <div className='my-2'>
		      	{ Object.keys(setup).map( (mode, idx) =>{
		      		// console.info( idx )
		      		return <button 
		      			className={ 'btn mx-2 p-2 px-3 ' + ( (mode == gameconfig.mode)? 'btn-warning' : 'btn-primary' ) }
		      			onClick = { () => dispatch({ type:'SET_MODE', mode })}
		      			key={idx}
		      		>
		      				{ mode }
		      		</button>
		      	}) }
		      </div>


		      <div className='form-group d-flex align-items-center gap-2'>
		        <progress id='progress-time' max='100' value={ level }></progress>
		        <label htmlFor='progress-time'>game progression {level} %</label>
		      </div>
		    </Container>

}
import React, { useState, useEffect } from 'react'

export default function Counter( props )
{
	const [ counter, setCounter ] = useState(0)

	useEffect(() =>{
		console.info('counter effect RERENDER is called')
	})

	useEffect(()=>{
		console.info('counter ONMOUNTED called'.toUpperCase() )
	}, [])

	useEffect( ()=>{
		console.info(`counter WATCHER called ${ counter }`)
	}, [ counter ])

	return (<>
		<h1 className='text-success'>Actual counting is {counter}</h1>
		<button className='btn btn-primary w-25' type='button' onClick={ () => setCounter( counter + 1) }>add</button>
		{ counter % 2 == 0 && <div>Counter is even</div>  }	
	</>)
}
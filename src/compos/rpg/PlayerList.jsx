import { useState, useEffect, useRef } from 'react'


export default function PlayerList( props )
{
	const { players } = props
	const onlinePlayersRef = useRef([])

	// move to outside maybe ....
	const basicListItemCss = 'list-group-item d-flex justify-content-between '
	const getListItemCss = ( player ) =>{
		if ( player.level > 5 )		return basicListItemCss + ' list-group-item-danger'
		else if ( player.level > 2)	return basicListItemCss + ' list-group-item-warning'
		else	return basicListItemCss + ' list-group-item-light'
	} 

	const onSetActive = (evt) =>{
		// console.info( onlinePlayersRef.current instanceof Array )
		onlinePlayersRef.current.forEach( (el) =>{
			if(!el)	return
			if ( el.classList.contains('active'))	el.classList.remove('active')
			// console.log( el.classList)
		})

		evt.currentTarget.classList.add('active')
		// console.log( evt.currentTarget )
	}


	// console.log( players )
	return(<>
		<div className='bg-secondary p-2 rounded my-3'>
			<h1 className='text-light'>Players Online</h1>
			<ul className="list-group my-3">
				{ 
					players.map( (player, idx)  => 
						<li className={ getListItemCss(player) } key={idx} role='button' ref={(el) => onlinePlayersRef.current.push(el) } onClick = { (evt) => onSetActive(evt) }>
							<span className='flex-grow-1'>Player: { player.name }</span>
							<span className='mx-3'>{ player.classe.toUpperCase() }</span>
							<span>Level: { player.level }</span>
						</li> 
				) }
			</ul>
		</div>
		
	</>)
}
import { useState } from 'react'
import BasePage from './BasePage'

import { GameConfig } from '../compos/rpg/GameConfig'
import { PlayerList, AddPlayerForm } from '../compos/rpg'

import rpgdata from '../compos/rpg/data/players.json'

export default function Home()
{
  const [ players, setPlayers ] = useState( rpgdata );

  const dummy = { name: 'elias', level: 12, classe:'architect' }

  const onAddPlayer = (newPlayerData) =>{
    // console.info('App::onAddPlayer called ', newPlayerData )
    const newPlayers = [ ...players, newPlayerData ]
    // sort by level desc
    // newPlayers.sort( (a, b) => a.level < b.level )
    setPlayers( newPlayers )
  }

	return <BasePage>
		<div className='p-2 text-bg-success' style={ { marginBottom: '1rem' } }>
			This is home { dummy?.classe?.toUpperCase() ?? 'nada'.toUpperCase() }
		</div>

		<div className='container'>
	        <GameConfig />
	        <PlayerList players={players} />
	        <AddPlayerForm onAddPlayer = {(newPlayerData) => onAddPlayer( newPlayerData )} roomType='free' />
        </div>
      
	</BasePage>
}
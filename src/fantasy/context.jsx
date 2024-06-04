import { createContext, useContext } from 'react'

import FantasyConfig from './data/game-config.json'

const FantasyContext = createContext()

export function FantasyContextProvider({ children })
{
	return (
		<FantasyContext.Provider value = { { ...FantasyConfig } }>
			{ children }
		</FantasyContext.Provider>
	)
}

export function useFantasyContext()
{
	if (!FantasyContext) throw new Error('no Fantasy Context here')
	return useContext(FantasyContext)
}

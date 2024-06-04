import { createContext, useContext } from 'react'


export const LevelupContext = createContext()

export function ProvideLevelupContext({ children , value})
{
	return <LevelupContext.Provider value={value}>{ children }</LevelupContext.Provider>
}

export function useLevelupContext()
{
	if (! LevelupContext ) throw new Error('no LevelupContext available')
	return useContext( LevelupContext )
}
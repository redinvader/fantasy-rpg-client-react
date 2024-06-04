import axios from 'axios'

const generalOptions = { timeout: 1500 }


export function onlinePlayers()
{
	return axios.get('apis/player/online', generalOptions)
}

export function activeQuests()
{
	return axios.get('apis/game/quests', generalOptions)	
}

export function questCompleted( questId )
{
	return axios.post('apis/game/quests/completed', { questId }, generalOptions)	
}

export function reroll4(some)
{
	return axios.get('apis/player/creation/attributes')
}

import { useLevelupContext } from '@/contexts/LevelupContext'


export default function GameDescription()
{
	const { level } = useLevelupContext()
	// console.log('level is ', level,  useLevelupContext())

	return <div className='text-bg-light p-3 w-50 rounded m-2 text-center'>
		<span>Player <strong>Alepo</strong> is in level <strong>{ level }</strong> </span>
	</div>
}
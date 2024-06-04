import { useLevelupContext } from '@/contexts/LevelupContext'


export default function GameCheatLevel()
{
	const { setLevel } = useLevelupContext()
	
	return <div className='text-bg-light p-3 w-50 rounded m-2 text-secondary d-flex justify-content-between align-items-center'>
		<span>Fuck this shit</span>
		<button className='btn btn-danger' onClick={ ()=>{ setLevel( (lv) => lv + 1 ) }}>add ONE level</button>
	</div>
}
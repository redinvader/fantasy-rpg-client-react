import { useRef } from 'react'
import PropTypes from 'prop-types'

function AddPlayerForm( props )
{
	const { onAddPlayer } = props
	const playerClasses = ['fighter', 'wizard', 'rogue', 'elf', 'dwarf']

	const formRef = useRef( null )

	const onSubmit = ( evt ) =>{
		evt.preventDefault()
		const form_data = new FormData( formRef.current )
		if( onAddPlayer )	
			onAddPlayer( { name: form_data.get('playerName'), classe: form_data.get('playerClasse'), level:1 } )
		formRef.current.reset()
	}



	return(<>
		<div className='bg-primary p-2 rounded my-3'>

			<h1 className='text-light'>Join The Adventure</h1>

			<form action='#' ref={formRef} onSubmit={ (e) => onSubmit(e) }>
			  <div className="form-group mb-3">
			    <label htmlFor="playerName" className="form-label text-light">Your Name</label>
			    <input type="text" className="form-control" id="playerName" aria-describedby="playerName" name='playerName' />
			  </div>

			  <div className='form-group'>
			  	<select className="form-select" aria-label="player class select" name='playerClasse' defaultValue=''>
				  <option value=''>Select your class</option>
				  { playerClasses.map( (classe, idx) =>{
				  		return <option key={idx} value={classe}>{ classe }</option>
				  })}
				</select>
			  </div>


			  <div className='form-row my-2 text-end'>
			  	<button type="submit" className="btn btn-warning w-25" >Join</button>
			  </div>
			</form>
			
		</div>
	</>)
}

AddPlayerForm.propTypes = {
	onAddPlayer: PropTypes.func,
	roomType: PropTypes.string.isRequired,
}

export default AddPlayerForm;
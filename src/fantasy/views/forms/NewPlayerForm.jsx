import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import BsForm from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Fade from 'react-bootstrap/Fade'

export default function NewPlayerForm()
{
	const { register, handleSubmit , formState: {errors}, reset } = useForm()
	const container = useRef(null)
	const [ show, setShow ] = useState(false)

	useEffect( () =>{
		if( container.current )
		{
			console.log( container.current.style )
			setTimeout( () => setShow( true ), 2000)

		}
	}, [])



	
	const submitNewPlayer = (data) =>{
		console.info( data )
		console.info( errors )
		// reset()
		setTimeout( () => { setShow( false ); reset() }, 2000)
	}

	const check = ( animationState ) => console.info(`${animationState.toUpperCase()} triggered`)

	return (
		<Collapse 
			in={show} 
			appear={true} 
			timeout={2000}
			onEntered={ () => check('onentered') }
			onExited={ () => check('onexited') }
			
		>
			<div ref={ container } >
				<BsForm className='container p-2 b-3 rounded border border-2 border-success my-4' method='POST' onSubmit={ handleSubmit(submitNewPlayer) }>

			       <BsForm.Group className='mb-3' controlId='classesRow'>
			          <BsForm.Select size='lg' { ...register('classe', { 
			            required: 'precisa escolher uma classe gajo',
			            validate: (value) => value !=='-1' || 'precisa escolher uma classe gajo'
			          }) } >
			            <option value='-1'>select a Classe</option>
			            <option value='warrior'>warrior</option>
			            <option value='mage'>mage</option>
			            <option value='rogue'>rogue</option>
			          </BsForm.Select>
			          { errors.classe && <BsForm.Text className='text-warning'>{ errors.classe?.message }</BsForm.Text> }
			        </BsForm.Group>

			        <BsForm.Group className='mb-3' controlId='playerRow'>
			          <BsForm.Label>your character name is ....</BsForm.Label>
			          <BsForm.Control size='sm' { ...register('playerName', { required: 'precisa ter um nome', maxLength: { value:3, message:'precisa ter apenas 3 characteres'} } ) }/>
			          { errors.playerName && <BsForm.Text className='text-danger'>have error {errors.playerName?.message }</BsForm.Text> }
			        </BsForm.Group>

			        <BsForm.Group className='mb-3 d-flex align-items-center flex-column' controlId='termsRow'>
			          <BsForm.Check type='checkbox' label='concorde com os termos de serviço' { ...register('termos', { required: 'termos são obrigatórios'})} />
			            { errors.termos && <Badge bg='danger' pill className='p-3 fs-6 my-2'>{ errors.termos?.message }</Badge> }
			        </BsForm.Group>

			         <div className='p-2 d-flex'>
			          <Button className='ms-auto' variant='success' type='submit' defaultValue='create' { ...register('createButton')}>create new player</Button>
			        </div>
		      
		    	</BsForm>
			</div>
		</Collapse>
	)
}
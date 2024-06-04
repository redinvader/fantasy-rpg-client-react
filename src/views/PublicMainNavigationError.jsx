import { useRouteError } from 'react-router-dom'

export default function PublicMainNavigationError(){
	const error = useRouteError()
	console.error( error )

	return (
		<div 
			id='error-page' 
			className='text-bg-danger w-100 p-2' 
			style={ { minHeight: '3rem'} }
		>
			<p>Deu ruim</p>
			<p className='text-center fs-3'> { error.statusText || error.message || error.data }</p>
		</div>
	)
}
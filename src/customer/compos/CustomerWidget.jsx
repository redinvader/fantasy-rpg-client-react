import { useSelector } from 'react-redux'

export default function CustomerWidget()
{
	const customer = useSelector( state => state.customer )

	return (
		<div className='p-2 rounded shadow mx-2 d-flex justify-content-center align-items-center'>
		 	<div className='text-center'>{ customer.name }</div>
		</div>
	)
}
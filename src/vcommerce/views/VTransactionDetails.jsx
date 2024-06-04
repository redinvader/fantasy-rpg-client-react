import { useParams, Link } from 'react-router-dom'

export default function VTransactionDetails()
{
	const { transactionId } = useParams()

	return (
		<>
			<div className='p-2'>
				<h1>some vtransaction details for - #{ transactionId }</h1>
				<Link to='/vcommerce'>get back</Link>
			</div>
		</>
	)
}
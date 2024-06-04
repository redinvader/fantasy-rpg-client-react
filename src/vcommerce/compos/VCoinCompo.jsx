import { useSelector } from 'react-redux'


export default function VCoinCompo()
{
	const wallet = useSelector( state => state.vcommerce.wallet )
	// console.info( wallet )

	return (
		<div className='mx-2 d-flex gap-1 align-items-center p-2 rounded shadow'>
			<div className='text-bg-warning p-2 rounded'>Golden : { wallet.golden }</div>
			<div className='text-bg-primary p-2 rounded'>Marfin : { wallet.marfin }</div>
			
		</div>
	)
}
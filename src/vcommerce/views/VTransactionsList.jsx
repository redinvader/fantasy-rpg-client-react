import { useSelector } from 'react-redux'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'

import { Link } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'



export default function VTransactionsList()
{
	const transactions = useSelector( state => [ ...state.vcommerce.transactions].reverse() )

	
	if ( !transactions.length )
		return (
			<>
				<div className='container'>
					<div className='row border border-3 p-3'>
						<div className='col'>
							No transactions
						</div>
					</div>
				</div>

				<Container className='my-3 text-center'>
					<Row>
						<Col>
							<Link to='transaction/11' className='btn btn-primary'>way to #11</Link>
						</Col>
						<Col>
							<Link to='transaction/21' className='btn btn-danger'>way to #21</Link>
						</Col>
						<Col>
							<Link to='transaction/31' className='btn btn-success'>way to #31</Link>
						</Col>
						
					</Row>

				</Container>					



			</>
		)
	else
		return(
			<div className='container'>
				{ transactions.map( (t ) =>{
					const date = formatDistanceToNow( parseISO(t.date), { locale: pt } )
					return (
						<div 
							key={t.id} 
							className='row my-2 p-2 border-bottom border-secondary'
							style={{ color: (t.coin =='golden')? 'gold' : 'lightgray' } }
							>
							<div className='col'>{ t.id }</div>
							<div className='col'>{ t.transaction.toUpperCase() }</div>
							
							<div className='col'>{ t.coin }</div>
							<div className='col'>{ t.price }</div>
							<div className='col'>{ date }</div>
						</div>
					)
				})}
			</div>
		) 
}
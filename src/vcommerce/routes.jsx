import views from './views'

export default [
	{ path: 'vcommerce', element: <views.VCommerceRoot />,
		children:[
			{path: '', element: <views.VTransactionsList /> },
			{path: 'transaction/:transactionId', element: <views.VTransactionDetails />}
		]
	}
]
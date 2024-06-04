import { configureStore } from '@reduxjs/toolkit'
import vcommerceReducer from '@/vcommerce/stores/vcommerce'
import customerReducer from '@/customer/stores/customer'
import fantasyReducer from '@/fantasy/stores/fantasy'

export default configureStore({
	reducer:{
		customer: customerReducer,
		vcommerce: vcommerceReducer,
		fantasy: fantasyReducer,
	}
})
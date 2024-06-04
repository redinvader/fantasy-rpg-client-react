import { createSlice , nanoid } from '@reduxjs/toolkit'

export const vcommerceSlice = createSlice({
	name:'vcommerce',
	initialState:{
		wallet: { golden:100, marfin: 100 },
		transactions: [],
	},
	reducers:{
		buy : {
			reducer( state, action ){
				const { coin, price } = action.payload
				state.wallet[ coin ] -= price
				state.transactions.push(action.payload)
			},
			prepare( payload )
			{
				payload = { 
					...payload, 
					id:nanoid(), 
					date: new Date().toISOString(), 
					transaction:'buy' 
				}
				// console.info( payload )
				return { payload }
			}
		},
		addTransaction: ( state, action ) =>{
			console.log( 'addTransaction called', state, action)
		}
	}
})

export const { buy } = vcommerceSlice.actions
export default vcommerceSlice.reducer
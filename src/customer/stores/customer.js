import { createSlice } from '@reduxjs/toolkit'


const customerSlice = createSlice({
	name: 'customer',
	initialState:{
		name: 'Hammer Krammer',
		age: 22,
		gender: 'm',
		vip: false
	},
	reducers:
	{
		// getName: state => state.name
	}
})


export const {} = customerSlice.actions
export default customerSlice.reducer
import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import * as Requests  from '@/requests'

const fantasySlice = createSlice({
	name: 'fantasy',
	initialState:{
		level: 4,
		stime: null,
		status: 'idle',
		errors: null,
		players:{
			online:[],
			errors: null,
		},
		quests:{
			active: [],
			errors: null,
		}
	},
	reducers:{
		loadQuests( state, action ){
			state.quests.active = action.payload
		}
	},
	extraReducers( builder ){
		builder
			.addCase( fetchServerTime.pending, ( state, action ) =>{
				state.status ='loading'
			})
			.addCase( fetchServerTime.fulfilled, ( state, action ) =>{
				state.status='fulfilled'
				console.info('from extraReducer ', action.payload )
				state.stime = action.payload.datetime
			})
			.addCase( fetchServerTime.rejected, ( state, action ) =>{
				state.status='error'
				// state.errors = action.payload.error
				state.errors = action.error.message
				
			})
			.addCase( fetchOnlinePlayers.fulfilled, ( state, action) =>{
				state.players.online= action.payload
				state.players.errors = null
			})
			.addCase( fetchOnlinePlayers.rejected, ( state, action) =>{
				state.players.errors = action.error.message
			})
			.addCase( fetchActiveQuests.fulfilled, ( state, action) =>{
				state.quests.active= action.payload
				state.quests.errors = null
			})
			.addCase( fetchActiveQuests.rejected, ( state, action) =>{
				state.quests.errors = action.error.message
			})


			
			
	}
})


export const fetchServerTime = createAsyncThunk(
	'fantasy/stime',
	async () =>{
		const response = await axios.get('apis/server/timez', { timeout: 1500 })
		console.log('from thunk', response.data )
		return response.data.payload
	}
)

export const fetchOnlinePlayers = createAsyncThunk(
	'fantasy/online/players',
	async (_, { getState, dispatch }) =>{
		const response = await Requests.onlinePlayers()
		// console.log('from fetchOnlinePlayers', response.data, dispatch, getState() )
		return response.data.payload
	}
)

export const fetchActiveQuests = createAsyncThunk(
	'fantasy/game/quests/active',
	async () =>{
		const response = await Requests.activeQuests()
		// console.log('from fetch active quests', response.data )
		return response.data.payload 
	}
)

export const { loadQuests } = fantasySlice.actions
export default fantasySlice.reducer
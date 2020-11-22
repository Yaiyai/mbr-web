import React from 'react'
import { types } from '../types/types'

const MaquinasReducer = (state = [], action) => {
	switch (action.type) {
		case types.getMaquinas:
			return action.payload
		default:
			return state
	}
}

export default MaquinasReducer

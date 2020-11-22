import React from 'react'
import { types } from '../types/types'

const CompanyReducer = (state = [], action) => {
	switch (action.type) {
		case types.getCompany:
			return action.payload
		default:
			return state
	}
}

export default CompanyReducer

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayCountry } from '../redux/slices/displayCountrySlice'
import { selectPotentials } from '../redux/slices/potentialCountriesSlice'

const OptionDisplay = () => {
	const currentPotentials = useSelector(selectPotentials)
	console.log(currentPotentials)
	const dispatch = useDispatch()

	return (
		<div className="stack">
			{currentPotentials.map((element, i) => {
				return (
					<h2
						key={element.name.official}
						className="country-option"
						onClick={() => {
                            dispatch(setDisplayCountry(currentPotentials[i]))
                        }}
					>
						{element.name.common}
					</h2>
				)
			})}
		</div>
	)
}

export default OptionDisplay

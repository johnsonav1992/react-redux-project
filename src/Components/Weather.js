import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDisplay } from '../redux/slices/displayCountrySlice'
import { setLoading } from '../redux/slices/loadingSlice'

const Weather = () => {
	const [weather, setWeather] = useState()
	const display = useSelector(selectDisplay)
    const isLoading = useSelector(state => state.loading.isLoading)
    const dispatch = useDispatch()
	let latitude = display.capitalInfo.latlng[0]
	let longitude = display.capitalInfo.latlng[1]

	useEffect(() => {
        dispatch(setLoading(true))
		const options = {
			method: 'GET',
			url: 'https://weatherapi-com.p.rapidapi.com/current.json',
			params: { q: `${latitude}, ${longitude}` },
			headers: {
				'X-RapidAPI-Key':
					'da34692678msh65bb81a5b33e893p11a4f0jsn830e53009611',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
			},
		}

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data)
				setWeather(response.data)
                dispatch(setLoading(false))
			})
			.catch(function (error) {
				console.error(error)
			})
	}, [dispatch, latitude, longitude])

	return (
		<div>
            {isLoading ? <p>Loading...</p> : <table className="overview-table">
				<tr>
					<td>Conditions: </td>
					<td>{weather?.current?.condition?.text}</td>
				</tr>
				<tr>
					<td>Temperature: </td>
					<td>{weather?.current?.temp_f} degrees Fahrenheit</td>
				</tr>
				<tr>
					<td>Feels Like: </td>
					<td>{weather?.current?.feelslike_f} degrees Fahrenheit</td>
				</tr>
				<tr>
					<td>Humidity: </td>
					<td>{weather?.current?.humidity}%</td>
				</tr>
				<tr>
					<td>Wind Speed: </td>
					<td>
						{weather?.current?.wind_mph} mph{' '}
						{weather?.current?.wind_dir}
					</td>
				</tr>
			</table>}
			
		</div>
	)
}

export default Weather

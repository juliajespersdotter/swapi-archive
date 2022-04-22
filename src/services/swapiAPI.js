/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api/'

/**
 * Get People
 */
const getPeople = async (pageURL = null) => {
	if(pageURL){
		const res = await axios.get(`${pageURL}`)
		return res.data
	}
	else{
		const res = await axios.get(`${BASE_URL}/people/`)
		console.log('People:', res)
		return res.data
	}
}

/**
 * Get all Films
 */
const getFilms = async (id) => {
	const res = await axios.get(`${BASE_URL}/films/`)
	console.log('Films:', res)
	return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms,
	getPeople
}

/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api/'

// eslint-disable-next-line no-unused-vars
const sleep = async delay => new Promise(r => setTimeout(r, delay))

/**
 * Get People
 */
const getPeople = async () => {
	const res = await axios.get(`${BASE_URL}/people/`)
	console.log('People:', res)
	return res.data
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

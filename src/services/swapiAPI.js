/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api/'

const get = async(endpoint, page) => {
	if(!page){
		const res = await axios.get(endpoint)
		return res.data
	} else{
		const res = await axios.get(`${endpoint}/?page=${page}`)
		return res.data
	}
}

/**
 * 
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
const search = async (endpoint, query, page) => {
	if(!page){
		const res = await axios.get(`${endpoint}/?search=${query}`)
		return res.data
	} else {
		const res = await axios.get(`${endpoint}/?search=${query}&page=${page}`)
		return res.data
	}

	
	// else {
	// 	const res = await axios.get(`${endpoint}/?search=${query}`)
	// 	return res.data
	// }
	//https://swapi.dev/api/people/?search=r2 
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	get,
	search
}

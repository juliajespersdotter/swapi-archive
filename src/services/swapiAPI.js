/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api/'

/*
const getPeople = async(query = null, page) => {
	if(query){
		const res = await axios.get(`${endpoint}/?search=${query}&page=${page}`)
		return res.data
	} else {
		const res = await axios.get(`${endpoint}/?page=${page}`)
		return res.data
	}
}*/

const get = async(endpoint, page) => {
	if(!page){
		const res = await axios.get(endpoint)
		return res.data
	} else{
		const res = await axios.get(`${endpoint}/?page=${page}`)
		return res.data
	}
}

const getSinglePerson = async(id) => {
	const res = await axios.get(`/people/${id}`)
	return res.data
}

/**
 * 
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
 export const search = async (query, page) => {
    return get(`/search?query=${query}&tags=story&page=${page}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	get,
	getSinglePerson
}

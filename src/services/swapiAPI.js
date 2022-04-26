/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'

axios.defaults.baseURL = 'https://swapi.dev/api/'

const get = async(endpoint, pageURL = null) => {
	if(pageURL){
		const res = await axios.get(`${pageURL}`)
		return res.data
	} 
    const res = await axios.get(endpoint)
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
}

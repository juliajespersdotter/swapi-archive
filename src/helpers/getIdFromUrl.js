/**
 * Extract ID from SWAPI url
 */

export const getIdFromUrl = (url) => {
    const [_endpoint, id] = url 
        .replace('https://swapi.dev/api/', '')
        .slice(0, -1)
        .split('/')
        console.log(id)
        return id
}


import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swapiAPI from '../services/swapiAPI';
import 'bootstrap/dist/css/bootstrap.css'
import Film from '../components/Film'
import '../App.css'

const FilmInfoPage = () => {
    const [film, setFilm] = useState()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getFilm = async (id) => {
        setLoading(true)

        const data = await swapiAPI.get(`/films/${id}`)
        // console.log("Film: ", data)
        
        setFilm(data)

        // console.log('characters: ', characters)
        setLoading(false)
    }

    useEffect(() => {
		getFilm(id)
	}, [id])

    return ( 
        <>
        {loading && (<div className="mt-4">Loading...</div>)}

        {film && (
            <Film 
                data={film}
            />
        )}
        </>
     );
}
 
export default FilmInfoPage;
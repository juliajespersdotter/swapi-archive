import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swapiAPI from '../services/swapiAPI';
import Film from '../components/Film'
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const FilmInfoPage = () => {
    const [film, setFilm] = useState()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getFilm = async (id) => {
        setLoading(true)

        const data = await swapiAPI.get(`/films/${id}`)
        
        setFilm(data)

        setLoading(false)
    }

    useEffect(() => {
		getFilm(id)
	}, [id])

    return ( 
        <>
        {loading && (
            <Loading/>
        )}

        {film && (
            <Film 
                data={film}
            />
        )}
        </>
     );
}
 
export default FilmInfoPage;
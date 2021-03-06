import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swapiAPI from '../services/swapiAPI';
import Person from '../components/Person'
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeopleInfoPage = () => {
    const [person, setPerson] = useState()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getPerson = async (id) => {
        setLoading(true)

        const data = await swapiAPI.get(`/people/${id}`)
        
        setPerson(data)

        setLoading(false)
    }

    useEffect(() => {
		getPerson(id)
	}, [id])

    return ( 
        <>
        {loading && (
            <Loading/>
        )}

        {person && (
            <Person 
                data={person}
            />
        )}
        </>
     );
}
 
export default PeopleInfoPage;
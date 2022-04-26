import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import swapiAPI from '../services/swapiAPI';
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeopleInfoPage = () => {
    const [person, setPerson] = useState()
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    // console.log("id: ", id)

    const getPerson = async (id) => {
        setLoading(true)

        const data = await swapiAPI.get(`/people/${id}`)
        // console.log("Person: ", data)
        
        setPerson(data)
        setFilms(data.films)

        // console.log('characters: ', characters)
        setLoading(false)
    }

    useEffect(() => {
		getPerson(id)
	}, [id])

    const back = () => {
        navigate('/people')
    }

    return ( 
        <>
        {loading && (<div className="mt-4">Loading...</div>)}

        {person && (
            <Card style={{ width: '80%'}}>
                <Card.Header as="h3">{person.name}</Card.Header>
                <Card.Body>
                <Card.Title>Attributes</Card.Title>
                <ListGroup 
                    variant="flush"
                    className="mb-4">
                    <ListGroup.Item>Gender: {person.gender}</ListGroup.Item>
                    <ListGroup.Item>Birth year: {person.birth_year}</ListGroup.Item>
                    <ListGroup.Item>Height: {person.height}</ListGroup.Item>
                    <ListGroup.Item>Mass: {person.mass}</ListGroup.Item>
                    <ListGroup.Item>Hair color: {person.hair_color}</ListGroup.Item>
                    <ListGroup.Item>Skin color: {person.skin_color}</ListGroup.Item>
                    <ListGroup.Item>Eye color: {person.eye_color}</ListGroup.Item>
                </ListGroup>
                <Card.Title>Links</Card.Title>
                <p>Films</p>
                    <>
                    {films.map(film => (
                        <ul id="film-links">
                            <Link to={`/films/${getIdFromUrl(film)}`}>Film {getIdFromUrl(film)}</Link>
                        </ul>
                    ))}
                    </>
                    <Button variant="dark"
                        onClick={() => back()}
                    >Go Back</Button>
                </Card.Body>
            </Card>
        )}
        </>
     );
}
 
export default PeopleInfoPage;
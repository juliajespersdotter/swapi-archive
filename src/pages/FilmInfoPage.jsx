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

const FilmInfoPage = () => {
    const [film, setFilm] = useState()
    const [loading, setLoading] = useState(false)
    const [characters, setCharacters] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    console.log("id: ", id)

    const getFilm = async (id) => {
        setLoading(true)

        const data = await swapiAPI.get(`/films/${id}`)
        console.log("Film: ", data)

        // getCharacterIds(data.characters)
        data.characters.forEach(character => {
            setCharacters(character)
        })

        setFilm(data)
        console.log('characters: ', characters)
        setLoading(false)
    }

    const getCharacterIds = (characters) => {
        characters.forEach((character) => {
            return getIdFromUrl(character)
            // setCharacters(characterId)
        })
    }

    useEffect(() => {
		getFilm(id)
	}, [])

    const back = () => {
        navigate('/films')
    }

    return ( 
        <>
        {loading && (<div className="mt-4">Loading...</div>)}

        {film && (
            <Card style={{ width: '80%'}}>
                <Card.Header as="h3">{film.title}</Card.Header>
                <Card.Body>
                <Card.Title>Attributes</Card.Title>
                <ListGroup 
                    variant="flush">
                    <ListGroup.Item>Episode: {film.episode_id}</ListGroup.Item>
                    <ListGroup.Item>Director: {film.director}</ListGroup.Item>
                    <ListGroup.Item>Producer: {film.producer}</ListGroup.Item>
                    <ListGroup.Item>Release date: {film.release_date}</ListGroup.Item>
                </ListGroup>
                <Card.Title>Links</Card.Title>
                    {getCharacterIds().map(id => {
                        return <a as={Link} to={`/people/${id}`}>Character {id}</a>
                    })}
                    <Button variant="dark"
                        onClick={() => back()}
                    >Go Back</Button>
                </Card.Body>
            </Card>
        )}
        </>
     );
}
 
export default FilmInfoPage;
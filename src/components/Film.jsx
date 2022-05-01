import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const Film = ({ film }) => {
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCharacters(film.characters)
    }, [film])


    return ( 
        <Card style={{ width: '80%'}}>
            <Card.Header as="h3">{film.title}</Card.Header>
            <Card.Body>
            <Card.Title>Attributes</Card.Title>
            <ListGroup 
                variant="flush"
                className="mb-4">
                <ListGroup.Item>Episode: {film.episode_id}</ListGroup.Item>
                <ListGroup.Item>Director: {film.director}</ListGroup.Item>
                <ListGroup.Item>Producer: {film.producer}</ListGroup.Item>
                <ListGroup.Item>Release date: {film.release_date}</ListGroup.Item>
            </ListGroup>
            <Card.Title>Links</Card.Title>
                <>
                {characters.map((character, index) => (
                    <ul id="character-links" key={index}>
                        <Link to={`/people/${getIdFromUrl(character)}`}>Character {getIdFromUrl(character)}</Link>
                    </ul>
                ))}
                </>
                <Button variant="dark"
                    onClick={() => navigate(-1)}
                >Go Back</Button>
            </Card.Body>
        </Card> );
}
 
export default Film;
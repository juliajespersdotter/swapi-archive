import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { ListGroupItem } from 'react-bootstrap'

const Film = ({ data }) => {
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCharacters(data.characters)
    }, [data])


    return ( 
        <Card className="card" border='warning'>
            <Card.Header class="card-header" as="h3">{data.title}</Card.Header>
            <Card.Body>
            <Card.Title>Attributes</Card.Title>
            <div className='d-flex justify-content-between'>
            <ListGroup 
                variant="flush"
                className="mb-4">
                <ListGroup.Item>Episode:</ListGroup.Item>
                <ListGroup.Item>Director: </ListGroup.Item>
                <ListGroup.Item>Producer:</ListGroup.Item>
                <ListGroup.Item>Release date:</ListGroup.Item>
            </ListGroup>

            <ListGroup
                variant="flush"
                className="mb-4">
                <ListGroup.Item>{data.episode_id}</ListGroup.Item>
                <ListGroup.Item>{data.director}</ListGroup.Item>
                <ListGroup.Item>{data.producer}</ListGroup.Item>
                <ListGroup.Item>{data.release_date}</ListGroup.Item>
            </ListGroup>
            </div>

            <Card.Title>Links</Card.Title>
            <p>Characters</p>
                <>
                {characters.map((character, index) => (
                    <ListGroup id="links" key={index}>
                        <ListGroup.Item><Link to={`/people/${getIdFromUrl(character)}`}>Character {getIdFromUrl(character)}</Link></ListGroup.Item>
                    </ListGroup>
                ))}
                </>
                <Button variant="dark"
                    onClick={() => navigate(-1)}
                >Go Back</Button>
            </Card.Body>
        </Card> );
}
 
export default Film;
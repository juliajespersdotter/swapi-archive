import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const Film = ({ data }) => {
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setCharacters(data.characters)
    }, [data])


    return ( 
        <Card className="card" border='warning'>
            <Card.Header className="card-header" as="h3">{data.title}</Card.Header>
            <Card.Body>
                <Card.Title>Attributes</Card.Title>
                <div className='d-flex justify-content-between w-50'>
                <ul 
                    className="mb-4 p-0">
                    <li>Episode:</li>
                    <li>Director: </li>
                    <li>Producer:</li>
                    <li>Release date:</li>
                </ul>

                <ul
                    className="mb-4 bold">
                    <li>{data.episode_id}</li>
                    <li>{data.director}</li>
                    <li>{data.producer}</li>
                    <li>{data.release_date}</li>
                </ul>
                </div>

                <Card.Title>Links</Card.Title>
                <p>Characters</p>
                    <>
                    {characters.map((character, index) => (
                        <ListGroup className="links" key={index}>
                            <ListGroup.Item><Link to={`/people/${getIdFromUrl(character)}`}>Character {getIdFromUrl(character)}</Link></ListGroup.Item>
                        </ListGroup>
                    ))}
                    </>
                    <Button variant="dark mt-5"
                        onClick={() => navigate(-1)}
                    >Go Back</Button>
            </Card.Body>
        </Card> );
}
 
export default Film;
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getIdFromUrl } from '../helpers/getIdFromUrl'

const Person = ({ data }) => {
    const [films, setFilms] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setFilms(data.films)
    }, [data])


    return ( 
        <Card className="card" border="warning">
            <Card.Header className="card-header" as="h3">{data.name}</Card.Header>
            <Card.Body>
                <Card.Title>Attributes</Card.Title>
                <ListGroup 
                    variant="flush"
                    className="mb-4">
                    <ListGroup.Item>Gender: {data.gender}</ListGroup.Item>
                    <ListGroup.Item>Birth year: {data.birth_year}</ListGroup.Item>
                    <ListGroup.Item>Height: {data.height}</ListGroup.Item>
                    <ListGroup.Item>Mass: {data.mass}</ListGroup.Item>
                    <ListGroup.Item>Hair color: {data.hair_color}</ListGroup.Item>
                    <ListGroup.Item>Skin color: {data.skin_color}</ListGroup.Item>
                    <ListGroup.Item>Eye color: {data.eye_color}</ListGroup.Item>
                </ListGroup>
                <Card.Title>Links</Card.Title>
                <p>Films</p>
                    <>
                    {films.map((film, index) => (
                        <ul id="film-links" key={index}>
                            <Link to={`/films/${getIdFromUrl(film)}`}>Film {getIdFromUrl(film)}</Link>
                        </ul>
                    ))}
                    </>
                    <Button variant="dark"
                        onClick={() => navigate(-1)}
                    >Go Back</Button>
            </Card.Body>
            </Card>
     );
}
 
export default Person;
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
                <div className='d-flex justify-content-between w-50'>
                <ul 
                    className="mb-4 p-0">
                    <li>Gender:</li>
                    <li>Birth year:</li>
                    <li>Height:</li>
                    <li>Mass:</li>
                    <li>Hair color:</li>
                    <li>Skin color:</li>
                    <li>Eye color:</li>
                </ul>

                <ul
                    className='mb-4 bold'
                >
                    <li>{data.gender}</li>
                    <li>{data.birth_year}</li>
                    <li>{data.height} cm</li>
                    <li>{data.mass} kg</li>
                    <li>{data.hair_color}</li>
                    <li>{data.skin_color}</li>
                    <li>{data.eye_color}</li>
                </ul>
                </div>
                
                <Card.Title>Links</Card.Title>
                <p>Films</p>
                    <>
                    {films.map((film, index) => (
                        <ListGroup className="links" key={index}>
                            <ListGroup.Item><Link to={`/films/${getIdFromUrl(film)}`}>Film {getIdFromUrl(film)}</Link></ListGroup.Item>
                        </ListGroup>
                    ))}
                    </>
                    <Button variant="dark" className='mt-5'
                        onClick={() => navigate(-1)}
                    >Go Back</Button>
            </Card.Body>
            </Card>
     );
}
 
export default Person;
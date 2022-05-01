import { getIdFromUrl } from '../helpers/getIdFromUrl'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

const Person = ({ data }) => {
    return ( 
        <>
        <p className="text-center text-white">{data.count} results...</p>
        <div id="card-wrapper">
            <Row xs={1} md={2} className="g-4">
                {data.results.map((result, index) => (
                    <Col key={index}>
                        <Card className="card-small"
                        border='warning'
                        key={index}
                        >
                            <Card.Header className="card-header" as="h3">{result.name}</Card.Header>
                            <Card.Body>
                                <ListGroup 
                                variant="flush"
                                >
                                    <ListGroup.Item>Gender: {result.gender}</ListGroup.Item>
                                    <ListGroup.Item>Born: {result.birth_year}</ListGroup.Item>
                                    <ListGroup.Item>Appears in: {result.films.length} films</ListGroup.Item>
                                </ListGroup>

                                <Link 
                                    className="btn btn-dark"
                                    role="button"
                                    to={`/people/${getIdFromUrl(result.url)}`}
                                    > 
                                    Read more
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        </>
     );
}
 
export default Person;
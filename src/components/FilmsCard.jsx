import { getIdFromUrl } from '../helpers/getIdFromUrl'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

const FilmsCard = ({ data }) => {
    return ( 
        <>
			<p className="text-center text-white">{data.count} results...</p>
			<div id="card-wrapper">

			<Row xs={1} md={2} className="g-4">
				{data.results.map(result => (
					<Col key={result.episode_id}>
						<Card className="card-small"
							border='warning'
							key={result.episode_id}
						>
                        <Card.Header className="card-header" as="h3">{result.title}</Card.Header>
                        <Card.Body>
                            <ListGroup 
                                variant="flush">
                                <ListGroup.Item>Episode: {result.episode_id}</ListGroup.Item>
                                <ListGroup.Item>Released: {result.release_date}</ListGroup.Item>
                                <ListGroup.Item>{result.characters.length} Characters</ListGroup.Item>
                            </ListGroup>
                            <Link 
                                className="btn btn-dark mt-2 ms-3"
                                role="button"
                                to={`/films/${getIdFromUrl(result.url)}`}
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
 
export default FilmsCard;
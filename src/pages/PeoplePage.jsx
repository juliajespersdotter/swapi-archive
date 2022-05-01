import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import swapiAPI from "../services/swapiAPI";
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeoplePage = () => {
    const [people, setPeople] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()

	const getPeople = async (page) => {
		setLoading(true)
		setPeople(null)

		const data = await swapiAPI.get('/people', page)
        // console.log('people data:', data)
		
		// update people state
		setSearchParams({ page: page })
		setPeople(data)
		setLoading(false)
	}

	useEffect(() => {
		if(page === null){
			return
		}
		getPeople(page)
	}, [page])

	

    return ( 
        <>
        <h1>People</h1>
		{loading && (<div className="mt-4 text-white">Loading...</div>)}		

		{people && (
		<>
			<p className="text-center text-white">{people.count} results...</p>
			<div id="card-wrapper">
				<Row xs={1} md={2} className="g-4">
					{people.results.map((result, index) => (
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
		)}
		
		{people && (
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					<Button
						disabled={people.previous === null}
						onClick={() => setPage(prevValue => prevValue - 1)}
						variant="dark"
					>Previous Page</Button>
				</div>
				<div className="page">{page}</div>
				<div className="next">
					<Button
						disabled={people.next === null}
						onClick={() => setPage(prevValue => prevValue + 1)}
						variant="dark"
					>Next Page</Button>
				</div>
			</div>
		)}
        </>
     );
}
 
export default PeoplePage;
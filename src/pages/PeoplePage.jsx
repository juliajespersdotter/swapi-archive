import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import swapiAPI from "../services/swapiAPI";
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeoplePage = () => {
    const [people, setPeople] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	// const navigate = useNavigate()
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
		{loading && (<div className="mt-4">Loading...</div>)}		

		{people && (
			<>
			<p className="text-center">{people.count} results...</p>
				<div id="card-wrapper">

				{people.results.map((result, index) => (
					<Card style={{ width: '22rem' }}
						key={index}
					>
						<Card.Header as="h3">{result.name}</Card.Header>
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
				))}

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
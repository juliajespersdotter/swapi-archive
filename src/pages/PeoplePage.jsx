import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
// import { Link } from 'react-router-dom'
import swapiAPI from "../services/swapiAPI";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeoplePage = () => {
    const [people, setPeople] = useState(null)
	const [page, setPage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [pageNum, setPageNum] = useState(null)

	const getPeople = async (page) => {
		// Get todos from api
		setLoading(true)
		const data = await swapiAPI.getPeople(page)
        console.log('people data:', data)

		// update people state
		setPeople(data)
		setLoading(false)
	}
    // Get people from api when component is first mounted
	useEffect(() => {
		getPeople(page)
	}, [page])

	useEffect(() => {
		getPeople()
	}, [])

    return ( 
        <>
        <h1>People</h1>
		{loading && (<div className="mt-4">Loading...</div>)}		

		{people && (
			<div id="people">


			{people.results.map(result => (
				<Card style={{ width: '22rem' }}>
					<Card.Header as="h3">{result.name}</Card.Header>
					<Card.Body>
					<ListGroup variant="flush">
						<ListGroup.Item>Gender: {result.gender}</ListGroup.Item>
						<ListGroup.Item>Born: {result.birth_year}</ListGroup.Item>
						<ListGroup.Item>Appears in: {result.films.length} films</ListGroup.Item>
					</ListGroup>
						<Button variant="dark">Read more</Button>
					</Card.Body>
				</Card>
			))}

			</div>
		)}
		
		{people && (
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					<Button
						disable={people.previous === null}
						onClick={() => setPage(people.previous)}
						variant="dark"
					>Previous Page</Button>
				</div>
				<div className="page">{pageNum}</div>
				<div className="next">
					<Button
						disable={people.next === null}
						onClick={() => setPage(people.next)}
						variant="dark"
					>Next Page</Button>
				</div>
			</div>
		)}
        </>
     );
}
 
export default PeoplePage;
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import swapiAPI from '../services/swapiAPI';
import { getIdFromUrl } from '../helpers/getIdFromUrl'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const FilmsPage = () => {
    const [films, setFilms] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	// const [pageNum, setPageNum] = useState(null)
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	const getFilms = async (page) => {
		setLoading(true)
		const data = await swapiAPI.get('/films/', page)
        // console.log('Films data:', data)

		// update people state
		setSearchParams({ page: page })
		setFilms(data)
		setLoading(false)
	}

	useEffect(() => {
		if(page === null){
			return
		}
		getFilms(page)
	}, [page])

    return ( 
        <>
        <h1>Films</h1>
		{loading && (<div className="mt-4">Loading...</div>)}		

		{films && (
			<div id="card-wrapper">


			{films.results.map(result => (
				<Card style={{ width: '22rem'}}
				key={result.episode_id}
				>
					<Card.Header as="h3">{result.title}</Card.Header>
					<Card.Body>
					<ListGroup 
                        variant="flush">
						<ListGroup.Item>Episode: {result.episode_id}</ListGroup.Item>
						<ListGroup.Item>Released: {result.release_date}</ListGroup.Item>
						<ListGroup.Item>{result.characters.length} Characters</ListGroup.Item>
					</ListGroup>
					<Link 
						className="btn btn-dark"
						role="button"
						to={`/films/${getIdFromUrl(result.url)}`}
						> 
						Read more
					</Link>
					</Card.Body>
				</Card>
			))}

			</div>
		)}
		
		{films && (
			<div className="d-flex justify-content-between align-items-center mt-4">
				<div className="prev">
					<Button
						disabled={films.previous === null}
						onClick={() => setPage(prevValue => prevValue - 1)}
						variant="dark"
					>Previous Page</Button>
				</div>
				<div className="page">{page}</div>
				<div className="next">
					<Button
						disabled={films.next === null}
						onClick={() => setPage(prevValue => prevValue + 1)}
						variant="dark"
					>Next Page</Button>
				</div>
			</div>
		)}
        </>
     );
}
 
export default FilmsPage;
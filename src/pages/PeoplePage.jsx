import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import swapiAPI from "../services/swapiAPI";
import PeopleCard from '../components/PeopleCard'
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
			<PeopleCard 
				data={people}
			/>
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
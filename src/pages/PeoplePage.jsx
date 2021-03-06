import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import swapiAPI from "../services/swapiAPI";
import PeopleCard from '../components/PeopleCard'
import Search from '../components/Search'
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const PeoplePage = () => {
    const [people, setPeople] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get('search')

	const getPeople = useCallback(async (page, query=null) => {
		setLoading(true)
		setPeople(null)

		if(query) {
			// if query, search the api
			const data = await swapiAPI.search(`/people`, query, page)

			setSearchParams({ search: query, page: page })
			setPeople(data)
		} else{
			// else use the get api function
			const data = await swapiAPI.get('/people', page)
			setPeople(data)
			setSearchParams({ page: page })
		}

		setLoading(false)
	}, [setSearchParams])

	useEffect(() => {
		setPage(1)
	}, [query])

	useEffect(() => {
		if(page === null){
			return
		}
		getPeople(page, query)
	}, [page, query, getPeople])

    return ( 
        <>
		<Search 
			// search component
			resource='people'
			getSearchResults={getPeople}
		/>

		{query && (
			<p className='text-white text-center'>Showing results for search query: '{query}'...</p>
		)}

        <h1>People</h1>
		{loading && (
			// loading component
			<Loading />
		)}		

		{people && (
			// people card component
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
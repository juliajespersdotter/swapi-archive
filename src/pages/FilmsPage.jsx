import { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import swapiAPI from '../services/swapiAPI';
import { useSearchParams } from 'react-router-dom'
import FilmsCard from '../components/FilmsCard'
import Search from '../components/Search';
import Loading from '../components/Loading';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const FilmsPage = () => {
    const [films, setFilms] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get('search')

	const getFilms = useCallback(async (page, query) => {
		setLoading(true)
		setFilms(null)

		if(query) {
			// if query, search the api
			const data = await swapiAPI.search(`/films`, query, page)

			setSearchParams({ search: query, page: page })
			setFilms(data)
		} else{
			// else use get api function
			const data = await swapiAPI.get('/films', page)
			setFilms(data)
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
		getFilms(page, query)
	}, [page, query, getFilms])

    return ( 
        <>
		<Search 
			resource='films'
			getSearchResults={getFilms}
		/>

		{query && (
			<p className='text-white text-center'>Showing results for search query: '{query}'...</p>
		)}

        <h1>Films</h1>
		{loading && (
			<Loading />
		)}		

		{films && (
			<FilmsCard 
				data={films}
			/>
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
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import swapiAPI from '../services/swapiAPI';
import { useSearchParams } from 'react-router-dom'
import FilmsCard from '../components/FilmsCard'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const FilmsPage = () => {
    const [films, setFilms] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	// const [pageNum, setPageNum] = useState(null)
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
		{loading && (<div className="mt-4 text-white">Loading...</div>)}		

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
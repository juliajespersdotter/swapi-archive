import { useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'

const Search = ({ resource, getSearchResults }) => {
    const [searchInput, setSearchInput] = useState('')
	const [page, setPage] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()
	const queryRef = useRef()

    const query = searchParams.get('query')

	const handleSubmit = async e => {
		e.preventDefault()

		if (!searchInput.length) {
			return
		}

		queryRef.current = searchInput

		setSearchParams({ search: searchInput, page: page })
		setPage(1)
	}

	useEffect(() => {
		if (!query) {
			setSearchInput('')
			return
		}

		getSearchResults(page, query)
	}, [query, page])

    return ( 
        <>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3 text-white" controlId="newTitle">
					<Form.Label>Search the {resource} resource ...</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter search here..."
						ref={searchInputRef}
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-between mb-3">
					<Button variant="dark" type="submit" disabled={!searchInput.length}>Search</Button>
				</div>
			</Form>
        </>
     );
}
 
export default Search;
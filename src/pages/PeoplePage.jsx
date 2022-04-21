import { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import swapiAPI from "../services/swapiAPI";

const PeoplePage = () => {
    const [people, setPeople] = useState([])

	const getPeople = async () => {
		// Get todos from api
		const data = await swapiAPI.getPeople()
        console.log('people data:', data)

		// update people state
		setPeople(data)
	}
    // Get people from api when component is first mounted
	useEffect(() => {
		getPeople()
	}, [])

    return ( 
        <>
        <h1>People</h1>
        </>
     );
}
 
export default PeoplePage;
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import PeoplePage from './pages/PeoplePage'
import FilmsPage from './pages/FilmsPage'
import HomePage from './pages/HomePage'
import FilmInfoPage from './pages/FilmInfoPage'
import PeopleInfoPage from './pages/PeopleInfoPage'
import NotFound from './pages/NotFound'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/films" element={<FilmsPage />} />
					<Route path="/films/:id" element={<FilmInfoPage />} />
					<Route path="/people/:id" element={<PeopleInfoPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
      
    </div>
  );
}

export default App;

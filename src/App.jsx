import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { fetchDataFromApi } from './utils/api'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Details from './Pages/Details/Details'
import SearchResult from './Pages/SearchResult/SearchResult'
import Page404 from './Pages/404/404'
import Explore from './Pages/Explore/Explore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  useEffect(() => {
    fetchApiConfig()
    genresCall();
    window.scrollTo(0, 0);
  }, [])
  const fetchApiConfig = async () => {
    await fetchDataFromApi('/configuration').then((response) => {
      const urlConfigInfo = {
        backdrop: response.images.secure_base_url + 'original',
        poster: response.images.secure_base_url + 'original',
        profile: response.images.secure_base_url + 'original',
      }
      dispatch(getApiConfiguration(urlConfigInfo))
    })
  }
  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie']
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((genre) => {
        allGenres[genre.id] = genre;
      })
    })
    dispatch(getGenres(allGenres))
  }
  return (
    <div className="remove-typing-cursor">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/:mediaType/:id' element={<Details />} />
          <Route exact path='/search/:query' element={<SearchResult />} />
          <Route exact path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
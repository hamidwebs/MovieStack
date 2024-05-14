import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
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
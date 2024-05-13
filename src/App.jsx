import { useEffect } from 'react'
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

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  useEffect(() => {
    gettingData()
  }, [])
  const gettingData = async () => {
    await fetchDataFromApi('/movie/popular').then((response) => {
      dispatch(getApiConfiguration(response))
    })
  }
  console.log(url)
  return (
    <div className='App'>
      {url?.total_pages}
    </div>
  )
}

export default App
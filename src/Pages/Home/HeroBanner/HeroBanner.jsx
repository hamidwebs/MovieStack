import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../Components/LazyLoadImage/img';
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper';
export default function HeroBanner() {
  const { backdrop } = useSelector((state) => state.home.url);
  const navigation = useNavigate();
  const [query, setQuery] = useState('')
  const [backgroundImg, setBackgroundImg] = useState('');
  const { data, loading } = useFetch(`/movie/upcoming`);
  useEffect(() => {
    let bg = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroundImg(backdrop + bg);
  }, [data])
  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigation(`/search/${query}`)
    }
  }
  const handleOnChange = (e) => {
    setQuery(e.target.value)
  }
  const handleOnSearch = () => {
    if (query.length > 0) {
      navigation(`/search/${query}`)
    }
  }
  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={backgroundImg} />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Millions of Movies, TV Shows & People to Discover. Explore Now!</span>
          <div className="searchInput">
            <input type="text" placeholder='Search for Movie or TV Show...' onKeyUp={searchQueryHandler} onChange={handleOnChange} value={query} />
            <button className='searchButton' onClick={handleOnSearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
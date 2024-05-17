import React from 'react'
import './style.scss'
import HeroBanner from './HeroBanner/HeroBanner'
import Trending from './Trending/Trending'
import Popular from './Popular/Popular'
import TopTrending from './TopTrending/TopTrending'

export default function Home() {
  return (
    <div className="homepage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopTrending />
    </div>
  )
}

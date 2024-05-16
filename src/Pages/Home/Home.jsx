import React from 'react'
import './style.scss'
import HeroBanner from './HeroBanner/HeroBanner'
import Trending from './Trending/Trending'

export default function Home() {
  return (
    <div className="homepage">
      <HeroBanner />
      <Trending />
    </div>
  )
}

import React from 'react'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import './style.scss'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import Cast from './Cast/Cast'
import VideoSection from './VideoSection/VideoSection'
import SimilarMovies from './SimilarMovies/SimilarMovies'
import Recommendation from './Recommendation/Recommendation'

export default function Details() {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <SimilarMovies id={id} />
      <Recommendation id={id} />
    </div>
  )
}

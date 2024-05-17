import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../Components/ContentWrapper/ContentWrapper'
import MovieCard from '../../Components/MovieCard/MovieCard'
import Spinner from '../../Components/Spinner/Spinner'
import NoResult from '../../Components/NoResult/NoResult.jsx'
import './style.scss'

export default function SearchResult() {
  const [data, setData] = useState()
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query, mediaType } = useParams()
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum?.((prev) => { prev + 1 });
      setLoading(false);
    })
  }
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...data?.results, ...res?.results]
        })
      } else {
        setData(res);
      }
      setPageNum?.((prev) => prev + 1);
    })
  }
  useEffect(() => {
    setPageNum?.(1);
    fetchInitialData();
  }, [query])
  return (
    <div className='searchResultsPage'>
      {loading &&
        <Spinner initial={true} />
      }
      {!loading &&
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? 'Results' : 'Result'} for \'${query}\'`}
              </div>
              <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner />} >
                {data?.results?.map((item, index) => {
                  if (item.mediaType === 'person') {
                    return
                  }
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>
              Sorry Results Not Found!
            </span>
          )}
        </ContentWrapper>}
    </div>
  )
}
import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import useFetch from '../../../Hooks/useFetch'
import Carousel from '../../../Components/Carousel/Carousel';

export default function Popular({ id }) {
    const { data, loading } = useFetch(`/movie/${id}/similar`);
    return (
        <>
            <div className='carouselSection'>
                <ContentWrapper>
                    <span className='carouselTitle'>Similar Movies</span>
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint={'movie'} />
            </div>
        </>
    )
}
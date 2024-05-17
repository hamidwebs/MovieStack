import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import useFetch from '../../../Hooks/useFetch'
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import Carousel from '../../../Components/Carousel/Carousel';

export default function Popular() {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`);
    const handleOnTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
    }
    return (
        <>
            <div className='carouselSection'>
                <ContentWrapper>
                    <span className='carouselTitle'>Top Rated</span>
                    <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={handleOnTabChange} />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
            </div>
        </>
    )
}
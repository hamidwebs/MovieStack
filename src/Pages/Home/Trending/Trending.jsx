import React, { useState } from 'react'
import ContentWrapper from '../../../Components/ContentWrapper/ContentWrapper'
import useFetch from '../../../Hooks/useFetch'
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import Carousel from '../../../Components/Carousel/Carousel';

export default function Trending() {
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/all/${endpoint}`);
    const handleOnTabChange = (tab) => {
        setEndpoint(tab.toLocaleLowerCase());
        console.log(data)
    }
    return (
        <>
            <div className='carouselSection'>
                <ContentWrapper>
                    <span className='carouselTitle'>Trending</span>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={handleOnTabChange} />
                </ContentWrapper>
                <Carousel data={data?.results} loading={loading} />
            </div>
        </>
    )
}

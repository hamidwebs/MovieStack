import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../LazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from '../CircleRating/CircleRating'
import Genres from "../Genres/Genres";

import "./style.scss";

export default function Carousel({ data, loading, endpoint }) {
    const carouselContainer = useRef();
    const { poster } = useSelector((state) => state.home.url);
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        })
    }
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => { navigation('left') }} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => { navigation('right') }} />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const imgSrc = item?.poster_path ? poster + item?.poster_path : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id} onClick={() => {
                                    navigate(`/${item.media_type || endpoint }/${item.id}`)
                                }}>
                                    <div className="posterBlock">
                                        <Img src={imgSrc} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">{dayjs(item.release_date).format("MMM D, YYYY")}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

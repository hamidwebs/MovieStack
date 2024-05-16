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

import "./style.scss";

export default function Carousel({ data, loading }) {
    const carouselContainer = useRef();
    const { poster } = useSelector((state) => state.home.url);
    const navigate = useNavigate();
    const navigation = (dir) => {
        console.log(dir)
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
                    <div className="carouselItems">
                        {data?.map((item) => {
                            const imgSrc = item?.poster_path ? poster + item?.poster_path : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id}>
                                    <div className="posterBlock">
                                        <Img src={imgSrc} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
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

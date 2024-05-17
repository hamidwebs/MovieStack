import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import useFetch from "../../../Hooks/useFetch";
import Genres from "../../../Components/Genres/Genres";
import CircleRating from "../../../Components/CircleRating/CircleRating";
import Img from "../../../Components/LazyLoadImage/img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../Components/VideoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { backdrop } = useSelector((state) => state.home.url);
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    const _genres = data?.genres?.map((g) => g.id);
    const directors = crew?.filter?.((director) => { return director?.job === 'Director' })
    const writers = crew?.filter?.((writer) => { return writer?.job === 'xScreenplay' || writer?.job === 'Story' || writer?.job === 'Writer' })
    const creator = data?.created_by?.map((c) => { return c.name })
    const playTrailer = () => {
        setShow?.(true);
        setVideoId(video?.key);
    }
    return (
        <div className="detailsBanner">
            {!loading ? (
                <div>
                    <div className="backdrop-img">
                        <Img src={backdrop + data?.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.poster_path ? (
                                    <Img className='posterImg' src={backdrop + data?.poster_path} />
                                ) : (
                                    <Img className='posterImg' src={PosterFallback} />
                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {data?.name || data?.title} ({dayjs(data?.release_date).format("YYYY")})
                                </div>
                                <div className="subtitle">
                                    {data?.tagline}
                                </div>
                                <Genres data={_genres} />
                                <div className="row">
                                    <CircleRating rating={data?.vote_average.toFixed(1)} />
                                    <div className="playbtn" onClick={playTrailer}>
                                        <PlayButton />
                                        <span className="text">Watch Trailer</span>
                                    </div>
                                </div>
                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        {data?.overview}
                                    </div>
                                </div>
                                <div className="info">
                                    {data?.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status: {" "}
                                            </span>
                                            <span className="text">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}
                                    {data?.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Release Date: {" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(data.release_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                    {data?.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Duration: {" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data.runtime)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {directors?.length > 0 &&
                                    <div className="info">
                                        <span className="text bold">Director: {" "}</span>
                                        <span className="text">{directors?.map((d, i) => <span key={i}>{d.name}</span>)}</span>
                                    </div>
                                }
                                {writers?.length > 0 &&
                                    <div className="info">
                                        <span className="text bold">{writers?.length > 1 ? "Writers" : "Writer"}: {" "}</span>
                                        <span className="text">
                                            {writers?.map((w, i) => <span key={i}>
                                                {w.name}{i !== writers.length - 1 ? ", " : ""}
                                            </span>)}
                                        </span>
                                    </div>
                                }
                                {data?.created_by?.length > 0 &&
                                    <div className="info">
                                        <span className="text bold">{data?.created_by?.length > 1 ? "Creators" : "Creator"}: {" "}</span>
                                        <span className="text">
                                            {creator?.map((c, i) => <span key={i}>
                                                {c}{i !== creator.length - 1 ? ", " : ""}
                                            </span>)}
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </ContentWrapper>
                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
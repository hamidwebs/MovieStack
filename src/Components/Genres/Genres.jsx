import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

export default function Genres({ data }) {
    const { genres } = useSelector((state) => { return state.home })
    return (
        <div className='genres'>
            {data?.map((item) => {
                if(!genres[item]?.name) {
                    return
                }
                return (
                    <div className="genre" key={item}>
                        {genres[item]?.name}
                    </div>
                )
            })}
        </div>
    )
}

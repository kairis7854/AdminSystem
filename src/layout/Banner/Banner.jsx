import { useState } from 'react'
import './banner.scss'
import img from '../../assets/react.svg'
export default function Banner() {


    return (
        <div className='banner'>
            <span className='bannerUser'>HEELO {'Admin'}</span>
            <div className='bannerRight'  >
                <span className='bannerRight__time'>{'12:11'} </span>
                <img className='bannerRight__logout' src={img}></img>
            </div>
        </div>
    )
}

import React from 'react'
import Categories  from './Categories'
import SliderHome from './Slide'
import './Home.css'

const Home = () => {
  return (
    <>
        <section className='home'>
            <div className="container d_flex">
                <Categories />
                <SliderHome />
            </div>
        </section>
    </>
  )
}

export default Home

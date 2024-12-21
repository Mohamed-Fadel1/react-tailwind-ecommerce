import React from 'react';
import bgHero from '../../assets/bg_hero.svg';
import imgHero from "../../assets/exclusive_image.png"

const Hero = () => {
  const image = {
    backgroundImage: `url(${bgHero})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center', 
    height: '100vh', 
    width: '100%', 
  };
  return (
    <section style={image}>
      <div className="container flex flex-col md:flex-row py-10 justify-around items-center">
        {/* left section */}
        <div className='pt-10 md:pt-0 space-y-4'>
          <h5 className='font-semibold text-lg uppercase'>___new trend</h5>
          <h1 className=' text-3xl lg:text-5xl py-4 uppercase lg:leading-tight'>autumn sale stylish <br /> <span className='font-bold'>women</span></h1>
          <h6 className='text-lg font-semibold uppercase underline cursor-pointer'>discover more</h6>
        </div>
        {/* img section */}
        <div>
          <div className='w-3/4 m-auto lg:w-full'>
            <img src= {imgHero} alt="imgHero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

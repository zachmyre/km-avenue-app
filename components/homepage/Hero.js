import { useState } from 'react';
import Image from 'next/image'



// const images = [
//   {
//     label: 'Adulting T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/QjPD1H1/adulting.jpg',
//   },
//   { 
//     label: 'Baby T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/80Hv0vp/baby.jpg',
//   },
//   { 
//     label: 'Easter T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/PzqmXC3/behoppy.jpg'
//   },
//   {
//     label: 'Custom Easter T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/n3wV2fn/bighoppa.jpg'
//   },
//   {
//     label: 'Custom Funny T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/r0PQwtM/brokenfilter.jpg'
//   },
//   {
//     label: 'Vinyl T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/nM0jcFM/heart.jpg'
//   },
//   {
//     label: 'Good Vibes T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/G0x1FLG/peachy.jpg'
//   },
//   {
//     label: 'Getting Older T-Shirt by KM Avenue',
//     imgPath: 'https://i.ibb.co/PgQphMV/thirty.jpg'
//   },
// ];

export default function Hero() {
    return (
      <div className="relative bg-white overflow-hidden">
      <main className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Fits for you, </span>
            <span className="block text-kandy-pink xl:inline">a boutique for everyone.</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">KM Avenue is a small, locally supporting business that aims to bring more creativity to apparel. With our sublimation and vinyl techniques, we hope to bring your ideas to life with custom apparel and accessories.</p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-kandy-pink hover:bg-black md:py-4 md:text-lg md:px-10"> Shop Products </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-kandy-pink bg-black hover:bg-kandy-pink hover:text-white md:py-4 md:text-lg md:px-10"> Contact Us </a>
            </div>
          </div>
        </div>
      </main>
  <div className="mt-3 p-5 lg:p-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full" src="https://i.ibb.co/G0x1FLG/peachy.jpg" alt="" />
  </div>
</div>
    );
}


import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Image  from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import heroLogo from '../../public/hero/logo-hero.jpg';

const images = [
  {
    label: 'Adulting T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/QjPD1H1/adulting.jpg',
  },
  { 
    label: 'Baby T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/80Hv0vp/baby.jpg',
  },
  { 
    label: 'Easter T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/PzqmXC3/behoppy.jpg'
  },
  {
    label: 'Custom Easter T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/n3wV2fn/bighoppa.jpg'
  },
  {
    label: 'Custom Funny T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/r0PQwtM/brokenfilter.jpg'
  },
  {
    label: 'Vinyl T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/nM0jcFM/heart.jpg'
  },
  {
    label: 'Good Vibes T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/G0x1FLG/peachy.jpg'
  },
  {
    label: 'Getting Older T-Shirt by KM Avenue',
    imgPath: 'https://i.ibb.co/PgQphMV/thirty.jpg'
  },
];

function Hero() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", backgroundImage: `url('/hero/bg.png')`, backgroundSize: {xs: 'contain', md:'cover'}, backgroundRepeat: 'no-repeat'}}>
          <Box sx={{width: '100%', height: {xs: '30vh', md:'45vh'}, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="h1" sx={{fontSize: {xs: '3.5rem', md: '5rem'}, color:'hotpink', textShadow:'2px black', textAlign: 'center', fontWeight: 'bold', marginRight: {xs: '0', md: '17.5vw'}}}>
            KM Avenue
          </Typography>
          </Box>
        <Carousel
        arrows={false}
        additionalTransfrom={0}
        autoPlay={true}
        autoPlaySpeed={1500}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
          {images.map((image, index) =>(
              <Image
                    key={index}
                    src={image.imgPath}
                    width={250}
                    height={300}
                    layout="responsive"
                    alt={image.label}
            />
          ))}
      </Carousel>
      </Box>
    );
}

export default Hero;

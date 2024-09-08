import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselData';

const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};

const items = mainCarouselData.map(
    item=> <img src={item.image} className='item cursor-pointer' data-value={item} alt={item.path} />
)

const Carousel = () => (
    <AliceCarousel
        items={items}
        controlsStrategy="alternate"
        disableButtonsControls
        autoPlayInterval={1000}
        infinite
        responsive={responsive}
    />
);

export default Carousel;
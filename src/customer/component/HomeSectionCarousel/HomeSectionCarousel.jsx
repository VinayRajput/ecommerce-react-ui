import Carousel from "react-multi-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group absolute w-full flex justify-between">
      <KeyboardArrowLeft className={currentSlide === 0 ? 'absolute disable' : 'cursor-pointer absolute left-0 bg-white rounded-full shadow-lg'} onClick={() => previous()} />
      <button variant="outlined" className="rounded-full cursor-pointer absolute right-0 bg-white w-50 h-50 shadow-lg block" onClick={() => next()} >
        <KeyboardArrowRight  /> 
      </button>
    </div>
  );
}
const HomeSectionCarousel = ({items, title}) => {
  return (
    <div className="relative px-4 px-8">
      {items ? <div className="relative p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <Carousel
          customButtonGroup={<ButtonGroup />}
          responsive={responsive}
          showDots={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemAriaLabel="carousel-item"
          arrows={false}
         >
            {
                items?.map((item) => <HomeSectionCard index={item.id} item={item} />)
            }
        </Carousel>
      </div>:<div className="flex justify-center items-center h-full">Loading...</div>}
    </div>
  );
};

export default HomeSectionCarousel;

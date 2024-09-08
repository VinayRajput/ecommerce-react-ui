import Carousel from '../../component/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../component/HomeSectionCarousel/HomeSectionCarousel'
import { useFetchData } from '../../services/dataFetchService'

const HomePage = () => {
  const { items: shirts, loading: shirtLoading } = useFetchData('/mens/shirt');
  const { items: pants, loading: pantLoading } = useFetchData('/mens/pants');
  const { items: kurta, loading: kurtaLoading } = useFetchData('/mens/kurta');
  
  return (
    <div>
      <Carousel/>
      <div className='flex flex-col gap-4'>
        { !shirtLoading && shirts && <HomeSectionCarousel title='Shirts' items={shirts}/> }
        { !kurtaLoading && kurta && <HomeSectionCarousel title='Kurta' items={kurta}/>}
        { !pantLoading && pants && <HomeSectionCarousel title='Pants' items={pants}/>}
      </div>
    </div>
  )
}

export default HomePage
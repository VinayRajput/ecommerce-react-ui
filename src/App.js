import './App.css';
import Footer from './customer/component/Footer/Footer';
import NavBar from './customer/component/Navigation/NavBar';
import HomePage from './customer/pages/HomePage/HomePage';
import ProductsListing from './customer/pages/ProductsListing/ProductsList';

function App() {
  return (
    <div className="">
       <NavBar />
       <HomePage/>
       <hr/>
       <ProductsListing/>
      <Footer/>

    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Navbar from '../layout/navbar';
import { FaSearch, FaMotorcycle, FaClock, FaUtensils } from 'react-icons/fa';
import { fetchProducts } from '../../api/ProductApi';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);  
      })
      .catch(error => console.error('Failed to fetch products:', error));
  }, []);


  console.log(products)

  const handleSearch = () => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  };

  console.log("filter", filteredProducts);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      <section className="relative bg-red-600 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        <div className="relative container mx-auto py-20 px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Delicious Food,<br />Delivered Fast
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the best local cuisines from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={'/home/products'} className="bg-yellow-400 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg">
              Order Now
            </Link>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for food..." 
                className="py-3 px-6 pr-12 rounded-full text-black w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)} 
              />
              <button onClick={handleSearch}>
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <FeaturedItem 
                  key={product.id} 
                  image={product.image_url} 
                  name={product.name}
                  description={product.description}
                  price={product.price}
                />
              ))
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </section>


     

     

      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Satisfy Your Cravings?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our diverse menu and treat yourself to a delicious meal today.
          </p>
          <Link to={'/home/products'} className="bg-yellow-400 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg">
            Explore Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturedItem = ({ image, name, description, price }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <img src={image} alt={name} className="ml-auto mr-auto w-32 h-32 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-red-600 font-bold text-lg">${price}</span>
        <Link to={'/home/products'} className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
          Add to Cart
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;

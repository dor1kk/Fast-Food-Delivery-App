import React from 'react';
import Navbar from '../layout/navbar';
import { FaSearch, FaMotorcycle, FaClock, FaUtensils } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
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
            <button className="bg-yellow-400 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg">
              Order Now
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for food..." 
                className="py-3 px-6 pr-12 rounded-full w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaMotorcycle className="text-4xl text-red-600" />}
              title="Fast Delivery"
              description="We deliver your food while it's still hot and fresh."
            />
            <FeatureCard 
              icon={<FaUtensils className="text-4xl text-red-600" />}
              title="Quality Food"
              description="We partner with the best local restaurants for top-notch meals."
            />
            <FeatureCard 
              icon={<FaClock className="text-4xl text-red-600" />}
              title="24/7 Service"
              description="Order anytime, day or night. We're always here for you."
            />
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeaturedItem 
              image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              name="Gourmet Burger"
              description="A juicy burger with all your favorite toppings."
              price={9.99}
            />
            <FeaturedItem 
              image="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              name="Pepperoni Pizza"
              description="Classic pizza with generous pepperoni toppings."
              price={12.99}
            />
            <FeaturedItem 
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              name="Healthy Salad"
              description="Fresh greens and veggies for a light meal."
              price={7.99}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Satisfy Your Cravings?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our diverse menu and treat yourself to a delicious meal today.
          </p>
          <button className="bg-yellow-400 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg">
            Explore Menu
          </button>
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
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-red-600 font-bold text-lg">${price.toFixed(2)}</span>
        <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default HomePage;

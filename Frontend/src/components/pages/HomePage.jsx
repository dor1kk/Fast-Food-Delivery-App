import React from 'react';
import Navbar from '../layout/navbar';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      <section className="relative bg-red-600 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://img.pikbest.com/wp/202346/fried-breakfast-illustration-of-classic-american-with-3d-rendered-burgers-and-fries-on-red-background-minimalist-design_9725840.jpg!sw800" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
        <div className="relative container mx-auto py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Fast Food Delivery
          </h1>
          <p className="text-lg mb-6">
            Fresh and delicious meals delivered to your doorsteps, fast and hot.
          </p>
          <button className="bg-yellow-400 text-black py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition">
            Order Now
          </button>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Sample Item */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://img.freepik.com/premium-photo/burger-red-background_832479-2446.jpg" 
                alt="Featured Item" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Delicious Burger</h3>
                <p className="text-gray-600 mb-4">
                  A juicy burger with all your favorite toppings.
                </p>
                <span className="text-red-600 font-bold">$9.99</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://img.freepik.com/premium-photo/burger-red-background_832479-2446.jpg" 
                alt="Featured Item" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Delicious Burger</h3>
                <p className="text-gray-600 mb-4">
                  A juicy burger with all your favorite toppings.
                </p>
                <span className="text-red-600 font-bold">$9.99</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://img.freepik.com/premium-photo/burger-red-background_832479-2446.jpg" 
                alt="Featured Item" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Delicious Burger</h3>
                <p className="text-gray-600 mb-4">
                  A juicy burger with all your favorite toppings.
                </p>
                <span className="text-red-600 font-bold">$9.99</span>
              </div>
            </div>
            
            {/* Repeat similar item blocks for more featured items */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Satisfy Your Hunger?
          </h2>
          <p className="text-lg mb-6">
            Explore our menu and order your favorite meals today.
          </p>
          <button className="bg-yellow-400 text-black py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition">
            Explore Menu
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

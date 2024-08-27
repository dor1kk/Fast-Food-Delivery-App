import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import Orders from '../forms/OrderForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error('Failed to fetch products:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto mt-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="font-semibold border-b-2 border-red-500 text-red-500">Popular</button>
            <button className="font-semibold text-gray-700">Recent</button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Categories</option>
              {/* Add more category options here */}
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-center mb-4 bg-gray-100 rounded-lg p-4">
                <img src={product.image_url} alt={product.name} className="w-32 h-32 object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
              <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                <span className="text-red-600 font-bold">${product.price}</span>
                <span className="line-through ml-2">${product.original_price}</span>
              </div>
              <div className="flex items-center justify-center mt-1 text-gray-500">
                <span>⭐ {product.rating}k</span>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <button className="border border-gray-300 text-gray-700 py-1 px-2 rounded-lg">Wishlist</button>
                <button 
                  onClick={() => openModal(product)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && <Orders product={selectedProduct} onClose={closeModal} />}
      </main>
    </div>
  );
};

export default Products;

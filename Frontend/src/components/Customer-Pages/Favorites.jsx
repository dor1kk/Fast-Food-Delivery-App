import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layout/navbar';

const Favorites = ({ authToken }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/favorites', {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [authToken]);


  console.log("Favorites", favorites)

  const handleRemoveFavorite = async (productId) => {
    try {
      await axios.post(
        '/api/remove-favorite',
        { productId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setFavorites(favorites.filter((item) => item.product_id !== productId));
      alert('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Favorite Products</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-lg">You have no favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.product_id} className="border border-gray-200 p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <button
                onClick={() => handleRemoveFavorite(product.product_id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

import React, { useEffect, useState } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <ul className="list-none pl-0">
        {products.map(product => (
          <li key={product.id} className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-2">
            <img src={product.image_url} alt="Product" className="w-24 h-auto mr-4" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">ID: {product.id}</p>
              <p className="text-gray-700">Price: ${product.price}</p>
            </div>
            <div className="mt-4">
              <button className="text-gray-600 px-4 py-2 rounded hover:bg-gray-200 mr-2">Edit</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;

import axios from "axios";



export const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products');
      if (response.ok) {
        return await response.json(); 
      } else {
        console.error('Failed to fetch products:', await response.text());
        return []; 
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };



  export const AddToFavorite = async (product_id, authToken) => {
    try {
      const response = await axios.post(`http://localhost:8080/products/favorite`, {
        "productId": product_id
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to favorite:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      throw error;
    }
  };
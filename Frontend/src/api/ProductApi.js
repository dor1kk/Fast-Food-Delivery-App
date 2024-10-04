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
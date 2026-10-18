import { useEffect, useState } from "react";
import API from "../services/api";

function NextOrder() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Products load nahi hue:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const lowStockProducts = products.filter(
    (product) => product.stock <= product.minimumStock
  );

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Next Order</h1>
          <p>Products that need to be ordered</p>
        </div>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="product-form">
          <h2>✅ No products need ordering</h2>
          <p>All products have enough stock.</p>
        </div>
      ) : (
        <div className="products-table">
          <div className="table-header">
            <span>Product</span>
            <span>Current Stock</span>
            <span>Minimum</span>
            <span>Unit</span>
            <span>Status</span>
          </div>

          {lowStockProducts.map((product) => (
            <div className="table-row" key={product._id}>
              <strong>{product.name}</strong>

              <span>{product.stock}</span>

              <span>{product.minimumStock}</span>

              <span>{product.unit}</span>

              <span className="status danger">
                ⚠️ Order
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NextOrder;
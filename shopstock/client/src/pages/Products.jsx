import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    minimumStock: "",
    unit: "",
  });

  // MongoDB se products load karo
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

  // MongoDB me product save karo
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        name: newProduct.name,
        category: newProduct.category,
        stock: Number(newProduct.stock),
        minimumStock: Number(newProduct.minimumStock),
        unit: newProduct.unit,
      });

      await fetchProducts();

      setNewProduct({
        name: "",
        category: "",
        stock: "",
        minimumStock: "",
        unit: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Product save nahi hua:", error);
      alert("Product save nahi hua. Backend check karo.");
    }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your shop inventory</p>
        </div>

        <button
          className="primary-btn add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <form className="product-form" onSubmit={addProduct}>
          <h2>Add New Product</h2>

          <input
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                name: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Current stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                stock: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Minimum stock"
            value={newProduct.minimumStock}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                minimumStock: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Unit (packet, bottle, kg...)"
            value={newProduct.unit}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                unit: e.target.value,
              })
            }
            required
          />

          <button className="primary-btn" type="submit">
            Save Product
          </button>
        </form>
      )}

      <div className="products-table">
        <div className="table-header">
          <span>Product</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Minimum</span>
          <span>Status</span>
        </div>

        {products.length === 0 ? (
          <div className="table-row">
            <span>No products yet.</span>
          </div>
        ) : (
          products.map((product) => {
            const isLowStock =
              product.stock <= product.minimumStock;

            return (
              <div className="table-row" key={product._id}>
                <strong>{product.name}</strong>

                <span>{product.category}</span>

                <span>
                  {product.stock} {product.unit}
                </span>

                <span>
                  {product.minimumStock} {product.unit}
                </span>

                {isLowStock ? (
                  <span className="status danger">
                    ⚠️ Order
                  </span>
                ) : (
                  <span className="status good">
                    ✓ Good
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Products;
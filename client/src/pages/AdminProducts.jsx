
import React, { useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct} from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const initialForm = {
    name: "",
    price: "",
    oldPrice: "",
    stock: "",
    image: "",
    description: "",
    brand: "",
    color: "",
    tag: "",
    discount: "",
    sections: "",
    size: ""
  };
  const [form, setForm] = useState(initialForm);
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      stock: product.stock ?? "",
      image: product.image || "",
      description: product.description || "",
      brand: product.brand || "",
      color: product.color || "",
      tag: product.tag || "",
      discount: product.discount || "",
      sections: product.sections?.join(", ") || "",
      size: product.size?.join(", ") || ""
    });
    setShowForm(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      setMessage("Failed to delete product.");
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...form,
        id: editingId !== null ? editingId : Date.now(),
        price: Number(form.price),
        oldPrice: form.oldPrice
          ? Number(form.oldPrice)
          : undefined,
        stock: Number(form.stock),
        sections: form.sections
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),
        size: form.size
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)
      };
      if (editingId !== null) {
        await updateProduct(editingId, productData);
        setMessage("Product updated successfully!");
      } else {
        await createProduct(productData);
        setMessage("Product added successfully!");
      }
      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error("Product save error:", error);
      setMessage(
        error.response?.data?.message ||
        "Unable to save product."
      );
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Aurevia Product Management</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Products</h5>
            <h2>{products.length}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Low Stock Products</h5>
            <h2 className="text-warning">
              {products.filter(
                product => product.stock > 0 && product.stock < 5
              ).length}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Out of Stock Products</h5>
            <h2 className="text-danger">
              {products.filter(
                product => product.stock === 0
              ).length}
            </h2>
          </div>
        </div>
      </div>
      <button
        className="btn btn-dark mb-4"
        onClick={() => {
          if (showForm) {
            resetForm();
          } else {
            setEditingId(null);
            setForm(initialForm);
            setMessage("");
            setShowForm(true);
          }
        }}
      >
        {showForm ? "Close Form" : "Add New Product"}
      </button>
      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}
      {showForm && (
        <div className="card shadow-sm p-4 mb-4">
          <h4 className="mb-3">
            {editingId !== null
              ? "Edit Product"
              : "Add New Product"}
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                ["name", "Product Name"],
                ["brand", "Brand"],
                ["price", "Price"],
                ["oldPrice", "Old Price"],
                ["stock", "Stock"],
                ["image", "Image URL"],
                ["color", "Colour"],
                ["tag", "Tag"],
                ["discount", "Discount"],
                ["sections", "Sections (comma separated)"],
                ["size", "Sizes (comma separated)"]
              ].map(([name, label]) => (
                <div className="col-md-6 mb-3" key={name}>
                  <label className="form-label">
                    {label}
                  </label>
                  <input
                    type={
                      ["price", "oldPrice", "stock"].includes(name)
                        ? "number"
                        : "text"
                    }
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="form-control"
                    required={[
                      "name",
                      "price",
                      "stock",
                      "image",
                      "sections"
                    ].includes(name)}
                    min={
                      ["price", "oldPrice", "stock"].includes(name)
                        ? "0"
                        : undefined
                    }
                  />
                </div>
              ))}
              <div className="col-12 mb-3">
                <label className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-success me-2"
            >
              {editingId !== null
                ? "Update Product"
                : "Save Product"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <h4 className="mb-3">Product List</h4>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Sections</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id || product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover"
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>
                    {product.sections?.join(", ") || "-"}
                  </td>
                  <td>₹{product.price}</td>
                  <td>
                    {product.stock === 0 ? (
                      <span className="badge bg-danger">
                        Out of Stock
                      </span>
                    ) : product.stock < 5 ? (
                      <span className="badge bg-warning text-dark">
                        Low Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        {product.stock} Available
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;

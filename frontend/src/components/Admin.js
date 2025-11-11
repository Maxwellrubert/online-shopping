import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', categoryName: '', price: '', stock: '' });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('http://localhost:8080/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch('http://localhost:8080/api/categories');
      if (res.ok) setCategories(await res.json());
    } catch (e) {
      // ignore
    }
  }

  const handleAddClick = () => {
    setCurrentProduct({ id: null, name: '', categoryName: '', price: '', stock: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditClick = (p) => {
    setCurrentProduct(p);
    setEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    try {
      const url = editMode ? `http://localhost:8080/api/products/${currentProduct.id}` : 'http://localhost:8080/api/products';
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: currentProduct.name,
          categoryName: currentProduct.categoryName,
          price: parseFloat(currentProduct.price) || 0,
          stock: parseInt(currentProduct.stock, 10) || 0
        })
      });
      if (!res.ok) throw new Error('save failed');
      await fetchProducts();
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      await fetchProducts();
    } catch (e) {
      alert(e.message || 'Error');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="container"><div className="error">{error}</div></div>;

  return (
    <div className="admin-wrapper">
      <nav className="admin-navbar">
        <div className="navbar-brand"><h2 className="brand-title">Admin Panel</h2></div>
        <div className="navbar-menu">
          <a href="/dashboard" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="nav-link">Dashboard</a>
          <a href="/sellers" onClick={(e) => { e.preventDefault(); navigate('/sellers'); }} className="nav-link nav-link-sellers">Sellers</a>
          <a href="/logout" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="nav-link nav-link-logout">Logout</a>
        </div>
      </nav>

      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Product Management</h1>
            <p className="admin-subtitle">Manage your product inventory</p>
          </div>
          <button className="btn-add-product" onClick={handleAddClick}>Add New Product</button>
        </div>

        <div className="products-table-card">
          <div className="table-header">
            <h2 className="table-title">All Products</h2>
            <p className="table-count">Total: <strong>{products.length}</strong> products</p>
          </div>

          {products.length > 0 ? (
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.categoryName}</td>
                      <td>₹{p.price?.toLocaleString?.()}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className="btn-action btn-edit" onClick={() => handleEditClick(p)}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">No products found. Add your first product!</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editMode ? 'Edit Product' : 'Add Product'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleSave}>
              <div className="form-group-modern">
                <label className="form-label-modern">Product Name</label>
                <input className="form-input-modern" name="name" value={currentProduct.name} onChange={handleInputChange} />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">Category</label>
                <select className="form-select-modern" name="categoryName" value={currentProduct.categoryName} onChange={handleInputChange}>
                  <option value="">-- Select Category --</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group-modern">
                  <label className="form-label-modern">Price</label>
                  <input className="form-input-modern" name="price" type="number" value={currentProduct.price} onChange={handleInputChange} />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">Stock</label>
                  <input className="form-input-modern" name="stock" type="number" value={currentProduct.stock} onChange={handleInputChange} />
                </div>
              </div>

              <div className="modal-actions-modern">
                <button type="submit" className="btn-modal btn-save">{editMode ? 'Update Product' : 'Save Product'}</button>
                <button type="button" className="btn-modal btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

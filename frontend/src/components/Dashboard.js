import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    categoryName: '',
    price: '',
    stock: ''
  });

  const navigate = useNavigate();

  const getProductImage = (product) => {
    if (product.imageUrl) {
      return product.imageUrl;
    }

    const categoryImages = {
      Electronics: [
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1511385348-c1122a2b7f75?w=400&h=300&fit=crop'
      ],
      Mobiles: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1592286927505-ed6f8b3b2f80?w=400&h=300&fit=crop'
      ],
      Food: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
      ],
      Fashion: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop'
      ],
      Books: [
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      ],
      Stationery: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583485088034-697b5bc54ccc?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop'
      ],
      'Home & Garden': [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1615875221249-4e1c4c4c5901?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop'
      ]
    };

    const images = categoryImages[product.categoryName] || [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    ];

    const imageIndex = (product.id - 1) % images.length;
    return images[imageIndex];
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, categoriesResponse] = await Promise.all([
        fetch('http://localhost:8080/api/dashboard/stats'),
        fetch('http://localhost:8080/api/categories')
      ]);

      if (!statsResponse.ok || !categoriesResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const statsData = await statsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setStats(statsData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data. Make sure backend is running.');
      setLoading(false);
      console.error('Dashboard error:', err);
    }
  };

  const handleAddClick = () => {
    setCurrentProduct({ id: null, name: '', categoryName: '', price: '', stock: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete');
      fetchProducts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2 className="brand-title">Shopping Portal</h2>
        </div>
        <div className="navbar-menu">
          <a
            href="/admin"
            onClick={(e) => { e.preventDefault(); navigate('/admin'); }}
            className="nav-link nav-link-admin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m9.22-9.22l-4.24 4.24m-5.96 0L6.78 9.78M1 12h6m6 0h6M3.78 3.78l4.24 4.24m5.96 5.96l4.24 4.24"></path>
            </svg>
            Admin Panel
          </a>
          <a
            href="/sellers"
            onClick={(e) => { e.preventDefault(); navigate('/sellers'); }}
            className="nav-link nav-link-sellers"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            Sellers
          </a>
          <a
            href="/logout"
            onClick={(e) => { e.preventDefault(); handleLogout(); }}
            className="nav-link nav-link-logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </a>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard Overview
          </h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store.</p>
        </div>

        <div className="stats-grid-modern">
          <div className="stat-card-modern stat-card-blue">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Total Products</h3>
              <div className="stat-value">{stats?.totalProducts || 0}</div>
            </div>
          </div>

          <div className="stat-card-modern stat-card-green">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Categories</h3>
              <div className="stat-value">{stats?.totalCategories || 0}</div>
            </div>
          </div>

          <div className="stat-card-modern stat-card-purple">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Inventory Value</h3>
              <div className="stat-value">₹{stats?.totalInventoryValue?.toLocaleString() || 0}</div>
            </div>
          </div>

          <div className="stat-card-modern stat-card-orange">
            <div className="stat-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Items in Stock</h3>
              <div className="stat-value">{stats?.totalStock || 0}</div>
            </div>
          </div>
        </div>

        <div className="categories-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              Product Categories
            </h2>
          </div>
          {categories.length > 0 ? (
            <div className="categories-grid">
              {categories.map((category) => (
                <div key={category.id} className="category-badge">
                  <span className="category-dot"></span>
                  {category.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No categories found.</p>
          )}
        </div>

        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              Products Available
            </h2>
            <p className="product-count">Total: <strong>{products.length}</strong> items</p>
          </div>

          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/4CAF50/ffffff?text=Product'; }}
                    />
                    <div className={`stock-badge ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="product-details">
                    <span className="category-tag">{product.categoryName}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-info">
                      <div className="product-price">₹{product.price.toLocaleString()}</div>
                      <div className="product-stock">{product.stock} units</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="empty-icon-svg">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <p>No products found.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

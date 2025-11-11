import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Sellers({ onLogout }) {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSeller, setCurrentSeller] = useState({
    id: null,
    name: '',
    address: '',
    email: '',
    password: '',
    phone: '',
    statusId: ''
  });

  const navigate = useNavigate();

  const fetchSellers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sellers');
      if (!response.ok) {
        throw new Error('Failed to fetch sellers');
      }
      const data = await response.json();
      setSellers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sellers:', error);
      alert('Failed to load sellers. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleAddClick = () => {
    setCurrentSeller({
      id: null,
      name: '',
      address: '',
      email: '',
      password: '',
      phone: '',
      statusId: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditClick = (seller) => {
    setCurrentSeller(seller);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (!currentSeller.name || !currentSeller.email || !currentSeller.password) {
        alert('Please fill in all required fields (Name, Email, Password)');
        return;
      }

      const url = editMode
        ? `http://localhost:8080/api/sellers/${currentSeller.id}`
        : 'http://localhost:8080/api/sellers';

      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentSeller),
      });

      if (!response.ok) {
        throw new Error('Failed to save seller');
      }

      setShowModal(false);
      fetchSellers();
      alert(editMode ? 'Seller updated successfully!' : 'Seller created successfully!');
    } catch (error) {
      console.error('Error saving seller:', error);
      alert('Failed to save seller. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this seller?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/sellers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete seller');
      }

      fetchSellers();
      alert('Seller deleted successfully!');
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert('Failed to delete seller. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSeller({
      ...currentSeller,
      [name]: value
    });
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading sellers...</div>;
  }

  return (
    <div className="admin-wrapper">
      <nav className="admin-navbar">
        <div className="navbar-brand">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <h2 className="brand-title">Seller Management</h2>
        </div>
        <div className="navbar-menu">
          <a 
            href="/dashboard" 
            onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
            className="nav-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </a>
          <a 
            href="/admin" 
            onClick={(e) => { e.preventDefault(); navigate('/admin'); }}
            className="nav-link nav-link-admin"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Products
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

      {/* ========== MAIN CONTENT ========== */}
      <div className="admin-container">
        {/* Page Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
              </svg>
              Manage Sellers
            </h1>
            <p className="admin-subtitle">Add, edit, or remove seller information</p>
          </div>
          <button onClick={handleAddClick} className="btn-add-product">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Seller
          </button>
        </div>

        {/* Sellers Table */}
        <div className="products-table-card">
          <div className="table-header">
            <h2 className="table-title">All Sellers</h2>
            <span className="table-count">Total: {sellers.length}</span>
          </div>

          <div className="table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>
                      <span className="id-badge">#{seller.id}</span>
                    </td>
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>{seller.phone || 'N/A'}</td>
                    <td>{seller.address || 'N/A'}</td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          onClick={() => handleEditClick(seller)}
                          className="btn-action btn-edit"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(seller.id)}
                          className="btn-action btn-delete"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========== MODAL FORM (Add/Edit Seller) ========== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content-modern" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {editMode ? (
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  ) : (
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                  )}
                </svg>
                {editMode ? 'Edit Seller' : 'Add New Seller'}
              </h2>
              <button onClick={() => setShowModal(false)} className="modal-close">
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              {/* Seller Name */}
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                  </svg>
                  Seller Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input-modern"
                  placeholder="Enter seller name"
                  value={currentSeller.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input-modern"
                  placeholder="seller@example.com"
                  value={currentSeller.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-group-modern">
                <label className="form-label-modern">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-input-modern"
                  placeholder="Enter password"
                  value={currentSeller.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone and Address Row */}
              <div className="form-row">
                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-input-modern"
                    placeholder="1234567890"
                    value={currentSeller.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-input-modern"
                    placeholder="Enter address"
                    value={currentSeller.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="modal-actions-modern">
                <button type="submit" className="btn-modal btn-save">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {editMode ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="btn-modal btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sellers;


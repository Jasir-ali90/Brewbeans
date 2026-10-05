import React, { useState } from 'react';
import { 
  CheckIcon, 
  PlusIcon, 
  XIcon, 
  SearchIcon, 
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon
} from '../components/Icons';

export default function AdminPage({ 
  orders, 
  onUpdateOrderStatus, 
  onDeleteOrder,
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  reviews,
  onDeleteReview,
  onNavigate
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'bookings' | 'menu' | 'reviews'

  // Orders Filter & Search
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Menu Modal State
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    category: 'hot',
    price: '',
    tag: '',
    description: '',
    image: '/images/real/real_img_3.jpg',
    isPopular: false,
    inStock: true,
  });

  // Real Image Presets for easy selection in Admin
  const realImagePresets = [
    { label: 'Tiramisu Brew Frappe', path: '/images/real/real_img_3.jpg' },
    { label: 'Iced Spanish Latte', path: '/images/real/real_img_4.jpg' },
    { label: 'Roasted Hazelnut Frappe', path: '/images/real/real_img_5.jpg' },
    { label: 'Iced French Vanilla', path: '/images/real/real_img_6.jpg' },
    { label: 'Fresh Chill Mocha', path: '/images/real/real_img_7.jpg' },
    { label: 'Tiramisu Iced Delight', path: '/images/real/real_img_8.jpg' },
    { label: 'Golden Beans Latte', path: '/images/real/real_img_9.jpg' },
    { label: 'Cloud Flat White', path: '/images/real/real_img_10.jpg' },
    { label: 'Hot Spanish Latte', path: '/images/real/real_img_11.jpg' },
    { label: 'Caramel Latte', path: '/images/real/real_img_12.jpg' },
    { label: 'Double Espresso', path: '/images/real/real_img_13.jpg' },
    { label: 'Caramel Rush Brew', path: '/images/real/real_img_14.jpg' },
    { label: 'Strawberry Bliss', path: '/images/real/real_img_16.jpg' },
    { label: 'Pistachio Cocoa Crush', path: '/images/real/real_img_17.jpg' },
    { label: 'Lotus Biscoff Cheesecake', path: '/images/real/real_img_18.jpg' },
    { label: 'Warm Nutella Brownie', path: '/images/real/real_img_19.jpg' },
    { label: 'Chocolate Chip Cookie', path: '/images/real/real_img_20.jpg' },
    { label: 'Classic Tiramisu Cup', path: '/images/real/real_img_21.jpg' },
    { label: 'Signature Beans 250g', path: '/images/real/real_img_22.jpg' },
    { label: 'Ethiopian Single Origin', path: '/images/real/real_img_23.jpg' },
  ];

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && (password === 'brewbeans123' || password === 'admin')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Default is admin / brewbeans123');
    }
  };

  const handleDemoLogin = () => {
    setUsername('admin');
    setPassword('brewbeans123');
    setIsAuthenticated(true);
  };

  // Open Add Item Modal
  const openAddItemModal = () => {
    setEditingItem(null);
    setItemForm({
      name: '',
      category: 'hot',
      price: '',
      tag: '',
      description: '',
      image: '/images/real/real_img_3.jpg',
      isPopular: false,
      inStock: true,
    });
    setShowItemModal(true);
  };

  // Open Edit Item Modal
  const openEditItemModal = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      price: item.price,
      tag: item.tag || '',
      description: item.description || '',
      image: item.image,
      isPopular: item.isPopular || false,
      inStock: item.inStock !== false,
    });
    setShowItemModal(true);
  };

  // Save Item (Add or Update)
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!itemForm.name || !itemForm.price) {
      alert('Please fill in Item Name and Price.');
      return;
    }

    if (editingItem) {
      // Update
      onUpdateMenuItem({
        ...editingItem,
        ...itemForm,
        price: Number(itemForm.price),
      });
    } else {
      // Create New
      const newItem = {
        id: `item-${Date.now()}`,
        ...itemForm,
        price: Number(itemForm.price),
      };
      onAddMenuItem(newItem);
    }
    setShowItemModal(false);
  };

  // Financial Stats
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const activeOrdersCount = orders.filter(o => o.orderStatus === 'Received' || o.orderStatus === 'Brewing' || o.orderStatus === 'Out for Delivery').length;
  const totalOrdersCount = orders.length;
  const totalBookingsCount = bookings.length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchStatus = orderFilter === 'all' || o.orderStatus.toLowerCase() === orderFilter.toLowerCase();
    const q = orderSearch.toLowerCase().trim();
    const matchSearch = !q || 
      o.id.toLowerCase().includes(q) || 
      o.customerName.toLowerCase().includes(q) || 
      o.phone.includes(q) ||
      o.address.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // If Not Authenticated -> Show Login View
  if (!isAuthenticated) {
    return (
      <div className="page-wrapper admin-login-view">
        <div className="section-container">
          <div className="admin-login-card">
            <div className="login-logo-wrap">
              <img src="/images/brewbeans_logo.jpg" alt="Brewbeans Logo" className="login-logo-img" />
            </div>
            <h2>Brewbeans Admin Portal</h2>
            <p>Access store management, live orders, payments, reservations & menu catalog.</p>

            {loginError && <div className="login-error-alert">{loginError}</div>}

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label>Admin Username</label>
                <input 
                  type="text" 
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn-admin-login">
                <span>Sign In to Dashboard</span>
                <ArrowRightIcon size={16} />
              </button>

              <button 
                type="button" 
                className="btn-demo-quick-login"
                onClick={handleDemoLogin}
              >
                ⚡ Quick Demo Login (admin / brewbeans123)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper admin-dashboard-view">
      {/* Admin Top Navigation */}
      <div className="admin-header-strip">
        <div className="section-container admin-header-content">
          <div className="admin-brand">
            <img src="/images/brewbeans_logo.jpg" alt="Logo" className="admin-tiny-logo" />
            <div>
              <h3>Brewbeans Management Portal</h3>
              <span className="admin-status-badge">🟢 Connected • Karachi Live Store</span>
            </div>
          </div>

          <div className="admin-top-controls">
            <button className="btn-exit-admin" onClick={() => onNavigate('home')}>
              ← Public Site
            </button>
            <button className="btn-logout" onClick={() => setIsAuthenticated(false)}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs-nav-bar">
        <div className="section-container admin-tabs-container">
          <button 
            className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span>📊 Overview</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span>📦 Orders ({activeOrdersCount} Active)</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span>📅 Table Reservations ({totalBookingsCount})</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <span>☕ Menu Catalog ({menuItems.length})</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span>⭐ Reviews ({reviews.length})</span>
          </button>
        </div>
      </div>

      {/* Admin Main Body */}
      <div className="section-container admin-main-content">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-tab">
            <div className="kpi-cards-grid">
              <div className="kpi-card gold">
                <span className="kpi-lbl">Total Sales (PKR)</span>
                <span className="kpi-val">Rs. {totalRevenue.toLocaleString()}</span>
                <span className="kpi-sub">From website orders & direct payments</span>
              </div>

              <div className="kpi-card blue">
                <span className="kpi-lbl">Active Deliveries</span>
                <span className="kpi-val">{activeOrdersCount}</span>
                <span className="kpi-sub">Orders currently brewing or en route</span>
              </div>

              <div className="kpi-card purple">
                <span className="kpi-lbl">Total Orders Count</span>
                <span className="kpi-val">{totalOrdersCount}</span>
                <span className="kpi-sub">All-time website orders</span>
              </div>

              <div className="kpi-card green">
                <span className="kpi-lbl">Table Reservations</span>
                <span className="kpi-val">{totalBookingsCount}</span>
                <span className="kpi-sub">Upcoming guest bookings</span>
              </div>
            </div>

            {/* Quick Recent Orders */}
            <div className="admin-section-box mt-30">
              <div className="box-header-row">
                <h4>Recent Customer Orders</h4>
                <button className="btn-link-action" onClick={() => setActiveTab('orders')}>
                  View All Orders →
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id}>
                        <td><strong>#{o.id}</strong></td>
                        <td>{o.customerName}</td>
                        <td>{o.phone}</td>
                        <td>{o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
                        <td><strong>Rs. {o.total}</strong></td>
                        <td>
                          <span className={`payment-pill ${o.paymentMethod.toLowerCase()}`}>
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill ${o.orderStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="admin-orders-tab">
            <div className="orders-control-bar">
              <div className="search-order-wrap">
                <SearchIcon size={16} />
                <input 
                  type="text" 
                  placeholder="Search by Order ID, Name, Phone, or Karachi Address..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="order-filter-pills">
                {['all', 'Received', 'Brewing', 'Out for Delivery', 'Delivered'].map(st => (
                  <button
                    key={st}
                    className={`filter-pill ${orderFilter === st ? 'active' : ''}`}
                    onClick={() => setOrderFilter(st)}
                  >
                    {st === 'all' ? 'All Orders' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="orders-cards-list">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="admin-order-card">
                    {/* Executive Order Header */}
                    <div className="order-card-header">
                      <div className="order-header-identity">
                        <div className="order-code-row">
                          <span className="order-tag-label">ORDER</span>
                          <span className="order-code-val">#{order.id}</span>
                        </div>
                        <div className="order-sub-meta">
                          <span className="order-time-text">
                            <ClockIcon size={13} className="meta-icon-gold" />
                            {order.placedAt}
                          </span>
                          <span className="order-fulfillment-tag">
                            {order.deliveryType === 'pickup' ? '🛍️ Takeaway' : '🛵 Doorstep Delivery'}
                          </span>
                        </div>
                      </div>

                      <div className="order-header-badges">
                        <span className={`payment-pill-badge ${order.paymentMethod.toLowerCase()}`}>
                          {order.paymentMethod === 'COD' ? '💵 Cash on Delivery' : '💳 Online Paid'}
                        </span>
                        <span className={`status-pill-badge ${order.orderStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                          <span className="status-indicator-dot"></span>
                          <span>{order.orderStatus}</span>
                        </span>
                      </div>
                    </div>

                    <div className="order-body-grid">
                      {/* Customer Info Column */}
                      <div className="order-info-col">
                        <h5 className="section-col-title">Customer & Delivery Info</h5>
                        <div className="admin-info-item">
                          <span className="info-key">Name:</span>
                          <span className="info-val strong">{order.customerName}</span>
                        </div>
                        <div className="admin-info-item">
                          <span className="info-key">Phone:</span>
                          <a href={`tel:${order.phone}`} className="info-phone-link">
                            📞 {order.phone}
                          </a>
                        </div>
                        <div className="admin-info-item address-item">
                          <span className="info-key">Address:</span>
                          <span className="info-val address-text">
                            <MapPinIcon size={14} className="pin-icon" />
                            {order.address}
                          </span>
                        </div>
                        {order.notes && (
                          <div className="admin-order-note-alert">
                            <strong>Special Note:</strong> {order.notes}
                          </div>
                        )}
                        <div className="admin-info-item payment-status-row">
                          <span className="info-key">Payment:</span>
                          <span className={`payment-status-highlight ${order.paymentMethod === 'COD' ? 'cod-pending' : 'online-settled'}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Items List Column */}
                      <div className="order-items-col">
                        <h5 className="section-col-title">Ordered Coffee & Bakery Items</h5>
                        <ul className="admin-item-list">
                          {order.items.map((it, idx) => (
                            <li key={idx}>
                              <span className="item-name-tag">
                                <span className="qty-chip">x{it.quantity}</span>
                                {it.name}
                              </span>
                              <span className="item-price-val">Rs. {it.price * it.quantity}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="order-pricing-summary">
                          <div className="summary-line">
                            <span>Subtotal</span>
                            <span>Rs. {order.subtotal}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="summary-line discount">
                              <span>Sunday Deal (40% OFF)</span>
                              <span>-Rs. {order.discount}</span>
                            </div>
                          )}
                          <div className="summary-line">
                            <span>Delivery Fee</span>
                            <span>{order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}</span>
                          </div>
                          <div className="order-grand-total">
                            <span>Grand Total:</span>
                            <strong className="grand-total-amount">Rs. {order.total}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Update Actions */}
                    <div className="order-card-actions">
                      <span className="action-label">Update Status:</span>
                      <div className="order-status-btns-group">
                        <button 
                          className={`status-btn ${order.orderStatus === 'Received' ? 'active' : ''}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Received')}
                        >
                          Received
                        </button>
                        <button 
                          className={`status-btn ${order.orderStatus === 'Brewing' ? 'active' : ''}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Brewing')}
                        >
                          ☕ Brewing
                        </button>
                        <button 
                          className={`status-btn ${order.orderStatus === 'Out for Delivery' ? 'active' : ''}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Out for Delivery')}
                        >
                          🛵 Out for Delivery
                        </button>
                        <button 
                          className={`status-btn ${order.orderStatus === 'Delivered' ? 'active' : ''}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'Delivered')}
                        >
                          ✨ Delivered
                        </button>
                      </div>

                      <button 
                        className="btn-delete-order"
                        onClick={() => {
                          if (window.confirm(`Delete Order #${order.id}?`)) {
                            onDeleteOrder(order.id);
                          }
                        }}
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="admin-empty-state">
                  <p>No orders matching the current filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TABLE RESERVATIONS */}
        {activeTab === 'bookings' && (
          <div className="admin-bookings-tab">
            <div className="box-header-row mb-20">
              <h4>Guest Table Reservations ({bookings.length})</h4>
              <p>Real-time seating requests for ground floor and 2nd floor loft.</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Guest Name</th>
                    <th>Phone</th>
                    <th>Date & Time</th>
                    <th>Party Size</th>
                    <th>Seating Preference</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td><strong>{b.id}</strong></td>
                      <td>{b.name}</td>
                      <td><a href={`tel:${b.phone}`}>{b.phone}</a></td>
                      <td>{b.date} • {b.time}</td>
                      <td>{b.guests}</td>
                      <td>{b.seating}</td>
                      <td>{b.notes || '—'}</td>
                      <td>
                        <span className={`status-pill ${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          {b.status !== 'Confirmed' && (
                            <button 
                              className="btn-action-small confirm"
                              onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== 'Seated' && (
                            <button 
                              className="btn-action-small seated"
                              onClick={() => onUpdateBookingStatus(b.id, 'Seated')}
                            >
                              Seated
                            </button>
                          )}
                          <button 
                            className="btn-action-small delete"
                            onClick={() => {
                              if (window.confirm('Delete this reservation?')) {
                                onDeleteBooking(b.id);
                              }
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MENU CATALOG MANAGEMENT (FULL CRUD) */}
        {activeTab === 'menu' && (
          <div className="admin-menu-tab">
            <div className="box-header-row mb-20">
              <div>
                <h4>Menu Items & Pricing Catalog ({menuItems.length} Total)</h4>
                <p>Add new coffees, edit prices, update descriptions, and manage stock.</p>
              </div>

              <button className="btn-add-menu-item-top" onClick={openAddItemModal}>
                <PlusIcon size={16} />
                <span>+ Add New Menu Item</span>
              </button>
            </div>

            <div className="admin-menu-grid">
              {menuItems.map(item => (
                <div key={item.id} className="admin-menu-item-card">
                  <div className="item-thumb-frame">
                    <img src={item.image} alt={item.name} className="item-thumb-img" />
                    <span className="category-tag">{item.category}</span>
                  </div>

                  <div className="item-meta-content">
                    <div className="meta-top">
                      <h5>{item.name}</h5>
                      <span className="price-tag">Rs. {item.price}</span>
                    </div>

                    <p className="item-desc-snippet">{item.description}</p>

                    <div className="item-stock-toggle-row">
                      <span className={`stock-status ${item.inStock !== false ? 'in' : 'out'}`}>
                        {item.inStock !== false ? '● In Stock' : '○ Out of Stock'}
                      </span>
                    </div>

                    <div className="item-card-actions-row">
                      <button 
                        className="btn-edit-item"
                        onClick={() => openEditItemModal(item)}
                      >
                        Edit
                      </button>

                      <button 
                        className="btn-delete-item"
                        onClick={() => {
                          if (window.confirm(`Delete "${item.name}" from menu?`)) {
                            onDeleteMenuItem(item.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="admin-reviews-tab">
            <div className="box-header-row mb-20">
              <h4>Customer Community Reviews ({reviews.length})</h4>
              <p>Moderate user reviews submitted through the website.</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Rating</th>
                    <th>Review Content</th>
                    <th>Source</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(r => (
                    <tr key={r.id}>
                      <td><strong>{r.author}</strong></td>
                      <td>⭐ {r.rating} / 5</td>
                      <td>{r.comment}</td>
                      <td>{r.source}</td>
                      <td>{r.date}</td>
                      <td>
                        <button 
                          className="btn-action-small delete"
                          onClick={() => {
                            if (window.confirm('Delete this review?')) {
                              onDeleteReview(r.id);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT ITEM MODAL */}
      {showItemModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Coffee / Menu Item' : 'Add New Coffee / Menu Item'}</h3>
              <button className="btn-close-modal" onClick={() => setShowItemModal(false)}>
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="admin-item-form">
              <div className="form-group">
                <label>Item Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Vanilla Cream Cold Brew"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-grid-two">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="hot">Hot Specialty Coffee</option>
                    <option value="iced">Iced & Cold Brews</option>
                    <option value="frappe">Frappes & Coolers</option>
                    <option value="desserts">Bakery & Desserts</option>
                    <option value="beans">Whole Roasted Beans</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price in PKR (Rs.) *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 580"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Badge / Tag (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bestseller, Viral Craze, New Launch"
                  value={itemForm.tag}
                  onChange={(e) => setItemForm({ ...itemForm, tag: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows={2}
                  placeholder="Describe ingredients, tasting notes, and preparation..."
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Select Authentic Real Image Preset</label>
                <select
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                  className="form-input"
                >
                  {realImagePresets.map((preset, idx) => (
                    <option key={idx} value={preset.path}>
                      {preset.label} ({preset.path})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Or Enter Custom Image URL / Path</label>
                <input 
                  type="text" 
                  placeholder="/images/real/real_img_X.jpg or https://..."
                  value={itemForm.image}
                  onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-checkboxes">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={itemForm.isPopular}
                    onChange={(e) => setItemForm({ ...itemForm, isPopular: e.target.checked })}
                  />
                  <span>Mark as Bestseller / Featured on Home Page</span>
                </label>

                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={itemForm.inStock}
                    onChange={(e) => setItemForm({ ...itemForm, inStock: e.target.checked })}
                  />
                  <span>Currently In Stock</span>
                </label>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setShowItemModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save-item">
                  <CheckIcon size={16} />
                  <span>{editingItem ? 'Save Changes' : 'Add Item to Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

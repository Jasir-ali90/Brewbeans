import React, { useState } from 'react';
import { 
  CheckIcon, 
  PlusIcon, 
  XIcon, 
  SearchIcon, 
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  CopyIcon,
  TrashIcon
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
  vouchers = [],
  onAddVoucher,
  onBulkAddVouchers,
  onDeleteVoucher,
  onToggleVoucher,
  onNavigate
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'bookings' | 'menu' | 'reviews' | 'vouchers'

  // Orders Filter & Search
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Voucher Management States
  const [voucherFilter, setVoucherFilter] = useState('all'); // 'all' | 'active' | 'expired'
  const [voucherSearch, setVoucherSearch] = useState('');
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  const getDefaultExpiry = (days = 7) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(23, 59, 0, 0);
    return d.toISOString().slice(0, 16);
  };

  const [voucherForm, setVoucherForm] = useState({
    code: '',
    title: '',
    discountType: 'percentage', // 'percentage' | 'fixed'
    discountValue: 20,
    appliesTo: 'all', // 'all' | 'drinks' | 'food'
    minOrder: 0,
    expiryDate: getDefaultExpiry(7),
    usageLimit: '',
    description: '',
    isActive: true
  });

  const [bulkForm, setBulkForm] = useState({
    count: 5,
    prefix: 'VIP',
    title: 'VIP Promo Pass',
    discountType: 'percentage',
    discountValue: 25,
    appliesTo: 'all',
    minOrder: 0,
    expiryDays: 14,
    usageLimit: 1
  });

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

  // Voucher Helpers & Filtered List
  const getVoucherStatus = (v) => {
    if (!v.isActive) {
      return { status: 'paused', label: '⏸️ Paused', className: 'status-tag-paused' };
    }
    if (v.expiryDate) {
      const exp = new Date(v.expiryDate).getTime();
      const now = Date.now();
      if (now > exp) {
        return { status: 'expired', label: '🔴 Expired (Blocked)', className: 'status-tag-expired' };
      }
      const diffMs = exp - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const countdown = diffDays > 0 ? `${diffDays}d ${diffHours}h remaining` : `${diffHours}h remaining`;
      return { status: 'active', label: `🟢 Valid (${countdown})`, className: 'status-tag-active' };
    }
    return { status: 'active', label: '🟢 Active (No Expiry)', className: 'status-tag-active' };
  };

  const handleCopyCode = (code) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGenerateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setVoucherForm(prev => ({ ...prev, code: `BB-${rand}` }));
  };

  const handleSetExpiryPreset = (hoursOrDays, type = 'days') => {
    const d = new Date();
    if (type === 'hours') {
      d.setHours(d.getHours() + hoursOrDays);
    } else {
      d.setDate(d.getDate() + hoursOrDays);
      d.setHours(23, 59, 0, 0);
    }
    setVoucherForm(prev => ({ ...prev, expiryDate: d.toISOString().slice(0, 16) }));
  };

  const handleCreateVoucherSubmit = (e) => {
    e.preventDefault();
    if (!voucherForm.code.trim()) {
      alert('Please enter a voucher code.');
      return;
    }
    const cleanCode = voucherForm.code.trim().toUpperCase();
    const newVoucher = {
      id: `VCH-${Date.now().toString(36).toUpperCase()}`,
      code: cleanCode,
      title: voucherForm.title.trim() || `${voucherForm.discountValue}${voucherForm.discountType === 'percentage' ? '%' : ' Rs'} Off`,
      discountType: voucherForm.discountType,
      discountValue: Number(voucherForm.discountValue) || 0,
      appliesTo: voucherForm.appliesTo,
      minOrder: Number(voucherForm.minOrder) || 0,
      expiryDate: voucherForm.expiryDate,
      usageLimit: voucherForm.usageLimit ? Number(voucherForm.usageLimit) : null,
      usedCount: 0,
      isActive: voucherForm.isActive !== false,
      description: voucherForm.description || `${voucherForm.discountValue}${voucherForm.discountType === 'percentage' ? '%' : ' Rs'} discount on ${voucherForm.appliesTo} items`
    };
    onAddVoucher(newVoucher);
    setShowVoucherModal(false);
    setVoucherForm({
      code: '',
      title: '',
      discountType: 'percentage',
      discountValue: 20,
      appliesTo: 'all',
      minOrder: 0,
      expiryDate: getDefaultExpiry(7),
      usageLimit: '',
      description: '',
      isActive: true
    });
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    const count = Math.max(1, Math.min(50, Number(bulkForm.count) || 5));
    const prefix = (bulkForm.prefix || 'VIP').trim().toUpperCase();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const exp = new Date();
    exp.setDate(exp.getDate() + (Number(bulkForm.expiryDays) || 7));
    exp.setHours(23, 59, 0, 0);
    const expiryStr = exp.toISOString().slice(0, 16);

    const newBatch = [];
    for (let i = 0; i < count; i++) {
      let rand = '';
      for (let j = 0; j < 4; j++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      newBatch.push({
        id: `VCH-${Date.now().toString(36).toUpperCase()}-${i}`,
        code: `${prefix}-${rand}`,
        title: bulkForm.title || `${prefix} Batch Voucher`,
        discountType: bulkForm.discountType,
        discountValue: Number(bulkForm.discountValue) || 20,
        appliesTo: bulkForm.appliesTo,
        minOrder: Number(bulkForm.minOrder) || 0,
        expiryDate: expiryStr,
        usageLimit: Number(bulkForm.usageLimit) || 1,
        usedCount: 0,
        isActive: true,
        description: `Batch generated ${bulkForm.discountValue}${bulkForm.discountType === 'percentage' ? '%' : ' Rs.'} voucher`
      });
    }
    onBulkAddVouchers(newBatch);
    setShowBulkModal(false);
  };

  const filteredVouchers = vouchers.filter(v => {
    const isExpired = v.expiryDate && new Date(v.expiryDate).getTime() < Date.now();
    const matchFilter = 
      voucherFilter === 'all' ||
      (voucherFilter === 'active' && v.isActive && !isExpired) ||
      (voucherFilter === 'expired' && isExpired);
    const q = voucherSearch.toLowerCase().trim();
    const matchSearch = !q || v.code.toLowerCase().includes(q) || (v.title && v.title.toLowerCase().includes(q));
    return matchFilter && matchSearch;
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
          <button 
            className={`admin-tab-btn ${activeTab === 'vouchers' ? 'active' : ''}`}
            onClick={() => setActiveTab('vouchers')}
          >
            <span>🎟️ Vouchers ({vouchers.length})</span>
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

              <div className="kpi-card gold" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('vouchers')}>
                <span className="kpi-lbl">Active Vouchers</span>
                <span className="kpi-val">{vouchers.filter(v => v.isActive && (!v.expiryDate || new Date(v.expiryDate).getTime() > Date.now())).length}</span>
                <span className="kpi-sub">{vouchers.length} Total Promotional Coupons</span>
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

        {/* TAB 6: VOUCHERS & PROMO DISCOUNT STUDIO */}
        {activeTab === 'vouchers' && (
          <div className="admin-vouchers-tab">
            <div className="box-header-row mb-20">
              <div>
                <h4>🎟️ Store Promo Vouchers & Discount Studio ({vouchers.length})</h4>
                <p>Create time-limited promotional vouchers, configure automatic expiry dates, generate multi-code batches, and monitor redemptions.</p>
              </div>

              <div className="voucher-top-actions">
                <button 
                  type="button"
                  className="btn-create-voucher"
                  onClick={() => setShowVoucherModal(true)}
                >
                  <PlusIcon size={16} />
                  <span>+ Create Single Voucher</span>
                </button>
                <button 
                  type="button"
                  className="btn-multi-voucher"
                  onClick={() => setShowBulkModal(true)}
                >
                  <span>⚡ Multi-Generate Vouchers</span>
                </button>
              </div>
            </div>

            {/* Voucher Quick Stats */}
            <div className="voucher-quick-stats-grid">
              <div className="v-stat-card">
                <span className="v-stat-num">{vouchers.filter(v => v.isActive && (!v.expiryDate || new Date(v.expiryDate).getTime() > Date.now())).length}</span>
                <span className="v-stat-lbl">Active & Valid Vouchers</span>
              </div>
              <div className="v-stat-card expired">
                <span className="v-stat-num">{vouchers.filter(v => v.expiryDate && new Date(v.expiryDate).getTime() <= Date.now()).length}</span>
                <span className="v-stat-lbl">Expired / Blocked Vouchers</span>
              </div>
              <div className="v-stat-card">
                <span className="v-stat-num">{vouchers.reduce((acc, v) => acc + (v.usedCount || 0), 0)}</span>
                <span className="v-stat-lbl">Total Customer Redemptions</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="orders-control-bar mt-20 mb-20">
              <div className="search-order-wrap">
                <SearchIcon size={16} />
                <input 
                  type="text" 
                  placeholder="Search voucher code (e.g. SUNDAY40, WELCOME20) or campaign..."
                  value={voucherSearch}
                  onChange={(e) => setVoucherSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="order-filter-pills">
                <button 
                  type="button"
                  className={`filter-pill ${voucherFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setVoucherFilter('all')}
                >
                  All ({vouchers.length})
                </button>
                <button 
                  type="button"
                  className={`filter-pill ${voucherFilter === 'active' ? 'active' : ''}`}
                  onClick={() => setVoucherFilter('active')}
                >
                  🟢 Active ({vouchers.filter(v => v.isActive && (!v.expiryDate || new Date(v.expiryDate).getTime() > Date.now())).length})
                </button>
                <button 
                  type="button"
                  className={`filter-pill ${voucherFilter === 'expired' ? 'active' : ''}`}
                  onClick={() => setVoucherFilter('expired')}
                >
                  🔴 Expired ({vouchers.filter(v => v.expiryDate && new Date(v.expiryDate).getTime() <= Date.now()).length})
                </button>
              </div>
            </div>

            {/* Voucher Cards Grid */}
            <div className="vouchers-cards-grid">
              {filteredVouchers.length > 0 ? (
                filteredVouchers.map(v => {
                  const vStatus = getVoucherStatus(v);
                  const isExpired = v.expiryDate && new Date(v.expiryDate).getTime() <= Date.now();
                  return (
                    <div key={v.id} className={`luxury-voucher-ticket ${isExpired ? 'expired-ticket' : ''} ${!v.isActive ? 'paused-ticket' : ''}`}>
                      <div className="ticket-edge-left">
                        <div className="ticket-notch top"></div>
                        <div className="ticket-notch bottom"></div>
                      </div>

                      <div className="ticket-main-content">
                        {/* Header Row */}
                        <div className="ticket-top-row">
                          <div className="ticket-code-wrap">
                            <span className="voucher-code-display">{v.code}</span>
                            <button 
                              type="button"
                              className="btn-copy-code"
                              onClick={() => handleCopyCode(v.code)}
                              title="Copy Voucher Code"
                            >
                              <CopyIcon size={14} />
                              <span>{copiedCode === v.code ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>

                          <span className={`voucher-status-pill ${vStatus.className}`}>
                            {vStatus.label}
                          </span>
                        </div>

                        {/* Title and Discount Banner */}
                        <div className="ticket-discount-banner">
                          <div className="discount-badge-large">
                            {v.discountType === 'percentage' ? `${v.discountValue}% OFF` : `Rs. ${v.discountValue} OFF`}
                          </div>
                          <div className="discount-applies-tag">
                            {v.appliesTo === 'drinks' ? '☕ Handcrafted Drinks' : v.appliesTo === 'food' ? '🥐 Bakery & Desserts' : '✨ Entire Basket'}
                          </div>
                        </div>

                        <h5 className="voucher-title-text">{v.title}</h5>
                        {v.description && <p className="voucher-desc-text">{v.description}</p>}

                        {/* Validity & Expiry Timeline */}
                        <div className="voucher-validity-box">
                          <div className="validity-row">
                            <ClockIcon size={14} className="validity-icon" />
                            <span className="validity-label">Expiry Date & Time:</span>
                            <span className={`validity-val ${isExpired ? 'expired-text' : ''}`}>
                              {v.expiryDate ? new Date(v.expiryDate).toLocaleString('en-PK', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              }) : 'Never Expires (Permanent)'}
                            </span>
                          </div>

                          <div className="validity-sub-meta">
                            <span>Min. Spend: <strong>{v.minOrder > 0 ? `Rs. ${v.minOrder}` : 'No Minimum'}</strong></span>
                            <span>Redemptions: <strong>{v.usedCount || 0} / {v.usageLimit ? v.usageLimit : 'Unlimited'}</strong></span>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="ticket-footer-actions">
                          <button 
                            type="button" 
                            className={`btn-toggle-voucher ${v.isActive ? 'active-state' : 'paused-state'}`}
                            onClick={() => onToggleVoucher(v.id)}
                            title={v.isActive ? 'Pause voucher' : 'Activate voucher'}
                          >
                            {v.isActive ? '⏸️ Pause' : '▶️ Activate'}
                          </button>

                          <button 
                            type="button"
                            className="btn-delete-voucher"
                            onClick={() => {
                              if (window.confirm(`Delete voucher "${v.code}" permanently?`)) {
                                onDeleteVoucher(v.id);
                              }
                            }}
                            title="Delete Voucher"
                          >
                            <TrashIcon size={15} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-vouchers-view">
                  <TicketIcon size={48} className="empty-ico" />
                  <h4>No Vouchers Found</h4>
                  <p>Create your first promotional discount voucher or generate multiple batch passes.</p>
                  <button type="button" className="btn-create-voucher" onClick={() => setShowVoucherModal(true)}>
                    + Create First Voucher
                  </button>
                </div>
              )}
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

      {/* SINGLE VOUCHER CREATION MODAL */}
      {showVoucherModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <div className="modal-header-icon-title">
                <TicketIcon size={22} className="modal-title-ico gold" />
                <div>
                  <h3>Create New Promotional Voucher</h3>
                  <p>Configure discount rules, timing, and automated expiration</p>
                </div>
              </div>
              <button type="button" className="btn-close-modal" onClick={() => setShowVoucherModal(false)}>
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateVoucherSubmit} className="admin-item-form">
              <div className="form-group">
                <label>Voucher Code *</label>
                <div className="voucher-code-input-row">
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. SUMMER30, VIP50"
                    value={voucherForm.code}
                    onChange={(e) => setVoucherForm({ ...voucherForm, code: e.target.value.toUpperCase() })}
                    className="form-input voucher-code-field"
                  />
                  <button 
                    type="button" 
                    className="btn-random-code"
                    onClick={handleGenerateRandomCode}
                    title="Generate a random code"
                  >
                    🎲 Random Code
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Campaign Title / Label *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Summer Weekend Treat, First Order Welcome"
                  value={voucherForm.title}
                  onChange={(e) => setVoucherForm({ ...voucherForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Discount Type *</label>
                  <select
                    value={voucherForm.discountType}
                    onChange={(e) => setVoucherForm({ ...voucherForm, discountType: e.target.value })}
                    className="form-input"
                  >
                    <option value="percentage">% Percentage Discount</option>
                    <option value="fixed">Fixed PKR Amount (Rs. OFF)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Discount Value * {voucherForm.discountType === 'percentage' ? '(%)' : '(PKR Rs.)'}</label>
                  <input 
                    type="number" 
                    min="1"
                    max={voucherForm.discountType === 'percentage' ? 100 : 10000}
                    required
                    placeholder={voucherForm.discountType === 'percentage' ? '20' : '150'}
                    value={voucherForm.discountValue}
                    onChange={(e) => setVoucherForm({ ...voucherForm, discountValue: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Applies To *</label>
                  <select
                    value={voucherForm.appliesTo}
                    onChange={(e) => setVoucherForm({ ...voucherForm, appliesTo: e.target.value })}
                    className="form-input"
                  >
                    <option value="all">Entire Basket (All Items)</option>
                    <option value="drinks">Handcrafted Coffee Drinks Only</option>
                    <option value="food">Bakery & Desserts Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Minimum Spend (PKR)</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0 (No Minimum)"
                    value={voucherForm.minOrder}
                    onChange={(e) => setVoucherForm({ ...voucherForm, minOrder: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Exact Expiration Date & Time *</label>
                <input 
                  type="datetime-local" 
                  required
                  value={voucherForm.expiryDate}
                  onChange={(e) => setVoucherForm({ ...voucherForm, expiryDate: e.target.value })}
                  className="form-input"
                />
                
                {/* Expiry Quick Presets */}
                <div className="expiry-presets-row">
                  <span className="preset-label">Quick Presets:</span>
                  <button type="button" className="btn-preset-chip" onClick={() => handleSetExpiryPreset(24, 'hours')}>
                    +24 Hours
                  </button>
                  <button type="button" className="btn-preset-chip" onClick={() => handleSetExpiryPreset(3, 'days')}>
                    +3 Days
                  </button>
                  <button type="button" className="btn-preset-chip" onClick={() => handleSetExpiryPreset(7, 'days')}>
                    +7 Days
                  </button>
                  <button type="button" className="btn-preset-chip" onClick={() => handleSetExpiryPreset(30, 'days')}>
                    +30 Days
                  </button>
                </div>
                <small className="form-help-text">
                  ⚠️ When this time arrives, this voucher will automatically stop working across the site.
                </small>
              </div>

              <div className="form-group">
                <label>Total Redemption Limit</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="e.g. 100 (Leave blank for unlimited uses)"
                  value={voucherForm.usageLimit}
                  onChange={(e) => setVoucherForm({ ...voucherForm, usageLimit: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description / Customer Details</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Enjoy 20% OFF on all handcrafted drinks this weekend!"
                  value={voucherForm.description}
                  onChange={(e) => setVoucherForm({ ...voucherForm, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-checkboxes">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={voucherForm.isActive}
                    onChange={(e) => setVoucherForm({ ...voucherForm, isActive: e.target.checked })}
                  />
                  <span>Activate voucher immediately upon saving</span>
                </label>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setShowVoucherModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save-item">
                  <CheckIcon size={16} />
                  <span>Create & Activate Voucher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MULTI-GENERATE VOUCHERS MODAL (BATCH CREATION) */}
      {showBulkModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <div className="modal-header-icon-title">
                <span style={{ fontSize: '1.4rem' }}>⚡</span>
                <div>
                  <h3>Multi-Generate Promo Passes (Batch Studio)</h3>
                  <p>Generate multiple unique discount codes in 1 click for promotions and customer campaigns</p>
                </div>
              </div>
              <button type="button" className="btn-close-modal" onClick={() => setShowBulkModal(false)}>
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleBulkSubmit} className="admin-item-form">
              <div className="form-row-2col">
                <div className="form-group">
                  <label>How Many Vouchers to Generate? *</label>
                  <input 
                    type="number" 
                    min="1"
                    max="50"
                    required
                    value={bulkForm.count}
                    onChange={(e) => setBulkForm({ ...bulkForm, count: e.target.value })}
                    className="form-input"
                  />
                  <small className="form-help-text">Max 50 per batch</small>
                </div>

                <div className="form-group">
                  <label>Code Prefix *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. VIP, GUEST, EVENT"
                    value={bulkForm.prefix}
                    onChange={(e) => setBulkForm({ ...bulkForm, prefix: e.target.value.toUpperCase() })}
                    className="form-input"
                  />
                  <small className="form-help-text">e.g. {bulkForm.prefix || 'VIP'}-A7X9, {bulkForm.prefix || 'VIP'}-9K2B</small>
                </div>
              </div>

              <div className="form-group">
                <label>Batch Campaign Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. VIP Influencer Pass, Loyalty Rewards"
                  value={bulkForm.title}
                  onChange={(e) => setBulkForm({ ...bulkForm, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Discount Type *</label>
                  <select
                    value={bulkForm.discountType}
                    onChange={(e) => setBulkForm({ ...bulkForm, discountType: e.target.value })}
                    className="form-input"
                  >
                    <option value="percentage">% Percentage Discount</option>
                    <option value="fixed">Fixed PKR Amount (Rs. OFF)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Discount Value * {bulkForm.discountType === 'percentage' ? '(%)' : '(PKR Rs.)'}</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={bulkForm.discountValue}
                    onChange={(e) => setBulkForm({ ...bulkForm, discountValue: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Validity Duration (Days from now) *</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={bulkForm.expiryDays}
                    onChange={(e) => setBulkForm({ ...bulkForm, expiryDays: e.target.value })}
                    className="form-input"
                  />
                  <small className="form-help-text">Valid for {bulkForm.expiryDays} days, then expires automatically</small>
                </div>

                <div className="form-group">
                  <label>Redemptions Per Code</label>
                  <input 
                    type="number" 
                    min="1"
                    value={bulkForm.usageLimit}
                    onChange={(e) => setBulkForm({ ...bulkForm, usageLimit: e.target.value })}
                    className="form-input"
                  />
                  <small className="form-help-text">e.g. 1 for single-use passes</small>
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setShowBulkModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save-item">
                  <span>⚡ Generate {bulkForm.count || 5} Vouchers Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  ClockIcon, 
  CheckIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  SearchIcon, 
  ArrowRightIcon 
} from '../components/Icons';

export default function TrackOrderPage({ orders, initialOrderId, onNavigate }) {
  const [searchId, setSearchId] = useState(initialOrderId || '');
  const [selectedOrder, setSelectedOrder] = useState(
    orders.find(o => o.id === initialOrderId) || orders[0] || null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase().trim() === searchId.toLowerCase().trim());
    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No order found matching "${searchId}". Please check your Order ID (e.g. BB-ORD-XXXX).`);
    }
  };

  const steps = [
    { id: 'Received', label: 'Order Confirmed', desc: 'Received in Brewbeans kitchen system' },
    { id: 'Brewing', label: 'Barista Brewing', desc: 'Fresh espresso extraction & milk texturing' },
    { id: 'Packaged', label: 'Spill-Proof Packaged', desc: 'Sealed with tamper-evident drink cap' },
    { id: 'Out for Delivery', label: 'Rider Out on Route', desc: 'Heading towards your Karachi address' },
    { id: 'Delivered', label: 'Delivered & Enjoyed', desc: 'Delivered to your doorstep' }
  ];

  // Helper to determine step completion index
  const getStepIndex = (status) => {
    switch (status) {
      case 'Received': return 0;
      case 'Brewing': return 1;
      case 'Packaged': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 1;
    }
  };

  const currentIdx = selectedOrder ? getStepIndex(selectedOrder.orderStatus) : 0;

  return (
    <div className="page-wrapper track-order-page-view">
      <div className="page-hero-banner compact">
        <div className="section-container">
          <h1 className="page-title">Live Coffee Order Tracking</h1>
          <p className="page-sub">Track your coffee from our espresso bar to your doorstep in Karachi.</p>
        </div>
      </div>

      <div className="section-container track-container">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="track-search-form">
          <div className="track-input-wrap">
            <SearchIcon size={18} className="search-icon-muted" />
            <input 
              type="text" 
              placeholder="Enter your Order ID (e.g. BB-ORD-9201)..." 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="track-input"
            />
          </div>
          <button type="submit" className="btn-track-submit">
            <span>Track Order</span>
          </button>
        </form>

        {selectedOrder ? (
          <div className="track-details-card">
            {/* Top Bar */}
            <div className="track-card-header">
              <div>
                <span className="order-chip-badge">Live Status: {selectedOrder.orderStatus}</span>
                <h2 className="track-order-id">Order #{selectedOrder.id}</h2>
                <span className="order-time">Placed on {selectedOrder.placedAt}</span>
              </div>

              <div className="order-payment-pill">
                <strong>{selectedOrder.paymentMethod}</strong>
                <span>{selectedOrder.paymentStatus}</span>
              </div>
            </div>

            {/* Visual Stepper */}
            <div className="order-progress-stepper">
              {steps.map((st, idx) => {
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={st.id} className={`step-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="step-circle">
                      {isCompleted ? <CheckIcon size={16} /> : <span>{idx + 1}</span>}
                    </div>
                    <div className="step-label-group">
                      <div className="step-title">{st.label}</div>
                      <div className="step-desc">{st.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Items & Customer Details */}
            <div className="track-info-two-col">
              {/* Delivery Info */}
              <div className="track-info-block">
                <h4>Delivery Details</h4>
                <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
                <p><strong>Contact:</strong> {selectedOrder.phone}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                {selectedOrder.notes && (
                  <p><strong>Instructions:</strong> {selectedOrder.notes}</p>
                )}
              </div>

              {/* Order Items */}
              <div className="track-info-block">
                <h4>Items Ordered</h4>
                <div className="track-items-list">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="track-item-line">
                      <span>{item.name} × {item.quantity}</span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="track-total-line">
                    <strong>Total Paid / Due:</strong>
                    <strong>Rs. {selectedOrder.total}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Barista Contact Hotline */}
            <div className="track-card-footer">
              <div>
                <strong>Need an update on your order?</strong>
                <p>Call our barista directly or message us on WhatsApp with your Order #{selectedOrder.id}.</p>
              </div>

              <div className="track-hotline-actions">
                <a href={`tel:${CAFE_INFO.phone}`} className="btn-call-barista">
                  <PhoneIcon size={18} />
                  <span>Call {CAFE_INFO.phone}</span>
                </a>
                <a 
                  href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans!%20Checking%20status%20for%20Order%20${selectedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-barista"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Barista</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="track-no-order">
            <ClockIcon size={48} className="muted-icon" />
            <h3>No order selected</h3>
            <p>Please enter your Order ID above or place a fresh coffee order from our menu.</p>
            <button className="btn-primary-glow" onClick={() => onNavigate('menu')}>
              <span>Go to Menu</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

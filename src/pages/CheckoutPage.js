import React, { useState } from 'react';
import { checkVoucherValidity } from '../data/coffeeData';
import { 
  ShoppingBagIcon, 
  CheckIcon, 
  ArrowRightIcon,
  XIcon
} from '../components/Icons';

export default function CheckoutPage({ 
  cartItems, 
  onClearCart, 
  onOrderPlaced, 
  onNavigate,
  promoCode,
  setPromoCode,
  promoApplied,
  setPromoApplied,
  vouchers = []
}) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    area: 'Gulshan-e-Iqbal Block 2',
    address: '',
    landmark: '',
    deliveryNotes: '',
    deliveryType: 'delivery', // 'delivery' | 'pickup'
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'card' | 'wallet'
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Card Form State
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Wallet Form State (JazzCash / EasyPaisa)
  const [walletData, setWalletData] = useState({
    provider: 'JazzCash',
    senderPhone: '',
    transactionId: '',
  });

  // Karachi Areas
  const karachiAreas = [
    'Gulshan-e-Iqbal Block 2 (Immediate Vicinity)',
    'Gulshan-e-Iqbal (Other Blocks 1-20)',
    'Gulistan-e-Johar',
    'Bahadurabad / Tariq Road',
    'PECHS / SMCHS',
    'Clifton / DHA',
    'Federal B Area',
    'North Nazimabad',
    'KDA Scheme 1 / Tipu Sultan',
    'Other Karachi Areas',
  ];

  // Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Dynamic Voucher Evaluation
  let discountValue = 0;
  let activeVoucherInfo = null;

  if (promoApplied && promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    const matchedVoucher = (vouchers || []).find(v => v.code.toUpperCase() === cleanCode);
    if (matchedVoucher) {
      const validity = checkVoucherValidity(matchedVoucher, cartItems, subtotal);
      if (validity.valid) {
        discountValue = validity.discount;
        activeVoucherInfo = matchedVoucher;
      }
    } else if (cleanCode === 'SUNDAY40') {
      const discountableAmount = cartItems.reduce((acc, item) => {
        if (item.category === 'hot' || item.category === 'iced' || item.category === 'frappe' || item.category === 'custom') {
          return acc + item.price * item.quantity;
        }
        return acc;
      }, 0);
      discountValue = Math.round(discountableAmount * 0.4);
    }
  }

  // Delivery fee
  const deliveryFee = customerInfo.deliveryType === 'pickup' ? 0 : (subtotal > 1500 ? 0 : 100);
  const grandTotal = Math.max(0, subtotal - discountValue + deliveryFee);

  // Apply promo
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = (promoCode || '').trim().toUpperCase();
    if (!cleanCode) return;

    const voucher = (vouchers || []).find(v => v.code.toUpperCase() === cleanCode);
    if (!voucher) {
      if (cleanCode === 'SUNDAY40') {
        setPromoApplied(true);
        return;
      }
      alert(`Invalid voucher code "${cleanCode}".`);
      return;
    }

    const validity = checkVoucherValidity(voucher, cartItems, subtotal);
    if (!validity.valid) {
      alert(validity.error);
      return;
    }

    setPromoCode(voucher.code);
    setPromoApplied(true);
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
  };

  // Submit Order Logic
  const handleFinalOrderSubmit = (paidOnlineInfo = null) => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }
    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address.trim()) {
      alert('Please enter your Karachi delivery address.');
      return;
    }

    const orderId = `BB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.deliveryType === 'pickup' 
        ? 'Dine-in / Takeaway Pickup at Gulshan Block 2'
        : `${customerInfo.address}, ${customerInfo.area} (Landmark: ${customerInfo.landmark || 'N/A'})`,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        isCustom: item.isCustom || false,
        customDetails: item.customDetails || null,
      })),
      subtotal,
      discount: discountValue,
      deliveryFee,
      total: grandTotal,
      paymentMethod: paymentMethod.toUpperCase(),
      paymentStatus: paidOnlineInfo ? `Paid Online (${paidOnlineInfo})` : 'Pending Cash on Delivery',
      orderStatus: 'Received', // "Received" -> "Brewing" -> "Out for Delivery" -> "Delivered"
      placedAt: new Date().toLocaleString(),
      notes: customerInfo.deliveryNotes,
    };

    onOrderPlaced(newOrder);
    onClearCart();
    onNavigate('track', { orderId });
  };

  // Process Online Card or Wallet Payment
  const handleProcessOnlinePayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowOnlinePaymentModal(false);
      let details = '';
      if (paymentMethod === 'card') {
        const last4 = cardData.cardNumber.slice(-4) || '9241';
        details = `Card **** ${last4} - Auth #${Math.floor(100000 + Math.random() * 900000)}`;
      } else {
        details = `${walletData.provider} - TID: ${walletData.transactionId || 'TRX-' + Math.floor(100000 + Math.random() * 900000)}`;
      }
      handleFinalOrderSubmit(details);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper empty-checkout-view">
        <div className="section-container text-center py-60">
          <ShoppingBagIcon size={64} className="empty-cart-icon" />
          <h2>Your Coffee Basket is Empty</h2>
          <p>Please select some fresh drinks or bakery desserts before checking out.</p>
          <button 
            className="btn-primary-glow mt-20"
            onClick={() => onNavigate('menu')}
          >
            <span>Explore Menu</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper checkout-page-view">
      {/* Header */}
      <div className="page-hero-banner compact">
        <div className="section-container">
          <h1 className="page-title">Direct Order Checkout</h1>
          <p className="page-sub">Fast doorstep delivery in Karachi or fresh takeaway pickup.</p>
        </div>
      </div>

      <div className="section-container checkout-container">
        <div className="checkout-two-col-layout">
          {/* Left Column: Delivery & Payment Details */}
          <div className="checkout-left-form">
            {/* Step 1: Customer Details */}
            <div className="checkout-card-section">
              <h3 className="checkout-section-title">
                <span>1</span> Customer & Contact Information
              </h3>

              <div className="form-grid-two">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Zainab Ahmed"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number (Rider Calling & WhatsApp) *</label>
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. 0321 8847291"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery vs Pickup */}
            <div className="checkout-card-section">
              <h3 className="checkout-section-title">
                <span>2</span> Delivery Preference
              </h3>

              <div className="delivery-type-toggle-grid">
                <div 
                  className={`delivery-option-box ${customerInfo.deliveryType === 'delivery' ? 'active' : ''}`}
                  onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'delivery' })}
                >
                  <div className="opt-radio"></div>
                  <div>
                    <strong>Doorstep Rider Delivery</strong>
                    <p>Direct to your home or office in Karachi (30–40 mins)</p>
                  </div>
                </div>

                <div 
                  className={`delivery-option-box ${customerInfo.deliveryType === 'pickup' ? 'active' : ''}`}
                  onClick={() => setCustomerInfo({ ...customerInfo, deliveryType: 'pickup' })}
                >
                  <div className="opt-radio"></div>
                  <div>
                    <strong>Self Takeaway Pickup</strong>
                    <p>Pick up hot/fresh at Shop #6, Rab Medical Center, Gulshan Block 2</p>
                  </div>
                </div>
              </div>

              {customerInfo.deliveryType === 'delivery' && (
                <div className="delivery-address-fields">
                  <div className="form-group">
                    <label>Select Karachi Area *</label>
                    <select
                      value={customerInfo.area}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, area: e.target.value })}
                      className="form-input"
                    >
                      {karachiAreas.map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Complete Street Address (House / Apartment / Floor) *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. House 42-B, Street 7, Block 13-D"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Nearby Landmark (Optional)</label>
                    <input 
                      type="text"
                      placeholder="e.g. Opposite Masjid, Near Disco Bakery, etc."
                      value={customerInfo.landmark}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, landmark: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              <div className="form-group mt-14">
                <label>Special Instructions for Barista / Rider</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Extra hot, less sweet, ring bell twice, keep cup upright..."
                  value={customerInfo.deliveryNotes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryNotes: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Step 3: Payment Options (COD vs Online) */}
            <div className="checkout-card-section">
              <h3 className="checkout-section-title">
                <span>3</span> Select Payment Method
              </h3>

              <div className="payment-options-list">
                {/* 1. Cash on Delivery */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="payment-method-header">
                    <div className="opt-radio"></div>
                    <div>
                      <strong>Cash on Delivery (COD)</strong>
                      <p>Pay in cash directly to the rider when your coffee arrives.</p>
                    </div>
                  </div>
                  <span className="payment-badge">Standard & Easy</span>
                </div>

                {/* 2. Online Credit / Debit Card */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="payment-method-header">
                    <div className="opt-radio"></div>
                    <div>
                      <strong>Debit / Credit Card (Online Payment)</strong>
                      <p>Visa, MasterCard, PayPak — Pay securely via instant gateway modal.</p>
                    </div>
                  </div>
                  <span className="payment-badge online">Instant Confirmation</span>
                </div>

                {/* 3. Mobile Wallet (JazzCash / EasyPaisa) */}
                <div 
                  className={`payment-method-card ${paymentMethod === 'wallet' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="payment-method-header">
                    <div className="opt-radio"></div>
                    <div>
                      <strong>JazzCash / EasyPaisa / Raast</strong>
                      <p>Transfer to Brewbeans Karachi business account and enter transaction ID.</p>
                    </div>
                  </div>
                  <span className="payment-badge online">Mobile Wallets</span>
                </div>
              </div>

              {/* Action Button */}
              {paymentMethod === 'cod' ? (
                <button 
                  className="btn-place-order-main cod"
                  onClick={() => handleFinalOrderSubmit()}
                >
                  <CheckIcon size={20} />
                  <span>Place Order with Cash on Delivery (Rs. {grandTotal})</span>
                </button>
              ) : (
                <button 
                  className="btn-place-order-main online"
                  onClick={() => {
                    if (!customerInfo.name || !customerInfo.phone) {
                      alert('Please fill in your name and phone number first.');
                      return;
                    }
                    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address) {
                      alert('Please fill in your delivery address first.');
                      return;
                    }
                    setShowOnlinePaymentModal(true);
                  }}
                >
                  <span>Proceed to Online Payment (Rs. {grandTotal})</span>
                  <ArrowRightIcon size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-right-summary">
            <div className="summary-sticky-card">
              <h3 className="summary-title">Your Order Summary</h3>

              {/* Items List */}
              <div className="summary-items-scroll">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item-row">
                    <img src={item.image} alt={item.name} className="summary-thumb" />
                    <div className="summary-meta">
                      <div className="summary-item-name">{item.name}</div>
                      <div className="summary-item-qty">Qty: {item.quantity} × Rs. {item.price}</div>
                    </div>
                    <div className="summary-line-price">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="summary-promo-form">
                <input 
                  type="text" 
                  placeholder="Promo Code (e.g. WELCOME20)" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-code-input"
                />
                <button type="submit" className="btn-promo-apply">
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {promoApplied && (
                <div className="promo-active-notice" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span>
                    ✨ {activeVoucherInfo 
                      ? `${activeVoucherInfo.code} (${activeVoucherInfo.title}) Applied!` 
                      : `${promoCode} Applied!`}
                  </span>
                  <button 
                    type="button" 
                    onClick={handleRemovePromo}
                    style={{ 
                      background: 'rgba(239, 68, 68, 0.15)', 
                      border: '1px solid rgba(239, 68, 68, 0.3)', 
                      color: '#f87171', 
                      borderRadius: '4px',
                      cursor: 'pointer', 
                      padding: '2px 7px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold' 
                    }}
                    title="Remove voucher"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Financial Breakdown */}
              <div className="summary-costs-breakdown">
                <div className="cost-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>

                {discountValue > 0 && (
                  <div className="cost-row discount">
                    <span>{activeVoucherInfo ? `${activeVoucherInfo.code} Discount` : 'Voucher Discount'}</span>
                    <span>- Rs. {discountValue}</span>
                  </div>
                )}

                <div className="cost-row">
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>

                <div className="cost-row grand-total">
                  <strong>Total Amount</strong>
                  <strong>Rs. {grandTotal}</strong>
                </div>
              </div>

              <div className="summary-guarantee-note">
                🔒 Direct & official checkout of Brewbeans Karachi.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Online Payment Dedicated Modal */}
      {showOnlinePaymentModal && (
        <div className="online-payment-modal-overlay">
          <div className="online-payment-modal-card">
            <div className="modal-header">
              <div>
                <h3>
                  {paymentMethod === 'card' 
                    ? 'Secure Credit / Debit Card Payment' 
                    : 'JazzCash / EasyPaisa Payment'}
                </h3>
                <p>Order Total: <strong>Rs. {grandTotal}</strong></p>
              </div>
              <button 
                className="btn-close-payment-modal"
                onClick={() => setShowOnlinePaymentModal(false)}
              >
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleProcessOnlinePayment} className="online-payment-form">
              {paymentMethod === 'card' ? (
                <>
                  <div className="card-mock-visual">
                    <div className="chip"></div>
                    <div className="card-num-preview">
                      {cardData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-bottom-preview">
                      <span>{cardData.cardName || 'CARDHOLDER NAME'}</span>
                      <span>{cardData.expiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Name on card"
                      value={cardData.cardName}
                      onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number (16 Digits) *</label>
                    <input 
                      type="text" 
                      required
                      maxLength={19}
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-grid-two">
                    <div className="form-group">
                      <label>Expiry Date (MM/YY) *</label>
                      <input 
                        type="text" 
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV / CVC (3 Digits) *</label>
                      <input 
                        type="password" 
                        required
                        maxLength={3}
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="wallet-instructions-box">
                    <h4>Transfer to Brewbeans Business Account</h4>
                    <p><strong>Account Title:</strong> Brewbeans Coffee Bar</p>
                    <p><strong>Account / Till Number:</strong> 0311 2463092</p>
                    <p><strong>Bank / Wallet:</strong> JazzCash / EasyPaisa / Raast</p>
                  </div>

                  <div className="form-group">
                    <label>Select Mobile Provider *</label>
                    <select
                      value={walletData.provider}
                      onChange={(e) => setWalletData({ ...walletData, provider: e.target.value })}
                      className="form-input"
                    >
                      <option value="JazzCash">JazzCash (0311 2463092)</option>
                      <option value="EasyPaisa">EasyPaisa (0311 2463092)</option>
                      <option value="Raast Instant">Raast Instant Transfer</option>
                      <option value="Bank Transfer">Meezan Bank Online</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Sender Mobile Number *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="03XX XXXXXXX"
                      value={walletData.senderPhone}
                      onChange={(e) => setWalletData({ ...walletData, senderPhone: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Transaction ID (TID / Reference) *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 98124018241"
                      value={walletData.transactionId}
                      onChange={(e) => setWalletData({ ...walletData, transactionId: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="btn-pay-now-action"
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <span>Securing & Authorizing Payment...</span>
                ) : (
                  <span>Authorize & Complete Payment (Rs. {grandTotal})</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

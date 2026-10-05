import React, { useState } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  ShoppingBagIcon, 
  XIcon, 
  PlusIcon, 
  MinusIcon, 
  WhatsAppIcon, 
  FoodpandaIcon, 
  PercentIcon, 
  CheckIcon,
  ArrowRightIcon,
  TrashIcon
} from './Icons';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  promoCode,
  setPromoCode,
  promoApplied,
  setPromoApplied,
  onNavigate
}) {
  const [orderType, setOrderType] = useState('direct'); // 'direct' | 'whatsapp' | 'foodpanda' | 'pickup'
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [inputCode, setInputCode] = useState(promoCode || '');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation if SUNDAY40 is applied
  const isSundayPromo = promoApplied && (promoCode === 'SUNDAY40');
  
  // Calculate discount on drinks only (categories: hot, iced, frappe, custom)
  const discountableAmount = items.reduce((acc, item) => {
    if (item.category === 'hot' || item.category === 'iced' || item.category === 'frappe' || item.category === 'custom') {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const discountValue = isSundayPromo ? Math.round(discountableAmount * 0.4) : 0;
  const grandTotal = Math.max(0, subtotal - discountValue);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim().toUpperCase() === 'SUNDAY40') {
      setPromoCode('SUNDAY40');
      setPromoApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Enter SUNDAY40 for 40% OFF all drinks!');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `*☕ NEW ORDER - BREWBEANS KARACHI*\n`;
    message += `-----------------------------------------\n`;
    message += `*Customer:* ${customerName || 'Guest'}\n`;
    if (orderType === 'pickup') {
      message += `*Type:* Dine-in / Takeaway Pickup\n`;
    } else {
      message += `*Type:* Direct Delivery\n`;
      message += `*Address:* ${deliveryAddress || 'Gulshan-e-Iqbal, Karachi'}\n`;
    }
    message += `-----------------------------------------\n`;
    message += `*ORDER ITEMS:*\n`;

    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}* (x${item.quantity}) - Rs. ${item.price * item.quantity}\n`;
      if (item.isCustom && item.customDetails) {
        message += `   _Base:_ ${item.customDetails.base}, _Milk:_ ${item.customDetails.milk}\n`;
        message += `   _Flavor:_ ${item.customDetails.flavor}, _Topping:_ ${item.customDetails.topping}\n`;
      }
    });

    message += `-----------------------------------------\n`;
    message += `*Subtotal:* Rs. ${subtotal}\n`;
    if (discountValue > 0) {
      message += `*Sunday Promo (SUNDAY40):* -Rs. ${discountValue} (40% OFF)\n`;
    }
    message += `*Grand Total:* *Rs. ${grandTotal}*\n`;
    if (specialNotes) {
      message += `*Special Instructions:* ${specialNotes}\n`;
    }
    message += `-----------------------------------------\n`;
    message += `Please confirm my order and estimated preparation time!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CAFE_INFO.phoneRaw}?text=${encoded}`, '_blank');
  };

  const handleProceedToWebsiteCheckout = () => {
    onClose();
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-title-row">
            <ShoppingBagIcon size={22} className="cart-icon-gold" />
            <div>
              <h3>Your Coffee Basket</h3>
              <p>{items.length} unique item{items.length === 1 ? '' : 's'}</p>
            </div>
          </div>
          <button className="btn-close-cart" onClick={onClose} aria-label="Close basket drawer">
            <XIcon size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll">
          {items.length === 0 ? (
            <div className="cart-empty-view">
              <div className="empty-cart-icon-wrap">
                <ShoppingBagIcon size={52} className="empty-bag-icon" />
              </div>
              <h4>Your basket is empty</h4>
              <p>Explore our artisan espresso blends, viral iced tiramisu, and fresh bakery desserts.</p>
              <button 
                className="btn-explore-menu-cart" 
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('menu');
                }}
              >
                Browse Coffee Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img 
                    src={item.image || '/images/real/latte_art_real.jpg'} 
                    alt={item.name} 
                    className="cart-item-thumb" 
                  />
                  
                  <div className="cart-item-meta">
                    <div className="cart-item-top">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">Rs. {item.price * item.quantity}</span>
                    </div>

                    {item.isCustom && item.customDetails && (
                      <div className="custom-item-tags">
                        <span>{item.customDetails.base}</span> • 
                        <span>{item.customDetails.milk}</span> • 
                        <span>{item.customDetails.temp}</span>
                      </div>
                    )}

                    <div className="cart-item-controls">
                      <div className="quantity-stepper">
                        <button 
                          className="btn-step"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="step-qty">{item.quantity}</span>
                        <button 
                          className="btn-step"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>

                      <button 
                        className="btn-remove-item"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        title="Remove item"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-clear-bar">
                <button className="btn-clear-all" onClick={onClearCart}>
                  Clear Basket
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Applicator */}
            <form onSubmit={handleApplyPromo} className="cart-coupon-form">
              <div className="coupon-input-wrap">
                <PercentIcon size={16} className="coupon-ico" />
                <input 
                  type="text" 
                  placeholder="Enter Promo Code (SUNDAY40)"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setCouponError('');
                  }}
                  className="coupon-input"
                />
                <button type="submit" className="btn-apply-coupon">
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponError && <span className="coupon-msg error">{couponError}</span>}
              {promoApplied && (
                <div className="coupon-success-tag">
                  <CheckIcon size={14} />
                  <span>SUNDAY40 Applied! 40% OFF Handcrafted Drinks</span>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="cart-totals-breakdown">
              <div className="total-line">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              {discountValue > 0 && (
                <div className="total-line discount">
                  <span>Sunday Special (40% OFF Drinks)</span>
                  <span className="discount-amount">- Rs. {discountValue}</span>
                </div>
              )}
              <div className="total-line grand">
                <strong>Grand Total</strong>
                <strong className="grand-price">Rs. {grandTotal}</strong>
              </div>
            </div>

            {/* PRIMARY WEBSITE CHECKOUT BUTTON (COD & ONLINE) */}
            <div className="cart-primary-action-wrap">
              <button 
                type="button"
                className="btn-proceed-direct-checkout"
                onClick={handleProceedToWebsiteCheckout}
              >
                <div className="chk-btn-content">
                  <span className="chk-title">Proceed to Checkout</span>
                  <span className="chk-sub">Cash on Delivery (COD) • Visa / Mastercard • EasyPaisa</span>
                </div>
                <ArrowRightIcon size={20} className="chk-arrow" />
              </button>
            </div>

            {/* Quick Order Tabs */}
            <div className="cart-alt-section">
              <div className="cart-alt-heading">
                <span>OR CHOOSE QUICK ORDER METHOD</span>
              </div>

              <div className="order-type-picker">
                <button 
                  type="button"
                  className={`order-type-tab ${orderType === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => setOrderType('whatsapp')}
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </button>

                <button 
                  type="button"
                  className={`order-type-tab ${orderType === 'pickup' ? 'active' : ''}`}
                  onClick={() => setOrderType('pickup')}
                >
                  <span>Dine-in / Pickup</span>
                </button>

                <button 
                  type="button"
                  className={`order-type-tab ${orderType === 'foodpanda' ? 'active' : ''}`}
                  onClick={() => setOrderType('foodpanda')}
                >
                  <FoodpandaIcon size={16} />
                  <span>Foodpanda</span>
                </button>
              </div>

              {/* Quick Details Inputs for WhatsApp or Pickup */}
              {orderType === 'whatsapp' || orderType === 'pickup' ? (
                <div className="checkout-inputs">
                  <input 
                    type="text" 
                    placeholder="Your Name (e.g. Ali Khan)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="input-checkout-field"
                  />
                  {orderType === 'whatsapp' && (
                    <input 
                      type="text" 
                      placeholder="Karachi Delivery Address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="input-checkout-field"
                    />
                  )}
                  <input 
                    type="text" 
                    placeholder="Special instructions (e.g. Less sweet, extra ice)"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="input-checkout-field"
                  />

                  <button 
                    type="button"
                    className="btn-checkout-secondary whatsapp"
                    onClick={handleWhatsAppCheckout}
                  >
                    <WhatsAppIcon size={18} />
                    <span>Send Order to WhatsApp Barista</span>
                  </button>
                </div>
              ) : orderType === 'foodpanda' ? (
                <div className="checkout-foodpanda-box">
                  <a
                    href={CAFE_INFO.foodpandaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-checkout-secondary foodpanda"
                  >
                    <FoodpandaIcon size={18} />
                    <span>Open Foodpanda Pakistan</span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

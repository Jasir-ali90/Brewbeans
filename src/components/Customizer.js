import React, { useState } from 'react';
import { 
  SparklesIcon, 
  WhatsAppIcon, 
  ShoppingBagIcon,
  XIcon
} from './Icons';
import { CAFE_INFO } from '../data/coffeeData';

const BASES = [
  { id: 'latte', name: 'Steamed Latte Base', price: 440, desc: 'Velvety espresso with textured milk base', color: '#8a5a36' },
  { id: 'coldbrew', name: '18-Hr Steeped Cold Brew', price: 420, desc: 'Ultra-smooth, low acidity chilled brew', color: '#3d2516' },
  { id: 'espresso', name: 'Double Ristretto / Espresso', price: 320, desc: 'Intense double shot with thick crema', color: '#2b170c' },
  { id: 'flatwhite', name: 'Cloud Flat White', price: 435, desc: 'Micro-foam with double ristretto punch', color: '#9d683e' },
  { id: 'frappe', name: 'Blended Frappe Base', price: 510, desc: 'Thick creamy blended ice coffee', color: '#b5835a' },
];

const MILKS = [
  { id: 'whole', name: 'Whole Dairy Milk', extraPrice: 0, tag: 'Standard' },
  { id: 'condensed', name: 'Spanish Sweet Condensed Milk', extraPrice: 80, tag: 'Sweet & Rich' },
  { id: 'oat', name: 'Barista Oat Milk', extraPrice: 120, tag: 'Plant-Based' },
  { id: 'almond', name: 'Roasted Almond Milk', extraPrice: 140, tag: 'Nutty' },
  { id: 'skim', name: 'Light Skim Milk', extraPrice: 0, tag: 'Low Cal' },
];

const FLAVORS = [
  { id: 'none', name: 'Pure Unsweetened', extraPrice: 0 },
  { id: 'spanish', name: 'Spanish Honey Dulce', extraPrice: 70 },
  { id: 'caramel', name: 'Salted Caramel Drizzle', extraPrice: 70 },
  { id: 'vanilla', name: 'Madagascar Vanilla Bean', extraPrice: 70 },
  { id: 'hazelnut', name: 'Roasted Hazelnut', extraPrice: 70 },
  { id: 'mocha', name: 'Belgian Dark Mocha Ganache', extraPrice: 80 },
];

const TOPPINGS = [
  { id: 'none', name: 'Clean / No Topping', extraPrice: 0 },
  { id: 'tiramisu', name: 'Tiramisu Mascarpone Cloud', extraPrice: 110, tag: 'Customer Favorite' },
  { id: 'biscoff', name: 'Lotus Biscoff Cookie Crumb Rim', extraPrice: 60, tag: 'Crunchy' },
  { id: 'cocoa', name: 'Dutch Cocoa Powder Dusting', extraPrice: 30, tag: 'Aromatic' },
  { id: 'whipped', name: 'Whipped Cream Mountain', extraPrice: 50, tag: 'Indulgent' },
];

const TEMPS = [
  { id: 'hot', name: 'Hot (65°C)', icon: '🔥' },
  { id: 'iced', name: 'Chilled with Ice', icon: '❄️' },
  { id: 'extra-ice', name: 'Extra Cold & Frosty', icon: '🧊' },
];

export default function Customizer({ isOpen, onClose, onAddCustomToCart }) {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedTopping, setSelectedTopping] = useState(TOPPINGS[0]);
  const [selectedTemp, setSelectedTemp] = useState(TEMPS[0]);
  const [customName, setCustomName] = useState("");

  // Calculate total price
  const totalPrice = 
    selectedBase.price + 
    selectedMilk.extraPrice + 
    selectedFlavor.extraPrice + 
    selectedTopping.extraPrice;

  const sundayDiscountPrice = Math.round(totalPrice * 0.6);

  const handleAddToCart = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim() || `Custom ${selectedBase.name}`,
      category: 'custom',
      price: totalPrice,
      image: selectedTemp.id === 'hot' ? '/images/real/latte_art_real.jpg' : '/images/real/iced_coffee_real.jpg',
      tag: 'Custom Brew',
      description: `${selectedBase.name} with ${selectedMilk.name}, ${selectedFlavor.name}, ${selectedTopping.name} (${selectedTemp.name})`,
      notes: [selectedMilk.name, selectedFlavor.name, selectedTemp.name],
      isCustom: true,
      customDetails: {
        base: selectedBase.name,
        milk: selectedMilk.name,
        flavor: selectedFlavor.name,
        topping: selectedTopping.name,
        temp: selectedTemp.name,
      }
    };
    onAddCustomToCart(customItem);
    if (onClose) onClose();
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Brewbeans Karachi!\nI would like to order my Custom Brew:\n- Name: ${customName || 'Custom Drink'}\n- Base: ${selectedBase.name}\n- Milk: ${selectedMilk.name}\n- Flavor: ${selectedFlavor.name}\n- Topping: ${selectedTopping.name}\n- Temp: ${selectedTemp.name}\nTotal: Rs. ${totalPrice} (Sunday Deal: Rs. ${sundayDiscountPrice})`
    );
    window.open(`https://wa.me/${CAFE_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="customizer-modal-overlay" onClick={onClose}>
      <div className="customizer-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="customizer-modal-header">
          <div className="customizer-header-title">
            <SparklesIcon size={20} className="accent-icon" />
            <div>
              <h2>Interactive Coffee Studio</h2>
              <p>Craft your signature cup with custom layers & milk</p>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close customizer">
            <XIcon size={20} />
          </button>
        </div>

        {/* Body Grid: Simulator Left, Options Right */}
        <div className="customizer-body-grid">
          {/* Visual Cup Simulator */}
          <div className="drink-simulator-panel">
            <div className="cup-visual-wrapper">
              <div className="glass-cup-container">
                {/* Topping Layer */}
                {selectedTopping.id !== 'none' && (
                  <div className={`topping-layer topping-${selectedTopping.id}`}>
                    <span className="topping-badge">{selectedTopping.name}</span>
                  </div>
                )}

                {/* Milk & Flavor Foam Layer */}
                <div 
                  className="foam-layer" 
                  style={{
                    backgroundColor: selectedMilk.id === 'oat' ? '#e8d8c3' : '#faf5ec'
                  }}
                >
                  <span className="layer-label">{selectedMilk.name}</span>
                </div>

                {/* Coffee Base Layer */}
                <div 
                  className="coffee-liquid-layer"
                  style={{
                    backgroundColor: selectedBase.color
                  }}
                >
                  <div className="liquid-steam"></div>
                  <span className="liquid-label">{selectedBase.name}</span>
                </div>

                {/* Flavor Drizzle Bottom */}
                {selectedFlavor.id !== 'none' && (
                  <div className={`syrup-bottom syrup-${selectedFlavor.id}`}>
                    <span>{selectedFlavor.name}</span>
                  </div>
                )}
              </div>

              {/* Temperature Badge */}
              <div className="temp-indicator-pill">
                <span>{selectedTemp.icon} {selectedTemp.name}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="custom-price-card">
              <div className="price-title">Estimated Price:</div>
              <div className="price-numbers">
                <span className="price-rs">Rs. {totalPrice}</span>
                <span className="sunday-note">Sunday Promo: Rs. {sundayDiscountPrice}</span>
              </div>
            </div>

            {/* Custom Drink Name Input */}
            <div className="custom-name-box">
              <label>Name Your Brew (Optional):</label>
              <input 
                type="text" 
                placeholder="e.g. Ayesha's Morning Elixir" 
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="input-custom-name"
              />
            </div>
          </div>

          {/* Configuration Steps */}
          <div className="customizer-options-panel">
            {/* Step 1: Base */}
            <div className="option-section">
              <label className="section-label">1. Choose Coffee Base</label>
              <div className="options-grid">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    className={`option-btn ${selectedBase.id === b.id ? 'active' : ''}`}
                    onClick={() => setSelectedBase(b)}
                  >
                    <div className="opt-title">{b.name}</div>
                    <div className="opt-sub">Rs. {b.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Milk */}
            <div className="option-section">
              <label className="section-label">2. Select Milk</label>
              <div className="options-grid">
                {MILKS.map((m) => (
                  <button
                    key={m.id}
                    className={`option-btn ${selectedMilk.id === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedMilk(m)}
                  >
                    <div className="opt-title">{m.name}</div>
                    <div className="opt-sub">
                      {m.extraPrice === 0 ? 'Included' : `+Rs. ${m.extraPrice}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Flavor & Sweetness */}
            <div className="option-section">
              <label className="section-label">3. Flavor & Sweetness Infusion</label>
              <div className="options-grid">
                {FLAVORS.map((f) => (
                  <button
                    key={f.id}
                    className={`option-btn ${selectedFlavor.id === f.id ? 'active' : ''}`}
                    onClick={() => setSelectedFlavor(f)}
                  >
                    <div className="opt-title">{f.name}</div>
                    <div className="opt-sub">
                      {f.extraPrice === 0 ? 'No Charge' : `+Rs. ${f.extraPrice}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Toppings */}
            <div className="option-section">
              <label className="section-label">4. Specialty Toppings & Foam</label>
              <div className="options-grid">
                {TOPPINGS.map((t) => (
                  <button
                    key={t.id}
                    className={`option-btn ${selectedTopping.id === t.id ? 'active' : ''}`}
                    onClick={() => setSelectedTopping(t)}
                  >
                    <div className="opt-title">{t.name}</div>
                    <div className="opt-sub">
                      {t.extraPrice === 0 ? 'None' : `+Rs. ${t.extraPrice}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Temperature */}
            <div className="option-section">
              <label className="section-label">5. Temperature</label>
              <div className="options-grid three-col">
                {TEMPS.map((tmp) => (
                  <button
                    key={tmp.id}
                    className={`option-btn ${selectedTemp.id === tmp.id ? 'active' : ''}`}
                    onClick={() => setSelectedTemp(tmp)}
                  >
                    <div className="opt-title">{tmp.icon} {tmp.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Fixed Modal Footer Actions: NEVER overlaps options */}
        <div className="customizer-footer-actions">
          <button 
            type="button"
            className="btn-add-custom-cart" 
            onClick={handleAddToCart}
          >
            <ShoppingBagIcon size={18} />
            <span>Add Custom Brew to Cart (Rs. {totalPrice})</span>
          </button>

          <button 
            type="button"
            className="btn-order-custom-whatsapp" 
            onClick={handleSendToWhatsApp}
          >
            <WhatsAppIcon size={18} />
            <span>Send to WhatsApp Barista</span>
          </button>
        </div>
      </div>
    </div>
  );
}

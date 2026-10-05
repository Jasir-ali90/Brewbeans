import React from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  StarIcon, 
  ClockIcon, 
  MapPinIcon, 
  ArrowRightIcon, 
  SparklesIcon, 
  PercentIcon, 
  BuildingIcon,
  ShoppingBagIcon
} from '../components/Icons';

export default function HomePage({ onNavigate, menuItems, onAddToCart }) {
  // Pick popular bestsellers
  const bestsellers = menuItems.filter(item => item.isPopular).slice(0, 4);

  return (
    <div className="page-wrapper home-page-view">
      {/* Hero Section with REAL Brewbeans Storefront Banner */}
      <section className="home-hero-section">
        <div 
          className="home-hero-bg" 
          style={{ backgroundImage: `url('${CAFE_INFO.bannerImage}')` }}
        >
          <div className="home-hero-overlay"></div>
        </div>

        <div className="section-container home-hero-container">
          <div className="home-hero-content">
            {/* Real Logo & Identity Badge */}
            <div className="home-brand-pill">
              <img 
                src={CAFE_INFO.logoImage} 
                alt="Brewbeans Karachi Official Logo" 
                className="home-official-logo"
              />
              <div className="pill-text">
                <span className="pill-tag">Authentic Specialty Coffee</span>
                <span className="pill-location">Gulshan-e-Iqbal Block 2, Karachi</span>
              </div>
            </div>

            <h1 className="home-title">
              Exceptional Coffee Begins With <span className="highlight-text">Exceptional Beans.</span>
            </h1>

            <p className="home-subtitle">
              Karachi’s two-story specialty coffee sanctuary. Order your fresh brew directly from our website with <strong>Cash on Delivery (COD)</strong> or <strong>Online Card Payment</strong>, or reserve your table in our cozy loft.
            </p>

            {/* Main Action Buttons */}
            <div className="home-cta-actions">
              <button 
                className="btn-primary-glow"
                onClick={() => onNavigate('menu')}
              >
                <ShoppingBagIcon size={18} />
                <span>Order Coffee Online</span>
                <ArrowRightIcon size={16} />
              </button>

              <button 
                className="btn-secondary-glass"
                onClick={() => onNavigate('booking')}
              >
                <BuildingIcon size={18} />
                <span>Reserve a Table</span>
              </button>

              <button 
                className="btn-subtle-outline"
                onClick={() => onNavigate('track')}
              >
                <ClockIcon size={16} />
                <span>Track Live Order</span>
              </button>
            </div>

            {/* Quick Badges Row */}
            <div className="home-stats-chips">
              <div className="stat-chip">
                <StarIcon filled={true} size={15} className="chip-icon gold" />
                <span><strong>4.9 ★</strong> Rating (85+ Google, 269+ Foodpanda)</span>
              </div>
              <div className="stat-chip">
                <ClockIcon size={15} className="chip-icon" />
                <span><strong>Open 9 AM – 4 AM</strong> (Late Night Haven)</span>
              </div>
              <div className="stat-chip">
                <MapPinIcon size={15} className="chip-icon" />
                <span>Rab Medical Center, Block 2 Gulshan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday 40% OFF Special Feature Card */}
      <section className="sunday-deal-highlight-strip">
        <div className="section-container">
          <div className="sunday-deal-card">
            <div className="deal-left">
              <div className="deal-badge-pill">
                <PercentIcon size={16} />
                <span>WEEKLY PERK</span>
              </div>
              <h3>40% OFF On All Handcrafted Drinks Every Sunday</h3>
              <p>Dine-in at our Gulshan Coffee Bar or place a direct delivery order right on our website!</p>
            </div>
            <div className="deal-right">
              <div className="code-box">
                <span className="code-label">PROMO CODE</span>
                <span className="code-val">SUNDAY40</span>
              </div>
              <button 
                className="btn-claim-deal"
                onClick={() => onNavigate('menu')}
              >
                <span>Order With 40% OFF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Service Pillars */}
      <section className="pillars-section">
        <div className="section-container">
          <div className="pillars-grid">
            <div className="pillar-card" onClick={() => onNavigate('menu')}>
              <div className="pillar-icon-box">
                <ShoppingBagIcon size={26} />
              </div>
              <h4>Direct Website Ordering</h4>
              <p>No extra fees or third-party delays. Order directly with Cash on Delivery or Debit/Credit card.</p>
              <span className="pillar-link">Browse Full Menu →</span>
            </div>

            <div className="pillar-card" onClick={() => onNavigate('booking')}>
              <div className="pillar-icon-box">
                <BuildingIcon size={26} />
              </div>
              <h4>Two-Story Table Booking</h4>
              <p>Reserve comfortable seating on our ground floor barista bar or relaxed 2nd floor loft lounge.</p>
              <span className="pillar-link">Book Your Table Now →</span>
            </div>

            <div className="pillar-card" onClick={() => onNavigate('track')}>
              <div className="pillar-icon-box">
                <ClockIcon size={26} />
              </div>
              <h4>Live Barista & Rider Tracker</h4>
              <p>Track your coffee in real-time from espresso extraction to doorstep delivery in Karachi.</p>
              <span className="pillar-link">Check Order Status →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section with REAL Images */}
      <section className="bestsellers-preview-section">
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow">
                <SparklesIcon size={14} />
                <span>Patrons' Top Favorites</span>
              </div>
              <h2 className="section-title">Fresh From Our Coffee Bar</h2>
            </div>
            <button 
              className="btn-view-all-menu"
              onClick={() => onNavigate('menu')}
            >
              <span>View All Menu ({menuItems.length} items)</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className="bestsellers-grid">
            {bestsellers.map(item => (
              <div key={item.id} className="bestseller-item-card">
                <div className="item-img-frame">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-photo"
                  />
                  {item.tag && <span className="item-tag-badge">{item.tag}</span>}
                </div>
                <div className="item-card-body">
                  <div className="item-header-top">
                    <h4>{item.name}</h4>
                    <span className="item-price">Rs. {item.price}</span>
                  </div>
                  <p className="item-short-desc">{item.description}</p>
                  <div className="item-card-footer">
                    <span className="sunday-deal-hint">Sunday: Rs. {Math.round(item.price * 0.6)}</span>
                    <button 
                      className="btn-add-quick"
                      onClick={() => onAddToCart(item)}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Sanctuary & Location Preview */}
      <section className="sanctuary-preview-section">
        <div className="section-container">
          <div className="sanctuary-banner-card">
            <div className="sanctuary-content">
              <span className="sanctuary-eyebrow">Gulshan-e-Iqbal Block 2</span>
              <h2>A Two-Story Coffee Sanctuary Designed for You</h2>
              <p>
                Whether you’re catching up with friends, having an intimate coffee date, or working late into the night with high-speed Wi-Fi, Brewbeans offers the coziest atmosphere in town.
              </p>
              <div className="sanctuary-action-row">
                <button 
                  className="btn-primary-glow"
                  onClick={() => onNavigate('booking')}
                >
                  <span>Reserve Table (Free)</span>
                </button>
                <button 
                  className="btn-secondary-glass"
                  onClick={() => onNavigate('about')}
                >
                  <span>Learn Our Story</span>
                </button>
              </div>
            </div>
            <div className="sanctuary-visual">
              <img 
                src="/images/real/real_img_8.jpg" 
                alt="Brewbeans Karachi Tiramisu Drink"
                className="sanctuary-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  StarIcon, 
  CoffeeIcon, 
  ClockIcon, 
  MapPinIcon, 
  FoodpandaIcon, 
  ArrowRightIcon,
  SparklesIcon
} from './Icons';

export default function Hero({ onOpenCustomizer, onQuickAddGoldenBeans }) {
  return (
    <section id="hero" className="hero-section">
      {/* Background with Ambient Overlay */}
      <div className="hero-background-image" style={{ backgroundImage: `url('/images/real/cafe_interior_loft.jpg')` }}>
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Accent Pill */}
          <div className="hero-pill-badge">
            <span className="pill-dot"></span>
            <SparklesIcon size={14} className="pill-icon" />
            <span>Two-Story Coffee Sanctuary • Gulshan Block 2</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Exceptional Coffee Begins With <span className="highlight-text">Exceptional Beans.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Welcome to <strong>Brewbeans Karachi</strong>. Step into our cozy two-story sanctuary in Gulshan-e-Iqbal for freshly pulled specialty espresso, silky Golden Beans lattes, viral Tiramisu delights, and warm handcrafted desserts.
          </p>

          {/* Action Button Row */}
          <div className="hero-cta-group">
            <a href="#menu" className="btn-hero-primary">
              <span>Explore Our Menu</span>
              <ArrowRightIcon size={18} />
            </a>

            <button 
              className="btn-hero-customizer" 
              onClick={onOpenCustomizer}
            >
              <CoffeeIcon size={18} />
              <span>Craft Your Own Brew</span>
            </button>

            <a
              href={CAFE_INFO.foodpandaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-foodpanda"
            >
              <FoodpandaIcon size={18} />
              <span>Order Delivery (Foodpanda)</span>
            </a>
          </div>

          {/* Social Proof & Badges Bar */}
          <div className="hero-stats-row">
            <div className="hero-stat-card">
              <div className="stat-stars">
                <StarIcon filled={true} size={16} />
                <span className="stat-number">4.9 / 5.0</span>
              </div>
              <span className="stat-label">Google (85+ reviews)</span>
            </div>

            <div className="hero-stat-card">
              <div className="stat-stars">
                <FoodpandaIcon size={16} />
                <span className="stat-number">4.9 / 5.0</span>
              </div>
              <span className="stat-label">Foodpanda (266+ ratings)</span>
            </div>

            <div className="hero-stat-card">
              <div className="stat-stars">
                <ClockIcon size={16} />
                <span className="stat-number">9 AM – 4 AM</span>
              </div>
              <span className="stat-label">Late Night Coffee Haven</span>
            </div>

            <div className="hero-stat-card">
              <div className="stat-stars">
                <MapPinIcon size={16} />
                <span className="stat-number">Gulshan Block 2</span>
              </div>
              <span className="stat-label">Near Rab Medical Center</span>
            </div>
          </div>
        </div>

        {/* Floating Spotlight Card */}
        <div className="hero-spotlight-card desktop-only float-animation">
          <div className="spotlight-tag">⭐ House Signature</div>
          <div className="spotlight-content">
            <div className="spotlight-header">
              <h3 className="spotlight-title">Golden Beans Latte</h3>
              <span className="spotlight-price">Rs. 440</span>
            </div>
            <p className="spotlight-desc">
              Velvety steamed whole milk layered over double golden espresso crema with warm honey-caramel tasting notes.
            </p>
            <div className="spotlight-footer">
              <span className="spotlight-badge">40% OFF Sundays</span>
              <button 
                className="btn-spotlight-order" 
                onClick={onQuickAddGoldenBeans}
                title="Add Golden Beans Latte to Order"
              >
                + Quick Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

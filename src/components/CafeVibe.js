import React from 'react';
import { CAFE_HIGHLIGHTS, CAFE_INFO } from '../data/coffeeData';
import { 
  BuildingIcon, 
  CoffeeIcon, 
  MoonIcon, 
  PercentIcon, 
  SparklesIcon, 
  InstagramIcon 
} from './Icons';

export default function CafeVibe() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Coffee': return <CoffeeIcon size={24} />;
      case 'Building': return <BuildingIcon size={24} />;
      case 'Moon': return <MoonIcon size={24} />;
      case 'Percent': return <PercentIcon size={24} />;
      default: return <SparklesIcon size={24} />;
    }
  };

  return (
    <section id="cafe-vibe" className="cafe-vibe-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <BuildingIcon size={16} />
            <span>The Coffee Sanctuary</span>
          </div>
          <h2 className="section-title">Karachi’s Two-Story Coffee Loft</h2>
          <p className="section-subtitle">
            Designed for intimate coffee dates, focused late-night work sessions, and relaxed weekend catch-ups right in the heart of Gulshan-e-Iqbal Block 2.
          </p>
        </div>

        {/* Visual Showcase Gallery Grid */}
        <div className="vibe-gallery-grid">
          {/* Main Large Interior Feature */}
          <div className="gallery-main-card">
            <img 
              src="/images/real/cafe_interior_loft.jpg" 
              alt="Brewbeans Karachi Two Story Loft Interior" 
              className="gallery-image"
              loading="lazy"
            />
            <div className="gallery-card-overlay">
              <span className="gallery-badge">Gulshan Block 2</span>
              <h3 className="gallery-title">Aesthetic Warmth & Ambient Lighting</h3>
              <p className="gallery-desc">
                Two-tier architecture with rustic brickwork, soft neon glow, warm oak tables, and lush greenery creates the ultimate cafe ambiance.
              </p>
            </div>
          </div>

          {/* Secondary Cards */}
          <div className="gallery-side-stack">
            {/* Iced Creations */}
            <div className="gallery-side-card">
              <img 
                src="/images/real/iced_coffee_real.jpg" 
                alt="Brewbeans Tiramisu Iced Coffee & Hazelnut Frappe" 
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-card-overlay compact">
                <span className="gallery-badge">Signature Chilled</span>
                <h4 className="gallery-side-title">Tiramisu Iced Delights & Frappes</h4>
                <p className="gallery-side-desc">Crafted for Karachi’s sunny afternoons and midnight coffee runs.</p>
              </div>
            </div>

            {/* Bakery & Desserts */}
            <div className="gallery-side-card">
              <img 
                src="/images/real/biscoff_cheesecake_real.jpg" 
                alt="Lotus Biscoff Cheesecake and Nutella Brownie" 
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-card-overlay compact">
                <span className="gallery-badge">Fresh Bakery</span>
                <h4 className="gallery-side-title">Biscoff Cheesecake & Fudgy Brownies</h4>
                <p className="gallery-side-desc">Baked fresh daily with imported Belgian chocolates and premium ingredients.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid">
          {CAFE_HIGHLIGHTS.map((item, idx) => (
            <div key={idx} className="highlight-card">
              <div className="highlight-icon-wrap">
                {getIcon(item.icon)}
              </div>
              <h4 className="highlight-title">{item.title}</h4>
              <p className="highlight-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Social Instagram Callout */}
        <div className="instagram-callout-banner">
          <div className="insta-text">
            <InstagramIcon size={24} className="insta-icon" />
            <div>
              <h4>Tag @brewbeans.karachi on Instagram & TikTok</h4>
              <p>Share your coffee moments and reels for a chance to be featured on our official page!</p>
            </div>
          </div>
          <a 
            href={CAFE_INFO.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-follow-insta"
          >
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}

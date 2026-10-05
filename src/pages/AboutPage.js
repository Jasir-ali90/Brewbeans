import React from 'react';
import { 
  BuildingIcon, 
  CoffeeIcon, 
  ClockIcon, 
  SparklesIcon, 
  ArrowRightIcon 
} from '../components/Icons';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-wrapper about-page-view">
      {/* Header */}
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="banner-badge">
            <BuildingIcon size={16} />
            <span>The Coffee Sanctuary</span>
          </div>
          <h1 className="page-title">The Story Behind Brewbeans Karachi</h1>
          <p className="page-sub">
            How a passion for authentic specialty coffee transformed a space in Gulshan-e-Iqbal Block 2 into Karachi’s favorite two-story coffee loft.
          </p>
        </div>
      </div>

      <div className="section-container about-content-container">
        {/* Story Intro Split */}
        <div className="about-story-split">
          <div className="story-text-col">
            <span className="eyebrow-accent">Crafting Culture In K-Town</span>
            <h2>Where Artisan Coffee Meets Warm Karachi Hospitality</h2>
            <p>
              Brewbeans was founded on a simple, uncompromising belief: <strong>exceptional coffee begins with exceptional beans</strong>. In a city vibrant with late-night conversations and lively culture, we saw the need for a true specialty coffee haven in Gulshan-e-Iqbal.
            </p>
            <p>
              Located centrally near Rab Medical Center in Block 2, our two-story coffee sanctuary was designed from the ground up to be your home away from home. Whether you need an early morning caffeine kick at 9 AM or a late-night study haven at 3 AM, our doors remain open with fresh espresso, rich crema, and welcoming smiles.
            </p>

            <div className="story-key-stats">
              <div className="stat-box">
                <span className="num">4.9 ★</span>
                <span className="lbl">Google & Foodpanda Rating</span>
              </div>
              <div className="stat-box">
                <span className="num">9 AM – 4 AM</span>
                <span className="lbl">Open 19 Hours Daily</span>
              </div>
              <div className="stat-box">
                <span className="num">2 Floors</span>
                <span className="lbl">Spacious Loft Sanctuary</span>
              </div>
            </div>
          </div>

          <div className="story-image-col">
            <div className="image-card-frame">
              <img 
                src="/images/real/cafe_interior_loft.jpg" 
                alt="Brewbeans Karachi Coffee Bar" 
                className="about-real-img"
              />
              <div className="image-caption-pill">
                <span>Shop #6, Rab Medical Center, Gulshan Block 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="about-values-section">
          <h3 className="values-title">What Makes Brewbeans Special</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <CoffeeIcon size={26} />
              </div>
              <h4>Single-Origin & Specialty Arabica</h4>
              <p>We source high-altitude Arabica beans and roast them with precision to preserve delicate notes of dark chocolate, honey, and floral citrus.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <BuildingIcon size={26} />
              </div>
              <h4>Two-Tier Architectural Sanctuary</h4>
              <p>Designed with exposed rustic brickwork, amber lighting, oakwood tables, and ergonomic seating ideal for remote working, reading, and coffee dates.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <ClockIcon size={26} />
              </div>
              <h4>Late-Night Coffee Haven</h4>
              <p>Karachi is a city that never sleeps. Brewbeans is open until 4:00 AM every single night, serving freshly brewed hot and iced drinks for late owls.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <SparklesIcon size={26} />
              </div>
              <h4>40% OFF Sunday Ritual</h4>
              <p>Every Sunday, we celebrate our community with 40% OFF all handcrafted beverages, making specialty coffee accessible to everyone.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="about-cta-bar">
          <div>
            <h3>Ready to Experience Brewbeans?</h3>
            <p>Visit us in Gulshan-e-Iqbal or order your favorite coffee directly to your doorstep.</p>
          </div>
          <div className="cta-actions">
            <button className="btn-primary-glow" onClick={() => onNavigate('booking')}>
              <span>Book a Table</span>
              <ArrowRightIcon size={16} />
            </button>
            <button className="btn-secondary-glass" onClick={() => onNavigate('menu')}>
              <span>View Full Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

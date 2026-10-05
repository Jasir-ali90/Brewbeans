import React, { useState, useEffect } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  ShoppingBagIcon, 
  FoodpandaIcon, 
  WhatsAppIcon,
  BuildingIcon,
  ClockIcon,
  LockIcon,
  CoffeeIcon,
  SlidersIcon,
  SparklesIcon,
  MapPinIcon,
  ArrowRightIcon,
  XIcon
} from './Icons';

export default function Navbar({ 
  currentPage, 
  onNavigate, 
  cartCount, 
  onOpenCart, 
  onOpenCustomizer 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    // Open from 9 AM to 4 AM
    const open = hours >= 9 || hours < 4;
    setIsOpenNow(open);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Crest */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          title="Brewbeans Specialty Coffee Karachi"
        >
          <div className="brand-logo-frame">
            <img 
              src="/images/brewbeans_logo.jpg" 
              alt="Brewbeans Logo" 
              className="brand-logo-img" 
            />
            <span className="brand-crest-glow"></span>
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">BREWBEANS</span>
            <span className="brand-sub">
              <span className="gold-sparkle-dot">◆</span> SPECIALTY COFFEE • KARACHI
            </span>
          </div>
        </div>

        {/* Live Operating Status Capsule */}
        <div className="status-indicator-pill desktop-only" title="Daily Specialty Hours: 9:00 AM – 4:00 AM (Late Night Haven)">
          <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`}></span>
          <span className="status-text">
            {isOpenNow ? (
              <><strong>Open Now</strong> • Till 4 AM</>
            ) : (
              <><strong>Closed</strong> • Opens 9 AM</>
            )}
          </span>
        </div>

        {/* Multi-Page Desktop Navigation Links */}
        <nav className="nav-links desktop-only" aria-label="Main Navigation">
          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <span>Home</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'menu' ? 'active' : ''}`}
            onClick={() => handleNavClick('menu')}
          >
            <span>Menu & Order</span>
            <span className="nav-sub-badge">40% OFF</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn special-perk ${currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => handleNavClick('booking')}
          >
            <BuildingIcon size={14} />
            <span>Book Loft</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            <span>Sanctuary</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'track' ? 'active' : ''}`}
            onClick={() => handleNavClick('track')}
          >
            <ClockIcon size={13} />
            <span>Track Order</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            <span>Reviews</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn admin-link ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
            title="VIP Store Operations & Management Portal"
          >
            <LockIcon size={12} />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right Actions Cluster */}
        <div className="nav-actions">
          {/* Custom Brew Studio CTA */}
          <button 
            type="button"
            className="btn-nav-customizer desktop-only"
            onClick={onOpenCustomizer}
            title="Interactive Coffee Bar Customizer"
          >
            <SlidersIcon size={14} />
            <span>Custom Brew</span>
          </button>

          {/* Barista Hotline Button */}
          <a
            href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans%20Karachi!%20I%20want%20to%20order%20specialty%20coffee.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-whatsapp desktop-only"
            title="Chat directly with our Barista on WhatsApp"
          >
            <WhatsAppIcon size={14} />
            <span>0311 2463092</span>
          </a>

          {/* Shopping Cart Button */}
          <button 
            type="button"
            className={`btn-cart-trigger ${cartCount > 0 ? 'has-items' : ''}`} 
            onClick={onOpenCart}
            aria-label={`View Basket (${cartCount} items)`}
          >
            <ShoppingBagIcon size={18} />
            <span className="cart-btn-label desktop-only">Cart</span>
            {cartCount > 0 && (
              <span className="cart-counter-badge animate-badge">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile VIP Hamburger Toggle */}
          <button 
            type="button"
            className={`mobile-toggle-btn mobile-only ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation drawer"
            aria-expanded={mobileMenuOpen}
          >
            <div className="hamburger-box">
              <span className={`hamburger-line line-1 ${mobileMenuOpen ? 'open-1' : ''}`}></span>
              <span className={`hamburger-line line-2 ${mobileMenuOpen ? 'open-2' : ''}`}></span>
              <span className={`hamburger-line line-3 ${mobileMenuOpen ? 'open-3' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* VIP Mobile Navigation Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-nav-drawer-vip" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header-row">
              <div className="drawer-brand-wrap">
                <img 
                  src="/images/brewbeans_logo.jpg" 
                  alt="Brewbeans Logo" 
                  className="drawer-logo-small" 
                />
                <div>
                  <div className="drawer-brand-title">BREWBEANS</div>
                  <div className="drawer-brand-sub">Specialty Coffee Sanctuary</div>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-close-drawer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Operating Live Status Banner */}
            <div className="drawer-status-card">
              <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`}></span>
              <div className="status-card-text">
                <strong>{isOpenNow ? 'Open Now in Gulshan Block 2' : 'Closed Now'}</strong>
                <span>{isOpenNow ? 'Welcoming guests until 4:00 AM (Late Night Haven)' : 'Opens daily at 9:00 AM'}</span>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="drawer-scroll-body">
              {/* Group 1: Order & Experience */}
              <div className="drawer-group-label">DISCOVER & ORDER</div>
              
              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'home' ? 'active' : ''}`} 
                onClick={() => handleNavClick('home')}
              >
                <div className="nav-card-icon-box">
                  <SparklesIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">Home Sanctuary</div>
                  <div className="card-sub-hint">Storefront, features & bestsellers</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'menu' ? 'active' : ''}`} 
                onClick={() => handleNavClick('menu')}
              >
                <div className="nav-card-icon-box gold">
                  <CoffeeIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">
                    Artisan Menu & Order
                    <span className="card-pill-tag">40% OFF SUNDAY</span>
                  </div>
                  <div className="card-sub-hint">Single-origin Arabica, frappes & bakes</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className="vip-nav-card studio-highlight" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
              >
                <div className="nav-card-icon-box studio">
                  <SlidersIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">
                    Interactive Custom Brew
                    <span className="card-pill-tag studio">STUDIO</span>
                  </div>
                  <div className="card-sub-hint">Customize milk, syrup & mascarpone foam</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'checkout' ? 'active' : ''}`} 
                onClick={() => handleNavClick('checkout')}
              >
                <div className="nav-card-icon-box">
                  <ShoppingBagIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">Direct Checkout (COD & Card)</div>
                  <div className="card-sub-hint">Karachi doorstep delivery & pickup</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'track' ? 'active' : ''}`} 
                onClick={() => handleNavClick('track')}
              >
                <div className="nav-card-icon-box">
                  <ClockIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">Track Live Order</div>
                  <div className="card-sub-hint">Real-time barista & rider status stepper</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              {/* Group 2: Sanctuary & Ambience */}
              <div className="drawer-group-label">SANCTUARY & AMBIENCE</div>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'booking' ? 'active' : ''}`} 
                onClick={() => handleNavClick('booking')}
              >
                <div className="nav-card-icon-box loft">
                  <BuildingIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">
                    Book Two-Story Loft
                    <span className="card-pill-tag loft">RESERVE</span>
                  </div>
                  <div className="card-sub-hint">Barista bar, quiet loft & study corner</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'about' ? 'active' : ''}`} 
                onClick={() => handleNavClick('about')}
              >
                <div className="nav-card-icon-box">
                  <SparklesIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">The Coffee Sanctuary Story</div>
                  <div className="card-sub-hint">Roasting philosophy & community culture</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              <button 
                type="button"
                className={`vip-nav-card ${currentPage === 'contact' ? 'active' : ''}`} 
                onClick={() => handleNavClick('contact')}
              >
                <div className="nav-card-icon-box">
                  <MapPinIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">
                    Location, Hours & Reviews
                    <span className="card-pill-tag rating">4.9 ★</span>
                  </div>
                  <div className="card-sub-hint">Google Maps pin, Gulshan Block 2</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              {/* Group 3: Operations & Admin */}
              <div className="drawer-group-label">STORE OPERATIONS</div>

              <button 
                type="button"
                className={`vip-nav-card admin-card ${currentPage === 'admin' ? 'active' : ''}`} 
                onClick={() => handleNavClick('admin')}
              >
                <div className="nav-card-icon-box admin">
                  <LockIcon size={16} />
                </div>
                <div className="nav-card-content">
                  <div className="card-primary-title">
                    VIP Executive Admin Portal
                    <span className="card-pill-tag admin">PORTAL</span>
                  </div>
                  <div className="card-sub-hint">Live sales KPIs, orders pipeline & menu control</div>
                </div>
                <ArrowRightIcon size={14} className="nav-card-arrow" />
              </button>

              {/* Direct Instant Action CTAs */}
              <div className="drawer-actions-container">
                <a
                  href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans%20Karachi!%20I%20want%20to%20place%20an%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-cta-btn whatsapp"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Barista Hotline: 0311 2463092</span>
                </a>

                <a
                  href={CAFE_INFO.foodpandaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-cta-btn foodpanda"
                >
                  <FoodpandaIcon size={18} />
                  <span>Order Online via Foodpanda</span>
                </a>
              </div>

              {/* Footer Stamp */}
              <div className="drawer-footer-stamp">
                <div>Shop #6, Rab Medical Center, Gulshan Block 2, Karachi</div>
                <div className="sub-tag">Handcrafted Specialty Coffee • Open Daily 9 AM – 4 AM</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

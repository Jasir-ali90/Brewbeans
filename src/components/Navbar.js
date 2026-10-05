import React, { useState, useEffect } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  ShoppingBagIcon, 
  FoodpandaIcon, 
  WhatsAppIcon,
  BuildingIcon,
  ClockIcon,
  LockIcon,
  CoffeeIcon
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    // Open from 9 AM to 4 AM
    const open = hours >= 9 || hours < 4;
    setIsOpenNow(open);
  }, []);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          title="Brewbeans Karachi Home"
        >
          <img 
            src="/images/brewbeans_logo.jpg" 
            alt="Brewbeans Logo" 
            className="brand-logo-img" 
          />
          <div className="brand-text-wrap">
            <span className="brand-name">BREWBEANS</span>
            <span className="brand-sub">Specialty Coffee • Karachi</span>
          </div>
        </div>

        {/* Live Status Beacon */}
        <div className="status-indicator-pill desktop-only" title="Operating Hours: 9:00 AM – 4:00 AM Daily">
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
            Home
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'menu' ? 'active' : ''}`}
            onClick={() => handleNavClick('menu')}
          >
            Menu & Order
          </button>

          <button 
            type="button"
            className={`nav-link-btn special-perk ${currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => handleNavClick('booking')}
          >
            <BuildingIcon size={14} />
            <span>Book Table</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            Sanctuary
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'track' ? 'active' : ''}`}
            onClick={() => handleNavClick('track')}
          >
            <ClockIcon size={14} />
            <span>Track Order</span>
          </button>

          <button 
            type="button"
            className={`nav-link-btn ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Reviews & Map
          </button>

          <button 
            type="button"
            className={`nav-link-btn admin-link ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
            title="VIP Admin Management Portal"
          >
            <LockIcon size={13} />
            <span>Admin</span>
          </button>
        </nav>

        {/* Actions Group */}
        <div className="nav-actions">
          {/* Quick Customizer CTA */}
          <button 
            type="button"
            className="btn-nav-customizer desktop-only"
            onClick={onOpenCustomizer}
            title="Craft your custom specialty coffee"
          >
            <CoffeeIcon size={15} />
            <span>Custom Brew</span>
          </button>

          {/* Direct WhatsApp Hotline */}
          <a
            href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans%20Karachi!%20I%20want%20to%20order%20specialty%20coffee.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-action-whatsapp desktop-only"
            title="Chat with Barista on WhatsApp"
          >
            <WhatsAppIcon size={15} />
            <span>0311 2463092</span>
          </a>

          {/* Cart Trigger */}
          <button 
            type="button"
            className="btn-cart-trigger" 
            onClick={onOpenCart}
            aria-label={`View Basket with ${cartCount} items`}
          >
            <ShoppingBagIcon size={19} />
            <span className="cart-btn-label desktop-only">Cart</span>
            {cartCount > 0 && <span className="cart-counter-badge">{cartCount}</span>}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button"
            className="mobile-toggle-btn mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`bar ${mobileMenuOpen ? 'open-1' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open-2' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open-3' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-inner">
            <div className="mobile-status-block">
              <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`}></span>
              <span>{isOpenNow ? 'Open Now in Gulshan Block 2 (Until 4:00 AM)' : 'Opens at 9:00 AM'}</span>
            </div>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`} 
              onClick={() => handleNavClick('home')}
            >
              ☕ Home
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'menu' ? 'active' : ''}`} 
              onClick={() => handleNavClick('menu')}
            >
              📜 Menu & Order Online
            </button>

            <button 
              type="button"
              className="mobile-nav-item customizer" 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
            >
              ✨ Build Custom Brew Modal
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'booking' ? 'active' : ''}`} 
              onClick={() => handleNavClick('booking')}
            >
              🏛️ Reserve a Table (Two-Story Loft)
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'checkout' ? 'active' : ''}`} 
              onClick={() => handleNavClick('checkout')}
            >
              💳 Direct Checkout (COD & Online)
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'track' ? 'active' : ''}`} 
              onClick={() => handleNavClick('track')}
            >
              🛵 Track Live Order
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'about' ? 'active' : ''}`} 
              onClick={() => handleNavClick('about')}
            >
              ✨ The Coffee Sanctuary Story
            </button>

            <button 
              type="button"
              className={`mobile-nav-item ${currentPage === 'contact' ? 'active' : ''}`} 
              onClick={() => handleNavClick('contact')}
            >
              📍 Location, Hours & Reviews
            </button>

            <button 
              type="button"
              className={`mobile-nav-item admin ${currentPage === 'admin' ? 'active' : ''}`} 
              onClick={() => handleNavClick('admin')}
            >
              🔒 VIP Admin Portal / Store Control
            </button>

            <div className="mobile-direct-actions">
              <a
                href={CAFE_INFO.foodpandaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-action-btn foodpanda"
              >
                <FoodpandaIcon size={18} />
                <span>Order on Foodpanda</span>
              </a>
              <a
                href={`https://wa.me/${CAFE_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-action-btn whatsapp"
              >
                <WhatsAppIcon size={18} />
                <span>Call / WhatsApp: 0311 2463092</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

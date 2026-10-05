import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBagIcon, 
  XIcon,
  ArrowRightIcon
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'customizer', label: 'Custom Brew', isAction: true },
    { id: 'booking', label: 'Reservations' },
    { id: 'about', label: 'Sanctuary' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`luxury-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="luxury-nav-container">
        {/* 1. Left: Brand Identity */}
        <div 
          className="luxury-brand" 
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          title="Brewbeans Specialty Coffee"
        >
          <img 
            src="/images/brewbeans_logo.jpg" 
            alt="Brewbeans Logo" 
            className="luxury-logo-img" 
          />
          <div className="luxury-brand-meta">
            <span className="luxury-brand-name">BREWBEANS</span>
            <span className="luxury-brand-tag">SPECIALTY COFFEE • KARACHI</span>
          </div>
        </div>

        {/* 2. Center: Ultra-Clean Luxury Navigation (No clutter, spacious) */}
        <nav className="luxury-nav-center desktop-only" aria-label="Main Navigation">
          {navLinks.map((link) => {
            if (link.isAction) {
              return (
                <button
                  key={link.id}
                  type="button"
                  className="luxury-nav-link"
                  onClick={onOpenCustomizer}
                >
                  <span>{link.label}</span>
                </button>
              );
            }
            return (
              <button
                key={link.id}
                type="button"
                className={`luxury-nav-link ${currentPage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. Right: Refined Action Suite */}
        <div className="luxury-nav-right">
          {/* Subtle Admin Icon */}
          <button 
            type="button"
            className={`luxury-icon-btn desktop-only ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
            title="Management Portal"
            aria-label="Admin Portal"
          >
            <LockIcon size={15} />
          </button>

          {/* Minimalist Cart Trigger */}
          <button 
            type="button"
            className="luxury-cart-pill"
            onClick={onOpenCart}
            aria-label={`Shopping Bag with ${cartCount} items`}
          >
            <ShoppingBagIcon size={16} />
            <span className="cart-text desktop-only">Bag</span>
            <span className={`cart-count ${cartCount > 0 ? 'highlight' : ''}`}>
              {cartCount}
            </span>
          </button>

          {/* Primary Elegant CTA */}
          <button 
            type="button"
            className="luxury-primary-cta desktop-only"
            onClick={() => handleNavClick('menu')}
          >
            <span>Order Online</span>
          </button>

          {/* Minimalist 3-Line Mobile Hamburger */}
          <button 
            type="button"
            className={`luxury-hamburger mobile-only ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="ham-line line-1"></span>
            <span className="ham-line line-2"></span>
            <span className="ham-line line-3"></span>
          </button>
        </div>
      </div>

      {/* 4. Luxury Editorial Full-Screen Mobile Drawer via Portal */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="luxury-mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="luxury-mobile-panel" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mobile-panel-header">
              <div className="mobile-brand-row">
                <img 
                  src="/images/brewbeans_logo.jpg" 
                  alt="Brewbeans Logo" 
                  className="mobile-logo-thumb" 
                />
                <span className="mobile-brand-title">BREWBEANS</span>
              </div>
              <button 
                type="button"
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <XIcon size={18} />
              </button>
            </div>

            {/* Editorial Nav Links */}
            <nav className="mobile-editorial-nav">
              <button 
                type="button"
                className={`editorial-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <span className="link-num">01</span>
                <span className="link-title">Home Sanctuary</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'menu' ? 'active' : ''}`}
                onClick={() => handleNavClick('menu')}
              >
                <span className="link-num">02</span>
                <span className="link-title">Artisan Menu</span>
                <span className="pill-badge-gold">40% OFF</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className="editorial-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
              >
                <span className="link-num">03</span>
                <span className="link-title">Custom Brew Studio</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'booking' ? 'active' : ''}`}
                onClick={() => handleNavClick('booking')}
              >
                <span className="link-num">04</span>
                <span className="link-title">Loft Reservations</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'checkout' ? 'active' : ''}`}
                onClick={() => handleNavClick('checkout')}
              >
                <span className="link-num">05</span>
                <span className="link-title">Direct Checkout</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'track' ? 'active' : ''}`}
                onClick={() => handleNavClick('track')}
              >
                <span className="link-num">06</span>
                <span className="link-title">Track Live Order</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                <span className="link-num">07</span>
                <span className="link-title">Sanctuary Story</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                <span className="link-num">08</span>
                <span className="link-title">Locations & Reviews</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>

              <button 
                type="button"
                className={`editorial-link admin-editorial ${currentPage === 'admin' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
              >
                <span className="link-num">🔒</span>
                <span className="link-title">Admin Operations</span>
                <ArrowRightIcon size={16} className="link-arrow" />
              </button>
            </nav>

            {/* Editorial Footer */}
            <div className="mobile-panel-footer">
              <button 
                type="button"
                className="mobile-order-cta"
                onClick={() => handleNavClick('menu')}
              >
                <span>Order Online Now</span>
                <ArrowRightIcon size={16} />
              </button>

              <div className="mobile-footer-details">
                <p className="footer-address">Shop #6, Rab Medical Center, Gulshan Block 2</p>
                <p className="footer-hours">Daily 9:00 AM – 4:00 AM • Late Night Coffee Bar</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

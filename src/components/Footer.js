import React from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  InstagramIcon, 
  FacebookIcon, 
  FoodpandaIcon, 
  WhatsAppIcon 
} from './Icons';

export default function Footer({ onNavigate }) {
  const handleNav = (p) => {
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
              <img src="/images/brewbeans_logo.jpg" alt="Logo" className="footer-logo-img" />
              <span className="brand-name">BREWBEANS</span>
            </div>
            <p className="footer-desc">
              Exceptional coffee begins with exceptional beans. Gulshan-e-Iqbal's premier two-story specialty coffee sanctuary, bakery, and late-night haven.
            </p>
            <div className="footer-social-row">
              <a 
                href={CAFE_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a 
                href={CAFE_INFO.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a 
                href={`https://wa.me/${CAFE_INFO.phoneRaw}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a 
                href={CAFE_INFO.foodpandaUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn"
                aria-label="Foodpanda"
              >
                <FoodpandaIcon size={18} />
              </a>
            </div>
          </div>

          {/* Dedicated Pages Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Pages & Services</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav('home')} className="footer-btn-link">Home Page</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Order Coffee Menu</button></li>
              <li><button onClick={() => handleNav('booking')} className="footer-btn-link">Reserve a Table</button></li>
              <li><button onClick={() => handleNav('track')} className="footer-btn-link">Track Your Order</button></li>
              <li><button onClick={() => handleNav('about')} className="footer-btn-link">The Two-Story Sanctuary</button></li>
              <li><button onClick={() => handleNav('contact')} className="footer-btn-link">Contact & Reviews</button></li>
              <li><button onClick={() => handleNav('admin')} className="footer-btn-link gold">🔒 Store Admin Portal</button></li>
            </ul>
          </div>

          {/* Authentic Real Customer Favorites */}
          <div className="footer-col">
            <h4 className="footer-heading">House Favorites</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Tiramisu Brew Frappe (Rs. 695)</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Iced Spanish Latte (Rs. 540)</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Roasted Hazelnut Frappe (Rs. 650)</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Golden Beans Latte (Rs. 440)</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Lotus Biscoff Cheesecake (Rs. 550)</button></li>
              <li><button onClick={() => handleNav('menu')} className="footer-btn-link">Nutella Fudgy Brownie (Rs. 380)</button></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">Visit Us</h4>
            <div className="footer-contact-item">
              <MapPinIcon size={18} className="f-icon" />
              <span>{CAFE_INFO.address}</span>
            </div>
            <div className="footer-contact-item">
              <PhoneIcon size={18} className="f-icon" />
              <a href={`tel:${CAFE_INFO.phone}`}>{CAFE_INFO.phone}</a>
            </div>
            <div className="footer-contact-item">
              <ClockIcon size={18} className="f-icon" />
              <span>9:00 AM – 4:00 AM Daily (Closes 3:30 AM kitchen)</span>
            </div>
            <div className="footer-tag-open">
              <span className="status-dot open"></span>
              <span>Open Late Night in Karachi</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Brewbeans Karachi. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Gulshan-e-Iqbal Block 2 • Near Rab Medical Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  FoodpandaIcon, 
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  ArrowRightIcon
} from './Icons';

export default function LocationHours() {
  return (
    <section id="location" className="location-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <MapPinIcon size={16} />
            <span>Visit Or Order</span>
          </div>
          <h2 className="section-title">Find Us in Gulshan-e-Iqbal</h2>
          <p className="section-subtitle">
            Centrally positioned in Block 2, Karachi. Ample parking, warm indoor seating, and rapid doorstep delivery.
          </p>
        </div>

        <div className="location-grid">
          {/* Information Card */}
          <div className="location-info-card">
            {/* Address Block */}
            <div className="info-block">
              <div className="info-icon-badge">
                <MapPinIcon size={22} />
              </div>
              <div className="info-details">
                <h4>Address & Landmark</h4>
                <p className="address-highlight">{CAFE_INFO.address}</p>
                <span className="landmark-tag">📍 {CAFE_INFO.landmark}</span>
              </div>
            </div>

            {/* Timings Block */}
            <div className="info-block">
              <div className="info-icon-badge">
                <ClockIcon size={22} />
              </div>
              <div className="info-details">
                <h4>Hours of Operation</h4>
                <p className="hours-highlight">Monday – Sunday: 9:00 AM to 4:00 AM</p>
                <p className="hours-sub">Kitchen & last order closes at 3:30 AM</p>
                <div className="open-status-badge">
                  <span className="status-dot open"></span>
                  <span>Open Daily (Late Night Destination)</span>
                </div>
              </div>
            </div>

            {/* Contact & Orders Block */}
            <div className="info-block">
              <div className="info-icon-badge">
                <PhoneIcon size={22} />
              </div>
              <div className="info-details">
                <h4>Call or WhatsApp Direct</h4>
                <a href={`tel:${CAFE_INFO.phone}`} className="phone-link">
                  {CAFE_INFO.phone}
                </a>
                <p className="phone-sub">Direct table reservation, catering & takeaway pickup inquiries</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="location-action-buttons">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-location-action primary"
              >
                <MapPinIcon size={18} />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans!%20I%20want%20to%20order%20specialty%20coffee.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-location-action whatsapp"
              >
                <WhatsAppIcon size={18} />
                <span>WhatsApp Barista</span>
              </a>

              <a
                href={CAFE_INFO.foodpandaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-location-action foodpanda"
              >
                <FoodpandaIcon size={18} />
                <span>Foodpanda Delivery</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="social-links-row">
              <span className="social-label">Follow Us:</span>
              <a 
                href={CAFE_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-pill"
                title="Instagram @brewbeans.karachi"
              >
                <InstagramIcon size={16} />
                <span>@brewbeans.karachi</span>
              </a>
              <a 
                href={CAFE_INFO.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-pill"
                title="Facebook @brewbeanskhi"
              >
                <FacebookIcon size={16} />
                <span>@brewbeanskhi</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map Card */}
          <div className="location-visual-card">
            <div className="map-embed-wrapper">
              <iframe
                title="Brewbeans Karachi Location Map"
                src="https://maps.google.com/maps?q=plot+num+sb+rab+medical+center+Shop+no+6+Block+2+Gulshan-e-Iqbal+Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="map-footer-banner">
              <div>
                <strong>Brewbeans Coffee Bar</strong>
                <p>Block 2 Gulshan-e-Iqbal, Karachi</p>
              </div>
              <a 
                href={CAFE_INFO.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-open-maps"
              >
                <span>Navigate</span>
                <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

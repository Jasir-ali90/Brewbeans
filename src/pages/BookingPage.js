import React, { useState } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  BuildingIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CheckIcon, 
  SparklesIcon, 
  ArrowRightIcon 
} from '../components/Icons';

export default function BookingPage({ onAddBooking, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00 (8:00 PM)',
    guests: '2 Guests',
    seating: '2nd Floor Loft Sanctuary',
    notes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const timeSlots = [
    '10:00 AM (Morning Brew)',
    '12:00 PM (Noon Catch-up)',
    '02:30 PM (Afternoon Coffee)',
    '05:00 PM (Sunset Session)',
    '08:00 PM (Prime Evening)',
    '10:00 PM (Night Hangout)',
    '11:30 PM (Late Night Work/Study)',
    '01:30 AM (Midnight Coffee Run)',
    '03:00 AM (Pre-Closing Brew)',
  ];

  const seatingOptions = [
    { id: '2nd Floor Loft Sanctuary', desc: 'Cozy, aesthetic lighting & relaxed seating' },
    { id: 'Ground Floor Barista Bar', desc: 'Watch our baristas pull espresso shots' },
    { id: 'Study Quiet Corner', desc: 'Dedicated charging sockets & high-speed Wi-Fi' },
    { id: 'Outdoor Patio Verandah', desc: 'Fresh air & open seating' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number to reserve a table.');
      return;
    }

    const newBooking = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      seating: formData.seating,
      notes: formData.notes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleString(),
    };

    onAddBooking(newBooking);
    setBookingConfirmed(newBooking);
  };

  return (
    <div className="page-wrapper booking-page-view">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="banner-badge">
            <BuildingIcon size={16} />
            <span>Table Reservations</span>
          </div>
          <h1 className="page-title">Reserve Your Spot at the Sanctuary</h1>
          <p className="page-sub">
            Experience Karachi's coziest two-story coffee loft in Gulshan Block 2. Instant guaranteed seating with no reservation fee.
          </p>
        </div>
      </div>

      <div className="section-container booking-container">
        {bookingConfirmed ? (
          /* Confirmation Success Card */
          <div className="booking-confirmation-ticket">
            <div className="ticket-header">
              <div className="ticket-success-icon">
                <CheckIcon size={32} />
              </div>
              <h2>Table Reservation Confirmed!</h2>
              <p>We are delighted to host you at Brewbeans Karachi.</p>
              <span className="booking-id-tag">Reference: {bookingConfirmed.id}</span>
            </div>

            <div className="ticket-details-grid">
              <div className="ticket-field">
                <span className="lbl">Guest Name</span>
                <span className="val">{bookingConfirmed.name}</span>
              </div>
              <div className="ticket-field">
                <span className="lbl">Contact Phone</span>
                <span className="val">{bookingConfirmed.phone}</span>
              </div>
              <div className="ticket-field">
                <span className="lbl">Reservation Date</span>
                <span className="val">{bookingConfirmed.date}</span>
              </div>
              <div className="ticket-field">
                <span className="lbl">Reserved Time</span>
                <span className="val">{bookingConfirmed.time}</span>
              </div>
              <div className="ticket-field">
                <span className="lbl">Party Size</span>
                <span className="val">{bookingConfirmed.guests}</span>
              </div>
              <div className="ticket-field">
                <span className="lbl">Seating Zone</span>
                <span className="val">{bookingConfirmed.seating}</span>
              </div>
            </div>

            {bookingConfirmed.notes && (
              <div className="ticket-notes">
                <strong>Special Request:</strong> {bookingConfirmed.notes}
              </div>
            )}

            <div className="ticket-location-info">
              <MapPinIcon size={18} className="gold" />
              <span>{CAFE_INFO.address} (Near Rab Medical Center)</span>
            </div>

            <div className="ticket-actions-row">
              <button 
                className="btn-primary-glow"
                onClick={() => onNavigate('menu')}
              >
                <span>Browse Menu & Pre-Order</span>
                <ArrowRightIcon size={16} />
              </button>
              <button 
                className="btn-secondary-glass"
                onClick={() => setBookingConfirmed(null)}
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form Layout */
          <div className="booking-layout-grid">
            {/* Form Left */}
            <div className="booking-form-card">
              <h3 className="form-card-title">Enter Reservation Details</h3>
              <p className="form-card-sub">All bookings are free of charge and held for 15 minutes past arrival time.</p>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row-two">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Phone (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 0311 2463092"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Reservation Date *</label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Party Size *</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="form-input"
                    >
                      <option value="1 Guest">1 Guest (Solo Study / Remote Work)</option>
                      <option value="2 Guests">2 Guests (Coffee Date)</option>
                      <option value="3-4 Guests">3-4 Guests (Small Group)</option>
                      <option value="5-6 Guests">5-6 Guests (Friends / Family)</option>
                      <option value="7-10 Guests">7-10 Guests (Large Gathering)</option>
                      <option value="10+ Guests">10+ Guests (Private Area Inquiry)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Preferred Time Slot *</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="form-input"
                  >
                    {timeSlots.map((ts, idx) => (
                      <option key={idx} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Seating Area *</label>
                  <div className="seating-options-grid">
                    {seatingOptions.map((opt) => (
                      <div 
                        key={opt.id}
                        className={`seating-card ${formData.seating === opt.id ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, seating: opt.id })}
                      >
                        <div className="seating-title">{opt.id}</div>
                        <div className="seating-desc">{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Notes or Occasion (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Birthday celebration, please arrange corner table, high-speed Wi-Fi required..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-submit-booking">
                  <SparklesIcon size={18} />
                  <span>Confirm Table Reservation</span>
                </button>
              </form>
            </div>

            {/* Information Right */}
            <div className="booking-info-sidebar">
              <div className="info-promo-box">
                <img 
                  src="/images/real/cafe_study_loft.jpg" 
                  alt="Brewbeans Cafe Ambience" 
                  className="sidebar-img"
                />
                <div className="info-promo-content">
                  <h4>Why Reserve at Brewbeans?</h4>
                  <ul className="info-perks-list">
                    <li>✨ <strong>Two-Story Loft:</strong> Plenty of space, atmospheric ambient lighting.</li>
                    <li>⚡ <strong>Work & Study Friendly:</strong> Power outlets and high-speed Wi-Fi.</li>
                    <li>🌙 <strong>Late Night Open:</strong> Relaxed vibes open until 4:00 AM daily.</li>
                    <li>☕ <strong>Artisan Coffee & Bakery:</strong> Freshly roasted Arabica, Biscoff cheesecake, and brownies.</li>
                  </ul>
                </div>
              </div>

              <div className="direct-assistance-card">
                <h5>Need Immediate Assistance?</h5>
                <p>For urgent reservations, corporate bookings, or inquiries:</p>
                <a href={`tel:${CAFE_INFO.phone}`} className="phone-badge">
                  <PhoneIcon size={18} />
                  <span>{CAFE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

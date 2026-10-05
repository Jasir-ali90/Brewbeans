import React, { useState } from 'react';
import { CAFE_INFO } from '../data/coffeeData';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  StarIcon, 
  WhatsAppIcon, 
  InstagramIcon, 
  FacebookIcon, 
  FoodpandaIcon, 
  SparklesIcon, 
  CheckIcon 
} from '../components/Icons';

export default function ContactPage({ reviews, onAddReview }) {
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: '',
    source: 'Website Review',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) {
      alert('Please enter your name and review message.');
      return;
    }

    const reviewObj = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      rating: Number(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      source: 'Verified Website Patron',
    };

    onAddReview(reviewObj);
    setSubmitted(true);
    setNewReview({ author: '', rating: 5, comment: '', source: 'Website Review' });
  };

  return (
    <div className="page-wrapper contact-page-view">
      <div className="page-hero-banner compact">
        <div className="section-container">
          <h1 className="page-title">Location, Hours & Patron Feedback</h1>
          <p className="page-sub">Visit us in Gulshan Block 2 or share your coffee experience with our community.</p>
        </div>
      </div>

      <div className="section-container contact-main-container">
        {/* Info & Map Split */}
        <div className="contact-info-grid">
          {/* Contact Details Card */}
          <div className="contact-details-box">
            <h3>Find Our Coffee Bar</h3>

            <div className="contact-item">
              <div className="item-icon-circle">
                <MapPinIcon size={20} />
              </div>
              <div>
                <strong>Address</strong>
                <p>{CAFE_INFO.address}</p>
                <span className="landmark-tag">📍 {CAFE_INFO.landmark}</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="item-icon-circle">
                <ClockIcon size={20} />
              </div>
              <div>
                <strong>Operating Timings</strong>
                <p>Monday – Sunday: 9:00 AM – 4:00 AM</p>
                <span className="timing-note">Kitchen / Last Orders close at 3:30 AM</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="item-icon-circle">
                <PhoneIcon size={20} />
              </div>
              <div>
                <strong>Telephone Hotline</strong>
                <p><a href={`tel:${CAFE_INFO.phone}`}>{CAFE_INFO.phone}</a></p>
                <span className="timing-note">Direct line for table booking & takeaway</span>
              </div>
            </div>

            <div className="contact-social-pills">
              <a href={CAFE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-tag">
                <InstagramIcon size={16} />
                <span>@brewbeans.karachi</span>
              </a>
              <a href={CAFE_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-tag">
                <FacebookIcon size={16} />
                <span>@brewbeanskhi</span>
              </a>
              <a href={`https://wa.me/${CAFE_INFO.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="social-tag whatsapp">
                <WhatsAppIcon size={16} />
                <span>WhatsApp Barista</span>
              </a>
              <a href={CAFE_INFO.foodpandaUrl} target="_blank" rel="noopener noreferrer" className="social-tag foodpanda">
                <FoodpandaIcon size={16} />
                <span>Foodpanda</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="contact-map-box">
            <iframe
              title="Brewbeans Karachi Google Map"
              src="https://maps.google.com/maps?q=plot+num+sb+rab+medical+center+Shop+no+6+Block+2+Gulshan-e-Iqbal+Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="reviews-section-wrapper">
          <div className="reviews-header">
            <div>
              <h2>Community Reviews & Ratings</h2>
              <p>Rated <strong>4.9 ★</strong> across 350+ customer reviews on Google and Foodpanda.</p>
            </div>
          </div>

          <div className="reviews-split-grid">
            {/* Reviews List Left */}
            <div className="reviews-cards-list">
              {reviews.map(rev => (
                <div key={rev.id} className="patron-review-card">
                  <div className="card-top">
                    <div className="stars-row">
                      {[...Array(rev.rating)].map((_, i) => (
                        <StarIcon key={i} size={15} filled={true} className="star-gold" />
                      ))}
                    </div>
                    <span className="source-badge">{rev.source}</span>
                  </div>
                  <p className="review-body">“{rev.comment}”</p>
                  <div className="card-bottom">
                    <strong>{rev.author}</strong>
                    <span className="review-date">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Leave a Review Form Right */}
            <div className="leave-review-card">
              <h3>Leave a Review</h3>
              <p>Share your experience at Brewbeans Karachi.</p>

              {submitted ? (
                <div className="review-success-notice">
                  <CheckIcon size={24} className="gold" />
                  <h4>Thank you for your feedback!</h4>
                  <p>Your review has been posted successfully to our community feed.</p>
                  <button className="btn-secondary-glass" onClick={() => setSubmitted(false)}>
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="review-form">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Saad Farooq"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Rating (1 to 5 Stars) *</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="form-input"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional!)</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                      <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                      <option value={2}>⭐⭐ 2 Stars (Needs Improvement)</option>
                      <option value={1}>⭐ 1 Star (Disappointed)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Experience *</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Tell us about the coffee, taste, vibe, or service..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button type="submit" className="btn-submit-review">
                    <SparklesIcon size={16} />
                    <span>Publish Review</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

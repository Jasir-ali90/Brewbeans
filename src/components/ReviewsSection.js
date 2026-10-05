import React from 'react';
import { TESTIMONIALS } from '../data/coffeeData';
import { 
  StarIcon, 
  SparklesIcon, 
  ArrowRightIcon 
} from './Icons';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <StarIcon size={16} />
            <span>Community Love</span>
          </div>
          <h2 className="section-title">Loved by Coffee Connoisseurs</h2>
          <p className="section-subtitle">
            With a 4.9-star rating across Google and Foodpanda, see why Karachiites keep returning to Brewbeans day and night.
          </p>
        </div>

        {/* Aggregated Score Bar */}
        <div className="ratings-summary-bar">
          <div className="rating-pill-card">
            <div className="rating-pill-val">4.9 ★</div>
            <div className="rating-pill-meta">
              <strong>Google Reviews</strong>
              <span>85+ verified patrons</span>
            </div>
          </div>

          <div className="rating-pill-card">
            <div className="rating-pill-val">4.9 ★</div>
            <div className="rating-pill-meta">
              <strong>Foodpanda Karachi</strong>
              <span>266+ customer ratings</span>
            </div>
          </div>

          <div className="rating-pill-card">
            <div className="rating-pill-val">5.0 ★</div>
            <div className="rating-pill-meta">
              <strong>Facebook Reviews</strong>
              <span>Community recommendation</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((rev) => (
            <div key={rev.id} className="testimonial-card">
              <div className="card-top-row">
                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <StarIcon key={i} size={16} filled={true} className="star-icon-gold" />
                  ))}
                </div>
                <span className="review-source-tag">{rev.source}</span>
              </div>

              <p className="testimonial-text">“{rev.comment}”</p>

              <div className="testimonial-footer">
                <div>
                  <div className="reviewer-name">{rev.name}</div>
                  <div className="reviewer-role">{rev.role}</div>
                </div>
                <span className="review-date">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout to write a review */}
        <div className="write-review-callout">
          <div className="callout-inner">
            <SparklesIcon size={24} className="accent-icon" />
            <div>
              <h3>Have you visited Brewbeans Gulshan?</h3>
              <p>Your feedback helps us continuously perfect every single espresso pull and pastry bake.</p>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=Brewbeans+Karachi+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-leave-review"
          >
            <span>Leave a Google Review</span>
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

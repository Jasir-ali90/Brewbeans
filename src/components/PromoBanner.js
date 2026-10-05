import React, { useState } from 'react';
import { PercentIcon, SparklesIcon, CheckIcon } from './Icons';

export default function PromoBanner({ onApplyCode, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const promoCode = "SUNDAY40";

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(promoCode);
    } catch (err) {
      // fallback
    }
    setCopied(true);
    if (onApplyCode) {
      onApplyCode(promoCode);
    }
    setTimeout(() => setCopied(false), 2800);
  };

  return (
    <aside className="sunday-promo-ribbon" aria-label="Sunday Signature Offer">
      <div className="promo-ribbon-container">
        {/* Left Badge */}
        <div className="promo-badge-tag">
          <PercentIcon size={14} className="tag-icon" />
          <span className="tag-text">SUNDAY SIGNATURE OFFER</span>
        </div>

        {/* Center Headline */}
        <p className="promo-ribbon-text">
          <span className="promo-highlight">Enjoy 40% OFF on all handcrafted drinks every Sunday!</span>
          <span className="promo-details desktop-only">Dine-in at Gulshan Block 2 or order online on our website.</span>
        </p>

        {/* Right Coupon & Action */}
        <div className="promo-action-group">
          <div className="promo-code-pill" title="Use code SUNDAY40 at checkout">
            <span className="code-hint">CODE:</span>
            <strong className="code-text">{promoCode}</strong>
          </div>

          <button 
            type="button"
            className={`btn-promo-apply ${copied ? 'applied' : ''}`}
            onClick={handleCopy}
            aria-label="Claim 40% OFF code"
          >
            {copied ? (
              <>
                <CheckIcon size={14} />
                <span>40% Applied!</span>
              </>
            ) : (
              <>
                <SparklesIcon size={14} />
                <span>Claim Offer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

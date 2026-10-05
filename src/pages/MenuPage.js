import React, { useState, useMemo } from 'react';
import { 
  CoffeeIcon, 
  SearchIcon, 
  PlusIcon, 
  PercentIcon, 
  ShoppingBagIcon, 
  ArrowRightIcon,
  SlidersIcon
} from '../components/Icons';

const CATEGORIES = [
  { id: 'all', label: 'All Drinks & Treats' },
  { id: 'frappe', label: 'Frappes & Coolers' },
  { id: 'iced', label: 'Iced & Cold Brews' },
  { id: 'hot', label: 'Hot Specialty Coffee' },
  { id: 'desserts', label: 'Bakery & Desserts' },
  { id: 'beans', label: 'Whole Roasted Beans' },
];

export default function MenuPage({ menuItems, onAddToCart, onOpenCustomizer, cartCount, onNavigate }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySundayDeals, setOnlySundayDeals] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category match
      const catMatch = selectedCat === 'all' || item.category === selectedCat;
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q));

      // Sunday deal match
      const isDrink = item.category === 'hot' || item.category === 'iced' || item.category === 'frappe';
      const sundayMatch = !onlySundayDeals || isDrink;

      return catMatch && searchMatch && sundayMatch;
    });
  }, [menuItems, selectedCat, searchQuery, onlySundayDeals]);

  return (
    <div className="page-wrapper menu-page-view">
      {/* Header Banner */}
      <div className="page-hero-banner">
        <div className="section-container">
          <div className="banner-badge">
            <CoffeeIcon size={16} />
            <span>Specialty Coffee Bar & Bakery</span>
          </div>
          <h1 className="page-title">Brewbeans Artisan Menu</h1>
          <p className="page-sub">
            Freshly pulled single-origin Arabica, velvety micro-foamed lattes, blended frappes, and handcrafted desserts in Gulshan Block 2.
          </p>
        </div>
      </div>

      <div className="section-container menu-main-content">
        {/* Controls Bar: Search & Filters */}
        <div className="menu-filter-controls">
          <div className="search-bar-wrap">
            <SearchIcon size={18} className="search-ico" />
            <input 
              type="text" 
              placeholder="Search by drink name or flavor (e.g. Tiramisu, Spanish Latte, Brownie)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button 
                className="clear-btn" 
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-actions-row">
            <button 
              type="button"
              className={`sunday-filter-toggle ${onlySundayDeals ? 'active' : ''}`}
              onClick={() => setOnlySundayDeals(!onlySundayDeals)}
            >
              <PercentIcon size={15} />
              <span>Sunday 40% OFF</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs-row">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              <span>{cat.label}</span>
              {cat.id === 'all' && <span className="cat-count">({menuItems.length})</span>}
            </button>
          ))}
        </div>

        {/* Interactive Custom Brew Studio Card */}
        <div className="custom-brew-promo-banner" onClick={onOpenCustomizer} role="button" tabIndex={0}>
          <div className="promo-banner-left">
            <div className="custom-pill-badge">
              <SlidersIcon size={14} />
              <span>INTERACTIVE COFFEE STUDIO</span>
            </div>
            <h3>Craft Your Signature Cup</h3>
            <p>Choose your espresso pull, artisanal milk (Oat, Sweet Condensed, Whole), flavor drizzle, and mascarpone foam cloud.</p>
          </div>
          <div className="promo-banner-right">
            <button 
              type="button" 
              className="btn-open-customizer-hero"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCustomizer();
              }}
            >
              <CoffeeIcon size={16} />
              <span>Build Custom Brew</span>
              <ArrowRightIcon size={15} />
            </button>
          </div>
        </div>

        {/* Menu Items Grid with Real Photos */}
        {filteredItems.length > 0 ? (
          <div className="menu-catalog-grid">
            {filteredItems.map(item => {
              const isDrink = item.category === 'hot' || item.category === 'iced' || item.category === 'frappe';
              const sundayPrice = isDrink ? Math.round(item.price * 0.6) : null;

              return (
                <div key={item.id} className="menu-product-card">
                  {/* Real Photo Thumbnail */}
                  <div className="product-image-box">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="product-real-img"
                      loading="lazy"
                    />
                    <div className="product-badges-overlay">
                      {item.tag && <span className="tag-pill">{item.tag}</span>}
                      {item.isPopular && <span className="popular-pill">⭐ Bestseller</span>}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="product-info-box">
                    <div className="product-title-row">
                      <h3 className="product-name">{item.name}</h3>
                    </div>

                    <p className="product-desc">{item.description}</p>

                    {/* Price & Action Row */}
                    <div className="product-footer-row">
                      <div className="product-pricing">
                        <span className="price-main">Rs. {item.price}</span>
                        {sundayPrice && (
                          <span className="sunday-badge">
                            Sunday: Rs. {sundayPrice} (-40%)
                          </span>
                        )}
                      </div>

                      <div className="product-action-buttons">
                        {isDrink && (
                          <button
                            className="btn-customize-quick"
                            onClick={onOpenCustomizer}
                            title="Customize Milk, Sweetness & Ice"
                          >
                            <SlidersIcon size={14} />
                          </button>
                        )}
                        <button
                          className="btn-add-item"
                          onClick={() => onAddToCart(item)}
                        >
                          <PlusIcon size={16} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="menu-no-results">
            <CoffeeIcon size={42} />
            <h3>No drinks or treats found</h3>
            <p>Try searching for a different keyword or reset your filter.</p>
            <button 
              className="btn-reset-search"
              onClick={() => {
                setSearchQuery('');
                setSelectedCat('all');
                setOnlySundayDeals(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Checkout Sticky Bar (When cart has items) */}
        {cartCount > 0 && (
          <div className="sticky-checkout-bar">
            <div className="checkout-bar-inner">
              <div className="bar-info">
                <ShoppingBagIcon size={20} className="gold" />
                <span><strong>{cartCount} item{cartCount === 1 ? '' : 's'}</strong> in your basket</span>
              </div>
              <button 
                className="btn-go-checkout"
                onClick={() => onNavigate('checkout')}
              >
                <span>Proceed to Checkout (COD / Online)</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

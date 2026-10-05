import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/coffeeData';
import { 
  CoffeeIcon, 
  SearchIcon, 
  PlusIcon, 
  SlidersIcon,
  PercentIcon
} from './Icons';

export default function MenuSection({ onAddToCart, onCustomizeItem }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      // Search check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.notes.some(n => n.toLowerCase().includes(q)) ||
        item.tag.toLowerCase().includes(q);

      // Discounted filter
      const matchesDiscount = !onlyDiscounted || item.category === "hot" || item.category === "iced" || item.category === "frappe";

      return matchesCategory && matchesSearch && matchesDiscount;
    });
  }, [selectedCategory, searchQuery, onlyDiscounted]);

  return (
    <section id="menu" className="menu-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <CoffeeIcon size={16} />
            <span>Artisan Menu & Pricing</span>
          </div>
          <h2 className="section-title">Freshly Brewed In Karachi</h2>
          <p className="section-subtitle">
            From single-origin pour-overs to creamy dessert-infused lattes, every drink is meticulously extracted on our commercial La Marzocco machinery.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="menu-controls-bar">
          {/* Search Box */}
          <div className="search-box-wrapper">
            <SearchIcon size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search drinks, desserts, flavors (e.g. Biscoff, Spanish Latte, Hazelnut)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sunday 40% OFF quick toggle */}
          <button 
            className={`filter-toggle-btn ${onlyDiscounted ? 'active' : ''}`}
            onClick={() => setOnlyDiscounted(!onlyDiscounted)}
          >
            <PercentIcon size={16} />
            <span>Sunday 40% OFF Eligible</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="category-scroll-container">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.label}</span>
              {cat.id === "all" && <span className="cat-count">({MENU_ITEMS.length})</span>}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const isDrink = item.category === "hot" || item.category === "iced" || item.category === "frappe";
              const sundayPrice = isDrink ? Math.round(item.price * 0.6) : null;

              return (
                <div key={item.id} className="menu-card">
                  {/* Card Image Banner */}
                  <div className="card-image-wrap">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-image-gradient"></div>
                    
                    {/* Tags */}
                    <div className="card-tags-overlay">
                      {item.tag && (
                        <span className="card-tag-pill">{item.tag}</span>
                      )}
                      {item.isPopular && (
                        <span className="card-popular-pill">⭐ Popular</span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-content">
                    <div className="card-header-line">
                      <h3 className="card-name">{item.name}</h3>
                    </div>

                    <p className="card-desc">{item.description}</p>

                    {/* Tasting Notes */}
                    <div className="card-notes-row">
                      {item.notes.map((note, idx) => (
                        <span key={idx} className="note-badge">
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Pricing Line */}
                    <div className="card-price-row">
                      <div className="price-stack">
                        <span className="regular-price">Rs. {item.price}</span>
                        {sundayPrice && (
                          <span className="sunday-deal-badge">
                            Sunday: Rs. {sundayPrice} (-40%)
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="card-action-group">
                        {isDrink && (
                          <button
                            className="btn-card-customize"
                            onClick={() => onCustomizeItem(item)}
                            title="Customize syrup, milk, and ice"
                          >
                            <SlidersIcon size={16} />
                            <span>Customize</span>
                          </button>
                        )}
                        <button
                          className="btn-card-add"
                          onClick={() => onAddToCart(item)}
                          title="Add item to cart"
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
          <div className="menu-empty-state">
            <CoffeeIcon size={40} className="empty-icon" />
            <h3>No coffee or treats found</h3>
            <p>We couldn't find anything matching "{searchQuery}". Try searching for latte, cold brew, or cheesecake!</p>
            <button 
              className="btn-reset-filter"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setOnlyDiscounted(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

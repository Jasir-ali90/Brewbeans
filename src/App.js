import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  CAFE_INFO, 
  INITIAL_MENU_ITEMS, 
  INITIAL_REVIEWS, 
  SAMPLE_INITIAL_ORDERS, 
  SAMPLE_INITIAL_BOOKINGS 
} from './data/coffeeData';

// Shared Components
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import Customizer from './components/Customizer';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { WhatsAppIcon, CheckIcon } from './components/Icons';

// Distinct Web Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function App() {
  // Page Routing State ('home' | 'menu' | 'booking' | 'checkout' | 'track' | 'about' | 'contact' | 'admin')
  const [currentPage, setCurrentPage] = useState('home');
  const [trackingOrderId, setTrackingOrderId] = useState('');

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sunday 40% OFF Special State
  const isSunday = new Date().getDay() === 0;
  const [promoCode, setPromoCode] = useState(isSunday ? 'SUNDAY40' : '');
  const [promoApplied, setPromoApplied] = useState(isSunday);

  // Synchronized Menu Catalog (LocalStorage Persistence)
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('brewbeans_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Synchronized Orders (LocalStorage Persistence)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('brewbeans_orders');
    return saved ? JSON.parse(saved) : SAMPLE_INITIAL_ORDERS;
  });

  // Synchronized Table Bookings (LocalStorage Persistence)
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('brewbeans_bookings');
    return saved ? JSON.parse(saved) : SAMPLE_INITIAL_BOOKINGS;
  });

  // Synchronized Community Reviews (LocalStorage Persistence)
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('brewbeans_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('brewbeans_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('brewbeans_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('brewbeans_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('brewbeans_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // URL Hash Sync for Browser History (Back/Forward Buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'menu', 'booking', 'checkout', 'track', 'about', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId, params = {}) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    if (params.orderId) {
      setTrackingOrderId(params.orderId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to basket!`);
  };

  const handleAddCustomToCart = (customItem) => {
    setCartItems(prev => [...prev, { ...customItem, quantity: 1 }]);
    showToast(`Added ${customItem.name} to basket!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order Placement from Website
  const handleOrderPlaced = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.id} placed successfully!`);
  };

  // Order Management from Admin
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    showToast(`Order #${orderId} status updated to ${newStatus}`);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order #${orderId} deleted.`);
  };

  // Booking Placement from Website
  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Table reserved! Ref #${newBooking.id}`);
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Reservation #${bookingId} status: ${newStatus}`);
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast(`Reservation #${bookingId} removed.`);
  };

  // Menu Management from Admin (Full CRUD)
  const handleAddMenuItem = (newItem) => {
    setMenuItems(prev => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to menu catalog!`);
  };

  const handleUpdateMenuItem = (updatedItem) => {
    setMenuItems(prev => prev.map(it => it.id === updatedItem.id ? updatedItem : it));
    showToast(`Updated "${updatedItem.name}" in menu!`);
  };

  const handleDeleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(it => it.id !== itemId));
    showToast(`Item removed from menu.`);
  };

  // Reviews Operations
  const handleAddReview = (newRev) => {
    setReviews(prev => [newRev, ...prev]);
    showToast(`Review published! Thank you.`);
  };

  const handleDeleteReview = (revId) => {
    setReviews(prev => prev.filter(r => r.id !== revId));
    showToast(`Review removed.`);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="brewbeans-app-root">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Weekly Sunday 40% OFF Promo Banner */}
      <PromoBanner onApplyCode={(code) => {
        setPromoCode(code);
        setPromoApplied(true);
        showToast(`Promo ${code} applied: 40% OFF Drinks!`);
      }} />

      {/* PAGE ROUTING VIEW SWITCHER */}
      <main className="main-page-content">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo} 
            menuItems={menuItems} 
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            menuItems={menuItems}
            onAddToCart={handleAddToCart}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            cartCount={totalCartCount}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            onAddBooking={handleAddBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            onNavigate={navigateTo}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            promoApplied={promoApplied}
            setPromoApplied={setPromoApplied}
          />
        )}

        {currentPage === 'track' && (
          <TrackOrderPage
            orders={orders}
            initialOrderId={trackingOrderId}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo} 
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onDeleteBooking={handleDeleteBooking}
            menuItems={menuItems}
            onAddMenuItem={handleAddMenuItem}
            onUpdateMenuItem={handleUpdateMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
            reviews={reviews}
            onDeleteReview={handleDeleteReview}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Coffee Customizer Modal */}
      <Customizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onAddCustomToCart={handleAddCustomToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        promoApplied={promoApplied}
        setPromoApplied={setPromoApplied}
        onNavigate={navigateTo}
      />

      {/* Floating WhatsApp Barista Hotline */}
      <a
        href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=Hi%20Brewbeans%20Karachi!%20I%20want%20to%20order%20specialty%20coffee.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-hotline-btn"
        title="Chat with Barista"
      >
        <WhatsAppIcon size={20} />
        <span className="desktop-only">Barista Hotline</span>
      </a>

      {/* Quick Action Toast */}
      {toastMessage && (
        <div className="quick-toast-notice">
          <CheckIcon size={18} className="toast-icon-check" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;

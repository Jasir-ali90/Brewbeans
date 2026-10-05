// Brewbeans Karachi - Authentic Data & Menu
// Real photos from official Foodpanda & Karachi store presence

export const CAFE_INFO = {
  name: "Brewbeans Karachi",
  tagline: "Premium Specialty Coffee & Desserts",
  subTagline: "Gulshan-e-Iqbal's Two-Story Coffee Sanctuary",
  phone: "0311 2463092",
  phoneRaw: "923112463092",
  address: "Shop #6, Plot SB 1/SB 2, Rab Medical Center, Block 2 Gulshan-e-Iqbal, Karachi, 75300",
  landmark: "Main Gulshan-e-Iqbal near Rab Medical & MahRose Beauty Parlour",
  hoursText: "9:00 AM – 4:00 AM (Daily)",
  openHour: 9,
  closeHour: 4,
  ratingGoogle: 4.9,
  reviewsCountGoogle: 85,
  ratingFoodpanda: 4.9,
  reviewsCountFoodpanda: 269,
  ratingFacebook: 5.0,
  logoImage: "/images/brewbeans_logo.jpg",
  bannerImage: "/images/brewbeans_banner.jpg",
  foodpandaUrl: "https://www.foodpanda.pk/restaurant/zy0t/brewbeans",
  instagramUrl: "https://www.instagram.com/brewbeans.karachi/",
  facebookUrl: "https://www.facebook.com/brewbeanskhi/",
  googleMapsUrl: "https://maps.google.com/?q=plot+num+sb+rab+medical+center+Shop+no+6+Block+2+Gulshan-e-Iqbal+Karachi",
};

export const INITIAL_MENU_ITEMS = [
  // Signature Real Drinks from Brewbeans
  {
    id: "tiramisu-brew-frappe",
    name: "Tiramisu Brew Frappe",
    category: "frappe",
    price: 695,
    tag: "Viral Bestseller ⭐",
    description: "Thick creamy blended frappe infused with Brewbeans signature espresso, mascarpone foam cloud, and cocoa powder.",
    image: "/images/real/frappe_blended_real.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "iced-spanish-latte",
    name: "Iced Spanish Latte",
    category: "iced",
    price: 540,
    tag: "Customer Favorite",
    description: "Cold espresso pulled over chilled sweet milk and ice cubes. Smooth, creamy, and refreshing.",
    image: "/images/real/iced_coffee_real.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "roasted-hazelnut-frappe",
    name: "Roasted Hazelnut Frappe",
    category: "frappe",
    price: 650,
    tag: "Top Rated",
    description: "Blended ice coffee with roasted hazelnut syrup, whipped mountain cream, and crunchy caramel topping.",
    image: "/images/real/real_img_5.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "iced-french-vanilla-latte",
    name: "Iced French Vanilla Latte",
    category: "iced",
    price: 510,
    tag: "Aromatic Classic",
    description: "Chilled latte infused with Madagascar French vanilla extract, smooth dairy milk, and dark roast espresso.",
    image: "/images/real/real_img_6.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "fresh-chill-mocha",
    name: "Fresh Chill Mocha",
    category: "iced",
    price: 580,
    tag: "Rich Chocolate",
    description: "Rich Belgian chocolate ganache blended with double espresso and poured over ice.",
    image: "/images/real/real_img_7.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "tiramisu-beans-iced-delight",
    name: "Tiramisu Beans Iced Delight",
    category: "iced",
    price: 580,
    tag: "House Signature",
    description: "Layered chilled espresso topped with thick mascarpone cream, cocoa dusting, and ladyfinger cookie.",
    image: "/images/real/real_img_8.jpg",
    isPopular: true,
    inStock: true,
  },

  // Hot Coffees
  {
    id: "golden-beans-latte",
    name: "Golden Beans Latte",
    category: "hot",
    price: 440,
    tag: "House Specialty",
    description: "Freshly steamed velvety whole milk with golden espresso crema and subtle caramel notes.",
    image: "/images/real/latte_art_real.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "cloud-flat-white",
    name: "Cloud Flat White Latte",
    category: "hot",
    price: 435,
    tag: "Barista Favorite",
    description: "Double ristretto shot topped with velvety micro-foam cloud layer for an intense, silky smooth coffee punch.",
    image: "/images/real/real_img_10.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "spanish-latte-hot",
    name: "Hot Spanish Latte",
    category: "hot",
    price: 520,
    tag: "Sweet & Warm",
    description: "Rich espresso poured over warm condensed milk and micro-foamed textured milk.",
    image: "/images/real/real_img_11.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "caramel-latte-hot",
    name: "Caramel Latte",
    category: "hot",
    price: 599,
    tag: "Comforting",
    description: "Double espresso infused with buttery caramel sauce, velvety milk, and artisan drizzle.",
    image: "/images/real/real_img_12.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "signature-double-espresso",
    name: "Signature Double Espresso",
    category: "hot",
    price: 320,
    tag: "Bold Pure",
    description: "Pure bold espresso pull with thick golden crema, dark cocoa and roasted almond finish.",
    image: "/images/real/espresso_machine_real.jpg",
    isPopular: false,
    inStock: true,
  },

  // Frappes & Coolers
  {
    id: "caramel-rush-brew",
    name: "Caramel Rush Brew Frappe",
    category: "frappe",
    price: 640,
    tag: "Sweet Delight",
    description: "Blended ice coffee loaded with butterscotch caramel syrup, whipped cream, and toffee drizzle.",
    image: "/images/real/real_img_14.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "strawberry-beans-bliss",
    name: "Strawberry Beans Bliss Frappe",
    category: "frappe",
    price: 620,
    tag: "Summer Cooler",
    description: "Smooth strawberry puree blended with cream, light coffee undertone, and whipped topping.",
    image: "/images/real/real_img_16.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "pistachio-cocoa-crush",
    name: "Pistachio Cocoa Crush Frappe",
    category: "frappe",
    price: 680,
    tag: "Premium Nutty",
    description: "Roasted pistachio paste blended with cocoa, cold brew, and topped with chopped pistachios.",
    image: "/images/real/real_img_17.jpg",
    isPopular: false,
    inStock: true,
  },

  // Desserts & Bakery
  {
    id: "lotus-biscoff-cheesecake",
    name: "Lotus Biscoff Cheesecake",
    category: "desserts",
    price: 550,
    tag: "Must-Try Dessert",
    description: "Creamy baked New York cheesecake on spiced Biscoff biscuit crust with warm cookie butter spread.",
    image: "/images/real/biscoff_cheesecake_real.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "nutella-fudgy-brownie",
    name: "Warm Nutella Fudgy Brownie",
    category: "desserts",
    price: 380,
    tag: "Molten Center",
    description: "Decadent dark chocolate brownie stuffed with Nutella fudge and sea salt flakes. Served warm.",
    image: "/images/real/fudgy_brownie_real.jpg",
    isPopular: true,
    inStock: true,
  },
  {
    id: "double-chocolate-chip-cookie",
    name: "Double Chocolate Chip Cookie",
    category: "desserts",
    price: 250,
    tag: "Chewy & Gooey",
    description: "Freshly baked artisan cookie packed with Belgian milk and dark chocolate chips.",
    image: "/images/real/choco_cookie_real.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "classic-tiramisu-cup",
    name: "Classic Italian Tiramisu Cup",
    category: "desserts",
    price: 490,
    tag: "Handmade",
    description: "Espresso-soaked ladyfingers layered with fresh mascarpone mousse and Dutch cocoa.",
    image: "/images/real/tiramisu_cup_real.jpg",
    isPopular: false,
    inStock: true,
  },

  // Retail Beans
  {
    id: "signature-beans-250g",
    name: "Brewbeans Signature Espresso Blend (250g)",
    category: "beans",
    price: 1850,
    tag: "Whole Roasted",
    description: "Medium-dark artisan roast with notes of dark chocolate, toffee, and roasted hazelnut.",
    image: "/images/real/whole_beans_real.jpg",
    isPopular: false,
    inStock: true,
  },
  {
    id: "ethiopian-single-origin-250g",
    name: "Ethiopian Yirgacheffe Single Origin (250g)",
    category: "beans",
    price: 2200,
    tag: "Single Origin",
    description: "Light-medium floral washed roast with jasmine aroma, citrus notes, and bergamot finish.",
    image: "/images/real/real_img_23.jpg",
    isPopular: false,
    inStock: true,
  },
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Mohsin",
    rating: 5,
    date: "2026-09-29",
    comment: "Came from Toronto where we are used to Tim Hortons... this beat it easily! Amazing rich coffee.",
    source: "Foodpanda Verified",
  },
  {
    id: "rev-2",
    author: "Basma",
    rating: 5,
    date: "2026-09-27",
    comment: "Tiramisu frappe was really rich, perfectly balanced sweetness and coffee strength!",
    source: "Foodpanda Verified",
  },
  {
    id: "rev-3",
    author: "Hamza Tariq",
    rating: 5,
    date: "2026-09-20",
    comment: "Finally an authentic specialty coffee sanctuary in Gulshan Block 2! Golden Beans Latte is 10/10. Great study vibe.",
    source: "Google Local Guide",
  },
  {
    id: "rev-4",
    author: "Muhammad",
    rating: 5,
    date: "2026-09-04",
    comment: "Love bhai love. Bohat honesty key saath kaam kar rahey hain aap log. Amazing coffee MashaAllah!",
    source: "Foodpanda Verified",
  },
  {
    id: "rev-5",
    author: "Seerat Fatima",
    rating: 5,
    date: "2026-08-30",
    comment: "Brew Beans is my new favorite coffee shop in K-Town! Cozy interior, aesthetic two-story setup, and late night coffee till 4 AM.",
    source: "Instagram Community",
  }
];

export const SAMPLE_INITIAL_ORDERS = [
  {
    id: "BB-9201",
    customerName: "Zainab Ali",
    phone: "0321 8847291",
    address: "House 42, Block 13-D, Gulshan-e-Iqbal, Karachi",
    items: [
      { name: "Tiramisu Brew Frappe", quantity: 2, price: 695 },
      { name: "Lotus Biscoff Cheesecake", quantity: 1, price: 550 }
    ],
    subtotal: 1940,
    discount: 556,
    deliveryFee: 100,
    total: 1484,
    paymentMethod: "COD", // "COD" | "ONLINE"
    paymentStatus: "Pending Cash on Delivery",
    orderStatus: "Brewing", // "Received" | "Brewing" | "Out for Delivery" | "Delivered"
    placedAt: "2026-10-05 14:15",
    notes: "Please pack drinks extra tightly in cup holder."
  },
  {
    id: "BB-9184",
    customerName: "Daniyal Qureshi",
    phone: "0333 4912084",
    address: "Flat 402, Rab Residency, Block 2 Gulshan-e-Iqbal, Karachi",
    items: [
      { name: "Iced Spanish Latte", quantity: 1, price: 540 },
      { name: "Warm Nutella Fudgy Brownie", quantity: 2, price: 380 }
    ],
    subtotal: 1300,
    discount: 216,
    deliveryFee: 100,
    total: 1184,
    paymentMethod: "ONLINE",
    paymentStatus: "Paid Online (Visa **** 4912 - TID: PK-99824)",
    orderStatus: "Out for Delivery",
    placedAt: "2026-10-05 13:40",
    notes: "Call on arrival please."
  }
];

export const SAMPLE_INITIAL_BOOKINGS = [
  {
    id: "RES-7104",
    name: "Dr. Farhan Mirza",
    phone: "0300 2198421",
    date: "2026-10-06",
    time: "20:00 (8:00 PM)",
    guests: 4,
    seating: "2nd Floor Loft Sanctuary",
    notes: "Friends reunion coffee session",
    status: "Confirmed",
    createdAt: "2026-10-05 12:00"
  },
  {
    id: "RES-7098",
    name: "Mariam Sohail",
    phone: "0345 7710294",
    date: "2026-10-07",
    time: "17:30 (5:30 PM)",
    guests: 2,
    seating: "Study Quiet Corner (Fast Wi-Fi)",
    notes: "Quiet work meeting with laptop plug required",
    status: "Confirmed",
    createdAt: "2026-10-05 11:20"
  }
];

export const SAMPLE_INITIAL_VOUCHERS = [
  {
    id: "VCH-SUNDAY40",
    code: "SUNDAY40",
    title: "Sunday Signature 40% OFF",
    discountType: "percentage", // "percentage" | "fixed"
    discountValue: 40,
    appliesTo: "drinks", // "all" | "drinks" | "food"
    minOrder: 0,
    expiryDate: "2026-12-31T23:59:00",
    isActive: true,
    usedCount: 48,
    usageLimit: null,
    description: "40% OFF all handcrafted coffee drinks (Hot, Iced, Frappe & Custom)"
  },
  {
    id: "VCH-WELCOME20",
    code: "WELCOME20",
    title: "New Guest Welcome Treat",
    discountType: "percentage",
    discountValue: 20,
    appliesTo: "all",
    minOrder: 500,
    expiryDate: "2026-11-30T23:59:00",
    isActive: true,
    usedCount: 19,
    usageLimit: 250,
    description: "20% OFF entire artisan coffee & bakery basket (Min. Rs. 500)"
  },
  {
    id: "VCH-FLASH100",
    code: "FLASH100",
    title: "Flash Rs. 100 Off (Past Deal)",
    discountType: "fixed",
    discountValue: 100,
    appliesTo: "all",
    minOrder: 800,
    expiryDate: "2026-10-04T12:00:00", // Expired sample
    isActive: true,
    usedCount: 50,
    usageLimit: 50,
    description: "Flat Rs. 100 OFF on orders above Rs. 800 (Expired Flash Promotion)"
  }
];

export const checkVoucherValidity = (voucher, items = [], subtotal = 0) => {
  if (!voucher) {
    return { valid: false, error: 'Invalid voucher code.' };
  }
  if (!voucher.isActive) {
    return { valid: false, error: `Voucher "${voucher.code}" is currently disabled by store admin.` };
  }
  
  if (voucher.expiryDate) {
    const expiryTime = new Date(voucher.expiryDate).getTime();
    const now = Date.now();
    if (now > expiryTime) {
      const expDateStr = new Date(voucher.expiryDate).toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      return { 
        valid: false, 
        error: `Voucher "${voucher.code}" expired on ${expDateStr}. It is no longer valid.` 
      };
    }
  }

  if (voucher.minOrder && subtotal < voucher.minOrder) {
    return { 
      valid: false, 
      error: `Minimum order of Rs. ${voucher.minOrder} is required for voucher "${voucher.code}". Current subtotal is Rs. ${subtotal}.` 
    };
  }

  if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
    return { 
      valid: false, 
      error: `Voucher "${voucher.code}" has reached its maximum redemption limit (${voucher.usageLimit} uses).` 
    };
  }

  // Calculate discount amount
  let discountableAmount = subtotal;
  if (voucher.appliesTo === 'drinks') {
    discountableAmount = items.reduce((acc, item) => {
      if (item.category === 'hot' || item.category === 'iced' || item.category === 'frappe' || item.category === 'custom') {
        return acc + (item.price * item.quantity);
      }
      return acc;
    }, 0);
  } else if (voucher.appliesTo === 'food') {
    discountableAmount = items.reduce((acc, item) => {
      if (item.category === 'bakery' || item.category === 'dessert') {
        return acc + (item.price * item.quantity);
      }
      return acc;
    }, 0);
  }

  let discount = 0;
  if (voucher.discountType === 'percentage') {
    discount = Math.round((discountableAmount * voucher.discountValue) / 100);
  } else {
    discount = Math.min(voucher.discountValue, subtotal);
  }

  if (discount <= 0 && voucher.appliesTo === 'drinks') {
    return {
      valid: false,
      error: `Voucher "${voucher.code}" applies to handcrafted coffee drinks only. Please add a drink to your basket.`
    };
  }

  return {
    valid: true,
    discount,
    voucher
  };
};


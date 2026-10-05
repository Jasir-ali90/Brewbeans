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
  // HOT COFFEES (12 items)
  {
    id: "brew-espresso",
    name: "Brew Espresso",
    category: "hot",
    price: 300,
    tag: "Classic Pure",
    description: "Intense single/double shot of single-origin espresso with rich hazelnut crema.",
    image: "/images/menu/brew-espresso.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "golden-beans-latte",
    name: "Golden Beans Latte",
    category: "hot",
    price: 440,
    tag: "House Favorite ⭐",
    description: "Freshly steamed velvety whole milk with golden espresso crema and subtle caramel notes.",
    image: "/images/menu/golden-beans-latte.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "cloud-brew-flat-white",
    name: "Cloud Brew Flat White Latte",
    category: "hot",
    price: 435,
    tag: "Barista Choice",
    description: "Double ristretto shot crowned with a delicate micro-foam cloud layer for an intense, silky smooth coffee punch.",
    image: "/images/menu/cloud-brew-flat-white.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "royal-beans-spanish-latte",
    name: "Royal Beans Spanish Latte",
    category: "hot",
    price: 450,
    tag: "Sweet Classic",
    description: "Rich double espresso poured over warm condensed milk and velvety textured steamed milk.",
    image: "/images/menu/royal-beans-spanish-latte.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "caramel-brew-latte",
    name: "Caramel Brew Latte",
    category: "hot",
    price: 470,
    tag: "Comforting",
    description: "Smooth espresso infused with warm buttery caramel sauce and artisan latte art.",
    image: "/images/menu/caramel-brew-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "beans-vanilla-latte",
    name: "Beans Vanilla Latte",
    category: "hot",
    price: 470,
    tag: "Aromatic",
    description: "Espresso combined with fragrant French vanilla syrup and steamed creamy whole milk.",
    image: "/images/menu/beans-vanilla-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "roasted-beans-hazelnut-latte",
    name: "Roasted Beans Hazelnut Latte",
    category: "hot",
    price: 470,
    tag: "Nutty Warmth",
    description: "Dark roast espresso married with toasted hazelnut notes and silky micro-foam.",
    image: "/images/menu/roasted-beans-hazelnut-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "emerald-brew-pistachio-latte",
    name: "Emerald Brew Pistachio Latte",
    category: "hot",
    price: 540,
    tag: "Artisan Green",
    description: "Exquisite Mediterranean pistachio paste folded into steaming milk and espresso.",
    image: "/images/menu/emerald-brew-pistachio-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "dream-beans-tiramisu-latte",
    name: "Dream Beans Tiramisu Latte",
    category: "hot",
    price: 470,
    tag: "Signature Blend",
    description: "Warm espresso layered with sweet mascarpone cream and cocoa dust.",
    image: "/images/menu/dream-beans-tiramisu-latte.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "bold-brew-americano",
    name: "Bold Brew Americano",
    category: "hot",
    price: 495,
    tag: "Bold Strength",
    description: "Rich double shot espresso diluted with near-boiling water for a full-bodied black coffee experience.",
    image: "/images/menu/bold-brew-americano.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "classic-beans-hot-chocolate",
    name: "Classic Beans Hot Chocolate",
    category: "hot",
    price: 420,
    tag: "Cozy Warmth",
    description: "Steamed whole milk blended with melted premium Belgian chocolate and cocoa.",
    image: "/images/menu/classic-beans-hot-chocolate.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "brew-pistachio-chocolate",
    name: "Brew Pistachio Chocolate",
    category: "hot",
    price: 520,
    tag: "Rich & Nutty",
    description: "Velvety hot chocolate combined with fragrant roasted pistachio cream.",
    image: "/images/menu/brew-pistachio-chocolate.png",
    isPopular: false,
    inStock: true,
  },

  // COLD COFFEES (12 items)
  {
    id: "brew-iced-latte",
    name: "Brew Iced Latte",
    category: "iced",
    price: 525,
    tag: "Chilled Classic",
    description: "Chilled espresso poured over fresh whole milk and ice cubes.",
    image: "/images/menu/brew-iced-latte.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "iced-beans-spanish-latte",
    name: "Iced Beans Spanish Latte",
    category: "iced",
    price: 545,
    tag: "Best Seller ⭐",
    description: "Cold espresso over chilled sweet condensed milk and ice cubes. The ultimate crowd favorite.",
    image: "/images/menu/iced-beans-spanish-latte.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "vanilla-brew-iced-latte",
    name: "Vanilla Brew Iced Latte",
    category: "iced",
    price: 575,
    tag: "Smooth Vanilla",
    description: "Espresso, ice, whole milk, and fragrant Madagascar vanilla syrup.",
    image: "/images/menu/vanilla-brew-iced-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "french-vanilla-latte",
    name: "French Vanilla Latte",
    category: "iced",
    price: 575,
    tag: "French Roast",
    description: "Rich chilled espresso infused with aromatic French vanilla bean essence.",
    image: "/images/menu/french-vanilla-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "brewed-americano",
    name: "Brewed Americano",
    category: "iced",
    price: 520,
    tag: "Pure Black",
    description: "Espresso pulled over cold filtered water and ice rocks.",
    image: "/images/menu/brewed-americano.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "creamy-brew-iced-cappuccino",
    name: "Creamy Brew Iced Cappuccino",
    category: "iced",
    price: 530,
    tag: "Extra Foam",
    description: "Iced espresso topped with thick velvety cold frothed milk foam.",
    image: "/images/menu/creamy-brew-iced-cappuccino.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "chocolate-beans-iced-latte",
    name: "Chocolate Beans Iced Latte",
    category: "iced",
    price: 585,
    tag: "Mocha Chilled",
    description: "Dark chocolate sauce layered with espresso, cold milk, and crushed ice.",
    image: "/images/menu/chocolate-beans-iced-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "chill-brew-iced-chocolate",
    name: "Chill Brew Iced Chocolate",
    category: "iced",
    price: 550,
    tag: "Chilled Sweet",
    description: "Cold creamy Belgian chocolate poured over ice for pure chocolate indulgence.",
    image: "/images/menu/chill-brew-iced-chocolate.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "tiramisu-beans-iced-delight",
    name: "Tiramisu Beans Iced Delight",
    category: "iced",
    price: 595,
    tag: "House Signature ⭐",
    description: "Layered chilled espresso topped with thick mascarpone cream and dusting of Dutch cocoa.",
    image: "/images/menu/tiramisu-beans-iced-delight.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "hazelnut-brewed-iced-latte",
    name: "Hazelnut Brewed Iced Latte",
    category: "iced",
    price: 575,
    tag: "Toasted Hazelnut",
    description: "Cold brew espresso with hazelnut essence, chilled milk, and ice.",
    image: "/images/menu/hazelnut-brewed-iced-latte.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "caramel-beans-iced-macchiato",
    name: "Caramel Beans Iced Macchiato",
    category: "iced",
    price: 580,
    tag: "Caramel Drizzle",
    description: "Sweet vanilla-infused milk, ice, espresso float, and signature caramel crosshatch.",
    image: "/images/menu/caramel-beans-iced-macchiato.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "pistachio-brew-iced-latte",
    name: "Pistachio Brew Iced Latte",
    category: "iced",
    price: 645,
    tag: "Pistachio Dream",
    description: "Chilled green pistachio milk topped with espresso shots and crushed pistachio bits.",
    image: "/images/menu/pistachio-brew-iced-latte.png",
    isPopular: false,
    inStock: true,
  },

  // FRAPPE COFFEES (9 items)
  {
    id: "vanilla-beans-bliss",
    name: "Vanilla Beans Bliss",
    category: "frappe",
    price: 620,
    tag: "Creamy Blend",
    description: "Thick ice-blended vanilla bean frappe topped with whipped mountain cream.",
    image: "/images/menu/vanilla-beans-bliss.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "caramel-rush-brew",
    name: "Caramel Rush Brew",
    category: "frappe",
    price: 630,
    tag: "Caramel Overload",
    description: "Blended ice coffee loaded with golden butterscotch caramel drizzle and whipped cream.",
    image: "/images/menu/caramel-rush-brew.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "strawberry-beans-bliss",
    name: "Strawberry Beans Bliss",
    category: "frappe",
    price: 650,
    tag: "Fruity Frappe",
    description: "Sweet real strawberry puree blended with cream, light coffee undertone, and whipped topping.",
    image: "/images/menu/strawberry-beans-bliss.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "tiramisu-brew-frappe",
    name: "Tiramisu Brew Frappe",
    category: "frappe",
    price: 680,
    tag: "Viral Bestseller ⭐",
    description: "Thick creamy blended frappe infused with Brewbeans signature espresso, mascarpone foam cloud, and cocoa powder.",
    image: "/images/menu/tiramisu-brew-frappe.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "pistachio-cocoa-crush",
    name: "Pistachio Cocoa Crush",
    category: "frappe",
    price: 695,
    tag: "Nutty Cocoa",
    description: "Roasted pistachio paste blended with cocoa, cold brew, and whipped crown.",
    image: "/images/menu/pistachio-cocoa-crush.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "lotus-frappe",
    name: "Lotus Frappe",
    category: "frappe",
    price: 720,
    tag: "✨ NEW LAUNCH",
    description: "Spiced Lotus Biscoff biscuit spread blended with espresso, milk, whipped cream, and cookie crumble.",
    image: "/images/menu/lotus-frappe.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "fresh-chill-mocha",
    name: "Fresh Chill Mocha",
    category: "frappe",
    price: 635,
    tag: "Dark Mocha",
    description: "Ice-blended espresso and dark Dutch cocoa topped with thick whipped cream and chocolate syrup.",
    image: "/images/menu/fresh-chill-mocha.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "roasted-hazelnut-frappe",
    name: "Roasted Hazelnut Frappe",
    category: "frappe",
    price: 660,
    tag: "Toasted Nut",
    description: "Blended iced coffee with roasted hazelnut syrup, whipped mountain cream, and crunchy caramel topping.",
    image: "/images/menu/roasted-hazelnut-frappe.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "raspberry-frappe",
    name: "Raspberry Frappe",
    category: "frappe",
    price: 680,
    tag: "Berry Mocha",
    description: "Tangy sweet raspberry puree blended with rich chocolate espresso frappe and whipped cream.",
    image: "/images/menu/raspberry-frappe.png",
    isPopular: false,
    inStock: true,
  },

  // SUMMER COOLERS (4 items)
  {
    id: "blue-lagoon-smash",
    name: "Blue Lagoon Smash",
    category: "coolers",
    price: 420,
    tag: "Refreshing Blue",
    description: "Sparkling curaçao cooler with fresh mint, lemon spritz, and crushed ice.",
    image: "/images/menu/blue-lagoon-smash.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "strawberry-lemonade",
    name: "Strawberry Lemonade",
    category: "coolers",
    price: 420,
    tag: "Zesty & Sweet",
    description: "Freshly squeezed lemons with sweet wild strawberry puree and fizz.",
    image: "/images/menu/strawberry-lemonade.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "peach-ice-tea",
    name: "Peach Ice Tea",
    category: "coolers",
    price: 420,
    tag: "Southern Peach",
    description: "Cold-steeped artisan black tea sweetened with sun-ripened peach nectar.",
    image: "/images/menu/peach-ice-tea.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "raspberry-ice-tea",
    name: "Raspberry Ice Tea",
    category: "coolers",
    price: 420,
    tag: "Wild Berry",
    description: "Refreshing brewed black tea infused with tart raspberry syrup and ice.",
    image: "/images/menu/raspberry-ice-tea.png",
    isPopular: false,
    inStock: true,
  },

  // DESSERTS (4 items)
  {
    id: "chocolate-croissants",
    name: "Chocolate Croissants",
    category: "desserts",
    price: 420,
    tag: "Flaky & Buttery",
    description: "Golden flaky Parisian style croissant filled with molten dark chocolate ganache.",
    image: "/images/menu/chocolate-croissants.png",
    isPopular: true,
    inStock: true,
  },
  {
    id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    category: "desserts",
    price: 350,
    tag: "Warm & Chewy",
    description: "Freshly baked classic artisan cookie stuffed with melted Belgian milk chocolate chips.",
    image: "/images/menu/chocolate-chip-cookies.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "double-chocolate-cookies",
    name: "Double Chocolate Cookies",
    category: "desserts",
    price: 350,
    tag: "Double Fudge",
    description: "Deep cocoa fudge cookie stuffed with dark and milk chocolate morsels.",
    image: "/images/menu/double-chocolate-cookies.png",
    isPopular: false,
    inStock: true,
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    category: "desserts",
    price: 315,
    tag: "Moist & Warm",
    description: "Traditional caramelized banana loaf baked with toasted walnuts and cinnamon.",
    image: "/images/menu/banana-bread.png",
    isPopular: true,
    inStock: true,
  },
];

export const AUTHENTIC_ADD_ONS = [
  { id: "extra-espresso", name: "Extra Espresso", price: 150 },
  { id: "extra-caramel", name: "Extra Pump of Caramel", price: 150 },
  { id: "extra-vanilla", name: "Extra Pump of Vanilla", price: 150 },
  { id: "whipcream-pump", name: "Whipcream Pump", price: 150 },
];

export const MENU_CATEGORIES = [
  { id: "all", label: "☕ All Menu" },
  { id: "hot", label: "🔥 Hot Coffees" },
  { id: "iced", label: "🧊 Cold Coffees" },
  { id: "frappe", label: "🥤 Frappe Coffees" },
  { id: "coolers", label: "🍹 Summer Coolers" },
  { id: "desserts", label: "🥐 Desserts" },
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


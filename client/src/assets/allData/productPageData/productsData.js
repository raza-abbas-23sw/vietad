import aluminumImg from "../../allMedia/homePage/commercialSignsSection/aluminum-signs.jpg";
import yardSignsImg from "../../allMedia/homePage/commercialSignsSection/yard-signs-main.jpg";
import foamBoardSignsImg from "../../allMedia/homePage/commercialSignsSection/foam-board-signs.jpg";
import trackDecalsImg from "../../allMedia/homePage/commercialSignsSection/truck-decals.jpg";
import tabletopRetractableBannersImg from "../../allMedia/homePage/commercialSignsSection/table-top-banner-stands.jpg";
import acrylicSignsImg from "../../allMedia/homePage/commercialSignsSection/acrylic-signs.jpg";
import vinylBannersImg from "../../allMedia/homePage/commercialSignsSection/vinyl-banner.jpg";
import retractableBannersImg from "../../allMedia/homePage/commercialSignsSection/retractable-banners.jpg";
import metalPhotoPrintsImg from "../../allMedia/homePage/commercialSignsSection/metal-photo-prints.jpg";
import acrylicPhotoPrintsImg from "../../allMedia/homePage/commercialSignsSection/acrylic-photo-prints.jpg";
import pvcSignsImg from "../../allMedia/homePage/commercialSignsSection/pvc-signs.jpg";
import wallDecalsImg from "../../allMedia/homePage/commercialSignsSection/wall-decals.jpg";

export const productsData = [
  // Rigid Signs - Using your existing images
  {
    id: 101,
    title: "Aluminum Signs",
    category: "rigid-signs",
    slug: "aluminum-signs",
    description: "Enhance your space with versatile, non-rusting aluminum products. They are available with single and double-sided printing options.",
    tags: ["Best Seller", "Hard Side", "Durable"],
    img: aluminumImg,
    price: 249,
    originalPrice: 279.95,
    pricePerEach: 49.8,
    originalPricePerEach: 55.99,
    rating: 4.8,
    ratingCount: 15,
    features: [
      "Weather-resistant",
      "Non-rusting",
      "Double-sided option",
      "UV-protected",
      "Durable finish",
      "Custom sizes",
      "Indoor/Outdoor use",
      "Professional grade"
    ],
    gallery: [aluminumImg, yardSignsImg, trackDecalsImg, tabletopRetractableBannersImg]
  },
  {
    id: 102,
    title: "Yard Signs",
    category: "rigid-signs",
    slug: "yard-signs",
    description: "Display any message in your yard with light and portable personalized signs available in any shape and style you can imagine.",
    tags: ["Hard Side", "Portable"],
    img: yardSignsImg,
    price: 99,
    originalPrice: 119.99,
    pricePerEach: 19.8,
    originalPricePerEach: 23.99,
    rating: 4.5,
    ratingCount: 12,
    features: [
      "Lightweight",
      "Weather-resistant",
      "Easy to install",
      "Customizable shapes",
      "Double-sided print",
      "UV protection",
      "Affordable",
      "Reusable"
    ],
    gallery: [yardSignsImg, foamBoardSignsImg, trackDecalsImg]
  },
  {
    id: 103,
    title: "Foam Board Signs",
    category: "rigid-signs",
    slug: "foam-board-signs",
    description: "Make your own custom sign for events or presentations with lightweight and budget-friendly printing perfect for temporary use.",
    tags: ["NEW COLLECTION", "Lightweight"],
    img: foamBoardSignsImg,
    price: 79,
    originalPrice: 89.99,
    pricePerEach: 15.8,
    originalPricePerEach: 17.99,
    rating: 4.3,
    ratingCount: 9,
    features: [
      "Lightweight material",
      "Matte finish",
      "Ideal for indoor use",
      "Budget-friendly",
      "Full-color printing",
      "Temporary display",
      "Custom sizes",
      "Portable"
    ],
    gallery: [foamBoardSignsImg, yardSignsImg]
  },
  {
    id: 104,
    title: "Acrylic Signs",
    category: "rigid-signs",
    slug: "acrylic-signs",
    description: "Premium acrylic signs with crystal-clear finish perfect for professional offices, retail spaces, and high-end displays.",
    tags: ["Premium", "Elegant"],
    img: acrylicSignsImg,
    price: 199,
    originalPrice: 229.99,
    pricePerEach: 39.8,
    originalPricePerEach: 45.99,
    rating: 4.7,
    ratingCount: 14,
    features: [
      "Crystal clear finish",
      "Professional look",
      "Scratch-resistant",
      "UV protected",
      "Modern design",
      "Easy to clean",
      "Long-lasting",
      "Elegant appearance"
    ],
    gallery: [acrylicSignsImg, metalPhotoPrintsImg]
  },
  {
    id: 105,
    title: "PVC Signs",
    category: "rigid-signs",
    slug: "pvc-signs",
    description: "Durable PVC signs that are perfect for both indoor and outdoor use with excellent weather resistance and longevity.",
    tags: ["Durable", "Weather Resistant"],
    img: pvcSignsImg,
    price: 149,
    originalPrice: 169.99,
    pricePerEach: 29.8,
    originalPricePerEach: 33.99,
    rating: 4.4,
    ratingCount: 11,
    features: [
      "Weather resistant",
      "Lightweight",
      "Easy to install",
      "Custom shapes",
      "UV protected",
      "Waterproof",
      "Durable material",
      "Cost-effective"
    ],
    gallery: [pvcSignsImg, wallDecalsImg]
  },
  {
    id: 106,
    title: "Corrugated Plastic Signs",
    category: "rigid-signs",
    slug: "corrugated-plastic-signs",
    description: "Lightweight and waterproof corrugated plastic signs perfect for temporary outdoor events and construction sites.",
    tags: ["Waterproof", "Temporary"],
    img: "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
    price: 69,
    originalPrice: 89.99,
    pricePerEach: 13.8,
    originalPricePerEach: 17.99,
    rating: 4.2,
    ratingCount: 8,
    features: [
      "Lightweight construction",
      "100% waterproof",
      "Easy to handle",
      "Weather resistant",
      "Cost-effective",
      "Quick production",
      "Perfect for events",
      "Multiple sizes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 107,
    title: "Metal Signs",
    category: "rigid-signs",
    slug: "metal-signs",
    description: "Heavy-duty metal signs with premium finish for permanent outdoor installations and industrial applications.",
    tags: ["Heavy Duty", "Permanent"],
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop",
    price: 299,
    originalPrice: 349.99,
    pricePerEach: 59.8,
    originalPricePerEach: 69.99,
    rating: 4.9,
    ratingCount: 22,
    features: [
      "Heavy-duty metal",
      "Rust-proof coating",
      "Permanent installation",
      "Industrial grade",
      "Weather proof",
      "Long lifespan",
      "Professional finish",
      "Custom shapes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop",
      aluminumImg
    ]
  },

  // Banners & Displays - Using your existing images first
  {
    id: 201,
    title: "Tabletop Retractable Banners",
    category: "banners-displays",
    slug: "tabletop-retractable-banners",
    description: "Effective sign printing on portable and easy-to-assemble displays. Great for showcasing information with these custom signs.",
    tags: ["Best Seller", "Portable"],
    img: tabletopRetractableBannersImg,
    price: 139,
    originalPrice: 159.99,
    pricePerEach: 27.8,
    originalPricePerEach: 31.99,
    rating: 4.7,
    ratingCount: 11,
    features: [
      "Portable",
      "Easy assembly",
      "Durable print",
      "Compact",
      "Great for events",
      "Custom sizes",
      "Full-color graphics",
      "Reusable"
    ],
    gallery: [tabletopRetractableBannersImg, vinylBannersImg]
  },
  {
    id: 202,
    title: "Vinyl Banners",
    category: "banners-displays",
    slug: "vinyl-banners",
    description: "Durable vinyl banners perfect for outdoor advertising, events, and promotions with excellent weather resistance.",
    tags: ["Weather Resistant", "Outdoor"],
    img: vinylBannersImg,
    price: 89,
    originalPrice: 109.99,
    pricePerEach: 17.8,
    originalPricePerEach: 21.99,
    rating: 4.5,
    ratingCount: 13,
    features: [
      "Weather resistant",
      "Durable material",
      "Outdoor use",
      "Grommet included",
      "Custom sizes",
      "Vibrant colors",
      "Long-lasting",
      "Easy to hang"
    ],
    gallery: [vinylBannersImg, retractableBannersImg]
  },
  {
    id: 203,
    title: "Retractable Banners",
    category: "banners-displays",
    slug: "retractable-banners",
    description: "Professional retractable banner stands that are easy to set up and perfect for trade shows and exhibitions.",
    tags: ["Professional", "Trade Show"],
    img: retractableBannersImg,
    price: 189,
    originalPrice: 219.99,
    pricePerEach: 37.8,
    originalPricePerEach: 43.99,
    rating: 4.8,
    ratingCount: 16,
    features: [
      "Easy setup",
      "Professional look",
      "Portable case",
      "Adjustable height",
      "Durable graphics",
      "Smooth retraction",
      "Stable base",
      "Perfect for events"
    ],
    gallery: [retractableBannersImg, tabletopRetractableBannersImg]
  },
  {
    id: 204,
    title: "Fabric Banners",
    category: "banners-displays",
    slug: "fabric-banners",
    description: "Eco-friendly fabric banners with vibrant dye-sublimation printing for indoor events and premium displays.",
    tags: ["Eco-friendly", "Premium"],
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
    price: 159,
    originalPrice: 189.99,
    pricePerEach: 31.8,
    originalPricePerEach: 37.99,
    rating: 4.6,
    ratingCount: 14,
    features: [
      "Eco-friendly material",
      "Vibrant colors",
      "Wrinkle-resistant",
      "Indoor use",
      "Premium finish",
      "Easy to store",
      "Lightweight",
      "Professional look"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=400&fit=crop",
      vinylBannersImg
    ]
  },
  {
    id: 205,
    title: "Step and Repeat Banners",
    category: "banners-displays",
    slug: "step-repeat-banners",
    description: "Professional step and repeat banners for red carpet events, photo opportunities, and brand visibility.",
    tags: ["Professional", "Events"],
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=400&fit=crop",
    price: 299,
    originalPrice: 349.99,
    pricePerEach: 59.8,
    originalPricePerEach: 69.99,
    rating: 4.7,
    ratingCount: 9,
    features: [
      "Professional branding",
      "Red carpet ready",
      "High-resolution print",
      "Durable material",
      "Easy setup",
      "Perfect for photos",
      "Custom logos",
      "Event ready"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 206,
    title: "Mesh Banners",
    category: "banners-displays",
    slug: "mesh-banners",
    description: "Wind-resistant mesh banners perfect for outdoor use in windy conditions while maintaining visibility.",
    tags: ["Wind Resistant", "Outdoor"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=400&fit=crop",
    price: 129,
    originalPrice: 159.99,
    pricePerEach: 25.8,
    originalPricePerEach: 31.99,
    rating: 4.4,
    ratingCount: 11,
    features: [
      "Wind resistant",
      "Outdoor durability",
      "See-through design",
      "Weather proof",
      "Long-lasting",
      "Easy installation",
      "Multiple sizes",
      "Perfect for fencing"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=400&fit=crop",
      vinylBannersImg
    ]
  },

  // Decals & Magnets - Using your existing images
  {
    id: 301,
    title: "Truck Decals",
    category: "decals-magnets",
    slug: "truck-decals",
    description: "This product is great for truck branding, promotions and decoration. It's available in three finishes suitable for personal and business use.",
    tags: ["NEW COLLECTION", "Vehicle"],
    img: trackDecalsImg,
    price: 129,
    originalPrice: 149.95,
    pricePerEach: 25.8,
    originalPricePerEach: 29.99,
    rating: 4.6,
    ratingCount: 10,
    features: [
      "Three finish options",
      "Weather-resistant",
      "Easy to apply",
      "Durable adhesive",
      "Great for branding",
      "Full-color print",
      "Removable",
      "Custom sizes"
    ],
    gallery: [trackDecalsImg, retractableBannersImg]
  },
  {
    id: 302,
    title: "Wall Decals",
    category: "decals-magnets",
    slug: "wall-decals",
    description: "Customize signs with stunning graphics on wall adhesives for indoor and outdoor use to reach your branding or decorative goals.",
    tags: ["Decorative", "Removable"],
    img: wallDecalsImg,
    price: 69,
    originalPrice: 79.99,
    pricePerEach: 13.8,
    originalPricePerEach: 15.99,
    rating: 4.2,
    ratingCount: 8,
    features: [
      "Peel and stick",
      "Indoor/Outdoor use",
      "Custom designs",
      "Removable",
      "Durable adhesive",
      "High-quality print",
      "Eco-friendly ink",
      "Great for decor"
    ],
    gallery: [wallDecalsImg, pvcSignsImg]
  },
  {
    id: 303,
    title: "Perforated Window Decals",
    category: "decals-magnets",
    slug: "perforated-window-decals",
    description: "See-through window decals that allow visibility from inside while displaying graphics from the outside.",
    tags: ["See-through", "Window"],
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
    price: 99,
    originalPrice: 129.99,
    pricePerEach: 19.8,
    originalPricePerEach: 25.99,
    rating: 4.5,
    ratingCount: 12,
    features: [
      "See-through design",
      "One-way visibility",
      "UV resistant",
      "Easy application",
      "Removable",
      "Professional finish",
      "Perfect for storefronts",
      "Custom sizes"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
      wallDecalsImg
    ]
  },
  {
    id: 304,
    title: "Floor Decals",
    category: "decals-magnets",
    slug: "floor-decals",
    description: "Anti-slip floor decals for safety markings, directions, and promotions in high-traffic areas.",
    tags: ["Anti-slip", "Safety"],
    img: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&h=400&fit=crop",
    price: 89,
    originalPrice: 119.99,
    pricePerEach: 17.8,
    originalPricePerEach: 23.99,
    rating: 4.3,
    ratingCount: 15,
    features: [
      "Anti-slip surface",
      "High-traffic durable",
      "Safety compliant",
      "Easy to clean",
      "Weather resistant",
      "Quick installation",
      "Multiple shapes",
      "Long-lasting"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 305,
    title: "Vehicle Magnets",
    category: "decals-magnets",
    slug: "vehicle-magnets",
    description: "Strong magnetic signs for vehicle advertising that easily attach and remove without damaging paint.",
    tags: ["Magnetic", "Vehicle"],
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=400&fit=crop",
    price: 79,
    originalPrice: 99.99,
    pricePerEach: 15.8,
    originalPricePerEach: 19.99,
    rating: 4.6,
    ratingCount: 18,
    features: [
      "Strong magnets",
      "Paint safe",
      "Weather resistant",
      "Easy on/off",
      "Reusable",
      "Custom sizes",
      "Durable printing",
      "Vehicle advertising"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=400&fit=crop",
      trackDecalsImg
    ]
  },
  {
    id: 306,
    title: "Bumper Stickers",
    category: "decals-magnets",
    slug: "bumper-stickers",
    description: "Classic bumper stickers for promotions, causes, or personal expression with durable outdoor adhesive.",
    tags: ["Classic", "Promotional"],
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=400&fit=crop",
    price: 29,
    originalPrice: 39.99,
    pricePerEach: 5.8,
    originalPricePerEach: 7.99,
    rating: 4.2,
    ratingCount: 23,
    features: [
      "Classic design",
      "Weather resistant",
      "Easy to apply",
      "Removable",
      "Cost-effective",
      "Quick production",
      "Multiple sizes",
      "Perfect for promotions"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=400&fit=crop",
      wallDecalsImg
    ]
  },

  // Office Signs - New products with online images
  {
    id: 401,
    title: "Real Estate Signs",
    category: "office-signs",
    slug: "real-estate-signs",
    description: "Professional real estate signs for property listings with durable construction and weather resistance.",
    tags: ["Professional", "Real Estate"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop",
    price: 149,
    originalPrice: 179.99,
    pricePerEach: 29.8,
    originalPricePerEach: 35.99,
    rating: 4.6,
    ratingCount: 18,
    features: [
      "Professional design",
      "Weather resistant",
      "Durable materials",
      "Custom information",
      "Easy installation",
      "Multiple sizes",
      "UV protected",
      "Perfect for listings"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop",
      yardSignsImg
    ]
  },
  {
    id: 402,
    title: "Parking Signs",
    category: "office-signs",
    slug: "parking-signs",
    description: "Regulatory parking signs for businesses, apartments, and public areas with official compliance standards.",
    tags: ["Regulatory", "Compliant"],
    img: "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
    price: 99,
    originalPrice: 129.99,
    pricePerEach: 19.8,
    originalPricePerEach: 25.99,
    rating: 4.4,
    ratingCount: 12,
    features: [
      "Official compliance",
      "Weather resistant",
      "Durable aluminum",
      "Reflective options",
      "Custom text",
      "Easy mounting",
      "Long-lasting",
      "Professional appearance"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 403,
    title: "Safety Signs",
    category: "office-signs",
    slug: "safety-signs",
    description: "OSHA compliant safety signs for workplaces, construction sites, and public areas with clear warnings and instructions.",
    tags: ["OSHA Compliant", "Safety"],
    img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop",
    price: 49,
    originalPrice: 69.99,
    pricePerEach: 9.8,
    originalPricePerEach: 13.99,
    rating: 4.5,
    ratingCount: 15,
    features: [
      "OSHA compliant",
      "Durable materials",
      "Weather resistant",
      "Clear messaging",
      "Multiple sizes",
      "Easy installation",
      "Reflective options",
      "Workplace safety"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 404,
    title: "Directional Signs",
    category: "office-signs",
    slug: "directional-signs",
    description: "Clear directional signs for offices, buildings, and public spaces to guide visitors and improve navigation.",
    tags: ["Directional", "Wayfinding"],
    img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=400&fit=crop",
    price: 79,
    originalPrice: 99.99,
    pricePerEach: 15.8,
    originalPricePerEach: 19.99,
    rating: 4.3,
    ratingCount: 10,
    features: [
      "Clear navigation",
      "Professional design",
      "Easy to read",
      "Custom directions",
      "Durable materials",
      "Multiple sizes",
      "Easy installation",
      "ADA compliant options"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=400&fit=crop",
      acrylicSignsImg
    ]
  },
  {
    id: 405,
    title: "Nameplate Signs",
    category: "office-signs",
    slug: "nameplate-signs",
    description: "Elegant nameplate signs for office doors, desks, and professional identification with premium finishes.",
    tags: ["Elegant", "Professional"],
    img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop",
    price: 89,
    originalPrice: 119.99,
    pricePerEach: 17.8,
    originalPricePerEach: 23.99,
    rating: 4.7,
    ratingCount: 16,
    features: [
      "Elegant design",
      "Professional finish",
      "Multiple materials",
      "Custom engraving",
      "Easy mounting",
      "Durable construction",
      "Office ready",
      "Premium look"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop",
      acrylicSignsImg
    ]
  },
  {
    id: 406,
    title: "ADA Compliant Signs",
    category: "office-signs",
    slug: "ada-compliant-signs",
    description: "Americans with Disabilities Act compliant signs with braille and tactile lettering for accessibility.",
    tags: ["ADA Compliant", "Accessible"],
    img: "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
    price: 129,
    originalPrice: 159.99,
    pricePerEach: 25.8,
    originalPricePerEach: 31.99,
    rating: 4.8,
    ratingCount: 11,
    features: [
      "ADA compliant",
      "Braille included",
      "Tactile lettering",
      "Professional finish",
      "Easy installation",
      "Durable materials",
      "Legal compliance",
      "Accessibility focused"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&h=400&fit=crop"
    ]
  },

  // Outdoor Signs - Using your existing images
  {
    id: 501,
    title: "Metal Photo Prints",
    category: "outdoor-signs",
    slug: "metal-photo-prints",
    description: "Preserve family moments and create a cool gallery corner at home with high-resolution photos reproduced on sterling aluminum.",
    tags: ["Premium", "Photo"],
    img: metalPhotoPrintsImg,
    price: 219,
    originalPrice: 249.99,
    pricePerEach: 43.8,
    originalPricePerEach: 49.99,
    rating: 4.7,
    ratingCount: 17,
    features: [
      "High-resolution print",
      "Sterling aluminum base",
      "Gloss or matte options",
      "Scratch-resistant",
      "Waterproof",
      "Gallery quality",
      "Modern style",
      "Long-lasting color"
    ],
    gallery: [metalPhotoPrintsImg, acrylicPhotoPrintsImg]
  },
  {
    id: 502,
    title: "Acrylic Photo Prints",
    category: "outdoor-signs",
    slug: "acrylic-photo-prints",
    description: "Create signs online at SquareSigns.com to upgrade your home design or exhibit artwork in galleries with elegant acrylic photos.",
    tags: ["Elegant", "Gallery"],
    img: acrylicPhotoPrintsImg,
    price: 229,
    originalPrice: 259.99,
    pricePerEach: 45.8,
    originalPricePerEach: 51.99,
    rating: 4.6,
    ratingCount: 16,
    features: [
      "Premium acrylic",
      "Gallery-grade print",
      "Fade-resistant",
      "Wall mount ready",
      "Crystal clear finish",
      "Custom sizes",
      "UV protection",
      "Ideal for artwork"
    ],
    gallery: [acrylicPhotoPrintsImg, metalPhotoPrintsImg]
  },
  {
    id: 503,
    title: "Illuminated Signs",
    category: "outdoor-signs",
    slug: "illuminated-signs",
    description: "LED illuminated signs for maximum visibility day and night, perfect for storefronts and business identification.",
    tags: ["LED", "Illuminated"],
    img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=400&fit=crop",
    price: 499,
    originalPrice: 599.99,
    pricePerEach: 99.8,
    originalPricePerEach: 119.99,
    rating: 4.9,
    ratingCount: 8,
    features: [
      "LED illumination",
      "24/7 visibility",
      "Energy efficient",
      "Weather proof",
      "Professional installation",
      "Custom designs",
      "Long lifespan",
      "Storefront ready"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=400&fit=crop",
      metalPhotoPrintsImg
    ]
  },
  {
    id: 504,
    title: "Monument Signs",
    category: "outdoor-signs",
    slug: "monument-signs",
    description: "Permanent monument signs for businesses, communities, and institutions with premium materials and professional installation.",
    tags: ["Permanent", "Premium"],
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop",
    price: 899,
    originalPrice: 1099.99,
    pricePerEach: 179.8,
    originalPricePerEach: 219.99,
    rating: 4.8,
    ratingCount: 6,
    features: [
      "Permanent installation",
      "Premium materials",
      "Professional grade",
      "Weather proof",
      "Custom design",
      "Landscape integrated",
      "Long-term solution",
      "Business identity"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop"
    ]
  },
  {
    id: 505,
    title: "A-Frame Signs",
    category: "outdoor-signs",
    slug: "a-frame-signs",
    description: "Portable A-frame sidewalk signs perfect for restaurants, retail stores, and outdoor promotions.",
    tags: ["Portable", "Sidewalk"],
    img: "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
    price: 129,
    originalPrice: 149.99,
    pricePerEach: 25.8,
    originalPricePerEach: 29.99,
    rating: 4.6,
    ratingCount: 8,
    features: [
      "Portable design",
      "Sturdy construction",
      "Double-sided",
      "Weather resistant",
      "Easy to store",
      "Adjustable height",
      "Perfect for sidewalks",
      "Professional look"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1578321272177-49c2074db9ea?w=500&h=400&fit=crop",
      yardSignsImg
    ]
  },
  {
    id: 506,
    title: "Park Benches with Signs",
    category: "outdoor-signs",
    slug: "park-benches-signs",
    description: "Combination park benches with integrated signage perfect for memorials, sponsorships, or community recognition.",
    tags: ["Memorial", "Community"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop",
    price: 799,
    originalPrice: 999.99,
    pricePerEach: 159.8,
    originalPricePerEach: 199.99,
    rating: 4.7,
    ratingCount: 5,
    features: [
      "Durable construction",
      "Weather proof",
      "Memorial options",
      "Community focused",
      "Professional installation",
      "Long-lasting",
      "Custom engraving",
      "Public spaces"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=400&fit=crop"
    ]
  }
];

export const templates = [
  {
    id: 1,
    title: "Cafe Menu With a List of Coffee",
    img: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg",
    category: "food"
  },
  {
    id: 2,
    title: "Bakery Food With Rolls",
    img: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
    category: "food"
  },
  {
    id: 3,
    title: "Hot Coffee Cup and Coffee Bar",
    img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    category: "food"
  },
  {
    id: 4,
    title: "Real Estate Property Listing",
    img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    category: "real-estate"
  },
  {
    id: 5,
    title: "Business Grand Opening",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    category: "business"
  },
  {
    id: 6,
    title: "Safety Warning Signs",
    img: "https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg",
    category: "safety"
  }
];
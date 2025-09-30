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
  {
    id: 101,
    title: "Aluminum Signs",
    category: "aluminum-signs",
    slug: "aluminum-signs",
    description:
      "Enhance your space with versatile, non-rusting aluminum products. They are available with single and double-sided printing options.",
    tags: ["Best Seller", "Hard Side"],
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
    gallery: [
      aluminumImg,
      yardSignsImg,
      trackDecalsImg,
      tabletopRetractableBannersImg
    ]
  },
  {
    id: 102,
    title: "Yard Signs",
    category: "yard-signs",
    slug: "yard-signs",
    description:
      "Display any message in your yard with light and portable personalized signs available in any shape and style you can imagine.",
    tags: ["Hard Side"],
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
    category: "foam-board-signs",
    slug: "foam-board-signs",
    description:
      "Make your own custom sign for events or presentations with lightweight and budget-friendly printing perfect for temporary use.",
    tags: ["NEW COLLECTION"],
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
    title: "Track Decals",
    category: "track-decals",
    slug: "track-decals",
    description:
      "This product is great for truck branding, promotions and decoration. It's available in three finishes suitable for personal and business use.",
    tags: ["NEW COLLECTION"],
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
    id: 201,
    title: "Tabletop Retractable Banners",
    category: "tabletop-retractable-banners",
    slug: "tabletop-retractable-banners",
    description:
      "Effective sign printing on portable and easy-to-assemble displays. Great for showcasing information with these custom signs.",
    tags: ["Best Seller"],
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
    id: 301,
    title: "Metal Photo Prints",
    category: "metal-photo-prints",
    slug: "metal-photo-prints",
    description:
      "Preserve family moments and create a cool gallery corner at home with high-resolution photos reproduced on sterling aluminum.",
    tags: [],
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
    id: 302,
    title: "Acrylic Photo Prints",
    category: "acrylic-photo-prints",
    slug: "acrylic-photo-prints",
    description:
      "Create signs online at SquareSigns.com to upgrade your home design or exhibit artwork in galleries with elegant acrylic photos.",
    tags: [],
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
    id: 304,
    title: "Wall Decals",
    category: "wall-decals",
    slug: "wall-decals",
    description:
      "Customize signs with stunning graphics on wall adhesives for indoor and outdoor use to reach your branding or decorative goals.",
    tags: [],
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
];
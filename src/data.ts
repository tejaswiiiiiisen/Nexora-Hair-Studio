import { Customer, Booking, Employee, ServiceHistory, PaymentTransaction, SalonService } from "./types";

export const SERVICE_CATEGORIES = [
  { id: "mens-hair", name: "Men's Hair Services", icon: "✂️" },
  { id: "womens-hair", name: "Women's Hair Services", icon: "👑" },
  { id: "beard-grooming", name: "Beard & Grooming", icon: "🧔" },
  { id: "skin-care", name: "Skin Care", icon: "✨" },
  { id: "waxing-threading", name: "Waxing & Threading", icon: "🌿" },
  { id: "nails", name: "Nail Services", icon: "💅" },
  { id: "makeup", name: "Makeup Services", icon: "💄" },
  { id: "spa-relaxation", name: "Spa & Relaxation", icon: "🧘" },
  { id: "bridal", name: "Bridal Packages", icon: "👰" }
];

export const DEFAULT_SERVICES: SalonService[] = [
  // 1. Men's Hair Services
  {
    id: "s-men-1",
    name: "Classic Haircut",
    category: "Men's Hair Services",
    description: "Clean professional haircut with finishing tailored to your head structure and lifestyle.",
    price: 399,
    duration: 30,
    iconName: "Scissors",
    rating: 4.8
  },
  {
    id: "s-men-2",
    name: "Premium Haircut",
    category: "Men's Hair Services",
    description: "Designer haircut with personalized style consultation and premium finish styling.",
    price: 699,
    duration: 45,
    iconName: "Scissors",
    rating: 4.9
  },
  {
    id: "s-men-3",
    name: "Hair Styling",
    category: "Men's Hair Services",
    description: "Trendy hair styling using luxury high-performance holding and texturizing products.",
    price: 499,
    duration: 20,
    iconName: "Sparkles",
    rating: 4.7
  },
  {
    id: "s-men-4",
    name: "Hair Wash",
    category: "Men's Hair Services",
    description: "Professional cleansing and scalp conditioning ritual with cooling therapeutic touch.",
    price: 299,
    duration: 15,
    iconName: "Droplet",
    rating: 4.6
  },
  {
    id: "s-men-5",
    name: "Hair Spa For Men",
    category: "Men's Hair Services",
    description: "Deep-conditioning nourishment therapy with ozone steam for ultimate scalp and hair health.",
    price: 999,
    duration: 45,
    iconName: "Flame",
    rating: 4.8
  },
  {
    id: "s-men-6",
    name: "Hair Smoothening",
    category: "Men's Hair Services",
    description: "Frizz control and intense smoothing treatment for highly manageable, smooth hair fibers.",
    price: 2999,
    duration: 120,
    iconName: "Layers",
    rating: 4.8
  },
  {
    id: "s-men-7",
    name: "Hair Straightening",
    category: "Men's Hair Services",
    description: "Long-lasting straight hair transformation using custom protein-bonding straightening formulas.",
    price: 3499,
    duration: 150,
    iconName: "Activity",
    rating: 4.7
  },
  {
    id: "s-men-8",
    name: "Hair Coloring",
    category: "Men's Hair Services",
    description: "Premium hair color application for perfect gray coverage or custom shades.",
    price: 1499,
    duration: 60,
    iconName: "Sparkles",
    rating: 4.7
  },
  {
    id: "s-men-9",
    name: "Global Hair Color",
    category: "Men's Hair Services",
    description: "Full hair color transformation using luxury ammonia-free chromatic formulas.",
    price: 2999,
    duration: 90,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-men-10",
    name: "Highlights",
    category: "Men's Hair Services",
    description: "Stylish custom multi-dimensional color highlights for a sharp, modern appearance.",
    price: 1999,
    duration: 90,
    iconName: "Sparkles",
    rating: 4.8
  },
  {
    id: "s-men-11",
    name: "Keratin Treatment",
    category: "Men's Hair Services",
    description: "Protein-rich bonding treatment for ultra-smooth texture, intense repair, and high shine.",
    price: 3999,
    duration: 120,
    iconName: "Flame",
    rating: 4.9
  },
  {
    id: "s-men-12",
    name: "Scalp Treatment",
    category: "Men's Hair Services",
    description: "Deep micro-cleansing and conditioning scalp care therapy to promote stronger growth.",
    price: 1499,
    duration: 45,
    iconName: "Compass",
    rating: 4.7
  },
  {
    id: "s-men-13",
    name: "Anti-Dandruff Therapy",
    category: "Men's Hair Services",
    description: "Targeted medical-grade treatment to eliminate dandruff, dry flakes, and restore scalp health.",
    price: 999,
    duration: 45,
    iconName: "Shield",
    rating: 4.8
  },
  {
    id: "s-men-14",
    name: "Hair Fall Treatment",
    category: "Men's Hair Services",
    description: "Intense hair follicle strengthening and structural repair therapy to minimize shedding.",
    price: 1999,
    duration: 45,
    iconName: "Heart",
    rating: 4.9
  },

  // 2. Beard & Grooming
  {
    id: "s-beard-1",
    name: "Beard Trim",
    category: "Beard & Grooming",
    description: "Clean beard shaping, contouring, and precision trimmer blending.",
    price: 299,
    duration: 20,
    iconName: "Scissors",
    rating: 4.8
  },
  {
    id: "s-beard-2",
    name: "Beard Styling",
    category: "Beard & Grooming",
    description: "Premium beard architectural styling with natural oils, balms, and hot towels.",
    price: 499,
    duration: 30,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-beard-3",
    name: "Royal Shave",
    category: "Beard & Grooming",
    description: "Hot towel luxury shaving experience with rich micro-lather, razor shave, and cooling mist.",
    price: 599,
    duration: 30,
    iconName: "Flame",
    rating: 5.0
  },
  {
    id: "s-beard-4",
    name: "Groom Package",
    category: "Beard & Grooming",
    description: "The ultimate combo: premium haircut, custom beard styling, hair wash, and facial cleanup.",
    price: 1999,
    duration: 90,
    iconName: "Award",
    rating: 5.0
  },

  // 3. Women's Hair Services
  {
    id: "s-women-1",
    name: "Women Haircut",
    category: "Women's Hair Services",
    description: "Professional structural hair redesign with specialized texturizing and blow dry finish.",
    price: 799,
    duration: 45,
    iconName: "Scissors",
    rating: 4.9
  },
  {
    id: "s-women-2",
    name: "Layer Cut",
    category: "Women's Hair Services",
    description: "Modern layered haircut designed to add volume, bounce, and beautiful motion to your hair.",
    price: 999,
    duration: 60,
    iconName: "Scissors",
    rating: 4.8
  },
  {
    id: "s-women-3",
    name: "Step Cut",
    category: "Women's Hair Services",
    description: "Stylish cascading step haircut crafted to create dramatic volume and shape.",
    price: 1199,
    duration: 60,
    iconName: "Scissors",
    rating: 4.8
  },
  {
    id: "s-women-4",
    name: "Bob Cut",
    category: "Women's Hair Services",
    description: "Elegant, crisp short Bob style haircut custom tailored to frame your facial architecture.",
    price: 999,
    duration: 45,
    iconName: "Scissors",
    rating: 4.7
  },
  {
    id: "s-women-5",
    name: "Fringe Cut",
    category: "Women's Hair Services",
    description: "Front fringe trimming, framing, and precise shape styling.",
    price: 499,
    duration: 20,
    iconName: "Scissors",
    rating: 4.6
  },
  {
    id: "s-women-6",
    name: "Hair Styling",
    category: "Women's Hair Services",
    description: "Premium event hair styling, waves, curls, or formal up-dos.",
    price: 999,
    duration: 45,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-women-7",
    name: "Blow Dry",
    category: "Women's Hair Services",
    description: "Professional high-volume blow dry finish with custom styling nozzles.",
    price: 699,
    duration: 30,
    iconName: "Wind",
    rating: 4.8
  },
  {
    id: "s-women-8",
    name: "Hair Wash",
    category: "Women's Hair Services",
    description: "Scalp cleansing and deep hydration conditioning with premium natural elements.",
    price: 399,
    duration: 20,
    iconName: "Droplet",
    rating: 4.7
  },
  {
    id: "s-women-9",
    name: "Hair Spa",
    category: "Women's Hair Services",
    description: "Deep repair and nourishment hair bath with specialized cream masques and hot vapor.",
    price: 1499,
    duration: 60,
    iconName: "Flame",
    rating: 4.9
  },
  {
    id: "s-women-10",
    name: "Hair Smoothening",
    category: "Women's Hair Services",
    description: "Silky smooth frizz-free treatment to reform and tame rebel curls.",
    price: 3999,
    duration: 150,
    iconName: "Layers",
    rating: 4.8
  },
  {
    id: "s-women-11",
    name: "Hair Straightening",
    category: "Women's Hair Services",
    description: "Permanent sleek straightening therapy for ultimate shine and structural realignment.",
    price: 4999,
    duration: 180,
    iconName: "Activity",
    rating: 4.9
  },
  {
    id: "s-women-12",
    name: "Keratin Treatment",
    category: "Women's Hair Services",
    description: "Luxury protein complex therapy to reconstruct porous hair shafts and minimize damage.",
    price: 5999,
    duration: 150,
    iconName: "Flame",
    rating: 5.0
  },
  {
    id: "s-women-13",
    name: "Hair Botox Treatment",
    category: "Women's Hair Services",
    description: "Advanced anti-aging dermal filler for hair: complete recovery and mirror-like shine.",
    price: 6999,
    duration: 150,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-women-14",
    name: "Hair Coloring",
    category: "Women's Hair Services",
    description: "Premium rich hair color application for high-gloss single-tone coverage.",
    price: 2999,
    duration: 90,
    iconName: "Sparkles",
    rating: 4.8
  },
  {
    id: "s-women-15",
    name: "Global Hair Color",
    category: "Women's Hair Services",
    description: "Complete luxury hair color transformation utilizing ammonia-free organic bases.",
    price: 4999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-women-16",
    name: "Highlights",
    category: "Women's Hair Services",
    description: "Creative premium foil highlights or baby-lights designed for dimension.",
    price: 3499,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-women-17",
    name: "Balayage",
    category: "Women's Hair Services",
    description: "Luxury hand-painted bespoke multi-tonal French color gradients.",
    price: 6999,
    duration: 180,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-women-18",
    name: "Ombre Color",
    category: "Women's Hair Services",
    description: "Beautiful seamless horizontal color shading from deep roots to bright ends.",
    price: 5999,
    duration: 150,
    iconName: "Sparkles",
    rating: 4.8
  },
  {
    id: "s-women-19",
    name: "Root Touch Up",
    category: "Women's Hair Services",
    description: "Gray hair root coverage and color refreshing for immediate neatness.",
    price: 999,
    duration: 45,
    iconName: "Sparkles",
    rating: 4.7
  },
  {
    id: "s-women-20",
    name: "Scalp Therapy",
    category: "Women's Hair Services",
    description: "Dermal scalp wellness treatment utilizing organic cooling elixirs.",
    price: 1999,
    duration: 60,
    iconName: "Compass",
    rating: 4.8
  },
  {
    id: "s-women-21",
    name: "Hair Repair Treatment",
    category: "Women's Hair Services",
    description: "Intense peptide-infused bonding rescue treatment for chemically stressed hair.",
    price: 2999,
    duration: 60,
    iconName: "Heart",
    rating: 4.9
  },

  // 4. Skin Care
  {
    id: "s-skin-1",
    name: "Clean Up",
    category: "Skin Care",
    description: "Essential skin pore cleansing, blackhead extraction, and oil control.",
    price: 499,
    duration: 30,
    iconName: "Smile",
    rating: 4.7
  },
  {
    id: "s-skin-2",
    name: "Classic Facial",
    category: "Skin Care",
    description: "Refreshing herbal massage facial with gentle cleansing, organic scrub, and pack.",
    price: 999,
    duration: 45,
    iconName: "Smile",
    rating: 4.8
  },
  {
    id: "s-skin-3",
    name: "Premium Facial",
    category: "Skin Care",
    description: "Advanced deep dermis facial with targeted nutrient serums for an immediate glow.",
    price: 1499,
    duration: 60,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-skin-4",
    name: "Brightening Facial",
    category: "Skin Care",
    description: "Micro-peel facial designed to reduce blemishes, boost brightness, and restore natural glow.",
    price: 1999,
    duration: 60,
    iconName: "Sun",
    rating: 4.9
  },
  {
    id: "s-skin-5",
    name: "De-Tan Treatment",
    category: "Skin Care",
    description: "Kojic acid and milk-protein wrap to erase UV tanning and refresh complexions.",
    price: 1499,
    duration: 45,
    iconName: "Sun",
    rating: 4.8
  },
  {
    id: "s-skin-6",
    name: "Bleach",
    category: "Skin Care",
    description: "Skin brightening and facial hair lightening treatment using gentle skin-safe formulas.",
    price: 599,
    duration: 30,
    iconName: "Sparkles",
    rating: 4.6
  },
  {
    id: "s-skin-7",
    name: "Skin Polishing",
    category: "Skin Care",
    description: "Microdermabrasion treatment to gently scrape dead skin cells and polish skin surface.",
    price: 1999,
    duration: 60,
    iconName: "Layers",
    rating: 4.9
  },
  {
    id: "s-skin-8",
    name: "Luxury Gold Facial",
    category: "Skin Care",
    description: "24K Gold foil infusion therapy for supreme dermal firming and absolute radiant glow.",
    price: 2499,
    duration: 75,
    iconName: "Award",
    rating: 5.0
  },
  {
    id: "s-skin-9",
    name: "Diamond Facial",
    category: "Skin Care",
    description: "Elite diamond dust micro-abrasive facial for structural polishing and cellular youth.",
    price: 2999,
    duration: 75,
    iconName: "Award",
    rating: 4.9
  },
  {
    id: "s-skin-10",
    name: "Hydra Facial",
    category: "Skin Care",
    description: "Multi-step hydro-vortex vacuum extraction, deep peel, and intense antioxidant hydration.",
    price: 3999,
    duration: 60,
    iconName: "Droplet",
    rating: 5.0
  },
  {
    id: "s-skin-11",
    name: "Oxygen Therapy",
    category: "Skin Care",
    description: "Pressurized hyperbaric oxygen misting containing vitamins to instantly plump dry skin.",
    price: 2499,
    duration: 60,
    iconName: "Wind",
    rating: 4.8
  },
  {
    id: "s-skin-12",
    name: "Korean Glow Facial",
    category: "Skin Care",
    description: "Technologically advanced layered ampoule infusion to cultivate translucent glass skin.",
    price: 3499,
    duration: 75,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-skin-13",
    name: "Anti Aging Facial",
    category: "Skin Care",
    description: "Collagen-rich matrix facial combined with firming micro-current massages.",
    price: 2999,
    duration: 75,
    iconName: "Activity",
    rating: 4.9
  },
  {
    id: "s-skin-14",
    name: "Acne Treatment",
    category: "Skin Care",
    description: "Blue LED light and salicylic acid micro-extraction to soothe inflammatory acne breakouts.",
    price: 2499,
    duration: 60,
    iconName: "Shield",
    rating: 4.8
  },
  {
    id: "s-skin-15",
    name: "Skin Rejuvenation",
    category: "Skin Care",
    description: "Cellular renewal system using concentrated plant stem-cells and heat-infusion.",
    price: 3999,
    duration: 75,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-skin-16",
    name: "Body Polishing",
    category: "Skin Care",
    description: "Complete full body botanical exfoliation, steam, and rich cocoa butter skin polishing.",
    price: 3999,
    duration: 90,
    iconName: "Sparkles",
    rating: 4.9
  },

  // 5. Waxing & Threading
  {
    id: "s-wax-1",
    name: "Arms Wax",
    category: "Waxing & Threading",
    description: "Smooth hair removal for full arms using soothing botanical wax.",
    price: 499,
    duration: 30,
    iconName: "Feather",
    rating: 4.7
  },
  {
    id: "s-wax-2",
    name: "Legs Wax",
    category: "Waxing & Threading",
    description: "Thorough smooth leg hair removal treatment with calming lotion.",
    price: 899,
    duration: 45,
    iconName: "Feather",
    rating: 4.8
  },
  {
    id: "s-wax-3",
    name: "Underarms Wax",
    category: "Waxing & Threading",
    description: "Fast and gentle hair removal for delicate underarm areas.",
    price: 299,
    duration: 15,
    iconName: "Feather",
    rating: 4.6
  },
  {
    id: "s-wax-4",
    name: "Face Wax",
    category: "Waxing & Threading",
    description: "Facial peach-fuzz hair removal using specialized facial honey wax.",
    price: 499,
    duration: 25,
    iconName: "Feather",
    rating: 4.7
  },
  {
    id: "s-wax-5",
    name: "Full Body Wax",
    category: "Waxing & Threading",
    description: "Complete head-to-toe gentle waxing session for a completely silky skin canvas.",
    price: 2999,
    duration: 120,
    iconName: "Feather",
    rating: 4.9
  },
  {
    id: "s-wax-6",
    name: "Chocolate Wax",
    category: "Waxing & Threading",
    description: "Anti-inflammatory warm chocolate wax formula to prevent redness and nourish skin.",
    price: 799,
    duration: 45,
    iconName: "Feather",
    rating: 4.8
  },
  {
    id: "s-wax-7",
    name: "Rica Wax",
    category: "Waxing & Threading",
    description: "Premium lipo-soluble Italian Rica wax, entirely colophony-free for zero skin irritation.",
    price: 999,
    duration: 45,
    iconName: "Feather",
    rating: 4.9
  },
  {
    id: "s-wax-8",
    name: "Back Wax",
    category: "Waxing & Threading",
    description: "Thorough back hair removal with custom skin-toning treatment.",
    price: 999,
    duration: 45,
    iconName: "Feather",
    rating: 4.7
  },
  {
    id: "s-wax-9",
    name: "Bikini Wax",
    category: "Waxing & Threading",
    description: "Highly sanitary, professional, and rapid intimate bikini waxing experience.",
    price: 1499,
    duration: 45,
    iconName: "Feather",
    rating: 4.8
  },
  {
    id: "s-thread-1",
    name: "Eyebrow Threading",
    category: "Waxing & Threading",
    description: "Ultra-precise eyebrow mapping, threading, and organic Aloe soothing finish.",
    price: 99,
    duration: 10,
    iconName: "Compass",
    rating: 4.9
  },
  {
    id: "s-thread-2",
    name: "Upper Lips",
    category: "Waxing & Threading",
    description: "Rapid upper lip area threading for quick grooming.",
    price: 99,
    duration: 5,
    iconName: "Compass",
    rating: 4.6
  },
  {
    id: "s-thread-3",
    name: "Forehead Threading",
    category: "Waxing & Threading",
    description: "Clean forehead hair removal with high accuracy.",
    price: 149,
    duration: 10,
    iconName: "Compass",
    rating: 4.7
  },
  {
    id: "s-thread-4",
    name: "Chin Threading",
    category: "Waxing & Threading",
    description: "Clean chin contour hair mapping and cotton thread removal.",
    price: 149,
    duration: 10,
    iconName: "Compass",
    rating: 4.7
  },
  {
    id: "s-thread-5",
    name: "Side Locks Threading",
    category: "Waxing & Threading",
    description: "Sharpening side locks to frame facial structure elegantly.",
    price: 199,
    duration: 15,
    iconName: "Compass",
    rating: 4.8
  },
  {
    id: "s-thread-6",
    name: "Full Face Threading",
    category: "Waxing & Threading",
    description: "Complete facial hair grooming and shaping for perfect cosmetics adhesion.",
    price: 399,
    duration: 30,
    iconName: "Compass",
    rating: 4.9
  },

  // 6. Nail Services
  {
    id: "s-nail-1",
    name: "Classic Manicure",
    category: "Nail Services",
    description: "Basic hand soak, nail clipping, shaping, cuticle care, and nourishing massage.",
    price: 599,
    duration: 30,
    iconName: "Feather",
    rating: 4.8
  },
  {
    id: "s-nail-2",
    name: "Pedicure",
    category: "Nail Services",
    description: "Comforting foot bath, filing, scrub, callus scraping, and moisturizing massage.",
    price: 799,
    duration: 45,
    iconName: "Smile",
    rating: 4.8
  },
  {
    id: "s-nail-3",
    name: "Nail Polish",
    category: "Nail Services",
    description: "Professional multi-coat high-shine nail lacquer application.",
    price: 299,
    duration: 15,
    iconName: "Sparkles",
    rating: 4.7
  },
  {
    id: "s-nail-4",
    name: "Nail Repair",
    category: "Nail Services",
    description: "Repair of broken or damaged nails using structural resin and silk wraps.",
    price: 199,
    duration: 15,
    iconName: "Shield",
    rating: 4.6
  },
  {
    id: "s-nail-5",
    name: "Nail Art",
    category: "Nail Services",
    description: "Bespoke hand-drawn shapes, patterns, gems, or lines on designated accent nails.",
    price: 499,
    duration: 30,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-nail-6",
    name: "Luxury Manicure",
    category: "Nail Services",
    description: "Premium manicure with organic sugar scrub, deep mud-mask, and warm paraffin wax.",
    price: 1299,
    duration: 45,
    iconName: "Feather",
    rating: 4.9
  },
  {
    id: "s-nail-7",
    name: "Luxury Pedicure",
    category: "Nail Services",
    description: "Prestige pedicure with volcanic stone massage, salt scrub, and ultra-hydrating butter.",
    price: 1499,
    duration: 60,
    iconName: "Smile",
    rating: 4.9
  },
  {
    id: "s-nail-8",
    name: "Foot Spa",
    category: "Nail Services",
    description: "Deep cleansing therapy, warm sea-salt soak, and 20-minute pure reflexology massage.",
    price: 999,
    duration: 45,
    iconName: "Droplet",
    rating: 4.8
  },
  {
    id: "s-nail-9",
    name: "Gel Manicure",
    category: "Nail Services",
    description: "Chip-resistant, high-gloss gel lacquer application cured under UV LED lights.",
    price: 1999,
    duration: 45,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-nail-10",
    name: "French Manicure",
    category: "Nail Services",
    description: "Elegant white tips styled with a clean pink sheer polish for classic look.",
    price: 1499,
    duration: 45,
    iconName: "Feather",
    rating: 4.8
  },
  {
    id: "s-nail-11",
    name: "Spa Manicure",
    category: "Nail Services",
    description: "Deep hydration, essential-oil hand scrub, and comforting organic lotion mask.",
    price: 999,
    duration: 45,
    iconName: "Heart",
    rating: 4.8
  },
  {
    id: "s-nail-12",
    name: "Gel Nails",
    category: "Nail Services",
    description: "Liquid builder gel layering for ultra-strong, shiny, and beautiful nail armor.",
    price: 2499,
    duration: 60,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-nail-13",
    name: "Acrylic Nails",
    category: "Nail Services",
    description: "High-durability artificial monomer-polymer extension structure with custom sizing.",
    price: 2999,
    duration: 75,
    iconName: "Shield",
    rating: 4.9
  },
  {
    id: "s-nail-14",
    name: "Nail Extensions",
    category: "Nail Services",
    description: "Full set of sculpted premium tips with custom luxury styling overlays.",
    price: 3499,
    duration: 90,
    iconName: "Sparkles",
    rating: 5.0
  },

  // 7. Makeup Services
  {
    id: "s-make-1",
    name: "Party Makeup",
    category: "Makeup Services",
    description: "Chic cosmetic layout crafted for evening celebrations, events, or heavy flash photography.",
    price: 2999,
    duration: 60,
    iconName: "Eye",
    rating: 4.8
  },
  {
    id: "s-make-2",
    name: "HD Makeup",
    category: "Makeup Services",
    description: "High-definition light-refractive cosmetic canvas to look completely flawless on-screen.",
    price: 4999,
    duration: 90,
    iconName: "Eye",
    rating: 4.9
  },
  {
    id: "s-make-3",
    name: "Eye Makeup",
    category: "Makeup Services",
    description: "Professional eye shadow blending, dramatic wings, mascara, and individual silk-lashes.",
    price: 999,
    duration: 30,
    iconName: "Eye",
    rating: 4.7
  },
  {
    id: "s-make-4",
    name: "Hair Styling (Makeup)",
    category: "Makeup Services",
    description: "Premium special occasion styling, waves, braids, or classy buns.",
    price: 1499,
    duration: 45,
    iconName: "Scissors",
    rating: 4.8
  },
  {
    id: "s-make-5",
    name: "Saree Draping",
    category: "Makeup Services",
    description: "Professional drape of pleats or elegant traditional wedding fabrics.",
    price: 999,
    duration: 30,
    iconName: "Feather",
    rating: 4.7
  },
  {
    id: "s-make-6",
    name: "Makeup Trial",
    category: "Makeup Services",
    description: "Consultation and partial makeup application session to design your perfect customized look.",
    price: 1499,
    duration: 45,
    iconName: "Eye",
    rating: 4.8
  },
  {
    id: "s-make-7",
    name: "Airbrush Makeup",
    category: "Makeup Services",
    description: "Ultra-thin atomized silicone base layer for a completely featherlight, sweat-proof skin.",
    price: 6999,
    duration: 90,
    iconName: "Wind",
    rating: 4.9
  },
  {
    id: "s-make-8",
    name: "Bridal Makeup",
    category: "Makeup Services",
    description: "Prestige luxury bridal beauty makeover featuring HD products, lashes, and ultimate glow.",
    price: 24999,
    duration: 180,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-make-9",
    name: "Engagement Makeup",
    category: "Makeup Services",
    description: "Elegant, soft and radiant cosmetic styling for your special engagement day.",
    price: 9999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-make-10",
    name: "Reception Makeup",
    category: "Makeup Services",
    description: "Glamorous reception look with stunning metallic highlights and contouring.",
    price: 14999,
    duration: 120,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-make-11",
    name: "Pre Wedding Makeup",
    category: "Makeup Services",
    description: "Complete pre-wedding photo shoot beauty prep and ongoing camera-ready touch ups.",
    price: 19999,
    duration: 150,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-make-12",
    name: "Celebrity Inspired Makeup",
    category: "Makeup Services",
    description: "Bespoke custom styling mapped on reference looks from your favorite icons.",
    price: 7999,
    duration: 90,
    iconName: "Star",
    rating: 4.9
  },
  {
    id: "s-make-13",
    name: "Bridal Hair Styling",
    category: "Makeup Services",
    description: "Detailed, premium bridal hairstyle with couture extensions and floral setting.",
    price: 4999,
    duration: 60,
    iconName: "Scissors",
    rating: 4.9
  },
  {
    id: "s-make-14",
    name: "Bridal Eye Makeup",
    category: "Makeup Services",
    description: "Highly detailed, glittering bridal eye styling with luxury dynamic lashes.",
    price: 1999,
    duration: 45,
    iconName: "Eye",
    rating: 4.9
  },
  {
    id: "s-make-15",
    name: "Bridal Makeup Trial",
    category: "Makeup Services",
    description: "Full length testing session with complete palette adjustments for the big day.",
    price: 2999,
    duration: 90,
    iconName: "Eye",
    rating: 4.8
  },

  // 8. Spa & Relaxation
  {
    id: "s-spa-1",
    name: "Head Massage",
    category: "Spa & Relaxation",
    description: "Relaxing deep tissue scalp massage with warm herbal oils to clear stress and mental strain.",
    price: 499,
    duration: 30,
    iconName: "Heart",
    rating: 4.8
  },
  {
    id: "s-spa-2",
    name: "Foot Massage",
    category: "Spa & Relaxation",
    description: "Refreshing warm towel foot wipe and specialized acupressure reflexology massage.",
    price: 799,
    duration: 30,
    iconName: "Heart",
    rating: 4.8
  },
  {
    id: "s-spa-3",
    name: "Full Body Massage",
    category: "Spa & Relaxation",
    description: "Relaxing muscle-knot release massage using curated luxury botanical oils.",
    price: 2499,
    duration: 60,
    iconName: "Heart",
    rating: 4.9
  },
  {
    id: "s-spa-4",
    name: "Aroma Therapy",
    category: "Spa & Relaxation",
    description: "Relaxing sensory massage combined with custom organic lavender and sandalwood extracts.",
    price: 1999,
    duration: 60,
    iconName: "Flower",
    rating: 4.9
  },
  {
    id: "s-spa-5",
    name: "Swedish Massage",
    category: "Spa & Relaxation",
    description: "Classic gentle gliding strokes combined with rhythmic circular pressure for body bliss.",
    price: 2499,
    duration: 60,
    iconName: "Heart",
    rating: 4.8
  },
  {
    id: "s-spa-6",
    name: "Relaxation Therapy",
    category: "Spa & Relaxation",
    description: "Comforting full-body wellness therapy aimed at profound mental and somatic stress relief.",
    price: 1999,
    duration: 60,
    iconName: "Heart",
    rating: 4.9
  },
  {
    id: "s-spa-7",
    name: "Deep Tissue Massage",
    category: "Spa & Relaxation",
    description: "Focused high pressure kneading targeting deeper muscle layers to resolve chronic tension.",
    price: 2999,
    duration: 75,
    iconName: "Activity",
    rating: 4.9
  },
  {
    id: "s-spa-8",
    name: "Hot Stone Therapy",
    category: "Spa & Relaxation",
    description: "Warm volcanic basalt stones arranged on key energy meridians to melt deep stiffness.",
    price: 3499,
    duration: 75,
    iconName: "Flame",
    rating: 5.0
  },
  {
    id: "s-spa-9",
    name: "Body Scrub",
    category: "Spa & Relaxation",
    description: "Full body apricot and walnut shell polishing scrub with warm mist rinses.",
    price: 2499,
    duration: 45,
    iconName: "Sparkles",
    rating: 4.8
  },
  {
    id: "s-spa-10",
    name: "Body Wrap",
    category: "Spa & Relaxation",
    description: "Highly hydrating dead-sea mud body cocoon wrap to detoxify skin cells.",
    price: 2999,
    duration: 60,
    iconName: "Layers",
    rating: 4.9
  },
  {
    id: "s-spa-11",
    name: "Steam Therapy",
    category: "Spa & Relaxation",
    description: "Deep aromatic vapor steam chamber session for complete skin pore cleansing.",
    price: 999,
    duration: 30,
    iconName: "Wind",
    rating: 4.7
  },
  {
    id: "s-spa-12",
    name: "Stress Relief Treatment",
    category: "Spa & Relaxation",
    description: "Tailored combination of hot oil scalp pouring and neck meridian muscle release.",
    price: 1999,
    duration: 60,
    iconName: "Heart",
    rating: 4.9
  },

  // 9. Bridal Packages
  {
    id: "s-bridal-1",
    name: "Pre Bridal Skin Package",
    category: "Bridal Packages",
    description: "Complete skin conditioning routine: peeling, facials, and tan removal before the wedding.",
    price: 19999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-bridal-2",
    name: "Bridal Makeup",
    category: "Bridal Packages",
    description: "Prestige luxury airbrush makeup, couture hair style, and dynamic accessories mapping.",
    price: 24999,
    duration: 180,
    iconName: "Gift",
    rating: 5.0
  },
  {
    id: "s-bridal-3",
    name: "Engagement Look Package",
    category: "Bridal Packages",
    description: "Complete high-fashion makeover, hair braiding, and dress styling for engagement ceremony.",
    price: 9999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-bridal-4",
    name: "Reception Look Package",
    category: "Bridal Packages",
    description: "Dazzling evening reception look with stunning metallic cosmetics and formal updo.",
    price: 14999,
    duration: 120,
    iconName: "Sparkles",
    rating: 5.0
  },
  {
    id: "s-bridal-5",
    name: "Bridal Hair Styling",
    category: "Bridal Packages",
    description: "Artisanal hair creation tailored for heavy bridal veils with genuine flower elements.",
    price: 4999,
    duration: 60,
    iconName: "Scissors",
    rating: 4.9
  },
  {
    id: "s-bridal-6",
    name: "Royal Bridal Package",
    category: "Bridal Packages",
    description: "Complete prestige bridal glow: Gold facials, full-body polishing, and ultimate HD makeup.",
    price: 49999,
    duration: 240,
    iconName: "Award",
    rating: 5.0
  },
  {
    id: "s-bridal-7",
    name: "Premium Bridal Package",
    category: "Bridal Packages",
    description: "Prestige package featuring Luxury Hydra Facial, gel manicure, and custom airbrush makeup.",
    price: 69999,
    duration: 300,
    iconName: "Award",
    rating: 5.0
  },
  {
    id: "s-bridal-8",
    name: "Luxury Bridal Package",
    category: "Bridal Packages",
    description: "The ultimate luxury suite: hair botox, body polish, gold facial, and elite airbrush makeover.",
    price: 99999,
    duration: 360,
    iconName: "Award",
    rating: 5.0
  },
  {
    id: "s-bridal-9",
    name: "Complete Wedding Package",
    category: "Bridal Packages",
    description: "The complete suite: 3 full pre-wedding facials, manicure/pedicure, and D-day airbrush style.",
    price: 149999,
    duration: 420,
    iconName: "Award",
    rating: 5.0
  },
  {
    id: "s-bridal-10",
    name: "Bride + Groom Package",
    category: "Bridal Packages",
    description: "Exclusive couple experience: Groom Package + Complete Royal Bridal package in private suites.",
    price: 99999,
    duration: 360,
    iconName: "UserCheck",
    rating: 5.0
  },
  {
    id: "s-bridal-11",
    name: "Mehndi Package",
    category: "Bridal Packages",
    description: "Beautiful detailed bridal organic mehndi designs for both hands and feet by master artists.",
    price: 4999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  },
  {
    id: "s-bridal-12",
    name: "Wedding Day Glow Therapy",
    category: "Bridal Packages",
    description: "Instant facial glow oxygen therapy with specialized thermal gold collagen masks.",
    price: 4999,
    duration: 60,
    iconName: "Sun",
    rating: 5.0
  },
  {
    id: "s-bridal-13",
    name: "Bridal Makeup Trial (Bridal)",
    category: "Bridal Packages",
    description: "Complete trial mapping of bridal base products and shadows ahead of the main day.",
    price: 2999,
    duration: 90,
    iconName: "Eye",
    rating: 4.8
  },
  {
    id: "s-bridal-14",
    name: "Engagement Makeup (Bridal)",
    category: "Bridal Packages",
    description: "Premium engagement day makeup featuring fresh, youthful look and premium styling.",
    price: 9999,
    duration: 120,
    iconName: "Sparkles",
    rating: 4.9
  }
];

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: "emp1",
    name: "Prateek Sen",
    role: "Girls Hair Artist",
    specialization: "Girls Hair Artist",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  },
  {
    id: "emp-kunal",
    name: "Kunal",
    role: "Master Girls Hair Specialist",
    specialization: "Master Girls Hair Services",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  },
  {
    id: "emp-priya",
    name: "Priya Nair",
    role: "Senior Hair Designer",
    specialization: "Senior Hair Designing",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  },
  {
    id: "emp-aisha",
    name: "Aisha Mehra",
    role: "Skin Therapy Consultant",
    specialization: "Premium Skin Therapy",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  },
  {
    id: "emp-rohan",
    name: "Rohan Sharma",
    role: "Grooming Specialist",
    specialization: "Advanced Men's Styling",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  },
  {
    id: "emp-megha",
    name: "megha sharma",
    role: "Prestige Stylist",
    specialization: "Vivid Colors & Cuts",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    totalCustomers: 0,
    completedServices: 0,
    revenueGenerated: 0,
    todayCustomers: 0,
    todayCompletedServices: 0,
    todayRevenue: 0
  }
];

export const DEFAULT_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Ananya Kapoor", phone: "9876543210", email: "ananya.k@gmail.com" },
  { id: "c2", name: "Vikram Malhotra", phone: "9123456789", email: "vikram@malhotra.org" },
  { id: "c3", name: "Devansh Mehta", phone: "9988776655", email: "dev@mehtatech.io" },
  { id: "c4", name: "Sneha Roy", phone: "9456123789", email: "sneha.roy@creative.co" }
];

export const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: "NEX-2045-01",
    customerId: "c1",
    customerName: "Vikram Malhotra",
    customerPhone: "9123456789",
    services: ["Classic Haircut", "Beard Trim"],
    amount: 698,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-06-30",
    time: "12:00",
    status: "Completed",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    feedback: "Exceptional service from Prateek. Truly professional grooming."
  },
  {
    id: "NEX-2045-02",
    customerId: "c2",
    customerName: "Ananya Kapoor",
    customerPhone: "9876543210",
    services: ["Women Haircut", "Classic Manicure"],
    amount: 1398,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-06-30",
    time: "11:30",
    status: "Completed",
    assignedEmployeeId: "emp-priya",
    assignedEmployeeName: "Priya Nair",
    feedback: "Exceptional hair sculpting! The director understood my hair perfectly."
  },
  {
    id: "NEX-2045-03",
    customerId: "c3",
    customerName: "Devansh Mehta",
    customerPhone: "9988776655",
    services: ["Korean Glow Facial"],
    amount: 3499,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-06-30",
    time: "09:30",
    status: "Completed",
    assignedEmployeeId: "emp-aisha",
    assignedEmployeeName: "Aisha Mehra",
    feedback: "The Korean Glow Facial is unmatched. My skin looks completely rejuvenated."
  },
  {
    id: "NEX-2045-04",
    customerId: "c4",
    customerName: "Sneha Roy",
    customerPhone: "9812345678",
    services: ["Airbrush Makeup"],
    amount: 6999,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-06-25",
    time: "15:30",
    status: "Completed",
    assignedEmployeeId: "emp-priya",
    assignedEmployeeName: "Priya Nair",
    feedback: "Excellent service!"
  },
  {
    id: "NEX-2045-05",
    customerId: "c5",
    customerName: "Rohan Sharma",
    customerPhone: "9712345678",
    services: ["Classic Beard Grooming", "Keratin Therapy"],
    amount: 4998,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-06-20",
    time: "14:30",
    status: "Completed",
    assignedEmployeeId: "emp-rohan",
    assignedEmployeeName: "Rohan Sharma",
    feedback: "Very professional grooming."
  },
  {
    id: "NEX-2045-06",
    customerId: "c6",
    customerName: "Aanya Roy",
    customerPhone: "9900112233",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:50",
    status: "Completed",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    feedback: "Outstanding layering by Kunal. Very elegant styling."
  },
  {
    id: "NEX-2045-07",
    customerId: "c7",
    customerName: "Client 4",
    customerPhone: "9911223344",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:39",
    status: "Completed",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    feedback: "Extremely clean design and great style execution."
  },
  {
    id: "NEX-2045-08",
    customerId: "c8",
    customerName: "Customer 2",
    customerPhone: "9922334455",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:36",
    status: "Completed",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    feedback: "Kunal did an amazing job with my hair structure alignment."
  },
  {
    id: "NEX-2045-09",
    customerId: "c9",
    customerName: "Customer 1",
    customerPhone: "9933445566",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:35",
    status: "Completed",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    feedback: "High speed, direct precision cuts. Exceptionally good."
  },
  {
    id: "NEX-2045-10",
    customerId: "c10",
    customerName: "Customer 4",
    customerPhone: "9944556677",
    services: ["Hair Straightening"],
    amount: 3499,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:14",
    status: "Completed",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    feedback: "Perfect straight hair look. Highly professional chemical treatment."
  },
  {
    id: "NEX-2045-11",
    customerId: "c11",
    customerName: "shakir khan",
    customerPhone: "9955667788",
    services: ["Beard Trim"],
    amount: 299,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "08:10",
    status: "Completed",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    feedback: "Super clean shave and precise sideburns styling."
  },
  {
    id: "NEX-2045-12",
    customerId: "c12",
    customerName: "Client 1",
    customerPhone: "9966778899",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "07:54",
    status: "Completed",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    feedback: "Very stylish and dynamic look. Recommended to anyone."
  },
  {
    id: "NEX-2045-13",
    customerId: "c13",
    customerName: "Customer 2",
    customerPhone: "9977889900",
    services: ["Classic Haircut"],
    amount: 399,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "07:41",
    status: "Completed",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    feedback: "Great value and exceptional comfort. Thanks megha!"
  },
  {
    id: "NEX-2045-14",
    customerId: "c14",
    customerName: "rinku rawat",
    customerPhone: "9988990011",
    services: ["Classic Haircut"],
    amount: 399,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "06:17",
    status: "Completed",
    assignedEmployeeId: "emp-kunal",
    assignedEmployeeName: "Kunal",
    feedback: "Incredibly fast service, precise work by Kunal."
  },
  {
    id: "NEX-2045-15",
    customerId: "c15",
    customerName: "Client 5",
    customerPhone: "9999000111",
    services: ["Classic Haircut", "Beard Trim"],
    amount: 698,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "22:19",
    status: "Completed",
    assignedEmployeeId: "emp-megha",
    assignedEmployeeName: "megha sharma",
    feedback: "Brilliant overall grooming package. Perfect evening service."
  },
  {
    id: "NEX-2045-16",
    customerId: "c16",
    customerName: "amrita gaur",
    customerPhone: "9900990099",
    services: ["Premium Haircut"],
    amount: 699,
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    date: "2026-07-01",
    time: "22:16",
    status: "Completed",
    assignedEmployeeId: "emp1",
    assignedEmployeeName: "Prateek Sen",
    feedback: "Fabulous hair styling and luxury wash service. Extremely satisfied."
  }
];

export const DEFAULT_HISTORY: ServiceHistory[] = [];

export const DEFAULT_PAYMENTS: PaymentTransaction[] = [
  {
    id: "TXN-9021-01",
    paymentMode: "Online Payment",
    status: "Paid",
    amount: 1398,
    bookingId: "NEX-2045-01",
    date: "2026-06-29"
  },
  {
    id: "TXN-9021-02",
    paymentMode: "Cash",
    status: "Pending",
    amount: 698,
    bookingId: "NEX-2045-02",
    date: "2026-06-29"
  },
  {
    id: "TXN-9021-03",
    paymentMode: "Online Payment",
    status: "Paid",
    amount: 3499,
    bookingId: "NEX-2045-03",
    date: "2026-06-29"
  },
  // Historic Payments for Analytics (Summing to realistic numbers)
  { id: "TXN-HIST-01", paymentMode: "Online Payment", status: "Paid", amount: 75000, bookingId: "MOCK-01", date: "2026-06-15" },
  { id: "TXN-HIST-02", paymentMode: "Cash", status: "Paid", amount: 48000, bookingId: "MOCK-02", date: "2026-06-18" },
  { id: "TXN-HIST-03", paymentMode: "Online Payment", status: "Paid", amount: 110000, bookingId: "MOCK-03", date: "2026-06-24" },
  { id: "TXN-HIST-04", paymentMode: "Cash", status: "Paid", amount: 35000, bookingId: "MOCK-04", date: "2026-05-10" },
  { id: "TXN-HIST-05", paymentMode: "Online Payment", status: "Paid", amount: 320000, bookingId: "MOCK-05", date: "2026-05-20" },
  { id: "TXN-HIST-06", paymentMode: "Online Payment", status: "Paid", amount: 1450000, bookingId: "MOCK-06", date: "2025-11-15" }
];

// Helper to load/save tables
export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(`nexa_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error("Error parsing localStorage for Nexa SaaS", e);
    return defaultValue;
  }
}

export function saveStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`nexa_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage for Nexa SaaS", e);
  }
}

export interface NexaState {
  customers: Customer[];
  bookings: Booking[];
  employees: Employee[];
  history: ServiceHistory[];
  payments: PaymentTransaction[];
}

export function loadAllNexaState(): NexaState {
  return {
    customers: getStoredData("customers", DEFAULT_CUSTOMERS),
    bookings: getStoredData("bookings", DEFAULT_BOOKINGS),
    employees: getStoredData("employees", DEFAULT_EMPLOYEES),
    history: getStoredData("history", DEFAULT_HISTORY),
    payments: getStoredData("payments", DEFAULT_PAYMENTS)
  };
}

export function saveAllNexaState(state: NexaState): void {
  saveStoredData("customers", state.customers);
  saveStoredData("bookings", state.bookings);
  saveStoredData("employees", state.employees);
  saveStoredData("history", state.history);
  saveStoredData("payments", state.payments);
}

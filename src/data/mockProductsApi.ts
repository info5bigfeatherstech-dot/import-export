export interface ProductItem {
  id: string
  sku: string
  name: string
  categorySlug: string
  categoryName: string
  group: 'Men' | 'Women' | 'Youth & Kids'
  division: string
  description: string
  materials: string
  specs: string
  moq: string
  leadTime: string
  image: string
  colors: { name: string; hex: string }[]
  sizes: string[]
  highlights: string[]
  customization: string[]
  season?: string
  fit?: string
  price?: string
  originalPrice?: string
  rating?: number
  reviewsCount?: number
  badge?: string
}

export interface CategoryMetadata {
  slug: string
  name: string
  group: 'Men' | 'Women' | 'Youth & Kids'
  division: string
  divisionSlug: string
  headline: string
  description: string
  bannerImage: string
  stats: {
    monthlyCapacity: string
    moq: string
    leadTime: string
    certifications: string
    sampleTime: string
  }
  availableStyles: string[]
}

const existingImages = [
  '/factory_floor.jpg',
  '/clean_designer.jpg',
  '/factory_exterior.jpg',
  '/cat_textiles_1790144411477.jpg',
  '/ind_retail_1790144526101.jpg',
  '/service_oem.jpg',
  '/cat_consumer_1790144498461.jpg',
  '/service_product_dev.jpg',
  '/service_odm.jpg',
  '/cat_engineering_1790144435454.jpg',
]

// Database of specific products for major subcategories
const specificProductsMap: Record<string, ProductItem[]> = {
  'mens-jacket': [
    {
      id: 'mj-01',
      sku: 'SSM-MJ-01',
      name: 'Heavyweight Waxed Canvas Trucker Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Vintage-inspired utility jacket engineered from 12 oz weather-resistant paraffin waxed cotton canvas. Reinforced brass rivets, flannel interior body lining, and antique brass shank buttons.',
      materials: '100% Cotton Waxed Canvas (380 GSM), 100% Brushed Cotton Flannel Lining',
      specs: '12 oz Paraffin Wax Coated, Triple-Needle Inseams, Dual Chest Flap Pockets',
      moq: '300 Pcs / Style',
      leadTime: '30 - 40 Days',
      image: '/factory_floor.jpg',
      colors: [
        { name: 'Field Tan', hex: '#C29B38' },
        { name: 'Dark Charcoal', hex: '#2B2D2F' },
        { name: 'Army Olive', hex: '#4B5320' },
        { name: 'Navy Indigo', hex: '#1C2E4A' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      highlights: [
        'Water-shedding waxed finish with vintage patina aging over time',
        'Custom engraved heavy-gauge brass shanks and sleeve cuff adjusters',
        'Dual welt handwarmer pockets lined with warm thermal microfleece',
      ],
      customization: ['Embossed leather back patch', 'Branded metal buttons', 'Custom woven neck label', 'Barcode hangtags'],
      season: 'Autumn / Winter',
      fit: 'Regular Boxy Fit',
    },
    {
      id: 'mj-02',
      sku: 'SSM-MJ-02',
      name: 'All-Weather Technical Softshell Windbreaker',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: '3-Layer bonded technical softshell jacket featuring a waterproof microporous TPU membrane. Built for athletic teams, outdoor corporate wear, and private label active collections.',
      materials: '92% Polyester, 8% Spandex with TPU Film & Polar Fleece Backing',
      specs: '10,000mm Waterproof / 5,000 g/m² Breathability, YKK AquaGuard Zippers',
      moq: '400 Pcs / Style',
      leadTime: '25 - 35 Days',
      image: '/clean_designer.jpg',
      colors: [
        { name: 'Matte Black', hex: '#111215' },
        { name: 'Slate Grey', hex: '#64748B' },
        { name: 'Cobalt Blue', hex: '#1D4ED8' },
        { name: 'Forest Spruce', hex: '#14532D' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      highlights: [
        'Fully seam-sealed bonded construction with zero needle puncture leakages',
        '3D articulated sleeves and storm hood with bungee pull tighteners',
        'Internal audio pocket with silicone wire port and chest utility zips',
      ],
      customization: ['Reflective 3M print', 'Silicone molded zipper pulls', 'Custom contrast seam taping'],
      season: 'All-Season / Rainwear',
      fit: 'Athletic Slim Fit',
    },
    {
      id: 'mj-03',
      sku: 'SSM-MJ-03',
      name: 'Sherpa-Lined Corduroy Winter Rancher Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Rugged winter outerwear featuring 8-wale pure cotton corduroy lined with plush faux-shearling fleece. Offers exceptional thermal retention and casual heritage styling.',
      materials: '100% Cotton 8-Wale Corduroy Shell, 100% Recycled Poly Sherpa Lining',
      specs: '340 GSM Heavy Wale Corduroy, 300 GSM High-Pile Sherpa Collar & Body',
      moq: '350 Pcs / Style',
      leadTime: '30 - 45 Days',
      image: '/factory_exterior.jpg',
      colors: [
        { name: 'Camel Tan', hex: '#C19A6B' },
        { name: 'Espresso Brown', hex: '#3B2F2F' },
        { name: 'Washed Black', hex: '#222326' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      highlights: [
        'Thick sherpa collar that folds up for neck wind protection',
        'Quilted poly-fill satin sleeve lining for frictionless arm entry',
        'Heavy-duty bartacked stress corners on all pocket entries',
      ],
      customization: ['Custom collar sherpa shade', 'Engraved horn buttons', 'Custom chest pocket flag label'],
      season: 'Winter',
      fit: 'Relaxed Comfort Fit',
    },
    {
      id: 'mj-04',
      sku: 'SSM-MJ-04',
      name: 'MA-1 Reversible Flight Bomber Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Military aviation inspired flight jacket with flight-grade satin nylon shell and emergency orange reversible lining. Ribbed knit stand collar, waistband, and utility zip sleeve pocket.',
      materials: '100% Heavy Flight Nylon Shell, 120 GSM Thermal Polyfill Insulation',
      specs: 'Water-Repellent DWR Coating, Heavy 2x2 Wool-Blend Rib, Chunky #8 Metal Zip',
      moq: '400 Pcs / Style',
      leadTime: '25 - 35 Days',
      image: '/service_oem.jpg',
      colors: [
        { name: 'Sage Green', hex: '#5B6955' },
        { name: 'Flight Black', hex: '#18191B' },
        { name: 'Gunmetal Grey', hex: '#4A4E53' },
        { name: 'Burgundy Crimson', hex: '#581825' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      highlights: [
        'Signature cigarette / utility zipper pocket on left bicep with red ribbon pull',
        'Double-sided reversible zipper pull allowing dual-tone wearability',
        'Wind-resistant storm flap behind center front zipper closure',
      ],
      customization: ['Velcro chest morale patch', 'Custom jacquard lining', 'Rubberized sleeve badge'],
      season: 'Autumn / Spring',
      fit: 'Classic Bomber Silhouette',
    },
    {
      id: 'mj-05',
      sku: 'SSM-MJ-05',
      name: 'Ultra-Light Packable Down Puffer Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Ultralight cold-climate puffer built from 20D micro-ripstop nylon stuffed with RDS-certified 650+ fill power down or eco DuPont Sorona plant-based insulation. Folds into its own pocket pouch.',
      materials: '100% 20D Downproof Mini-Ripstop Nylon, 90/10 White Duck Down / Sorona',
      specs: 'Calendered down-proof weave, Elasticated cuff bindings, Stuff-sack included',
      moq: '500 Pcs / Style',
      leadTime: '30 - 40 Days',
      image: '/cat_textiles_1790144411477.jpg',
      colors: [
        { name: 'Midnight Navy', hex: '#0F1E36' },
        { name: 'Jet Black', hex: '#0C0D0E' },
        { name: 'Burnt Ochre', hex: '#B85A1C' },
        { name: 'Signal Red', hex: '#B91C1C' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      highlights: [
        'Thermal baffle stitch pattern preventing cold spots and down migration',
        'Weighs under 320 grams with exceptional warmth-to-weight ratio',
        'Drawcord adjustable cinch hem for heat lock-in against freezing drafts',
      ],
      customization: ['Pantone color dye matching', 'Custom down/feather fill ratio', 'Reflective screen printed logo'],
      season: 'Winter / Alpine',
      fit: 'Regular Layering Fit',
    },
    {
      id: 'mj-06',
      sku: 'SSM-MJ-06',
      name: 'Classic Selvedge Denim Trucker Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Iconic Type-III Western denim jacket constructed with 13.5 oz Japanese selvedge ring-spun indigo cotton denim. Features red selvedge id along inside placket and dual waist adjusters.',
      materials: '100% BCI Cotton Right-Hand Twill Selvedge Denim (13.5 oz)',
      specs: 'Raw & Enzyme Washed options, Tobacco dual-color stitching, Copper rivets',
      moq: '400 Pcs / Wash',
      leadTime: '30 - 45 Days',
      image: '/factory_exterior.jpg',
      colors: [
        { name: 'Raw Indigo', hex: '#1B263B' },
        { name: 'Vintage Stone Wash', hex: '#4A6572' },
        { name: 'Sulfur Black', hex: '#1E1E24' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      highlights: [
        'Red-line selvedge edge visible along the front button-fly interior',
        'Dual button-flap chest pockets and vertical side slip hand pockets',
        'Custom zinc electroplated embossed shanks with anti-corrosion coating',
      ],
      customization: ['Laser whiskering / distress level', 'Genuine cowhide back patch', 'Custom shank engraving'],
      season: 'All-Year Classic',
      fit: 'Structured Slim Fit',
    },
    {
      id: 'mj-07',
      sku: 'SSM-MJ-07',
      name: 'Waterproof Expedition Mountain Parka',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Extreme-weather technical parka with dual-layer storm hood, fleece-lined cargo pockets, and heavy-duty 500D Cordura elbow reinforcements. Built for arctic workwear and heavy outdoor use.',
      materials: '100% Tactel Nylon with 15,000mm Breathable Coating, Thermolite Quilt',
      specs: '15k Waterproof / 10k Breathable, Critically Taped Seams, Removable Faux Fur',
      moq: '300 Pcs / Style',
      leadTime: '35 - 50 Days',
      image: '/cat_consumer_1790144498461.jpg',
      colors: [
        { name: 'Sub-Zero Yellow', hex: '#EAB308' },
        { name: 'Arctic White / Black', hex: '#E2E8F0' },
        { name: 'Tactical Black', hex: '#0F172A' },
      ],
      sizes: ['M', 'L', 'XL', '2XL', '3XL'],
      highlights: [
        'Four large exterior 3D cargo pockets with glove-friendly pull tabs',
        'Deep snorkel hood with detachable faux-fur trim block ice winds',
        'Internal snow skirt and lycra storm cuffs with thumbholes',
      ],
      customization: ['Cordura reinforcement panels', 'Reflective hi-vis tape (EN 20471)', 'Custom metal snap logos'],
      season: 'Deep Winter',
      fit: 'Relaxed Expedition Fit',
    },
    {
      id: 'mj-08',
      sku: 'SSM-MJ-08',
      name: 'Tailored Wool-Blend Overcoat & Trench Jacket',
      categorySlug: 'mens-jacket',
      categoryName: "Men's Jacket",
      group: 'Men',
      division: 'Garments',
      description: 'Refined single-breasted topcoat woven from 650 GSM Melton wool and fine cashmere fibers. Features a notched lapel, Bemberg satin lining, and internal ticket and wallet pockets.',
      materials: '70% Wool, 20% Polyester, 10% Cashmere, Satin Cupro Lining',
      specs: '650 GSM Heavyweight Melton, Real Buffalo Horn Buttons, Center Back Vent',
      moq: '250 Pcs / Style',
      leadTime: '35 - 45 Days',
      image: '/clean_designer.jpg',
      colors: [
        { name: 'Camel Tan', hex: '#C19A6B' },
        { name: 'Charcoal Herringbone', hex: '#33373B' },
        { name: 'Midnight Navy', hex: '#111827' },
      ],
      sizes: ['38R', '40R', '42R', '44R', '46R', '48R'],
      highlights: [
        'Half-canvas chest construction conforming naturally to wearer body shape',
        'Hand-finished pick-stitched lapel edges and functional cuff buttonholes',
        'Thermal windproof interlining keeping executive warm over business suits',
      ],
      customization: ['Full monogrammed jacquard lining', 'Custom horn button laser engraving', 'Custom garment bag packaging'],
      season: 'Autumn / Winter',
      fit: 'Tailored Overcoat Cut',
    },
  ],

  'womens-jacket': [
    {
      id: 'wj-01',
      sku: 'SSM-WJ-01',
      name: 'Tailored Double-Breasted Wool Blazer',
      categorySlug: 'womens-jacket',
      categoryName: "Women's Jacket",
      group: 'Women',
      division: 'Garments',
      description: 'Sleek executive double-breasted blazer featuring structured shoulder pads, peak lapels, and tailored princess seams contouring the waistline.',
      materials: '65% Fine Wool, 33% Polyester, 2% Elastane Stretch',
      specs: 'Half-canvas chest, stretch cupro lining, tortoiseshell buttons',
      moq: '250 Pcs / Style',
      leadTime: '30 - 45 Days',
      image: '/clean_designer.jpg',
      colors: [
        { name: 'Ivory Cream', hex: '#FDFBF7' },
        { name: 'Jet Black', hex: '#111215' },
        { name: 'Houndstooth', hex: '#4B5563' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      highlights: ['Princess seam waist contouring', 'Wrinkle-resistant stretch weave', 'Double besom front flap pockets'],
      customization: ['Custom lining print', 'Engraved metallic buttons', 'Woven hanger loop'],
      season: 'All-Season Formal',
      fit: 'Tailored Hourglass Fit',
    },
    {
      id: 'wj-02',
      sku: 'SSM-WJ-02',
      name: 'Cropped Utility Trench Jacket',
      categorySlug: 'womens-jacket',
      categoryName: "Women's Jacket",
      group: 'Women',
      division: 'Garments',
      description: 'Modern cropped silhouette of the classic British trench coat. Crafted in heavy water-repellent cotton gabardine with storm flaps and buckle cuffs.',
      materials: '100% Combed Cotton Gabardine (280 GSM), DWR Finish',
      specs: 'Cropped waistline, raglan sleeves, horn buckle belt',
      moq: '300 Pcs / Style',
      leadTime: '30 - 40 Days',
      image: '/factory_floor.jpg',
      colors: [
        { name: 'Classic Honey', hex: '#D4AF37' },
        { name: 'Olive Sage', hex: '#708238' },
        { name: 'Midnight', hex: '#1E293B' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      highlights: ['Water-repellent protective cotton finish', 'Functional epaulets and storm storm shield', 'Fully lined with tonal lightweight twill'],
      customization: ['Custom buckle finishes', 'Personalized care labels', 'Contrast piping on seams'],
      season: 'Spring / Autumn',
      fit: 'Relaxed Cropped Cut',
    },
    {
      id: 'wj-03',
      sku: 'SSM-WJ-03',
      name: 'Oversized Vegan Leather Moto Biker Jacket',
      categorySlug: 'womens-jacket',
      categoryName: "Women's Jacket",
      group: 'Women',
      division: 'Garments',
      description: 'Edgy oversized moto jacket in premium buttery-soft vegan PU leather with heavy asymmetrical silver zippers, belted waist, and snap-down lapels.',
      materials: '100% Water-Based Eco PU, Polyester Satin Quilted Lining',
      specs: 'Heavyweight grain texture, Chunky YKK zippers, Waist pin buckle belt',
      moq: '350 Pcs / Style',
      leadTime: '30 - 40 Days',
      image: '/cat_consumer_1790144498461.jpg',
      colors: [
        { name: 'Matte Onyx', hex: '#0F172A' },
        { name: 'Cognac Brown', hex: '#8B4513' },
        { name: 'Burgundy', hex: '#5B1E31' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      highlights: ['Heavyweight soft nappa hand feel vegan leather', 'Asymmetrical zip with snap collar details', 'Zippered gusset sleeve cuffs'],
      customization: ['Embossed logo on leather', 'Custom hardware metal plating', 'Quilted interior stitching'],
      season: 'Autumn / Winter',
      fit: 'Drop-Shoulder Oversized',
    },
    {
      id: 'wj-04',
      sku: 'SSM-WJ-04',
      name: 'Lightweight Packable Quilted Diamond Jacket',
      categorySlug: 'womens-jacket',
      categoryName: "Women's Jacket",
      group: 'Women',
      division: 'Garments',
      description: 'Chic diamond quilted transition jacket with corduroy collar trim, curved shirt-tail hem, and snap button closure.',
      materials: '100% Recycled Polyester Shell, 80 GSM Breathable Polyfill',
      specs: 'Diamond 2x2 inch quilting, Corduroy binding, Snap fasteners',
      moq: '400 Pcs / Style',
      leadTime: '25 - 35 Days',
      image: '/clean_designer.jpg',
      colors: [
        { name: 'Equestrian Olive', hex: '#556B2F' },
        { name: 'Oatmeal Beige', hex: '#E5DCC5' },
        { name: 'Black', hex: '#1C1917' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      highlights: ['Ultra-light thermal layer perfect for seasonal transition', 'Patch front pockets with side hand entries', 'Curved drop hem providing seat coverage'],
      customization: ['Custom quilt stitch geometry', 'Engraved snaps', 'Contrast corduroy colors'],
      season: 'Spring / Autumn',
      fit: 'Relaxed Casual Fit',
    },
  ],

  'kids-jackets': [
    {
      id: 'kj-01',
      sku: 'SSM-KJ-01',
      name: "Kid's Heavy Duty Puffer Snow Jacket",
      categorySlug: 'kids-jackets',
      categoryName: "Kid's Jackets",
      group: 'Youth & Kids',
      division: 'Garments',
      description: 'Heavyweight winter parka engineered for child safety and cold playground endurance. Features soft fleece lined body and chin guard.',
      materials: 'Waterproof Nylon Shell, Hypoallergenic Polyester Down-Alternative Fill',
      specs: 'PFC-free DWR coating, 3M reflective safety badges, Cordless hood',
      moq: '400 Pcs / Style',
      leadTime: '25 - 35 Days',
      image: '/factory_floor.jpg',
      colors: [
        { name: 'Electric Blue', hex: '#2563EB' },
        { name: 'Berry Pink', hex: '#DB2777' },
        { name: 'Neon Lime', hex: '#84CC16' },
      ],
      sizes: ['2T', '3T', '4T', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
      highlights: ['CPSIA and REACH compliant lead-free zippers', 'Anti-pinch chin zipper guard', 'Reflective safety taping visible from 100 meters'],
      customization: ['Name label print inside', 'Custom silicone zipper pulls', 'Packable bag'],
      season: 'Winter',
      fit: 'Roomy Layering Fit',
    },
    {
      id: 'kj-02',
      sku: 'SSM-KJ-02',
      name: "Kid's Color-Block Windbreaker Rain Jacket",
      categorySlug: 'kids-jackets',
      categoryName: "Kid's Jackets",
      group: 'Youth & Kids',
      division: 'Garments',
      description: 'Fun, vibrant color-blocked lightweight windbreaker jacket with breathable mesh lining and elastic cuffs.',
      materials: '100% Lightweight Polyester Ripstop, Mesh Lining',
      specs: 'Water-resistant, Windproof, Elasticized storm hood',
      moq: '500 Pcs / Style',
      leadTime: '20 - 30 Days',
      image: '/clean_designer.jpg',
      colors: [
        { name: 'Pastel Block', hex: '#6EE7B7' },
        { name: 'Primary Trio', hex: '#F59E0B' },
      ],
      sizes: ['3T', '4T', '5-6Y', '7-8Y', '9-10Y'],
      highlights: ['Lightweight packable travel companion', 'Bright colors for easy parental spotting in public', 'Easy-zip large tooth molded resin zipper'],
      customization: ['Custom color block layouts', 'Interior name tag', 'Custom screen print on back'],
      season: 'Spring / Monsoon',
      fit: 'Regular Kids Fit',
    },
  ],
}

// Category metadata definitions
const categoryMetadataRegistry: Record<string, CategoryMetadata> = {
  'mens-jacket': {
    slug: 'mens-jacket',
    name: "Men's Jackets & Outerwear",
    group: 'Men',
    division: 'Garments',
    divisionSlug: 'garments',
    headline: "Commercial Manufacturing for Men's Jackets & Coats",
    description: "Full-line export apparel factory specializing in waxed canvas truckers, technical softshells, flight bombers, selvedge denim jackets, and winter down outerwear. Verified ISO 9001 and OEKO-TEX certified.",
    bannerImage: '/factory_floor.jpg',
    stats: {
      monthlyCapacity: '65,000 Pieces',
      moq: '300 Pcs / Style',
      leadTime: '25 - 40 Days',
      certifications: 'OEKO-TEX 100, BSCI, ISO 9001',
      sampleTime: '7 - 10 Business Days',
    },
    availableStyles: ['Trucker Jackets', 'Softshell Windbreakers', 'Bombers', 'Denim Jackets', 'Parkas', 'Puffer Down', 'Overcoats'],
  },
  'womens-jacket': {
    slug: 'womens-jacket',
    name: "Women's Jackets & Blazers",
    group: 'Women',
    division: 'Garments',
    divisionSlug: 'garments',
    headline: "Export Manufacturing for Women's Jackets & Tailored Outerwear",
    description: "High-precision manufacturing spanning tailored wool blazers, cropped utility trench coats, vegan leather moto jackets, and diamond-quilted seasonal outerwear for global fashion brands.",
    bannerImage: '/clean_designer.jpg',
    stats: {
      monthlyCapacity: '55,000 Pieces',
      moq: '250 Pcs / Style',
      leadTime: '25 - 40 Days',
      certifications: 'OEKO-TEX 100, SEDEX, BSCI',
      sampleTime: '7 - 10 Business Days',
    },
    availableStyles: ['Tailored Blazers', 'Cropped Trench', 'Vegan Leather Moto', 'Quilted Puffers', 'Wool Overcoats'],
  },
  'kids-jackets': {
    slug: 'kids-jackets',
    name: "Kid's & Youth Jackets",
    group: 'Youth & Kids',
    division: 'Garments',
    divisionSlug: 'garments',
    headline: "Child-Safe Outerwear & Insulated Jackets Manufacturing",
    description: "Strictly tested under CPSIA, REACH, and OEKO-TEX Class 1 standards. Lead-free hardware, non-choke cordless hoods, 3M reflective trims, and ultra-durable playground fabrics.",
    bannerImage: '/factory_exterior.jpg',
    stats: {
      monthlyCapacity: '50,000 Pieces',
      moq: '400 Pcs / Style',
      leadTime: '25 - 35 Days',
      certifications: 'OEKO-TEX Class 1, CPSIA, BSCI',
      sampleTime: '7 - 10 Business Days',
    },
    availableStyles: ['Heavy Snow Parkas', 'Lightweight Windbreakers', 'Sherpa Fleeces', 'Rain Slickers', 'Denim Jackets'],
  },
}

// Fallback generator for any subcategory not explicitly detailed above
function generateDynamicCategoryMeta(slug: string): CategoryMetadata {
  const cleanTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  let group: 'Men' | 'Women' | 'Youth & Kids' = 'Men'
  if (slug.startsWith('womens') || slug.includes('women')) group = 'Women'
  else if (slug.startsWith('kids') || slug.includes('youth') || slug.includes('kid')) group = 'Youth & Kids'

  const isFootwear = slug.includes('footwear') || slug.includes('sports') || slug.includes('sandals') || slug.includes('shoes') || slug.includes('boots')
  const isFabric = slug.includes('fabric') || slug.includes('twill') || slug.includes('denim-rolls')

  let division = 'Garments'
  let divisionSlug = 'garments'
  if (isFootwear) {
    division = 'Footwears'
    divisionSlug = 'footwears'
  } else if (isFabric) {
    division = 'Fabric'
    divisionSlug = 'fabric'
  }

  return {
    slug,
    name: cleanTitle,
    group,
    division,
    divisionSlug,
    headline: `Wholesale & Custom Export Manufacturing: ${cleanTitle}`,
    description: `High-volume OEM and private label production line for ${cleanTitle}. Custom dyeing, computerized CAD grading, rigorous in-line quality audits, and international container packaging.`,
    bannerImage: existingImages[Math.abs(slug.length) % existingImages.length],
    stats: {
      monthlyCapacity: isFootwear ? '40,000 Pairs' : '85,000 Pieces',
      moq: isFootwear ? '300 Pairs' : '400 Pieces',
      leadTime: '25 - 40 Days',
      certifications: 'OEKO-TEX 100, BSCI, ISO 9001',
      sampleTime: '7 - 10 Business Days',
    },
    availableStyles: ['Classic Standard', 'Premium Private Label', 'Technical Utility', 'Retail Ready Boxed', 'Eco-Sustainable'],
  }
}

function generateDynamicProducts(slug: string, meta: CategoryMetadata): ProductItem[] {
  const titles = [
    `Classic Heavyweight ${meta.name}`,
    `Performance Quick-Dry ${meta.name}`,
    `Vintage Washed ${meta.name}`,
    `Premium Organic Cotton ${meta.name}`,
    `All-Season Technical ${meta.name}`,
    `Casual Everyday ${meta.name}`,
    `Commercial Uniform Grade ${meta.name}`,
    `Contemporary Streetwear ${meta.name}`,
  ]

  return titles.map((title, idx) => ({
    id: `${slug}-${idx + 1}`,
    sku: `SSM-${slug.slice(0, 3).toUpperCase()}-${String(idx + 1).padStart(2, '0')}`,
    name: title,
    categorySlug: slug,
    categoryName: meta.name,
    group: meta.group,
    division: meta.division,
    description: `Engineered according to rigorous international export specifications. Features premium fabric selection, reactive wash-resistant color fastness, and bespoke private label options.`,
    materials: idx % 2 === 0 ? '100% Combed Compact BCI Cotton (240 GSM)' : 'Cotton-Polyester Blend (60/40) with Soft Silicone Finish',
    specs: 'Pre-shrunk, In-line AQL 1.5 Quality, Reinforced seams, Custom care label',
    moq: idx % 2 === 0 ? '300 Pcs / Color' : '500 Pcs / Spec',
    leadTime: '25 - 35 Days',
    image: existingImages[(idx + slug.length) % existingImages.length],
    colors: [
      { name: 'Deep Navy', hex: '#1E293B' },
      { name: 'Charcoal Grey', hex: '#334155' },
      { name: 'Olive Green', hex: '#4B5320' },
      { name: 'Desert Sand', hex: '#D2B48C' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    highlights: [
      'Reactive dyed fabric achieving 4.5 color fastness on international laundry tests',
      'Industrial needle detection verified before final export carton sealing',
      'Available with full private label branding: woven tags, barcode stickers, hangtags',
    ],
    customization: ['Private label woven tags', 'Custom PMS color matching', 'Custom print / embroidery placement'],
    season: 'All-Year Core',
    fit: 'Standard Export Fit',
  }))
}

// Mock API Call: fetch products by category slug
export async function fetchProductsByCategory(categorySlug: string): Promise<{
  category: CategoryMetadata
  products: ProductItem[]
}> {
  // Simulate network latency (100ms)
  await new Promise((resolve) => setTimeout(resolve, 80))

  const cleanSlug = categorySlug.toLowerCase().trim()
  const categoryMeta = categoryMetadataRegistry[cleanSlug] || generateDynamicCategoryMeta(cleanSlug)
  const products = specificProductsMap[cleanSlug] || generateDynamicProducts(cleanSlug, categoryMeta)

  return {
    category: categoryMeta,
    products,
  }
}

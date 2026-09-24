export interface ProductLineItem {
  id: string
  name: string
  subtitle: string
  specs: string
  materials: string
  moq: string
  leadTime: string
  image: string
  highlights: string[]
}

export interface CategoryDetail {
  id: string
  number: string
  title: string
  shortTitle: string
  subtitle: string
  tagline: string
  overview: string
  heroImage: string
  galleryImages: string[]
  stats: {
    monthlyCapacity: string
    moq: string
    leadTime: string
    certifications: string
    primaryMarkets: string
    inspectionLevel: string
  }
  productLines: ProductLineItem[]
  manufacturingHighlights: {
    title: string
    desc: string
  }[]
  qualityStandards: string[]
  packagingLogistics: {
    title: string
    desc: string
  }[]
  customizationOptions: string[]
}

export const categoryDetailsData: Record<string, CategoryDetail> = {
  garments: {
    id: 'garments',
    number: '01',
    title: 'Garments & Ready-to-Wear Division',
    shortTitle: 'Garments',
    subtitle: 'Ready-to-Wear, Denim & Uniforms',
    tagline: 'High-volume ethical apparel manufacturing with precision cut, stitch, wash, and finishing for global brands.',
    overview:
      'ShivaSun Moderno Impex operates comprehensive garment export operations serving department stores, global private labels, workwear distributors, and high-street fashion houses. Our production floors feature automated pattern cutters, computerized CAD grading, laser distressing, and strict in-line AQL 1.5 quality benchmarks.',
    heroImage: '/factory_floor.jpg',
    galleryImages: [
      '/factory_floor.jpg',
      '/clean_designer.jpg',
      '/factory_exterior.jpg',
      '/service_oem.jpg',
    ],
    stats: {
      monthlyCapacity: '350,000 Pieces',
      moq: '500 Pcs / Style',
      leadTime: '30 - 45 Days',
      certifications: 'OEKO-TEX 100, BSCI, SEDEX, ISO 9001',
      primaryMarkets: 'USA, UK, Germany, UAE, Australia',
      inspectionLevel: '100% Metal Detected, AQL 1.5/2.5',
    },
    productLines: [
      {
        id: 'denim-programs',
        name: 'Denim Programs & Jeans',
        subtitle: 'Men, Women & Kids Washed Denim',
        specs: '9.5 oz to 14.5 oz Selvedge, Ring Spun & Stretch Denim',
        materials: '100% BCI / Organic Cotton, Elastane Blends',
        moq: '800 Pcs per wash',
        leadTime: '35 - 45 Days',
        image: '/factory_floor.jpg',
        highlights: [
          'Eco-friendly laser whiskering & ozone water-saving wash',
          'Heavy-duty YKK / custom engraved shank buttons & rivets',
          'Triple-needle reinforced seat seams & chain-stitched hems',
        ],
      },
      {
        id: 'casual-knits',
        name: 'Casual Knits & Athleisure',
        subtitle: 'T-Shirts, Polos, Hoodies & Joggers',
        specs: '160 - 450 GSM Single Jersey, Pique, French Terry & Fleece',
        materials: 'Combed Compact Cotton, Modal, CVC & Recycled Polyester',
        moq: '500 Pcs per color',
        leadTime: '25 - 35 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Reactive dyeing with 4+ color fastness to wash and light',
          'Silicone wash & bio-polish for ultra-soft hand feel',
          'High-density screen print, puff, embroidery & direct-to-film',
        ],
      },
      {
        id: 'corporate-workwear',
        name: 'Corporate Uniforms & Industrial Workwear',
        subtitle: 'High-Durability Work Suits & Coveralls',
        specs: '220 - 320 GSM Twill, Canvas & Ripstop with Teflon coating',
        materials: 'Polyester-Cotton (65/35), Nomex Fire-Retardant Blends',
        moq: '300 Pcs per spec',
        leadTime: '30 - 40 Days',
        image: '/service_oem.jpg',
        highlights: [
          'Bar-tacked stress points and dual-layer knee pad pockets',
          'EN ISO 20471 certified high-visibility reflective trims',
          'Stain-resistant, oil-repellent and anti-static finishes',
        ],
      },
      {
        id: 'tailored-outerwear',
        name: 'Tailored Suits & Outerwear',
        subtitle: 'Blazers, Overcoats & Weatherproof Jackets',
        specs: 'Structured fusibles, water-repellent PU/TPU bonded shells',
        materials: 'Fine Wool Blends, Meltons, Technical Softshell',
        moq: '300 Pcs per style',
        leadTime: '40 - 55 Days',
        image: '/cat_textiles_1790144411477.jpg',
        highlights: [
          'Half-canvas and fused chest construction with Bemberg lining',
          'Windproof & waterproof taped seams up to 10,000mm',
          'Custom brand labelling, woven neck tape, and hanger packaging',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Computerized CAD & Automated Spreading',
        desc: 'Lectra and Gerber high-precision nesting systems maximizing fabric yield and achieving sub-millimeter cutting tolerances.',
      },
      {
        title: 'Sustainable Wash & Finishing Plant',
        desc: 'State-of-the-art Tonello ozone wash and Jeanologia laser finishing minimizing chemical usage and cutting water consumption by 65%.',
      },
      {
        title: 'Full In-House Needle Detection & AQL Inspection',
        desc: 'Every garment passes dual-probe conveyor metal detectors with rigorous 4-point fabric inspection and in-line AQL 1.5 audits.',
      },
    ],
    qualityStandards: [
      'OEKO-TEX Standard 100 Class I (safe for sensitive skin)',
      'BSCI & SEDEX 4-Pillar Social & Environmental Compliance',
      'Dimensional stability & shrinkage held below 3% after 5 washes',
      'ISO 105 color fastness ratings 4.0 or above across wash and rub tests',
    ],
    packagingLogistics: [
      {
        title: 'Export Flat Pack & GOH (Garment on Hanger)',
        desc: 'Individual polybags with custom warning labels, desiccant pouches, packed in heavy-duty 7-ply export cartons.',
      },
      {
        title: 'Multi-Modal Port Transit',
        desc: 'Regular dispatch via Mundra and Nhava Sheva (JNPT) ports with expedited sea-air options via Mumbai & Delhi air hubs.',
      },
    ],
    customizationOptions: [
      'Private label woven & printed heat-seal care labels',
      'Custom embossed leather / jacron back waist patches',
      'Branded polybags, hangtags with QR codes and RFID inventory stickers',
      'Pantone-matched dyed-to-order fabrics and trims',
    ],
  },

  footwears: {
    id: 'footwears',
    number: '02',
    title: 'Footwear & Performance Soling Division',
    shortTitle: 'Footwears',
    subtitle: 'Leather Shoes, Sneakers & Boots',
    tagline: 'Precision footwear engineering spanning Goodyear welted leather shoes, vulcanized sneakers, and industrial safety boots.',
    overview:
      'We supply international retail chains and private labels with robust footwear engineered for comfort, durability, and contemporary styling. Our manufacturing setup combines hand-finished Italian and Indian bovine leathers with modern injection-molded PU/Rubber outsoles, tested to European CE safety standards.',
    heroImage: '/ind_retail_1790144526101.jpg',
    galleryImages: [
      '/ind_retail_1790144526101.jpg',
      '/clean_designer.jpg',
      '/cat_consumer_1790144498461.jpg',
      '/factory_exterior.jpg',
    ],
    stats: {
      monthlyCapacity: '120,000 Pairs',
      moq: '300 Pairs / Style',
      leadTime: '35 - 50 Days',
      certifications: 'CE EN ISO 20345, ISO 9001, LWG Leather Certified',
      primaryMarkets: 'Europe, North America, Middle East, Southeast Asia',
      inspectionLevel: '100% Flex & Bond Tested, AQL 2.0',
    },
    productLines: [
      {
        id: 'formal-leather-shoes',
        name: 'Handcrafted Formal Leather Shoes',
        subtitle: 'Oxfords, Derbies, Loafers & Monkstraps',
        specs: 'Full grain & crust calf leather, Blake stitched & Goodyear construction',
        materials: 'LWG Silver/Gold certified bovine leather, Argentine leather soles',
        moq: '250 Pairs per style',
        leadTime: '40 - 50 Days',
        image: '/ind_retail_1790144526101.jpg',
        highlights: [
          'Hand-patina burnished finishes with vegetable-tanned leather linings',
          'Memory foam cushioned insoles with arch support shank',
          'Anti-slip TPU heel inserts for durable all-day wear',
        ],
      },
      {
        id: 'lifestyle-sneakers',
        name: 'Lifestyle & Athletic Sneakers',
        subtitle: 'Cup-sole, Vulcanized & Knit Runners',
        specs: 'Strobel construction, lightweight EVA midsoles & high-traction rubber',
        materials: 'Nubuck, Action Leather, Flyknit Mesh, Recycled TPU',
        moq: '400 Pairs per colorway',
        leadTime: '35 - 45 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Cold-cement bonding with high-peel strength adhesives',
          'Ortholite-grade breathable antibacterial footbeds',
          'Sublimated, embroidered or embossed tongue logos',
        ],
      },
      {
        id: 'industrial-safety-boots',
        name: 'Industrial Safety & Tactical Boots',
        subtitle: 'Steel Toe & Composite Toe Work Boots',
        specs: 'EN ISO 20345:2011 S1P / S3 certified safety standards',
        materials: 'Water-resistant oiled nubuck, dual-density PU/TPU outsole',
        moq: '300 Pairs per model',
        leadTime: '35 - 45 Days',
        image: '/cat_consumer_1790144498461.jpg',
        highlights: [
          '200J impact resistant steel/fiberglass toe caps & Kevlar puncture-proof midsoles',
          'Oil, acid, and heat resistant rubber tread up to 300°C',
          'Padded collar and moisture-wicking Cambrelle breathable lining',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Precision Die-Cutting & Computer Stitching',
        desc: 'Automated hydraulic clicking presses and CNC programmable sewing stations ensuring identical stitch alignment across batch runs.',
      },
      {
        title: 'Lasting & Vulcanizing Machinery',
        desc: 'Advanced pneumatic toe-lasting, heel-seat lasting, and temperature-controlled curing chambers maximizing sole adhesion strength.',
      },
      {
        title: 'Dynamic Flex & Abrasion Lab Testing',
        desc: 'SATRA standard Bally flexometer, DIN abrasion, and salt spray testing for metallic eyelets and zips.',
      },
    ],
    qualityStandards: [
      'SATRA TM161 sole bond adhesion exceeding 4.0 N/mm',
      'Leather Working Group (LWG) certified tanneries with zero toxic chrome VI',
      'Sole flex resistance verified over 100,000 cycles with zero cracks',
      'Formal CE certificates for all safety footwear lines',
    ],
    packagingLogistics: [
      {
        title: 'Branded Rigid Boxes & Mold-Inhibitor Pack',
        desc: 'Custom matte/gloss laminated shoe boxes with moisture-absorbing Micro-Pak stickers and protective non-woven dust bags.',
      },
      {
        title: 'Standard Master Export Cartons',
        desc: '10 to 12 pairs per heavy-gauge master carton, stackable up to 10 layers in maritime 40ft High Cube containers.',
      },
    ],
    customizationOptions: [
      'Custom debossed or gold-foil stamped footbed logos',
      'Custom branded outsole molds with client traction patterns',
      'Custom hardware: eyelets, speed hooks, lace aglets & shoeboxes',
      'Multiple width lasts (Standard D, Wide EE/EEE)',
    ],
  },

  'home-textile': {
    id: 'home-textile',
    number: '03',
    title: 'Home Textile & Hospitality Linens Division',
    shortTitle: 'Home-Textile',
    subtitle: 'Bedding, Linens, Towels & Curtains',
    tagline: 'Export-grade home textiles crafted from premium combed long-staple cotton, luxury linen, and performance technical yarns.',
    overview:
      'From 5-star hotel chains to major home decor retailers, ShivaSun Moderno Impex exports soft, durable, and colorfast home furnishings. Our lines include high-thread-count sateen bedsheets, zero-twist plush terry towels, blackout curtains, and luxury decorative cushion throws.',
    heroImage: '/cat_textiles_1790144411477.jpg',
    galleryImages: [
      '/cat_textiles_1790144411477.jpg',
      '/clean_designer.jpg',
      '/factory_floor.jpg',
      '/ind_hospitality_1790144778784.jpg',
    ],
    stats: {
      monthlyCapacity: '200,000 Sets',
      moq: '300 Sets / Style',
      leadTime: '30 - 45 Days',
      certifications: 'OEKO-TEX Standard 100, GOTS Certified, ISO 9001',
      primaryMarkets: 'USA, UK, Nordic Countries, Gulf GCC, Japan',
      inspectionLevel: 'AQL 1.5 Hospitality Commercial Standard',
    },
    productLines: [
      {
        id: 'bedding-linens',
        name: 'Luxury Bed Linens & Duvet Sets',
        subtitle: 'Hotel & Retail Sheet Sets',
        specs: '200 to 1000 Thread Count Percale, Sateen & Washed Linen',
        materials: '100% Long-Staple Egyptian & Indian Combed Cotton, Pure French Flax',
        moq: '300 Sets per size',
        leadTime: '30 - 40 Days',
        image: '/cat_textiles_1790144411477.jpg',
        highlights: [
          'Mercerized yarn for lustrous sheen, pill resistance & silky touch',
          'Deep pocket fitted sheets (up to 40cm) with 360-degree elastic',
          'Hotel closure and hidden pearl button duvet options',
        ],
      },
      {
        id: 'bath-towels',
        name: 'Hotel-Grade Bath Towels & Robes',
        subtitle: 'Zero-Twist & Combed Ringspun Towels',
        specs: '500 - 800 GSM Heavyweight Terry Towels & Velour Bathrobes',
        materials: '100% Combed Cotton, Bamboo-Cotton, Organic Terry',
        moq: '500 Pcs per size',
        leadTime: '25 - 35 Days',
        image: '/ind_hospitality_1790144778784.jpg',
        highlights: [
          'High water absorbency rates with fast drying weave structure',
          'Double-stitched side hems resisting repeated institutional laundering',
          'Vat dyeing ensuring chlorine resistance and zero color bleed',
        ],
      },
      {
        id: 'window-curtains',
        name: 'Blackout Curtains & Drapery',
        subtitle: 'Thermal Insulated & Decorative Drapery',
        specs: 'Triple-weave blackout fabric (blocking 99% light and UV)',
        materials: 'Linen-texture Polyester, Velvet, Jacquard weaves',
        moq: '200 Pairs per color',
        leadTime: '30 - 40 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Rust-proof metal eyelets / pinch pleat tape options',
          'Thermal room-temperature insulation reducing energy costs',
          'Wrinkle-resistant and machine washable easy-care finishes',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'High-Speed Airjet Weaving Looms',
        desc: 'State-of-the-art wide-width Tsudakoma airjet looms capable of weaving up to 340cm seamless sheeting fabrics.',
      },
      {
        title: 'Continuous Bleaching & Soft-Flow Dyeing',
        desc: 'Advanced tension-free processing providing uniform color penetration, zero shade variation, and lush fabric hand.',
      },
      {
        title: 'Automated Hemming & Cross-Cutting',
        desc: 'High-speed automated hemming lines producing perfectly square sheets and precision towel borders.',
      },
    ],
    qualityStandards: [
      'GOTS (Global Organic Textile Standard) certified organic options',
      'Chlorine fastness rating 4.0 for commercial hospitality laundering',
      'Formaldehyde-free and hypoallergenic certified by OEKO-TEX',
      'Tested for zero pilling after 25 commercial wash cycles',
    ],
    packagingLogistics: [
      {
        title: 'Retail Presentation Pack & Ribbon Ties',
        desc: 'Polybagged with full-color card insert, cardboard stiffeners, satin ribbons, or self-fabric tote bags.',
      },
      {
        title: 'Compressed Bales or Carton Packing',
        desc: 'Vacuum compression options to maximize container cube utilization and reduce freight costs by up to 30%.',
      },
    ],
    customizationOptions: [
      'Custom woven jacquard logos and dobby towel borders',
      'Custom thread counts, yarn twists, and hemstitch embroideries',
      'Private label retail barcodes, branded belly bands & hangtags',
    ],
  },

  'bags-wallets': {
    id: 'bags-wallets',
    number: '04',
    title: 'Leather Goods, Bags & Wallets Division',
    shortTitle: 'Bags & Wallets',
    subtitle: 'Leather Goods, Backpacks & Travel',
    tagline: 'Artisanal leather craftsmanship combined with modern industrial luggage construction for luxury and commercial brands.',
    overview:
      'We manufacture premium leather goods, corporate laptop briefcases, heavy-duty canvas backpacks, and travel luggage. Every bag is constructed using high-yield full-grain leathers, reinforced hardware, and waterproof bonded linings designed for demanding global travel.',
    heroImage: '/cat_consumer_1790144498461.jpg',
    galleryImages: [
      '/cat_consumer_1790144498461.jpg',
      '/clean_designer.jpg',
      '/ind_retail_1790144526101.jpg',
      '/factory_floor.jpg',
    ],
    stats: {
      monthlyCapacity: '80,000 Bags / 150,000 Wallets',
      moq: '200 Pcs / Style',
      leadTime: '30 - 45 Days',
      certifications: 'ISO 9001, REACH Compliant, LWG Gold/Silver',
      primaryMarkets: 'USA, UK, France, Germany, Japan, UAE',
      inspectionLevel: '100% Seam Pull Tested, AQL 1.5',
    },
    productLines: [
      {
        id: 'leather-wallets',
        name: 'RFID-Blocking Leather Wallets & Cardholders',
        subtitle: 'Bifold, Trifold & Minimalist Card Sleeves',
        specs: 'Hand-creased & turned edges, ultra-thin RFID metallic shield fabric',
        materials: 'Full-Grain Vegetable Tanned Bovine, Nappa, Crazy Horse Leather',
        moq: '300 Pcs per style',
        leadTime: '25 - 35 Days',
        image: '/cat_consumer_1790144498461.jpg',
        highlights: [
          'Certified RFID blocking protecting 13.56 MHz contactless chips',
          'Beeswax burnished edges or Italian edge-paint coats',
          'Heat-debossed client brand logos with foil stamping options',
        ],
      },
      {
        id: 'laptop-briefcases',
        name: 'Corporate Leather Briefcases & Messengers',
        subtitle: 'Executive Business Bags & Document Folios',
        specs: 'High-density foam padded laptop compartment (up to 16 inch)',
        materials: 'Pull-up Cowhide Leather, Waterproof 1000D Cordura Nylon',
        moq: '200 Pcs per style',
        leadTime: '35 - 45 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Solid antique brass / gunmetal zinc alloy hardware and YKK Excella zippers',
          'Detachable ergonomic leather shoulder straps with non-slip pad',
          'Luggage trolley pass-through sleeve on back panel',
        ],
      },
      {
        id: 'travel-backpacks',
        name: 'Technical Backpacks & Canvas Duffels',
        subtitle: 'Travel, Weekend & Outdoor Bags',
        specs: 'Waterproof PU coating, reinforced bottom panel, 25L - 45L capacity',
        materials: 'Waxed Canvas, 1680D Ballistic Nylon, Top Grain Trim',
        moq: '250 Pcs per style',
        leadTime: '30 - 40 Days',
        image: '/ind_retail_1790144526101.jpg',
        highlights: [
          'Ergonomic S-curve breathable mesh shoulder straps',
          'Reinforced box-X stitch patterns at all load-bearing handles',
          'Expandable quick-access water bottle and passport pockets',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Precision Leather Splitting & Skiving',
        desc: 'Fortuna skiving machines ensuring paper-thin edges on multi-layer wallet pockets without bulk or stiffness.',
      },
      {
        title: 'Automated Computerized Pattern Stitching',
        desc: 'Brother programmable sewing machines for flawless handle reinforcement and consistent stitch pitch.',
      },
      {
        title: 'Stress & Handle Drop Testing',
        desc: 'Jolt-test drop machines simulating 5,000 handle jerks under full 15kg load to ensure zero strap failure.',
      },
    ],
    qualityStandards: [
      'REACH compliant leathers with zero azo dyes and heavy metals',
      'Hardware salt-spray corrosion tested for 72+ hours',
      'Zipper burst strength exceeding 1,200 N',
    ],
    packagingLogistics: [
      {
        title: 'Individual Non-Woven Dust Bags',
        desc: 'Drawstring soft non-woven dust bag with printed logo, tissue stuffed to retain structural silhouette.',
      },
      {
        title: 'Hard-Rigid Master Export Cases',
        desc: 'Reinforced 5-ply cartons preventing crushing during air or ocean transit.',
      },
    ],
    customizationOptions: [
      'Laser engraved or cast zinc custom zipper pullers',
      'Pantone matched contrast stitching threads',
      'Blind deboss, silver/gold hot foil, and metal badge branding',
    ],
  },

  'jewellery-accessories': {
    id: 'jewellery-accessories',
    number: '05',
    title: 'Fashion Jewellery & Lifestyle Accessories Division',
    shortTitle: 'Jewellery & Accessories',
    subtitle: 'Fashion Jewellery, Watches & Belts',
    tagline: 'Precision cast hypoallergenic jewelry, stainless steel accessories, and premium finished leather lifestyle goods.',
    overview:
      'We design and manufacture fashion jewelry, stainless steel chains, cufflinks, premium leather belts, silk scarves, and precision timepieces. Utilizing vacuum PVD gold plating and hypoallergenic alloys, our accessories satisfy the world’s strictest nickel and lead release standards.',
    heroImage: '/ind_retail_1790144526101.jpg',
    galleryImages: [
      '/ind_retail_1790144526101.jpg',
      '/clean_designer.jpg',
      '/cat_consumer_1790144498461.jpg',
      '/factory_floor.jpg',
    ],
    stats: {
      monthlyCapacity: '500,000 Jewelry Pcs / 100,000 Belts',
      moq: '200 Pcs / Design',
      leadTime: '20 - 35 Days',
      certifications: 'REACH Compliant, California Prop 65, ISO 9001',
      primaryMarkets: 'USA, UK, Europe, Australia, Japan',
      inspectionLevel: 'XRF Metal Analyzer & 100% Optical Inspection',
    },
    productLines: [
      {
        id: 'stainless-steel-jewelry',
        name: '316L Stainless Steel & PVD Jewellery',
        subtitle: 'Necklaces, Pendants, Rings & Bracelets',
        specs: 'Vacuum PVD 18K Real Gold Plating (0.5 to 2.5 micron)',
        materials: 'Surgical Grade 316L Stainless Steel, AAA Zirconia Stones',
        moq: '150 Pcs per design',
        leadTime: '20 - 30 Days',
        image: '/ind_retail_1790144526101.jpg',
        highlights: [
          '100% Waterproof, tarnish-resistant and sweat-proof construction',
          'Hypoallergenic: zero nickel, lead, or cadmium release',
          'High-polish mirror surface and precision micro-prong stone settings',
        ],
      },
      {
        id: 'leather-belts',
        name: 'Full Grain Leather Belts & Buckles',
        subtitle: 'Formal Dress Belts & Heavy Duty Casual Jeans Belts',
        specs: 'Single piece 3.5mm - 4.0mm vegetable tanned bovine leather',
        materials: 'Italian Bovine Hide, Solid Brass & Zinc Buckles',
        moq: '300 Pcs per style',
        leadTime: '25 - 35 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Single-piece leather slab with zero synthetic fillers or bonded scrap',
          'Satin brushed nickel-free hardware and hand-burnished edges',
          'Custom laser-etched sizing and brand deboss on inner lining',
        ],
      },
      {
        id: 'scarves-ties',
        name: 'Silk Scarves, Pocket Squares & Neckwear',
        subtitle: 'Fashion Printed Scarves & Ties',
        specs: '12 - 16 Momme Mulberry Silk, Hand-rolled edges',
        materials: '100% Pure Mulberry Silk, Modal, Cashmere Blends',
        moq: '200 Pcs per print',
        leadTime: '25 - 35 Days',
        image: '/cat_textiles_1790144411477.jpg',
        highlights: [
          'High-definition double-sided digital inkjet printing with vivid color penetration',
          'Hand-rolled and hand-stitched hem edges for luxury finish',
          'Custom branded gift box and tissue wrap packaging',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Precision CAD/CAM & Wax Injection',
        desc: 'EnvisionTEC 3D wax printers ensuring crisp details and micro-settings in fashion jewelry casting.',
      },
      {
        title: 'Ion PVD Vacuum Plating Chamber',
        desc: 'Advanced physical vapor deposition delivering 10x longer tarnish resistance compared to standard electroplating.',
      },
      {
        title: 'In-House XRF Spectrometer Analysis',
        desc: 'Non-destructive elemental testing guaranteeing compliance with US California Prop 65 and EU REACH regulations.',
      },
    ],
    qualityStandards: [
      'EU REACH Annex XVII nickel release compliance (<0.28 µg/cm²/week)',
      'Lead and cadmium below detectable limits (<90 ppm)',
      'Salt spray fog chamber tested for 96 hours without corrosion',
    ],
    packagingLogistics: [
      {
        title: 'Velvet Pouches & Custom Jewelry Boxes',
        desc: 'Rigid paper boxes with custom foam inserts, anti-tarnish strips, and foil-stamped lids.',
      },
      {
        title: 'Barcode & SKU Carding',
        desc: 'Retail hanging backing cards with barcodes, polybagged, ready for direct store display.',
      },
    ],
    customizationOptions: [
      'Custom stone cut and laser engraving of customer logos',
      'Exclusive buckle molds and custom plating shades (Rose Gold, Champagne, Matte Black)',
      'Custom barcode hangtags and multi-piece boxed gift sets',
    ],
  },

  fabric: {
    id: 'fabric',
    number: '06',
    title: 'Textile Fabric Mills & Technical Weaves Division',
    shortTitle: 'Fabric',
    subtitle: 'Woven, Knitted & Technical Textiles',
    tagline: 'Mill-direct supply of woven denim, combed cotton twills, performance technical knits, and sustainable silks.',
    overview:
      'We supply international garment factories, workwear contractors, and fabric wholesalers with bulk certified textile rolls. Our mill partners utilize continuous dyeing, bio-mercerizing, and advanced finishing ranges to produce textiles meeting strict color consistency and shrinkage standards.',
    heroImage: '/cat_textiles_1790144411477.jpg',
    galleryImages: [
      '/cat_textiles_1790144411477.jpg',
      '/clean_designer.jpg',
      '/factory_floor.jpg',
      '/cat_engineering_1790144435454.jpg',
    ],
    stats: {
      monthlyCapacity: '2,500,000 Meters',
      moq: '1,000 Meters / Shade',
      leadTime: '20 - 35 Days',
      certifications: 'OEKO-TEX Standard 100, BCI, GOTS, ISO 9001',
      primaryMarkets: 'Vietnam, Bangladesh, Sri Lanka, Turkey, Europe',
      inspectionLevel: '100% 4-Point System Inspected',
    },
    productLines: [
      {
        id: 'woven-denim-rolls',
        name: 'Denim Fabrics & Selvedge Yardage',
        subtitle: 'Raw, Stretch & Sustainable Denim Rolls',
        specs: '8 oz to 15 oz weights, 3/1 right hand twill & cross hatch',
        materials: '100% Cotton, Cotton-Poly-Spandex, Tencel Blends',
        moq: '1,500 Meters per spec',
        leadTime: '25 - 35 Days',
        image: '/cat_textiles_1790144411477.jpg',
        highlights: [
          'Rope-dyed pure indigo and sulfur black with excellent wash-down contrast',
          'Controlled skewing and sanforized shrinkage below 3%',
          'Available in standard 58-60 inch cuttable widths',
        ],
      },
      {
        id: 'cotton-twill-poplin',
        name: 'Cotton Twills, Poplins & Shirting',
        subtitle: 'Garment & Uniform Grade Wovens',
        specs: '120 - 320 GSM, 2/1 & 3/1 twill, poplin, ripstop weaves',
        materials: 'Combed Compact Cotton, CVC, Poly-Viscose Blends',
        moq: '1,000 Meters per color',
        leadTime: '20 - 30 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Continuous thermosol pad dyeing ensuring roll-to-roll shade match',
          'Wrinkle-free resin finish, peach skin touch, and carbonized brush',
          'High tensile and tear strength suitable for industrial uniform manufacturing',
        ],
      },
      {
        id: 'circular-knits',
        name: 'Performance Knitted Fabrics',
        subtitle: 'Single Jersey, Interlock, Rib & Fleece',
        specs: '140 - 420 GSM, tubular and open-width rolls',
        materials: 'Organic Cotton, Spandex, Modal, Bamboo, Recycled Poly',
        moq: '800 Kgs per color',
        leadTime: '20 - 30 Days',
        image: '/factory_floor.jpg',
        highlights: [
          'Lycra elastane yarn feeding with high elastic recovery',
          'Bio-polishing enzyme wash preventing pilling and fuzz',
          'Moisture wicking (dry-fit) and anti-microbial silver ion treatments',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Toyota & Picanol Rapier/Airjet Looms',
        desc: 'High-speed weaving machinery operating with electronic dobby and jacquard shedding systems.',
      },
      {
        title: 'Monforts Sanforizing & Stenter Frames',
        desc: 'Advanced thermo-setting and chemical finishing ranges guaranteeing exact width and residual shrinkage.',
      },
      {
        title: 'Computerized Spectrophotometer Color Matching',
        desc: 'DataColor match spectrophotometers delivering Delta E < 0.8 against customer physical swatches or Pantone codes.',
      },
    ],
    qualityStandards: [
      'Graded strictly under the American 4-Point fabric inspection system',
      'Wash fastness (ISO 105-C06) rating 4.0 or above',
      'Rubbing fastness (dry 4.0, wet 3.5) with minimal crocking',
    ],
    packagingLogistics: [
      {
        title: 'Heavy Polyethylene Roll Packing',
        desc: 'Rolled onto heavy cardboard tubes, wrapped in double-layer polyethylene with vacuum-sealed end caps.',
      },
      {
        title: 'Batch Roll Labelling & Barcode Tracking',
        desc: 'Every roll labeled with roll number, gross/net weight, continuous meterage, and inspection point score.',
      },
    ],
    customizationOptions: [
      'Custom yarn spinning (slub, melange, heather, nep)',
      'Water-repellent (DWR), flame-retardant (FR), and anti-static finishes',
      'Custom rotary screen printing or digital reactive pigment prints',
    ],
  },

  'tailoring-accessories': {
    id: 'tailoring-accessories',
    number: '07',
    title: 'Tailoring Accessories & Garment Trims Division',
    shortTitle: 'Tailoring Accessories',
    subtitle: 'Zippers, Buttons, Threads & Linings',
    tagline: 'Complete apparel manufacturing supplies: industrial zippers, custom buttons, high-tensile threads, and fusible interlinings.',
    overview:
      'We supply global garment manufacturing factories and trim distribution houses with comprehensive tailoring supplies. From heavy-duty metal jean zippers to natural horn buttons, high-speed polyester core-spun threads, and woven fusibles, our trims undergo rigorous tensile and wash testing.',
    heroImage: '/clean_designer.jpg',
    galleryImages: [
      '/clean_designer.jpg',
      '/factory_floor.jpg',
      '/cat_engineering_1790144435454.jpg',
      '/service_oem.jpg',
    ],
    stats: {
      monthlyCapacity: '5,000,000 Zipper Units / 20M Buttons',
      moq: '1,000 Pcs per item',
      leadTime: '15 - 25 Days',
      certifications: 'OEKO-TEX Standard 100 Class I, ISO 9001',
      primaryMarkets: 'India, Bangladesh, Vietnam, Cambodia, Europe',
      inspectionLevel: '100% Machine Pull & Torque Tested',
    },
    productLines: [
      {
        id: 'industrial-zippers',
        name: 'Metal, Nylon & Plastic Zippers',
        subtitle: 'Auto-lock, Semi-auto & Reversible Zippers',
        specs: '#3, #5, #8, #10 teeth size; open-end, closed-end & two-way',
        materials: 'Brass, Antique Copper, Gunmetal, Molded Plastic, Coil Nylon',
        moq: '1,000 Pcs per length/color',
        leadTime: '15 - 25 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'High lateral chain strength tested up to 800 N without tooth displacement',
          'Wash and dry-clean resistant slider electroplating and enamel coating',
          'Tape dyed to match client Pantone shades with zero color variance',
        ],
      },
      {
        id: 'buttons-fasteners',
        name: 'Horn, Resin, Metal & Snap Buttons',
        subtitle: 'Shank Buttons, Rivets & Eyelets',
        specs: '14L to 60L button sizes; 2-hole, 4-hole, rimmed and laser engraved',
        materials: 'Real Horn, Corozo Nut, Polyester Resin, Brass, Zinc Alloy',
        moq: '2,000 Pcs per style',
        leadTime: '15 - 20 Days',
        image: '/factory_floor.jpg',
        highlights: [
          'High impact resistance avoiding shattering in industrial laundry presses',
          'Custom laser engraved brand names and crests with contrast ink fill',
          'Heavy-gauge prong snap buttons with reliable closing tension',
        ],
      },
      {
        id: 'sewing-threads-interlinings',
        name: 'High-Tenacity Threads & Fusible Interlinings',
        subtitle: 'Spun Polyester Threads & Woven Interlinings',
        specs: 'Tex 24 to Tex 120 thread counts; 30 - 120 GSM fusible interlining',
        materials: 'Polyester Core-Spun, 100% Cotton, Polyamide Adhesive Coating',
        moq: '500 Cones (5,000m each)',
        leadTime: '12 - 20 Days',
        image: '/service_oem.jpg',
        highlights: [
          'Siliconized finish minimizing needle friction and thread breakage at 7,000 SPM',
          'Dot-coating interlining adhesive with zero strike-through after fusing',
          'Certified OEKO-TEX Class 1 for direct skin contact',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Automated Zipper Assembly Lines',
        desc: 'High-precision Swiss and Taiwanese zipper forming and slider mounting machines ensuring smooth glide and high burst resistance.',
      },
      {
        title: 'CNC Button Turning & Laser Carving',
        desc: 'Computer-controlled button turning lathes producing exact rim contours and sub-millimeter laser etchings.',
      },
      {
        title: 'Continuous Fusing Press Verification',
        desc: 'Laboratory fusing presses calibrating temperature, pressure, and dwell time for all interlining types.',
      },
    ],
    qualityStandards: [
      'Slider locking torque tested exceeding ASTM D2061 standards',
      'Button pull-off attachment strength tested to 90 N for infant garments',
      '100% free of lead, nickel, and sharp burr edges',
    ],
    packagingLogistics: [
      {
        title: 'Bulk Industrial Polybag & Cartons',
        desc: 'Items packed in counts of 100 or 1,000 in heavy polybags, cased in reinforced corrugated export cartons.',
      },
      {
        title: 'Factory-Direct SKU Consolidations',
        desc: 'Multi-trim consolidation into single shipping batches to lower customs clearing overhead for overseas factories.',
      },
    ],
    customizationOptions: [
      'Custom slider puller shapes and molded brand emblems',
      'Custom button dyeing and faux-tortoise, mother-of-pearl effects',
      'Custom thread spool sizes from 1,000m retail to 10,000m industrial',
    ],
  },

  'electronic-appliances': {
    id: 'electronic-appliances',
    number: '08',
    title: 'Consumer Electronics & Home Tech Division',
    shortTitle: 'Electronic & Appliances',
    subtitle: 'Consumer Electronics & Home Tech',
    tagline: 'Certified smart consumer electronics, household appliances, USB-C power peripherals, and ambient lighting solutions.',
    overview:
      'We supply certified consumer tech, small home appliances, and charging peripherals to electronics importers and retail chains. All electrical components undergo high-voltage insulation tests, burn-in ageing, and hold CE, FCC, RoHS, and UL safety certifications.',
    heroImage: '/cat_engineering_1790144435454.jpg',
    galleryImages: [
      '/cat_engineering_1790144435454.jpg',
      '/cat_consumer_1790144498461.jpg',
      '/clean_designer.jpg',
      '/factory_exterior.jpg',
    ],
    stats: {
      monthlyCapacity: '150,000 Units',
      moq: '500 Units / Model',
      leadTime: '25 - 40 Days',
      certifications: 'CE, FCC, RoHS, CB, UL, ISO 9001',
      primaryMarkets: 'USA, EU, UK, Middle East, Southeast Asia',
      inspectionLevel: '100% Functional & Burn-In Testing',
    },
    productLines: [
      {
        id: 'small-home-appliances',
        name: 'Countertop Kitchen & Home Appliances',
        subtitle: 'Blenders, Electric Kettles, Air Fryers & Toasters',
        specs: '110V / 220V - 240V dual voltage options, 50/60Hz, 800W - 2200W',
        materials: 'Food-grade 304 Stainless Steel, BPA-Free Tritan, Heat-resistant ABS',
        moq: '500 Units per model',
        leadTime: '30 - 45 Days',
        image: '/cat_engineering_1790144435454.jpg',
        highlights: [
          'Automatic shutoff protection and dry-boil temperature sensors',
          'Pure copper motor windings ensuring long service lifespan',
          'Matte metallic and soft-touch exterior finishes with custom logo printing',
        ],
      },
      {
        id: 'power-charging',
        name: 'GaN Fast Chargers & USB-C Power Hubs',
        subtitle: 'Multi-Port Gallium Nitride (GaN) Power Adapters',
        specs: '30W to 140W PD 3.1 & QC 4+ fast charging protocols',
        materials: 'GaNFast semiconductor chips, V0 fire-retardant PC shell',
        moq: '1,000 Units per model',
        leadTime: '20 - 30 Days',
        image: '/cat_consumer_1790144498461.jpg',
        highlights: [
          'Intelligent power distribution protecting connected laptops and smartphones',
          'Interchangeable US/EU/UK/AU folding plugs for international retail markets',
          'Over-current, over-voltage, and short-circuit smart protections',
        ],
      },
      {
        id: 'ambient-led',
        name: 'Smart Ambient LED Lighting & Tech Audio',
        subtitle: 'Bluetooth Speakers & App-Controlled Lighting',
        specs: 'Bluetooth 5.3, RGBIC ambient lighting, Tuya / Smart Life compatibility',
        materials: 'Anodized Aluminum, Silicone Diffuser, ABS',
        moq: '500 Units per item',
        leadTime: '25 - 35 Days',
        image: '/clean_designer.jpg',
        highlights: [
          'Music sync responsive lighting with 16 million colors',
          'Long-life rechargeable lithium-ion battery packs with UN38.3 air transport safety',
          'Custom voice prompts and smartphone companion app integrations',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'SMT Surface Mount High-Speed Pick-and-Place',
        desc: 'Yamaha high-speed SMT lines assembling micro-pitch circuit boards with optical solder paste inspection.',
      },
      {
        title: '4-Hour Full-Load Thermal Burn-In Rooms',
        desc: 'Every electronic unit undergoes 100% active load cycling at elevated temperatures to eliminate early component failure.',
      },
      {
        title: 'Dielectric Voltage Withstand & Hi-Pot Testing',
        desc: 'Ensuring zero electrical leakage and 100% user safety under abnormal power surge conditions.',
      },
    ],
    qualityStandards: [
      'CE (EMC & LVD), FCC Part 15 Class B, and RoHS 2.0 directive compliant',
      'Drop tested from 1.2m onto concrete with zero casing rupture or malfunction',
      'Energy Star and ErP Tier 2 high energy-efficiency compliance',
    ],
    packagingLogistics: [
      {
        title: 'Retail Magnetic Clasp / E-Flute Gift Box',
        desc: 'High-end retail color packaging with custom thermoformed internal blister trays and user manuals.',
      },
      {
        title: 'Certified Hazardous Goods (UN38.3) Handling',
        desc: 'Full battery declarations, MSDS sheets, and compliant drop-tested carton labelling for international freight.',
      },
    ],
    customizationOptions: [
      'Custom silk-screened or laser-etched client branding',
      'Custom firmware greeting screens and Bluetooth pairing names',
      'Region-specific plug standards and translated user manuals in 12 languages',
    ],
  },

  'mix-items': {
    id: 'mix-items',
    number: '09',
    title: 'Consolidated Cargo & Mixed Merchandise Division',
    shortTitle: 'Mix Items',
    subtitle: 'Consolidated & Mixed Cargo Batches',
    tagline: 'Flexible multi-category consolidated shipments, mixed container assortments, and optimized international pallet lots.',
    overview:
      'Ideal for department stores, chain retailers, and trading houses requiring assorted products without filling separate containers for each category. ShivaSun Moderno Impex operates bonded consolidation warehouses, cross-docking facilities, and palletized packing systems that combine garments, footwear, home goods, and accessories into unified export bills of lading.',
    heroImage: '/cat_consumer_1790144498461.jpg',
    galleryImages: [
      '/cat_consumer_1790144498461.jpg',
      '/hero_terminal_dusk.jpg',
      '/hero_ship_cinematic.jpg',
      '/factory_exterior.jpg',
    ],
    stats: {
      monthlyCapacity: '100+ Mixed Containers (FCL / LCL)',
      moq: '1 Consolidated Pallet / 1 x 20ft Container',
      leadTime: '15 - 30 Days',
      certifications: 'Authorized Economic Operator (AEO), ISO 9001, Fumigation Certified',
      primaryMarkets: 'Africa, Caribbean, Latin America, CIS, Pacific Islands',
      inspectionLevel: '100% Consolidated Inventory Barcode Audit',
    },
    productLines: [
      {
        id: 'mixed-container-fcl',
        name: 'Mixed Multi-Category 20ft & 40ft FCLs',
        subtitle: 'Apparel + Footwear + Home Textile Assortments',
        specs: 'Optimized volumetric loading utilizing 3D container packing software',
        materials: 'Diverse consumer retail goods grouped by customs HS code',
        moq: '1 x 20ft FCL',
        leadTime: '20 - 30 Days',
        image: '/cat_consumer_1790144498461.jpg',
        highlights: [
          'Single consolidated Bill of Lading (B/L) and commercial invoice reducing clearance fees',
          'Heavy goods stowed on container floor with lightweight goods secured on upper tiers',
          'Container desiccant bags installed to prevent cargo sweat during equatorial transit',
        ],
      },
      {
        id: 'palletized-department-store',
        name: 'Palletized Department Store Bundles',
        subtitle: 'Ready-to-Shelf Merchandised Pallets',
        specs: 'Standard Euro (120x80cm) and US (120x100cm) heat-treated pallets',
        materials: 'Pre-ticketed garments, packaged linens, and boxed accessories',
        moq: '2 Pallets',
        leadTime: '15 - 25 Days',
        image: '/hero_terminal_dusk.jpg',
        highlights: [
          'Pre-barcoded with store SKU tags ready for direct retail floor stocking',
          'Heavy gauge stretch-wrapped with corner edge protectors and strapping bands',
          'Detailed carton-by-carton packing manifest provided with photographic proof',
        ],
      },
      {
        id: 'institutional-lot-consignments',
        name: 'Institutional Surplus & Wholesale Cargo Lots',
        subtitle: 'Hospitality & Contract Furnishing Batches',
        specs: 'Unified quality grades packed in standardized export bulk cartons',
        materials: 'Commercial linens, staff uniforms, utility footwear & kitchenware',
        moq: '500 Cartons',
        leadTime: '15 - 25 Days',
        image: '/hero_ship_cinematic.jpg',
        highlights: [
          'Pre-cleared customs documentation for fast import approval',
          'Fumigated ISPM-15 compliant timber pallets with international stamp',
          'Flexible partial-container LCL dispatch options',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Bonded Consolidation Warehousing',
        desc: 'Over 50,000 sq ft of modern racked consolidation storage equipped with electric reach trucks and computerized WMS.',
      },
      {
        title: '3D Computerized Load Plan Simulation',
        desc: 'Automated container stuffing software balancing axle weights, volume, and preventing cargo compression damage.',
      },
      {
        title: 'Unified Customs Classification & Export Filing',
        desc: 'Licensed in-house customs brokers managing multi-item HS code classification to prevent port clearance delays.',
      },
    ],
    qualityStandards: [
      'ISPM-15 heat-treated wood packaging standard compliance',
      'Barcode audit verifying 100% item accuracy against the commercial invoice',
      'Container door security seals (ISO 17712 High-Security Bolt Seals)',
    ],
    packagingLogistics: [
      {
        title: 'Heavy Duty Shrink-Wrapped Palletization',
        desc: 'Commercial 23-micron stretch film wrap with plastic top sheets preventing dust and moisture ingress.',
      },
      {
        title: 'Detailed Master Packing Manifests',
        desc: 'Carton-level barcodes synchronized with your purchase orders for instantaneous warehouse receiving.',
      },
    ],
    customizationOptions: [
      'Custom bundle curation based on buyer budget and target retail price points',
      'Custom price tag affixing and security ink-tag installation',
      'Direct-to-store distribution labeling and carton cross-docking',
    ],
  },

  'spare-parts': {
    id: 'spare-parts',
    number: '10',
    title: 'Industrial Machinery & Precision Spare Parts Division',
    shortTitle: 'Spare Parts',
    subtitle: 'Machinery & Industrial Components',
    tagline: 'High-precision CNC machined replacement parts, industrial pump valves, bearing assemblies, and hydraulic fittings.',
    overview:
      'We manufacture and export precision-engineered industrial components, automotive replacement spares, textile machinery parts, hydraulic fittings, and heavy bearing assemblies. Utilizing multi-axis CNC milling, induction hardening, and coordinate measuring machines (CMM), we supply components with micron-level tolerances.',
    heroImage: '/cat_engineering_1790144435454.jpg',
    galleryImages: [
      '/cat_engineering_1790144435454.jpg',
      '/ind_manufacturing_1790144594818.jpg',
      '/factory_exterior.jpg',
      '/cat_consumer_1790144498461.jpg',
    ],
    stats: {
      monthlyCapacity: '500,000 Precision Parts',
      moq: '100 Pcs / Engineering Spec',
      leadTime: '20 - 40 Days',
      certifications: 'ISO 9001:2015, IATF 16949, RoHS Compliant',
      primaryMarkets: 'Germany, USA, Japan, South Korea, UAE',
      inspectionLevel: '100% CMM & Optical Comparator Inspected',
    },
    productLines: [
      {
        id: 'cnc-machined-components',
        name: 'Multi-Axis CNC Turned & Milled Parts',
        subtitle: 'Precision Shafts, Bushings & Flanges',
        specs: 'Tolerances down to ±0.005mm; surface roughness Ra 0.4 µm',
        materials: 'Stainless Steel (304, 316, 17-4PH), Tool Steel, Brass, Aircraft Aluminum (6061/7075)',
        moq: '100 Pcs per drawing',
        leadTime: '20 - 35 Days',
        image: '/cat_engineering_1790144435454.jpg',
        highlights: [
          'Multi-axis simultaneous CNC machining producing complex geometry without re-fixturing',
          'Anodizing, hard-chrome plating, black oxide, and nitriding surface treatments',
          'Full material test reports (MTR) with 3.1 chemical & mechanical mill certificates',
        ],
      },
      {
        id: 'industrial-valves-pumps',
        name: 'Industrial Pump Impellers & High-Pressure Valves',
        subtitle: 'Fluid Handling & Process Pipeline Spares',
        specs: 'Pressure ratings up to 600 PSI (Class 150 - 600)',
        materials: 'CF8M Stainless, Ductile Iron, Bronze, Hastelloy Alloys',
        moq: '50 Pcs per spec',
        leadTime: '30 - 45 Days',
        image: '/ind_manufacturing_1790144594818.jpg',
        highlights: [
          'Dynamically balanced impellers minimizing vibration and bearing wear',
          'Hydrostatically pressure tested to 1.5x working pressure for 100% leak seal',
          'Flanged, threaded NPT/BSP, and butt-weld connection options',
        ],
      },
      {
        id: 'bearings-transmission',
        name: 'High-Load Bearings & Power Transmission',
        subtitle: 'Deep Groove, Tapered Roller & Pillow Blocks',
        specs: 'ABEC-3 to ABEC-7 precision classes, C3 clearance',
        materials: 'Gcr15 High-Carbon Chromium Bearing Steel, Ceramic Balls',
        moq: '200 Pcs per model',
        leadTime: '20 - 30 Days',
        image: '/cat_consumer_1790144498461.jpg',
        highlights: [
          'High temperature synthetic grease lubrication rated from -40°C to +180°C',
          'Double-lip rubber contact seals (2RS) preventing ingress of dust and moisture',
          'Laser etched part numbers and batch tracking codes on bearing outer rings',
        ],
      },
    ],
    manufacturingHighlights: [
      {
        title: 'Mazak & DMG Mori Multi-Axis Machining Centers',
        desc: 'Advanced CNC turning and milling centers maintaining tight geometric tolerances across continuous production shifts.',
      },
      {
        title: 'Controlled Atmosphere Heat Treatment',
        desc: 'In-house vacuum carburizing, quenching, and induction tempering ensuring case depth and core toughness.',
      },
      {
        title: 'Zeiss 3D Coordinate Measuring Machine (CMM)',
        desc: 'Sub-micron coordinate measuring machines providing automated inspection reports against client CAD step files.',
      },
    ],
    qualityStandards: [
      'ISO 9001:2015 and IATF 16949 automotive quality management compliance',
      'EN 10204 3.1 inspection certificates accompanying every production batch',
      'Ultrasonic non-destructive testing (NDT) checking for internal cast voids',
    ],
    packagingLogistics: [
      {
        title: 'VCI Anti-Corrosion Preservation Packing',
        desc: 'Coated in rust-preventative oil, wrapped in VCI vapor-corrosion-inhibitor paper and sealed polybags.',
      },
      {
        title: 'Reinforced Wooden Crates & Plywood Boxes',
        desc: 'Heavy industrial parts secured in bolted fumigated plywood cases with internal wooden cradles.',
      },
    ],
    customizationOptions: [
      'Reverse engineering from customer physical worn samples or 2D/3D blueprints',
      'Custom laser engraving of OEM part numbers, serials, and logos',
      'Custom hardening depths and surface plating specifications',
    ],
  },
}

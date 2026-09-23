import {
  TbScissors,
  TbBuildingFactory2,
  TbLayersDifference,
  TbWorldUpload,
} from 'react-icons/tb'

export interface ServiceDetail {
  id: string
  number: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  heroDescription: string
  image: string
  icon: typeof TbScissors
  leadTime: string
  capacity: string
  qualityStandard: string
  keyHighlight: string
  processSteps: {
    step: string
    title: string
    description: string
  }[]
  specializations: string[]
  deliverables: string[]
  quotePrompt: string
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'product-development',
    number: '01',
    title: 'Product Development & Sampling',
    shortTitle: 'Product Development',
    tagline:
      'Turning ideas, sketches or reference images into production-ready products with technical documentation and prototypes.',
    description:
      'From CAD patterns and grading charts to bespoke denim wash formulas and pre-production fit samples, we engineer your concepts into production-ready collections.',
    heroDescription:
      'At ShivaSun Moderno Impex Private Limited, our Product Development department translates fashion sketches, moodboards, and CAD drawings into market-ready apparel collections. With specialized focus on Garments, Fabrics, Tailoring Accessories, Footwears, and any product as per customer requirement, we engineer every prototype to meet exacting international fit and quality benchmarks.',
    image: '/clean_designer.jpg',
    icon: TbScissors,
    leadTime: '7 - 14 Days (Sample Proto)',
    capacity: '150,000+ Units / Month Capacity',
    qualityStandard: 'AQL 2.5 Strict Inspection',
    keyHighlight: 'Rapid Prototyping & Bespoke Fabric Matching',
    processSteps: [
      {
        step: '01',
        title: 'Design Brief & Tech-Pack Analysis',
        description:
          'Reviewing your design sketches, measurement charts, grading increments, and tolerance parameters to build a comprehensive technical specification file.',
      },
      {
        step: '02',
        title: 'Fabric Sourcing & Lab Dips',
        description:
          'Procuring exact GSM target textiles (denim, twills, knits, cottons) and dyeing custom pantone shades with certified colorfastness testing.',
      },
      {
        step: '03',
        title: '3D CAD Pattern Engineering',
        description:
          'Digital computerized pattern creation ensuring optimal fabric yield, structural balance, and consistent fit across all size curves.',
      },
      {
        step: '04',
        title: 'Proto Assembly & Wash Development',
        description:
          'Expert tailor assembly followed by specialized washing techniques (enzyme, stone, silicone, bio-polishing) to achieve the exact intended hand-feel.',
      },
      {
        step: '05',
        title: 'Fit Approval & Pre-Production Sealing',
        description:
          'Physical review with red-tag sealed sample generation, establishing the absolute quality standard before bulk manufacturing starts.',
      },
    ],
    specializations: [
      'Men’s, Women’s, Unisex & Children Ready-to-Wear',
      'Denim Collections (Rinse, Acid, Vintage & Raw washes)',
      'Knitted T-Shirts, Polos, Hoodies & Loungewear',
      'Formal Tailored Suits, Blazers & Corporate Uniforms',
      'Bespoke Footwears & Tailoring Trim Packages',
    ],
    deliverables: [
      'Full Digital Tech-Pack & Measurement Grading Charts',
      'Physical Sealed Prototype Sample with Fit Report',
      'Certified Fabric Swatch Library & Colorfastness Reports',
      'Pre-Production Costing Breakdown with Volume Tiers',
    ],
    quotePrompt: 'Request a Sample Prototype or Product Development Consultation',
  },
  {
    id: 'oem-manufacturing',
    number: '02',
    title: 'OEM Manufacturing & Bulk Production',
    shortTitle: 'OEM Manufacturing',
    tagline:
      "Manufacturing to the client's designs, original samples, specifications and individual requirements.",
    description:
      'Large-scale contract manufacturing adhering strictly to your private label designs, fabric specifications, stitch densities, and packaging mandates.',
    heroDescription:
      'ShivaSun Moderno Impex Private Limited provides comprehensive Original Equipment Manufacturing (OEM) solutions across modern, accredited factories. We manufacture precisely to your brand’s custom patterns, fabric selections, labeling requirements, and packaging mandates with zero compromise on quality and strict timeline compliance.',
    image: '/factory_floor.jpg',
    icon: TbBuildingFactory2,
    leadTime: '30 - 45 Days (Bulk Consignment)',
    capacity: '300,000+ Units / Month Capacity',
    qualityStandard: 'Continuous In-Line & Pre-Shipment Audit',
    keyHighlight: 'Strict Brand Compliance & High-Volume Consistency',
    processSteps: [
      {
        step: '01',
        title: 'Raw Material Testing & Inward Audit',
        description:
          'Every bolt of fabric and shipment of trims (zippers, buttons, labels) undergoes strict 4-point inspection before release to the cutting floor.',
      },
      {
        step: '02',
        title: 'Automated Laser Spreading & Precision Cutting',
        description:
          'Computerized pattern nesting and automatic cutting tables guarantee dimensional fidelity across thousands of identical panels.',
      },
      {
        step: '03',
        title: 'Dedicated Assembly & Sewing Lines',
        description:
          'Line-dedicated production teams with calibrated high-speed lockstitch, overlock, and chainstitch machines ensure reinforced seams.',
      },
      {
        step: '04',
        title: 'Garment Finishing & Steam Pressing',
        description:
          'Industrial pressing and tunnel steaming that removes residual moisture, locks garment silhouettes, and creates shelf-ready appearance.',
      },
      {
        step: '05',
        title: 'Carton Barcode Packing & Final Sealing',
        description:
          'Individual polybagging, hangtag attachment, custom barcode scanning, and sturdy export cartons ready for maritime transit.',
      },
    ],
    specializations: [
      'Private Label Apparel Lines for Retail Chains & Brands',
      'High-Volume Cotton Basics, Casual Wear & Activewear',
      'Specialized Workwear, Safety Apparel & Uniforms',
      'Footwear Assembly & Leather Goods Manufacturing',
      'Customized Garment Accessories & Hardware Trims',
    ],
    deliverables: [
      '100% Brand-Compliant Finished Goods Lot',
      'Carton Assortment Breakdown & Barcoding Verification',
      'In-Line Inspection Reports & Final AQL Certificate',
      'Export-Ready Packaging with Anti-Moisture Protection',
    ],
    quotePrompt: 'Request an OEM Bulk Manufacturing Quotation',
  },
  {
    id: 'odm-solutions',
    number: '03',
    title: 'ODM Solutions & Brand Collections',
    shortTitle: 'ODM Solutions',
    tagline:
      'End-to-end product development and manufacturing for brands seeking an experienced product partner.',
    description:
      'Turnkey ready-to-market collections curated by our design team, ready for custom white-labeling, trim branding, and rapid commercial rollout.',
    heroDescription:
      'For fashion retailers, boutiques, and international distributors seeking ready-to-market collections without the overhead of in-house design, ShivaSun Moderno Impex Private Limited provides end-to-end Original Design Manufacturing (ODM) solutions. Our experienced textile team curates seasonal collections that you can easily brand and order with attractive margins.',
    image: '/cat_textiles_1790144411477.jpg',
    icon: TbLayersDifference,
    leadTime: '21 - 35 Days (From Selection to Ship)',
    capacity: '200,000+ Units / Month Capacity',
    qualityStandard: 'Certified International Commercial Norms',
    keyHighlight: 'Turnkey Design Catalog & Rapid Market Launch',
    processSteps: [
      {
        step: '01',
        title: 'Trend Forecasting & Design Catalog',
        description:
          'Review curated seasonal apparel and footwear catalogs featuring bestselling contemporary silhouettes and eco-friendly fabrics.',
      },
      {
        step: '02',
        title: 'Selection & Customization Parameters',
        description:
          'Select your preferred styles, colorways, and fabric compositions, and specify target retail price points.',
      },
      {
        step: '03',
        title: 'Brand Integration & Trim Customization',
        description:
          'We customize all neck labels, swing tags, care labels, button branding, and packaging to match your company branding.',
      },
      {
        step: '04',
        title: 'Rapid Pre-Production Verification',
        description:
          'Courier delivery of finished prototype for your procurement team’s approval within 7 business days.',
      },
      {
        step: '05',
        title: 'Priority Manufacturing & Direct Handover',
        description:
          'Fast-track manufacturing schedule that delivers shelf-ready finished goods directly to your distribution center.',
      },
    ],
    specializations: [
      'Seasonal Ready-to-Wear Drops for Fashion Retailers',
      'Core Capsule Wardrobes & Everyday Essentials',
      'Athleisure, Loungewear & Contemporary Streetwear',
      'Casual & Formal Footwear Collections',
      'Coordinated Home-Textile & Bedding Sets',
    ],
    deliverables: [
      'Curated Seasonal Design Lookbooks & Swatch Sets',
      'Custom Branded Label & Packaging Application',
      'Guaranteed First-to-Market Delivery Schedules',
      'Volume-Tiered Commercial Pricing Support',
    ],
    quotePrompt: 'Request Our Latest ODM Catalog & Sourcing Consultation',
  },
  {
    id: 'fob-export',
    number: '04',
    title: 'FOB Export & Global Freight Logistics',
    shortTitle: 'FOB Export',
    tagline:
      'Complete manufacturing and export solutions for international clients with frictionless port delivery.',
    description:
      'Turnkey export logistics including container stuffing, customs clearance, shipping line booking, and international Bill of Lading generation.',
    heroDescription:
      'Navigating cross-border maritime trade with absolute certainty. ShivaSun Moderno Impex Private Limited manages full FOB (Free on Board), CIF (Cost, Insurance & Freight), and DDP logistics. From factory floor container stuffing and customs duty clearance to shipping line booking and bill of lading issuance, your goods arrive safely and on time.',
    image: '/factory_exterior.jpg',
    icon: TbWorldUpload,
    leadTime: 'Immediate Port Delivery Upon Final Audit',
    capacity: '120+ Commercial Ports Across 35+ Nations',
    qualityStandard: 'ISO 9001:2015 & Customs Compliant',
    keyHighlight: 'Zero-Delay Customs Clearance & Live GPS Tracking',
    processSteps: [
      {
        step: '01',
        title: 'Final Quality Audit & Clearance Certificate',
        description:
          'Comprehensive AQL 2.5 random carton sampling and issuance of official quality pass certificate before loading begins.',
      },
      {
        step: '02',
        title: 'Container Stuffing & Moisture Control',
        description:
          'Professional container loading (FCL & LCL) with silica-gel moisture barriers, shrink-wrapped pallets, and tamper-evident customs seals.',
      },
      {
        step: '03',
        title: 'Export Customs Filings & Documentation',
        description:
          'Full legal documentation trail including Commercial Invoice, Packing List, Certificate of Origin, and accurate HS Code classification.',
      },
      {
        step: '04',
        title: 'Vessel Booking & Port Terminal Handover',
        description:
          'Handover to tier-1 shipping lines (Maersk, MSC, CMA CGM) with confirmed Bill of Lading (B/L) issued to your trade desk.',
      },
      {
        step: '05',
        title: 'Real-Time Milestone Tracking',
        description:
          'Continuous transit visibility with automated updates as your cargo moves from port of loading to destination discharge.',
      },
    ],
    specializations: [
      'Full Container Load (FCL) & Less than Container Load (LCL)',
      'High-Priority Air Freight for Time-Sensitive Product Launches',
      'Temperature & Moisture Regulated Textile Shipping',
      'Bilateral Customs Compliance (UK, EU, USA, South Africa, Asia)',
      'Door-to-Door DDP Fulfillment for Select Commercial Clients',
    ],
    deliverables: [
      'Official Bill of Lading (B/L) & Air Waybill (AWB)',
      'HMRC & EORI Compliant Export Declarations',
      'Certified Commercial Invoice & Packing List',
      'Marine Cargo Insurance & Batch Conformance Documents',
    ],
    quotePrompt: 'Request an FOB / CIF Shipping Quotation',
  },
]

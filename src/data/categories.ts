import {
  TbShirt,
  TbShoe,
  TbBed,
  TbBriefcase,
  TbDiamond,
  TbLayersDifference,
  TbScissors,
  TbDeviceTv,
  TbPackages,
  TbSettings,
} from 'react-icons/tb'

export interface Category {
  id: string
  number: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  subtitle: string
  description: string
  tags: string[]
  image: string
}

export const exportCategories: Category[] = [
  {
    id: 'garments',
    number: '01',
    icon: TbShirt,
    title: 'Garments',
    subtitle: 'Ready-to-Wear, Denim & Uniforms',
    description:
      'High-quality apparel lines spanning casual wear, denim programs, outerwear, tailored suits, and corporate uniforms.',
    tags: ['Denim Wear', 'Casual Apparel', 'Workwear', 'Outerwear'],
    image: '/factory_floor.jpg',
  },
  {
    id: 'footwears',
    number: '02',
    icon: TbShoe,
    title: 'Footwears',
    subtitle: 'Leather Shoes, Sneakers & Boots',
    description:
      'Durable lifestyle footwear, safety work boots, athletic sneakers, and premium leather dress shoes crafted for global markets.',
    tags: ['Leather Shoes', 'Work Boots', 'Sneakers', 'Sandals'],
    image: '/ind_retail_1790144526101.jpg',
  },
  {
    id: 'home-textile',
    number: '03',
    icon: TbBed,
    title: 'Home-Textile',
    subtitle: 'Bedding, Linens, Towels & Curtains',
    description:
      'Luxury cotton bed linens, hotel-grade bath towels, blackout curtains, table runners, and decorative home throws.',
    tags: ['Bed Linens', 'Bath Towels', 'Curtains', 'Kitchen Textiles'],
    image: '/cat_textiles_1790144411477.jpg',
  },
  {
    id: 'bags-wallets',
    number: '04',
    icon: TbBriefcase,
    title: 'Bags & Wallets',
    subtitle: 'Leather Goods, Backpacks & Travel',
    description:
      'Handcrafted genuine leather wallets, corporate laptop briefcases, canvas backpacks, and heavy-duty luggage sets.',
    tags: ['Leather Wallets', 'Travel Bags', 'Backpacks', 'Handbags'],
    image: '/cat_consumer_1790144498461.jpg',
  },
  {
    id: 'jewellery-accessories',
    number: '05',
    icon: TbDiamond,
    title: 'Jewellery & Accessories',
    subtitle: 'Fashion Jewellery, Watches & Belts',
    description:
      'Hypoallergenic fashion jewellery, stainless steel accessories, premium leather belts, silk scarves, and precision timepieces.',
    tags: ['Fashion Jewellery', 'Leather Belts', 'Watches', 'Scarves'],
    image: '/ind_retail_1790144526101.jpg',
  },
  {
    id: 'fabric',
    number: '06',
    icon: TbLayersDifference,
    title: 'Fabric',
    subtitle: 'Woven, Knitted & Technical Textiles',
    description:
      'Raw and finished textile rolls including premium denim, combed cotton twill, polyester blends, and sustainable organic silks.',
    tags: ['Denim Fabric', 'Cotton Twill', 'Knitted Fleece', 'Silk & Linen'],
    image: '/cat_textiles_1790144411477.jpg',
  },
  {
    id: 'tailoring-accessories',
    number: '07',
    icon: TbScissors,
    title: 'Tailoring Accessories',
    subtitle: 'Zippers, Buttons, Threads & Linings',
    description:
      'Complete garment manufacturing supplies: metal zippers, horn and resin buttons, high-tensile threads, and fusible interlinings.',
    tags: ['Metal Zippers', 'Resin Buttons', 'Sewing Threads', 'Interlinings'],
    image: '/clean_designer.jpg',
  },
  {
    id: 'electronic-appliances',
    number: '08',
    icon: TbDeviceTv,
    title: 'Electronic & Appliances',
    subtitle: 'Consumer Electronics & Home Tech',
    description:
      'Certified smart home devices, kitchen appliances, USB-C charging peripherals, ambient LED systems, and audio accessories.',
    tags: ['Small Appliances', 'Power Accessories', 'Audio Gear', 'Smart Devices'],
    image: '/cat_engineering_1790144435454.jpg',
  },
  {
    id: 'mix-items',
    number: '09',
    icon: TbPackages,
    title: 'Mix Items',
    subtitle: 'Consolidated & Mixed Cargo Batches',
    description:
      'Flexible mixed-container consignments, assorted department store merchandise, and multi-category palletised export bundles.',
    tags: ['Mixed Containers', 'Pallet Assortments', 'FMCG Batches', 'Consolidated Lots'],
    image: '/cat_consumer_1790144498461.jpg',
  },
  {
    id: 'spare-parts',
    number: '10',
    icon: TbSettings,
    title: 'Spare Parts',
    subtitle: 'Machinery & Industrial Components',
    description:
      'OEM automotive replacement parts, industrial pump valves, high-load bearing assemblies, hydraulic hoses, and precision hardware fittings.',
    tags: ['CNC Parts', 'Bearings', 'Hardware Fittings', 'Auto Spares'],
    image: '/cat_engineering_1790144435454.jpg',
  },
]

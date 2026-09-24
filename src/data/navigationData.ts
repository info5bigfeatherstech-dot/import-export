export interface SubItem {
  id: string
  name: string
  href: string
}

export interface NavGroup {
  id: string
  title: string
  description?: string
  href: string
  items: SubItem[]
}

export interface NavCategorySubmenu {
  categoryId: string
  featuredTitle?: string
  featuredSubtitle?: string
  groups?: NavGroup[]
  quickLinks?: { name: string; href: string }[]
}

export const navigationSubmenus: Record<string, NavCategorySubmenu> = {
  garments: {
    categoryId: 'garments',
    featuredTitle: 'Garments & Ready-to-Wear',
    featuredSubtitle: 'Apparel lines across Men, Women & Youth divisions',
    groups: [
      {
        id: 'men',
        title: 'Men',
        description: "Men's Apparel Program",
        href: '/industry/garments?group=men',
        items: [
          { id: 'mens-jacket', name: "Men's Jacket", href: '/products/mens-jacket' },
          { id: 'mens-hoodies', name: "Men's Hoodies", href: '/products/mens-hoodies' },
          { id: 'mens-shirt', name: "Men's Shirt", href: '/products/mens-shirt' },
          { id: 'mens-t-shirt', name: "Men's T-Shirt", href: '/products/mens-t-shirt' },
          { id: 'mens-trouser-jeans', name: "Men's Trouser & Jeans", href: '/products/mens-trouser-jeans' },
        ],
      },
      {
        id: 'women',
        title: 'Women',
        description: "Women's Fashion Lines",
        href: '/industry/garments?group=women',
        items: [
          { id: 'womens-jacket', name: "Women's Jacket", href: '/products/womens-jacket' },
          { id: 'womens-sweat-tops-hoodies', name: "Women's Sweat Tops & Hoodies", href: '/products/womens-sweat-tops-hoodies' },
          { id: 'womens-shirt', name: "Women's Shirt", href: '/products/womens-shirt' },
          { id: 'womens-t-shirt', name: "Women's T-Shirt", href: '/products/womens-t-shirt' },
          { id: 'womens-trouser-jeans', name: "Women's Trouser & Jeans", href: '/products/womens-trouser-jeans' },
        ],
      },
      {
        id: 'youth',
        title: 'Youth & Kids',
        description: 'Kids & Teens Collections',
        href: '/industry/garments?group=youth',
        items: [
          { id: 'kids-jackets', name: "Kid's Jackets", href: '/products/kids-jackets' },
          { id: 'kids-hoodies-sweat-tops', name: "Kid's Hoodies & Sweat Tops", href: '/products/kids-hoodies-sweat-tops' },
          { id: 'kids-shirt', name: "Kid's Shirt", href: '/products/kids-shirt' },
          { id: 'kids-t-shirt', name: "Kid's T-Shirt", href: '/products/kids-t-shirt' },
          { id: 'kids-trouser-jeans', name: "Kid's Trouser & Jeans", href: '/products/kids-trouser-jeans' },
        ],
      },
    ],
  },

  footwears: {
    categoryId: 'footwears',
    featuredTitle: 'Footwear & Performance Soling',
    featuredSubtitle: 'Engineered footwear lines across Men, Women & Youth divisions',
    groups: [
      {
        id: 'men',
        title: 'Men Footwears',
        description: 'Men Sports, Formals & Casuals',
        href: '/industry/footwears?group=men',
        items: [
          { id: 'mens-sports-casuals', name: "Men's Sports & Casuals", href: '/products/mens-sports-casuals' },
          { id: 'mens-sandals-slippers', name: "Men's Sandals & Slippers", href: '/products/mens-sandals-slippers' },
          { id: 'mens-formal-leather', name: "Formal Leather Shoes", href: '/products/mens-formal-leather' },
          { id: 'mens-safety-boots', name: "Safety & Work Boots", href: '/products/mens-safety-boots' },
        ],
      },
      {
        id: 'women',
        title: 'Women Footwears',
        description: 'Athletic, Comfort & Lifestyle',
        href: '/industry/footwears?group=women',
        items: [
          { id: 'womens-sports-casuals', name: "Women's Sports & Casuals", href: '/products/womens-sports-casuals' },
          { id: 'womens-sandals-slippers', name: "Women's Sandals & Slippers", href: '/products/womens-sandals-slippers' },
          { id: 'womens-flats-heels', name: "Comfort Flats & Mules", href: '/products/womens-flats-heels' },
        ],
      },
      {
        id: 'youth',
        title: 'Youth & Kids Footwears',
        description: 'Play, Sports & Casuals',
        href: '/industry/footwears?group=youth',
        items: [
          { id: 'kids-sports-casuals', name: "Kid's Sports & Casuals", href: '/products/kids-sports-casuals' },
          { id: 'kids-sandals-slippers', name: "Kid's Sandals & Slippers", href: '/products/kids-sandals-slippers' },
          { id: 'kids-school-outdoor', name: "School & Outdoor Footwear", href: '/products/kids-school-outdoor' },
        ],
      },
    ],
  },

  fabric: {
    categoryId: 'fabric',
    featuredTitle: 'Fabric & Textile Mills',
    featuredSubtitle: 'Premium woven, knitted & technical fabrics',
    groups: [
      {
        id: 'garment-fabric',
        title: 'Garment Fabric',
        description: 'Denim, Twills & Knits',
        href: '/garment-fabric',
        items: [
          { id: 'denim-rolls', name: 'Raw & Washed Denim Rolls', href: '/products/denim-rolls' },
          { id: 'cotton-twill', name: 'Combed Cotton Twill', href: '/products/cotton-twill' },
          { id: 'knitted-jersey', name: 'Single Jersey & French Terry', href: '/products/knitted-jersey' },
          { id: 'technical-blends', name: 'Poly-Spandex & Technical Blends', href: '/products/technical-blends' },
        ],
      },
      {
        id: 'home-textile-fabric',
        title: 'Home Textile Fabric',
        description: 'Linens, Sheers & Upholstery',
        href: '/home-textile-fabric',
        items: [
          { id: 'sheers-curtains', name: 'Sheer & Blackout Curtain Fabric', href: '/products/sheers-curtains' },
          { id: 'linen-sheeting', name: 'Percale & Sateen Bed Sheeting', href: '/products/linen-sheeting' },
          { id: 'jacquard-upholstery', name: 'Jacquard Weaves & Throws', href: '/products/jacquard-upholstery' },
          { id: 'flame-retardant', name: 'Hospitality Flame-Retardant Fabric', href: '/products/flame-retardant' },
        ],
      },
    ],
  },
}

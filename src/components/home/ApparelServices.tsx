import { motion } from 'framer-motion'
import {
  TbScissors,
  TbBuildingFactory2,
  TbLayersDifference,
  TbWorldUpload,
  TbArrowRight,
} from 'react-icons/tb'

interface ServiceCard {
  id: string
  number: string
  title: string
  description: string
  image: string
  icon: typeof TbScissors
}

const services: ServiceCard[] = [
  {
    id: 'product-development',
    number: '01',
    title: 'Product Development',
    description:
      'Turning ideas, sketches or reference images into production-ready products with technical documentation and prototypes.',
    image: '/clean_designer.jpg',
    icon: TbScissors,
  },
  {
    id: 'oem-manufacturing',
    number: '02',
    title: 'OEM Manufacturing',
    description:
      "Manufacturing to the client's designs, original samples, specifications and individual requirements.",
    image: '/factory_floor.jpg',
    icon: TbBuildingFactory2,
  },
  {
    id: 'odm-solutions',
    number: '03',
    title: 'ODM Solutions',
    description:
      'End-to-end product development and manufacturing for brands seeking an experienced product partner.',
    image: '/cat_textiles_1790144411477.jpg',
    icon: TbLayersDifference,
  },
  {
    id: 'fob-export',
    number: '04',
    title: 'FOB Export',
    description:
      'Complete manufacturing and export solutions for international clients.',
    image: '/factory_exterior.jpg',
    icon: TbWorldUpload,
  },
]

export default function ApparelServices() {
  return (
    <section
      id="apparel-services"
      aria-label="Apparel Manufacturing Services"
      className="relative w-full bg-white text-slate-900 py-20 lg:py-28 overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="text-[#0F9D7A] text-xs">✦</span>
            <p className="text-xs font-bold tracking-[0.22em] text-[#0F9D7A] uppercase font-[Manrope]">
              04. FEATURED SERVICES
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B1F3A] leading-[1.12] tracking-tight mb-4 font-[Manrope]"
          >
            Product Development And <br className="hidden sm:inline" />
            Apparel Manufacturing <br className="hidden sm:inline" />
            Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-sm sm:text-base leading-relaxed font-[Inter]"
          >
            From design and sample development to manufacturing, washing, quality
            control, packing and finished-goods delivery.
          </motion.p>
        </div>

        {/* 4 Vertical Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[420px] sm:h-[460px] flex flex-col justify-between p-6 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/60"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Vignette & Gradient Overlays for perfect legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#091422] via-[#091422]/95 via-50% to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Badge: Icon Container on Left, Number on Right */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shadow-md text-slate-900 group-hover:bg-[#0F9D7A] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-white/80 tracking-widest font-[Manrope]">
                    {service.number}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="text-xl sm:text-[22px] font-bold text-white leading-tight mb-2.5 font-[Manrope] group-hover:text-slate-100 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-4 font-[Inter] line-clamp-3">
                    {service.description}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider group/link hover:text-[#0F9D7A] transition-colors"
                  >
                    <span>Read More</span>
                    <TbArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

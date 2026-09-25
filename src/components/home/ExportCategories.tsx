import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { exportCategories } from '../../data/categories'

export default function ExportCategories() {
  return (
    <section
      id="products"
      aria-labelledby="categories-heading"
      className="w-full py-20 lg:py-28 bg-[#FCFDFD] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
            <p className="text-xs font-bold tracking-[0.25em] text-amber-600 uppercase font-[Manrope]">
              Core Trading Sectors
            </p>
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
          </motion.div>

          <motion.h2
            id="categories-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A] tracking-tight mb-4 font-[Manrope]"
          >
            Our Export Categories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-sm leading-relaxed font-[Inter] capitalize"
          >
            We operate dedicated commodity desks across our key global trade sectors, ensuring verified supplier origin, laboratory certification, and multimodal shipping.
          </motion.p>
        </div>

        {/* Permanent Arched Heritage Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 sm:gap-8">
          {exportCategories.map((cat, i) => (
            <motion.article
              key={cat.id}
              id={`cat-${cat.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
              className="group bg-white rounded-t-[100px] rounded-b-3xl p-2.5 pt-3 sm:p-3 sm:pt-3.5 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                {/* Arched Architectural Window */}
                <Link
                  to={`/industry/${cat.id}`}
                  className="block relative w-full aspect-[4/3] rounded-t-[88px] rounded-b-2xl overflow-hidden bg-slate-100 shadow-sm mb-5 border border-slate-200/50 cursor-pointer"
                  aria-label={`Explore ${cat.title} industry line`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Arch Subtitle Tag */}
                  <div className="absolute bottom-3 left-4 right-4 text-center">
                    <span className="text-[11px] font-bold text-white tracking-widest uppercase drop-shadow-md ">
                      {cat.subtitle}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="text-center px-3 sm:px-4">
                  <span className="text-[11px] font-extrabold tracking-widest text-amber-600 uppercase font-[Manrope] block mb-1">
                    ARCH {cat.number}
                  </span>
                  <Link to={`/industry/${cat.id}`}>
                    <h3 className="text-xl font-bold text-[#0B1F3A] font-[Manrope] mb-2 group-hover:text-amber-600 transition-colors">
                      {cat.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4 line-clamp-3 font-[Inter] capitalize">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3.5 pb-2 mx-3 border-t border-slate-100 text-center">
                <Link
                  to={`/industry/${cat.id}`}
                  id={`category-arch-${cat.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors group/link"
                >
                  <span>Explore Industry Line</span>
                  <HiArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

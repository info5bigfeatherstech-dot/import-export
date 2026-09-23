import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TbPlus } from 'react-icons/tb'

interface FaqItem {
  id: number
  question: string
  answer: string
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: 'What does Chico Vina Fashion manufacture?',
    answer:
      'We specialize in manufacturing a comprehensive range of export-grade apparel including denim jeans, denim jackets, casual woven shirts, premium t-shirts, polo shirts, outerwear, tailored suits, knitwear, and corporate uniforms. Our production floors accommodate both high-volume retail programs and bespoke, highly customized fashion collections.',
  },
  {
    id: 2,
    question: 'What manufacturing services do you offer?',
    answer:
      'We offer full-spectrum apparel production services including OEM (Original Equipment Manufacturing), ODM (Original Design Manufacturing), CMT (Cut, Make, Trim), and FOB (Free on Board) export packages. Our turnkey services cover creative pattern development, sample making, certified fabric sourcing, automated cutting, computer-aided sewing, specialized garment washing, quality control, and worldwide customs clearance.',
  },
  {
    id: 3,
    question: "Where are Chico Vina Fashion's factories located?",
    answer:
      'Our primary manufacturing complexes and industrial facilities are located in premier garment manufacturing industrial zones in Vietnam, strategically positioned with direct highway access to major deep-water shipping terminals at Hai Phong and Ho Chi Minh City, supported by regional international trade and commercial liaison offices in the United Kingdom.',
  },
  {
    id: 4,
    question: 'What is your production capacity?',
    answer:
      'Our combined facility capacity exceeds 650,000 to 800,000 garment pieces per month across multi-line sewing, specialized wash plants, and finishing departments. We possess the scalable industrial capacity to fulfill high-volume international retailer commitments while maintaining dedicated flexible pilot lines for quick-turn prototype and boutique sampling.',
  },
  {
    id: 5,
    question: 'What certifications does Chico Vina Fashion hold?',
    answer:
      'Our manufacturing facilities operate under stringent international social, technical, and environmental compliance audits. We proudly hold ISO 9001:2015 Quality Management certification, WRAP (Worldwide Responsible Accredited Production) Gold certification, BSCI (Business Social Compliance Initiative) grade A compliance, OEKO-TEX Standard 100 textile safety accreditation, and Sedex SMETA ethical audit approvals.',
  },
  {
    id: 6,
    question: 'Which fashion brands do you work with?',
    answer:
      'We partner with established retail chains, department store private labels, European and British premium high-street fashion brands, and corporate uniform distributors across the UK, EU, US, Australia, and Japan. Under strict client Non-Disclosure Agreements (NDAs), we maintain confidentiality over proprietary silhouettes while providing verified third-party factory audit certificates.',
  },
]

export default function FaqSection() {
  // Allow toggling open/close; default first item open or closed
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="w-full bg-[#FCFDFD] py-20 lg:py-28 border-t border-slate-200/80 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching screenshot layout */}
        <div className="mb-12 sm:mb-16">
          {/* Eyebrow kicker with accent line */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-extrabold tracking-[0.25em] text-[#0F9D7A] uppercase font-[Manrope]">
              FAQ
            </span>
            <span className="w-8 h-[2px] bg-[#0F9D7A]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] font-[Manrope] tracking-tight leading-[1.12]">
            Frequently Asked <br />
            Questions
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm sm:text-base font-[Inter] mt-3">
            Answers to the questions international buyers ask us most.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-slate-200/80 divide-y divide-slate-200/80">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id
            const words = faq.answer.split(' ')

            return (
              <div key={faq.id} className="transition-colors">
                {/* Question Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left group cursor-pointer"
                >
                  <span className="font-bold text-[#0B1F3A] group-hover:text-[#0F9D7A] text-base sm:text-lg font-[Manrope] transition-colors duration-200">
                    {faq.question}
                  </span>

                  {/* Plus icon with smooth rotation into an X */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? 'bg-[#0F9D7A] text-white shadow-sm'
                        : 'bg-slate-100 text-[#0B1F3A] group-hover:bg-emerald-50 group-hover:text-[#0F9D7A]'
                    }`}
                  >
                    <TbPlus size={18} strokeWidth={2.5} />
                  </motion.div>
                </button>

                {/* Smooth Dropdown Content with Staggered Word-by-Word Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed font-[Inter] select-text">
                        {words.map((word, wordIndex) => (
                          <motion.span
                            key={wordIndex}
                            initial={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{
                              duration: 0.22,
                              delay: 0.08 + wordIndex * 0.014,
                              ease: 'easeOut',
                            }}
                            className="inline-block mr-1.5"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

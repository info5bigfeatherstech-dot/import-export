import { TbCertificate, TbBuildingBank, TbWorld, TbCheckupList } from 'react-icons/tb'

const certifications = [
  {
    icon: TbCertificate,
    label: 'ISO 9001:2015',
    sub: 'Quality Management Certified',
  },
  {
    icon: TbBuildingBank,
    label: 'UK Registered Company',
    sub: 'Companies House No. 09876543',
  },
  {
    icon: TbWorld,
    label: 'Multimodal Logistics',
    sub: '120+ Active Global Ports',
  },
  {
    icon: TbCheckupList,
    label: 'Customs & EORI Ready',
    sub: 'HMRC Export Compliance',
  },
]

export default function TrustBar() {
  return (
    <section
      aria-label="Certifications and Accreditations"
      className="w-full bg-slate-50 border-b border-slate-200 py-8 lg:py-10"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-slate-500 uppercase mb-6">
          Accredited British Trade Operator • Trusted by Enterprises Worldwide
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-[#0F9D7A]/50 hover:shadow transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-lg bg-[#0F9D7A]/10 text-[#0F9D7A] flex items-center justify-center flex-shrink-0">
                <cert.icon size={24} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-[#0B1F3A] font-[Manrope]">{cert.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{cert.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

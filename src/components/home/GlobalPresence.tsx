
const metrics = [
  { value: '35+', label: 'Destination Countries' },
  { value: '120+', label: 'Active Commercial Ports' },
  { value: '98.4%', label: 'On-Time Consignment Delivery' },
  { value: '24/7', label: 'Multilingual Trade Support' },
]

const hubs = [
  { name: 'United Kingdom (Trade Desk)', port: 'London Gateway & Southampton', cx: '48%', cy: '25%' },
  { name: 'China (Sourcing Hub)', port: 'Shanghai & Guangzhou', cx: '77%', cy: '36%' },
  { name: 'South Africa (Port Desk)', port: 'Durban & Cape Town', cx: '54%', cy: '68%' },
  { name: 'Europe Hub', port: 'Rotterdam & Antwerp', cx: '52%', cy: '28%' },
  { name: 'Middle East Desk', port: 'Jebel Ali (Dubai)', cx: '61%', cy: '39%' },
  { name: 'North America', port: 'New York & Houston', cx: '24%', cy: '32%' },
]

export default function GlobalPresence() {
  return (
    <section
      id="markets"
      aria-labelledby="global-heading"
      className="w-full py-20 lg:py-28 bg-[#0B1F3A] text-white relative overflow-hidden border-b border-[#142849]"
    >
      {/* Pattern background */}
      <div className="absolute inset-0 world-map-pattern opacity-15 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-3">
            Worldwide Logistics Coverage
          </p>
          <h2
            id="global-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Our Global Trade Footprint
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From premier British deep-sea ports to commercial distribution centers across five continents, our direct carrier routes eliminate transshipment delays.
          </p>
        </div>

        {/* World Map Container */}
        <div className="relative mb-14 rounded-2xl overflow-hidden border border-white/10 bg-[#07162A]/80 shadow-2xl p-4 sm:p-8">
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-[#0B1F3A]/60 flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 world-map-pattern opacity-25" />

            {/* Stylized vector map */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full object-contain opacity-35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* North America */}
              <path
                d="M120 120 L250 100 L280 180 L230 260 L180 240 L110 160 Z"
                fill="#38BDF8"
                fillOpacity="0.4"
              />
              {/* South America */}
              <path
                d="M260 270 L340 280 L310 420 L270 440 L240 330 Z"
                fill="#38BDF8"
                fillOpacity="0.4"
              />
              {/* Europe & UK */}
              <path
                d="M440 90 L520 80 L540 150 L470 170 L430 130 Z"
                fill="#F59E0B"
                fillOpacity="0.6"
              />
              {/* Africa */}
              <path
                d="M460 190 L560 180 L570 280 L520 380 L470 340 L440 230 Z"
                fill="#38BDF8"
                fillOpacity="0.4"
              />
              {/* Asia */}
              <path
                d="M550 90 L790 70 L830 190 L760 260 L620 220 L550 150 Z"
                fill="#38BDF8"
                fillOpacity="0.4"
              />
              {/* Australia */}
              <path
                d="M740 310 L840 300 L860 380 L790 410 L730 360 Z"
                fill="#38BDF8"
                fillOpacity="0.4"
              />

              {/* Trade shipping connection arcs */}
              <path
                d="M480 125 Q360 160 240 160"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <path
                d="M480 125 Q540 160 610 195"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <path
                d="M610 195 Q685 210 760 240"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              <path
                d="M480 125 Q510 190 540 260"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.8"
              />
            </svg>

            {/* Pulsing Hub Pins */}
            {hubs.map((hub) => (
              <div
                key={hub.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: hub.cx, top: hub.cy }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-amber-400/40 animate-ping" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-lg relative z-10" />

                  {/* Tooltip on hover/display */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#07162A]/95 border border-white/20 px-2.5 py-1 rounded-md shadow-xl z-20 pointer-events-none">
                    <p className="text-[11px] font-bold text-white leading-none">{hub.name}</p>
                    <p className="text-[9px] text-amber-300 leading-none mt-1">{hub.port}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Region pills below map */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6">
            {hubs.map((hub) => (
              <div
                key={hub.name}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center hover:border-amber-400/40 transition-colors"
              >
                <p className="text-xs font-bold text-white">{hub.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{hub.port}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10 shadow-sm"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-[Manrope]">
                {m.value}
              </p>
              <p className="text-slate-300 text-sm font-medium mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

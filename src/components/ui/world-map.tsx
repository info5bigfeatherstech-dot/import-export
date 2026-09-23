"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  className?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#10B981",
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const svgMap = useMemo(() => {
    // Handle ESM/CJS interop for dotted-map
    const DottedMapClass =
      (DottedMap as unknown as { default?: typeof DottedMap }).default ||
      DottedMap;
    const map = new DottedMapClass({ height: 100, grid: "diagonal" });

    // Radius 0.38 with crisp silver-slate color guarantees high-visibility continents
    return map.getSVG({
      radius: 0.38,
      color: "#CBD5E1",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 60;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={`w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] bg-[#030712] rounded-3xl relative font-sans overflow-hidden border border-slate-800/90 shadow-2xl ${className}`}
    >
      {/* Background ambient radial emerald backlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.16),transparent_75%)] pointer-events-none" />

      {/* Dotted World Map SVG with 100% full opacity and crisp visibility */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-contain relative z-0 opacity-100 p-2 sm:p-4"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      {/* Animated Paths and Nodes SVG Overlay */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none z-10 p-2 sm:p-4"
      >
        <defs>
          <linearGradient id="world-map-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="10%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="90%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <filter id="emerald-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              {/* Outer soft ambient glow line */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeWidth="4.5"
                strokeOpacity="0.35"
                filter="url(#emerald-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.22 * i, ease: "easeOut" }}
              />
              {/* Crisp illuminated route line */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#world-map-path-gradient)"
                strokeWidth="2.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.22 * i, ease: "easeOut" }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPos = projectPoint(dot.start.lat, dot.start.lng);
          const endPos = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              {/* Start Point Node */}
              <g key={`start-${i}`}>
                <circle cx={startPos.x} cy={startPos.y} r="3.5" fill="#34D399" />
                <circle
                  cx={startPos.x}
                  cy={startPos.y}
                  r="3.5"
                  fill={lineColor}
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    from="3.5"
                    to="13"
                    dur="2.2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.85"
                    to="0"
                    dur="2.2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                {dot.start.label && (
                  <g>
                    <rect
                      x={startPos.x - 36}
                      y={startPos.y - 21}
                      width="72"
                      height="14"
                      rx="4"
                      fill="#030712"
                      fillOpacity="0.94"
                      stroke="#10B981"
                      strokeWidth="1"
                    />
                    <text
                      x={startPos.x}
                      y={startPos.y - 11}
                      textAnchor="middle"
                      className="fill-[#34D399] text-[7.5px] font-black uppercase tracking-wider font-[Manrope]"
                    >
                      {dot.start.label}
                    </text>
                  </g>
                )}
              </g>

              {/* End Point Node */}
              <g key={`end-${i}`}>
                <circle cx={endPos.x} cy={endPos.y} r="3.5" fill="#34D399" />
                <circle
                  cx={endPos.x}
                  cy={endPos.y}
                  r="3.5"
                  fill={lineColor}
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    from="3.5"
                    to="13"
                    dur="2.2s"
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.85"
                    to="0"
                    dur="2.2s"
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                </circle>
                {dot.end.label && (
                  <g>
                    <rect
                      x={endPos.x - 32}
                      y={endPos.y - 21}
                      width="64"
                      height="14"
                      rx="4"
                      fill="#030712"
                      fillOpacity="0.94"
                      stroke="#10B981"
                      strokeWidth="1"
                    />
                    <text
                      x={endPos.x}
                      y={endPos.y - 11}
                      textAnchor="middle"
                      className="fill-[#34D399] text-[7.5px] font-black uppercase tracking-wider font-[Manrope]"
                    >
                      {dot.end.label}
                    </text>
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

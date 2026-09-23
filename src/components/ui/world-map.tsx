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
  theme?: "light" | "dark";
  className?: string;
}

export default function WorldMap({
  dots = [],
  lineColor,
  theme = "light",
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isLight = theme === "light";

  // Dynamic colors based on theme
  const activeLineColor = lineColor || (isLight ? "#0F9D7A" : "#10B981");
  const dotColor = isLight ? "#94A3B8" : "#CBD5E1";

  const svgMap = useMemo(() => {
    // Handle ESM/CJS interop for dotted-map
    const DottedMapClass =
      (DottedMap as unknown as { default?: typeof DottedMap }).default ||
      DottedMap;
    const map = new DottedMapClass({ height: 100, grid: "diagonal" });

    return map.getSVG({
      radius: 0.38,
      color: dotColor,
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [dotColor]);

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
      className={`w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] rounded-3xl relative font-sans overflow-hidden transition-colors duration-500 ${isLight
          ? "bg-white border border-slate-200/90 shadow-2xl shadow-slate-200/70"
          : "bg-[#07162A] border border-white/10 shadow-2xl shadow-emerald-950/40"
        } ${className}`}
    >
      {/* Background ambient radial glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLight
            ? "bg-[radial-gradient(circle_at_50%_40%,rgba(15,157,122,0.1),transparent_75%)]"
            : "bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_75%)]"
          }`}
      />

      {/* Dotted World Map SVG */}
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
            <stop offset="10%" stopColor={activeLineColor} stopOpacity="1" />
            <stop offset="90%" stopColor={activeLineColor} stopOpacity="1" />
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
                stroke={activeLineColor}
                strokeWidth="4.5"
                strokeOpacity={isLight ? "0.25" : "0.35"}
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
                strokeWidth="2.4"
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
                <circle
                  cx={startPos.x}
                  cy={startPos.y}
                  r="3.5"
                  fill={isLight ? "#0F9D7A" : "#34D399"}
                />
                <circle
                  cx={startPos.x}
                  cy={startPos.y}
                  r="3.5"
                  fill={activeLineColor}
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
                {dot.start.label && (() => {
                  const labelWidth = Math.max(44, dot.start.label.length * 6.8 + 14);
                  return (
                    <g>
                      <rect
                        x={startPos.x - labelWidth / 2}
                        y={startPos.y - 21}
                        width={labelWidth}
                        height="14"
                        rx="4"
                        fill={isLight ? "#FFFFFF" : "#07162A"}
                        fillOpacity={isLight ? "0.98" : "0.94"}
                        stroke={isLight ? "#0F9D7A" : "#10B981"}
                        strokeWidth="1.2"
                        className={isLight ? "filter drop-shadow-sm" : ""}
                      />
                      <text
                        x={startPos.x}
                        y={startPos.y - 11}
                        textAnchor="middle"
                        className={`text-[7.5px] font-black uppercase tracking-wider font-[Manrope] ${isLight ? "fill-[#0B1F3A]" : "fill-[#34D399]"
                          }`}
                      >
                        {dot.start.label}
                      </text>
                    </g>
                  );
                })()}
              </g>

              {/* End Point Node */}
              <g key={`end-${i}`}>
                <circle
                  cx={endPos.x}
                  cy={endPos.y}
                  r="3.5"
                  fill={isLight ? "#0F9D7A" : "#34D399"}
                />
                <circle
                  cx={endPos.x}
                  cy={endPos.y}
                  r="3.5"
                  fill={activeLineColor}
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
                {dot.end.label && (() => {
                  const labelWidth = Math.max(44, dot.end.label.length * 6.8 + 14);
                  return (
                    <g>
                      <rect
                        x={endPos.x - labelWidth / 2}
                        y={endPos.y - 21}
                        width={labelWidth}
                        height="14"
                        rx="4"
                        fill={isLight ? "#FFFFFF" : "#07162A"}
                        fillOpacity={isLight ? "0.98" : "0.94"}
                        stroke={isLight ? "#0F9D7A" : "#10B981"}
                        strokeWidth="1.2"
                        className={isLight ? "filter drop-shadow-sm" : ""}
                      />
                      <text
                        x={endPos.x}
                        y={endPos.y - 11}
                        textAnchor="middle"
                        className={`text-[7.5px] font-black uppercase tracking-wider font-[Manrope] ${isLight ? "fill-[#0B1F3A]" : "fill-[#34D399]"
                          }`}
                      >
                        {dot.end.label}
                      </text>
                    </g>
                  );
                })()}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

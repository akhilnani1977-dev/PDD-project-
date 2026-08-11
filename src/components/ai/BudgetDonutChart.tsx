"use client";

import { useState } from "react";
import { PieChart } from "lucide-react";

interface BudgetCategory {
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { name: "Accommodation", percentage: 35, amount: 7000, color: "#0DBB7B" },
  { name: "Transportation", percentage: 25, amount: 5000, color: "#27D980" },
  { name: "Food & Dining", percentage: 20, amount: 4000, color: "#38BDF8" },
  { name: "Activities & Sights", percentage: 10, amount: 2000, color: "#F4B740" },
  { name: "Shopping", percentage: 5, amount: 1000, color: "#A855F7" },
  { name: "Emergency Reserve", percentage: 5, amount: 1000, color: "#FF5D5D" },
];

export default function BudgetDonutChart({ totalBudget = 20000 }: { totalBudget?: number }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // SVG calculations
  const size = 200;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="surface-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="card-title flex items-center gap-2">
          <PieChart className="w-5 h-5 text-[#0DBB7B]" /> AI Budget Breakdown
        </h3>
        <span className="badge-primary">Total: ₹{totalBudget.toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* SVG Donut */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {DEFAULT_CATEGORIES.map((cat, idx) => {
              const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += cat.percentage;

              const isHovered = hoveredIdx === idx;

              return (
                <circle
                  key={cat.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center Info Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xs font-bold text-[#B7C1CC] uppercase tracking-wider">
              {hoveredIdx !== null ? DEFAULT_CATEGORIES[hoveredIdx].name : "Estimated Total"}
            </span>
            <strong className="text-xl font-black text-white mt-0.5">
              ₹
              {hoveredIdx !== null
                ? DEFAULT_CATEGORIES[hoveredIdx].amount.toLocaleString()
                : totalBudget.toLocaleString()}
            </strong>
            <span className="text-[11px] font-bold text-[#0DBB7B] mt-0.5">
              {hoveredIdx !== null ? `${DEFAULT_CATEGORIES[hoveredIdx].percentage}%` : "100% Optimized"}
            </span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="space-y-2.5">
          {DEFAULT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-2.5 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                hoveredIdx === idx
                  ? "bg-[#161B22] border-[#0DBB7B]/40 translate-x-1"
                  : "bg-transparent border-transparent hover:bg-[#161B22]/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs font-bold text-white">{cat.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-[#B7C1CC]">{cat.percentage}%</span>
                <span className="text-xs font-mono font-bold text-white">₹{cat.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

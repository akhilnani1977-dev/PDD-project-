"use client";

import React from "react";
import { PlannedTrip } from "@/lib/store";

interface Props {
  budgetBreakdown: PlannedTrip["budgetBreakdown"];
  onUpdate?: (newBreakdown: PlannedTrip["budgetBreakdown"]) => void;
}

export default function TripBudgetBreakdown({ budgetBreakdown, onUpdate }: Props) {
  const categories = [
    { key: "accommodation", label: "Accommodation", color: "bg-emerald-500", text: "text-emerald-700" },
    { key: "transport", label: "Transport", color: "bg-sky-500", text: "text-sky-700" },
    { key: "food", label: "Food", color: "bg-amber-500", text: "text-amber-700" },
    { key: "activities", label: "Activities", color: "bg-purple-500", text: "text-purple-700" },
    { key: "miscellaneous", label: "Miscellaneous", color: "bg-slate-400", text: "text-slate-700" },
  ] as const;

  const handleSliderChange = (key: keyof PlannedTrip["budgetBreakdown"], value: number) => {
    if (onUpdate) {
      onUpdate({
        ...budgetBreakdown,
        [key]: value,
      });
    }
  };

  const calculatedTotal = Object.values(budgetBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Financial Overview</span>
          <h3 className="text-xl font-extrabold text-slate-900">Estimated Trip Cost</h3>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 font-semibold block">Total Estimated</span>
          <span className="text-2xl font-extrabold text-emerald-700">
            ₹{calculatedTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Segmented Stack Bar Visualization */}
      <div className="space-y-2">
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
          {categories.map((cat) => {
            const amount = budgetBreakdown[cat.key];
            const pct = calculatedTotal > 0 ? (amount / calculatedTotal) * 100 : 0;

            return (
              <div
                key={cat.key}
                style={{ width: `${pct}%` }}
                className={`h-full ${cat.color} transition-all duration-300`}
                title={`${cat.label}: ₹${amount}`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2">
          {categories.map((cat) => {
            const amount = budgetBreakdown[cat.key];
            return (
              <div key={cat.key} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="font-bold text-slate-700">{cat.label}:</span>
                <span className="font-extrabold text-slate-900">₹{amount.toLocaleString("en-IN")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Budget Sliders if onUpdate is provided */}
      {onUpdate && (
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Modify Category Budgets</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const val = budgetBreakdown[cat.key];
              return (
                <div key={cat.key} className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                    <span>{cat.label}</span>
                    <span className={cat.text}>₹{val.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30000}
                    step={500}
                    value={val}
                    onChange={(e) => handleSliderChange(cat.key, Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

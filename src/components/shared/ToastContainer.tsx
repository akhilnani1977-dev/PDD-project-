"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === "success"
              ? "bg-slate-900/95 text-white border-emerald-500/40"
              : toast.type === "warning"
              ? "bg-amber-900/95 text-white border-amber-500/40"
              : "bg-slate-900/95 text-white border-slate-700"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            <span className="text-xs sm:text-sm font-semibold">{toast.text}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

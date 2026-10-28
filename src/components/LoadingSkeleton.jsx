import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl overflow-hidden border border-[#234B38]/10 animate-pulse flex flex-col h-full"
        >
          <div className="h-60 bg-slate-200/80 w-full" />
          <div className="p-6 flex flex-col flex-1 space-y-4">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-6 bg-slate-200 rounded w-4/5" />
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 rounded w-full" />
              <div className="h-3.5 bg-slate-200 rounded w-2/3" />
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

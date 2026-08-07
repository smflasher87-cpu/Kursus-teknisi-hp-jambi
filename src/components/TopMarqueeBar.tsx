import React from 'react';
import { Bell, Briefcase, Sparkles } from 'lucide-react';
import { Announcement, JobOpening } from '../types';

interface TopMarqueeBarProps {
  announcements: Announcement[];
  jobOpenings: JobOpening[];
}

export const TopMarqueeBar: React.FC<TopMarqueeBarProps> = ({ announcements, jobOpenings }) => {
  if ((!announcements || announcements.length === 0) && (!jobOpenings || jobOpenings.length === 0)) {
    return null;
  }

  const tickerItems: { id: string; badge: string; text: string; date?: string }[] = [];

  // 1. Add announcements
  announcements.forEach((a) => {
    tickerItems.push({
      id: `ann-${a.id}`,
      badge: a.category || 'PENGUMUMAN',
      text: `${a.title}: ${a.content}`,
      date: a.date
    });
  });

  // 2. Add job openings
  jobOpenings.forEach((j) => {
    tickerItems.push({
      id: `job-${j.id}`,
      badge: j.type === 'Program Magang' ? 'MAGANG' : 'LOKER TEKNISI',
      text: `${j.title} at ${j.companyName} (${j.location}) - Gaji/Uang Saku: ${j.salaryRange}`,
      date: j.createdAt.split('T')[0]
    });
  });

  return (
    <div className="bg-gradient-to-r from-red-950 via-red-700 to-red-950 border-b-2 border-red-500 text-white overflow-hidden relative z-40 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Fixed Title Badge */}
        <div className="shrink-0 flex items-center space-x-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider shadow-md mr-3 z-10 border border-amber-300">
          <Bell className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
          <span>INFO TERKINI</span>
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden flex-1 relative flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-10 text-xs font-extrabold tracking-wide">
            {tickerItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="inline-flex items-center space-x-2.5">
                <span className="text-slate-950 font-black px-2 py-0.5 rounded bg-amber-300 border border-amber-200 text-[10px] uppercase shadow-sm">
                  {item.badge}
                </span>
                <span className="text-white drop-shadow-sm">{item.text}</span>
                {item.date && (
                  <span className="text-[10px] text-amber-200 font-bold">({item.date})</span>
                )}
                <span className="text-amber-300 font-extrabold px-3 text-sm">&bull;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Video } from '../types';
import { Play, CheckCircle2, FileText, Clock, Tag } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  isCompleted: boolean;
  onSelect: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isCompleted, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(video)}
      className={`group relative bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 ${
        isCompleted
          ? 'border-emerald-500/40 bg-slate-900/90'
          : 'border-slate-800 hover:border-indigo-500/50'
      }`}
    >
      {/* Top Banner / Category Badge */}
      <div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {video.category}
          </span>

          {isCompleted ? (
            <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Selesai Dipelajari</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>{video.duration}</span>
            </span>
          )}
        </div>

        {/* Video Title */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2 leading-snug">
          {video.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {video.description}
        </p>
      </div>

      {/* Footer Meta & Play Button */}
      <div>
        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80"
              >
                #{tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="text-[9px] font-medium text-slate-500 px-1 py-0.5">
                +{video.tags.length - 3} lagi
              </span>
            )}
          </div>
        )}

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[11px] text-slate-400">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Modul PDF Praktik</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(video);
            }}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow transition duration-200 flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Akses Video</span>
          </button>
        </div>
      </div>
    </div>
  );
};

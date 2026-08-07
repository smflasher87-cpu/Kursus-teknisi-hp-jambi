import React from 'react';
import { ExternalLink, Play } from 'lucide-react';

/**
 * Utility to process and render video embed or HTML5 player correctly
 * Supports YouTube, Google Drive, Dropbox, Vimeo, Direct MP4/WebM, and Data URLs (base64)
 */
export function getEmbedVideoUrl(url: string): { type: 'youtube' | 'gdrive' | 'vimeo' | 'iframe' | 'direct'; embedUrl: string } {
  if (!url) return { type: 'direct', embedUrl: '' };

  const trimmed = url.trim();

  // YouTube Watch / Shorts / Embed / Live URL
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
    };
  }

  // Google Drive File View: https://drive.google.com/file/d/FILE_ID/view or open?id=FILE_ID or uc?id=FILE_ID
  const gdriveMatch = trimmed.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return {
      type: 'gdrive',
      embedUrl: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`
    };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  // Dropbox share link -> convert dl=0 to raw=1
  if (trimmed.includes('dropbox.com') && trimmed.includes('dl=0')) {
    return {
      type: 'direct',
      embedUrl: trimmed.replace('dl=0', 'raw=1')
    };
  }

  // Generic iframe embed URL
  if (trimmed.includes('/embed/') || trimmed.includes('/preview')) {
    return {
      type: 'iframe',
      embedUrl: trimmed
    };
  }

  // Direct MP4 / WebM / Data URL / Blob
  return {
    type: 'direct',
    embedUrl: trimmed
  };
}

export function renderVideoElement(videoUrl: string, title?: string) {
  if (!videoUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-400">
        <Play className="w-8 h-8 text-slate-600 mb-2" />
        <p className="text-xs">File/Link video belum dipilih.</p>
      </div>
    );
  }

  const { type, embedUrl } = getEmbedVideoUrl(videoUrl);

  if (type === 'youtube' || type === 'gdrive' || type === 'vimeo' || type === 'iframe') {
    return (
      <div className="relative w-full h-full group">
        <iframe
          src={embedUrl}
          title={title || 'Pemutar Video Pelatihan'}
          className="w-full h-full border-0 rounded-xl bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 bg-slate-900/90 hover:bg-slate-900 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-700 backdrop-blur-sm flex items-center space-x-1 shadow transition opacity-70 hover:opacity-100"
          title="Buka sumber video di tab baru"
        >
          <span>Buka Link Tab Baru</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <video
        key={videoUrl}
        controls
        autoPlay
        controlsList="nodownload"
        className="w-full h-full object-contain rounded-xl bg-black"
      >
        <source src={embedUrl} type="video/mp4" />
        <source src={embedUrl} type="video/webm" />
        <source src={embedUrl} type="video/ogg" />
        <p className="p-4 text-xs text-white">Browser Anda tidak mendukung pemutar HTML5 ini.</p>
      </video>
      {!videoUrl.startsWith('data:') && !videoUrl.startsWith('blob:') && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 bg-slate-900/90 hover:bg-slate-900 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-700 backdrop-blur-sm flex items-center space-x-1 shadow transition opacity-70 hover:opacity-100"
        >
          <span>Buka Stream Video</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}


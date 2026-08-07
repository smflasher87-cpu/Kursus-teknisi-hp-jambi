import React from 'react';
import { User, AdminSettings } from '../types';
import {
  LogOut,
  Wrench,
  Users,
  Film,
  ShieldCheck,
  UserCheck,
  Building2,
  FileText,
  MessageSquare,
  MessageCircle,
  Briefcase,
  Image,
  Bell,
  Settings,
  UserPlus,
  Cpu,
  Sparkles,
  Download,
  Video,
  Award,
  BookOpen,
  Smartphone
} from 'lucide-react';

export type NavTab =
  | 'materi'
  | 'analisa'
  | 'pcd'
  | 'persamaanlcd'
  | 'modulpdf'
  | 'sertifikat'
  | 'chat'
  | 'pendaftaran'
  | 'profil'
  | 'alumni'
  | 'kasus'
  | 'loker'
  | 'freetools'
  | 'zoom'
  | 'request'
  | 'galeri'
  | 'pengumuman';

interface NavbarProps {
  currentUser: User;
  adminSettings: AdminSettings;
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenAdminUsers: () => void;
  onOpenAdminVideos: () => void;
  onOpenAdminSettings: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  adminSettings,
  activeTab,
  onChangeTab,
  onOpenAdminUsers,
  onOpenAdminVideos,
  onOpenAdminSettings,
  onLogout
}) => {
  const isAdmin = currentUser.role === 'admin';

  const tabs = [
    { id: 'materi', label: 'Materi Pelatihan', icon: Film },
    { id: 'modulpdf', label: 'Modul Materi PDF', icon: BookOpen },
    { id: 'sertifikat', label: 'Download Sertifikat', icon: Award },
    { id: 'persamaanlcd', label: 'Persamaan LCD', icon: Smartphone },
    { id: 'analisa', label: 'Analisa Kerusakan AI', icon: Cpu },
    { id: 'pcd', label: 'Part Compatible (PCD)', icon: Cpu },
    { id: 'chat', label: 'Obrolan & Chat Admin', icon: MessageCircle },
    { id: 'pendaftaran', label: 'Form Pendaftaran', icon: UserPlus },
    { id: 'profil', label: 'Profil & Struktur', icon: Building2 },
    { id: 'alumni', label: 'Data Alumni', icon: Users },
    { id: 'kasus', label: 'Berbagi Kasus', icon: MessageSquare },
    { id: 'loker', label: 'Magang & Loker', icon: Briefcase },
    { id: 'freetools', label: 'Tool Software Free', icon: Download },
    { id: 'zoom', label: 'Zoom Live Meeting', icon: Video },
    { id: 'request', label: 'Request Skematik', icon: Wrench },
    { id: 'galeri', label: 'Foto Dokumentasi LPK', icon: Image },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col space-y-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand logo & title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-white shrink-0 shadow-md">
              {adminSettings.logoUrl ? (
                <img src={adminSettings.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Wrench className="w-5 h-5 text-indigo-400" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-white text-base tracking-tight">
                  LPK SM FLASHER
                </span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  TRAINING CENTRE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                PT. SM Flasher Training Centre &bull; Android & iPhone Specialist
              </p>
            </div>
          </div>

          {/* User Profile Card & Admin Buttons */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                isAdmin ? 'bg-indigo-500/20 text-indigo-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  <span className={`text-[9px] uppercase px-1 py-0.2 rounded font-extrabold ${
                    isAdmin ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {isAdmin ? 'ADMIN' : 'SISWA'}
                  </span>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onOpenAdminUsers}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition flex items-center space-x-1"
                  title="Kelola Akun Siswa"
                >
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Kelola Akun</span>
                </button>

                <button
                  onClick={onOpenAdminVideos}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition flex items-center space-x-1"
                  title="Kelola Video"
                >
                  <Film className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Kelola Video</span>
                </button>

                <button
                  onClick={onOpenAdminSettings}
                  className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow transition"
                  title="Setting Admin & Portal"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={onLogout}
              className="p-1.5 bg-slate-800/80 hover:bg-red-950/80 text-slate-300 hover:text-red-300 rounded-lg border border-slate-700 hover:border-red-800 transition"
              title="Keluar / Logout"
            >
              <LogOut className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Selector for Quick Mobile Navigation */}
        <div className="block md:hidden border-t border-slate-800/80 pt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
              MENU UTAMA PORTAL:
            </span>
            <span className="text-[10px] font-bold text-indigo-300">
              {tabs.find((t) => t.id === activeTab)?.label}
            </span>
          </div>
          <select
            value={activeTab}
            onChange={(e) => onChangeTab(e.target.value as NavTab)}
            className="w-full p-2.5 bg-slate-950 border-2 border-indigo-500/60 rounded-xl text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id} className="bg-slate-900 text-white font-bold py-1">
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Multi-row Flexible Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-t border-slate-800/80 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id as NavTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, Lock, User as UserIcon, Eye, EyeOff, AlertCircle, Wrench, GraduationCap, UserPlus, CheckCircle2, Key } from 'lucide-react';
import bgImage from '../assets/images/smflasher_bg_1786027934305.jpg';

interface LoginPageProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
  onOpenRegistration?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ users, onLoginSuccess, onOpenRegistration }) => {
  // Check for remembered login info on mount
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem('sm_flasher_remember_me_enabled') === 'true';
  });

  const [username, setUsername] = useState<string>(() => {
    if (localStorage.getItem('sm_flasher_remember_me_enabled') === 'true') {
      return localStorage.getItem('sm_flasher_remember_username') || '';
    }
    return '';
  });

  const [password, setPassword] = useState<string>(() => {
    if (localStorage.getItem('sm_flasher_remember_me_enabled') === 'true') {
      return localStorage.getItem('sm_flasher_remember_password') || '';
    }
    return '';
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMessage('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching active user
      const foundUser = users.find(
        (u) =>
          u.username.toLowerCase() === trimmedUsername.toLowerCase() &&
          u.passwordHash === trimmedPassword
      );

      if (!foundUser) {
        setErrorMessage(
          'Username atau password tidak ditemukan / salah. Pastikan akun Anda telah terdaftar oleh Admin LPK SM FLASHER.'
        );
        setIsLoading(false);
        return;
      }

      if (foundUser.status === 'Nonaktif') {
        setErrorMessage(
          'Akun Anda saat ini dinonaktifkan oleh Admin. Silakan hubungi instruktur LPK SM FLASHER.'
        );
        setIsLoading(false);
        return;
      }

      // Handle Remember Login Info
      if (rememberMe) {
        localStorage.setItem('sm_flasher_remember_me_enabled', 'true');
        localStorage.setItem('sm_flasher_remember_username', trimmedUsername);
        localStorage.setItem('sm_flasher_remember_password', trimmedPassword);
      } else {
        localStorage.removeItem('sm_flasher_remember_me_enabled');
        localStorage.removeItem('sm_flasher_remember_username');
        localStorage.removeItem('sm_flasher_remember_password');
      }

      setIsLoading(false);
      onLoginSuccess(foundUser);
    }, 400);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 lg:p-8 font-sans text-slate-900 bg-slate-950 overflow-hidden">
      {/* Full Page Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90 pointer-events-none" />

      {/* Main Login Card Container - Professional Polish Theme */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white border border-slate-200/80">
        
        {/* Left Branding Column: Restricted Content Preview with Lab Photo Background */}
        <div className="lg:w-7/12 bg-slate-950 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
          {/* Background Image inside Left Branding */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 pointer-events-none" />
          {/* Decorative Overlay Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 lg:mb-12">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-slate-950 font-black shadow-lg shadow-indigo-500/30">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  LPK SM FLASHER <span className="text-indigo-400">V3.4</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
                  TRAINING CENTRE PORTAL
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Akses Eksklusif <br />
              <span className="text-indigo-400 italic">Video Materi Digital.</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
              Platform pembelajaran teknisi telepon seluler (Android & iPhone) tertutup. Seluruh materi video dan kurikulum skematik hanya dapat diakses melalui akun resmi yang telah didaftarkan.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6 sm:gap-8 border-t border-slate-800 pt-8 mt-8 lg:mt-12">
            <div>
              <p className="text-indigo-400 font-semibold mb-1 uppercase tracking-widest text-xs">
                Kapasitas Server
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold">99.9% Uptime</p>
            </div>
            <div>
              <p className="text-indigo-400 font-semibold mb-1 uppercase tracking-widest text-xs">
                Total Modul SOP
              </p>
              <p className="text-xl sm:text-2xl font-mono font-bold">Teknisi Expert</p>
            </div>
          </div>
        </div>

        {/* Right Form Column: Clean Professional Login */}
        <div className="lg:w-5/12 flex flex-col justify-center p-8 sm:p-12 bg-white border-l border-slate-100">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-100">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Autentikasi Terproteksi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">Selamat Datang</h2>
            <p className="text-sm text-slate-500">Masukkan kredensial Anda untuk mengakses dashboard pelatihan.</p>
          </div>

          {/* Alert Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form - Username and Password MUST start empty */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Username Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: ahmad.teknisi"
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                  title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="pt-1 pb-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2.5 cursor-pointer text-slate-700 hover:text-slate-900 group select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                  />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition">
                    Ingat Info Login (Remember Me)
                  </span>
                </label>

                {rememberMe && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Tersimpan Otomatis</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                Centang opsi ini agar Anda dapat langsung masuk tanpa memasukkan ulang username dan password di perangkat ini.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-lg transition-colors shadow-lg shadow-slate-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memeriksa Akun...</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <span>Masuk Ke Sistem</span>
                </>
              )}
            </button>
          </form>

          {/* Guest Registration Option */}
          {onOpenRegistration && (
            <div className="mt-6 p-4 bg-indigo-50/90 border border-indigo-200/90 rounded-xl space-y-2.5">
              <div className="flex items-center space-x-2 text-indigo-950 font-extrabold text-xs">
                <UserPlus className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Calon Peserta Pelatihan Baru?</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Belum memiliki akses login? Silakan isi Form Pendaftaran resmi LPK SM Flasher untuk mendaftar kelas pelatihan offline & online.
              </p>
              <button
                type="button"
                onClick={onOpenRegistration}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg shadow-md transition flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Form Pendaftaran Siswa Baru</span>
              </button>
            </div>
          )}

          {/* Admin Registration Note */}
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex gap-2.5">
            <div className="w-5 h-5 bg-amber-200/80 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-amber-800 text-xs font-extrabold">i</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <strong>Info Login:</strong> Akses materi video diberikan setelah calon peserta melakukan pendaftaran dan diverifikasi Admin LPK SM FLASHER.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} LPK SM FLASHER</p>
            <p>Training Centre V3.4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

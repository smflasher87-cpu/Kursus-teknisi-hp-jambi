import React, { useState } from 'react';
import { InstitutionProfile, User } from '../types';
import {
  Award,
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  Edit2,
  Check,
  FileCheck,
  Globe,
  Sparkles
} from 'lucide-react';

interface InstitutionProfileViewProps {
  profile: InstitutionProfile;
  currentUser: User;
  onUpdateProfile: (updated: InstitutionProfile) => void;
}

export const InstitutionProfileView: React.FC<InstitutionProfileViewProps> = ({
  profile,
  currentUser,
  onUpdateProfile
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<InstitutionProfile>(profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-white shrink-0 shadow-lg">
              {profile.logoUrl ? (
                <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <Building2 className="w-10 h-10 text-indigo-400" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  LEMBAGA TERAKREDITASI RESMI
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  UJI BNSP READY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {profile.name} <span className="text-indigo-400">{profile.legalCompany}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Pusat Pelatihan & Sertifikasi Teknisi Telepon Seluler Terpadu Berlisensi Resmi Pemerintah Indonesia.
              </p>
            </div>
          </div>

          {isAdmin && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2 shrink-0"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profil & Legalitas Lembaga</span>
            </button>
          )}
        </div>
      </div>

      {/* Edit Form for Admin */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Edit2 className="w-4 h-4 text-indigo-400" />
              <span>Edit Informasi Profil, Legalitas & Struktur Organisasi</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Batal
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Nama Lembaga</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Nama PT / Badan Hukum</label>
              <input
                type="text"
                value={formData.legalCompany}
                onChange={(e) => setFormData({ ...formData, legalCompany: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-300 block mb-1">SK KEMENKUMHAM RI No.</label>
              <input
                type="text"
                value={formData.skKemenkumham}
                onChange={(e) => setFormData({ ...formData, skKemenkumham: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-indigo-300 block mb-1">No. VIN Kemnaker RI</label>
              <input
                type="text"
                value={formData.vinKemnaker}
                onChange={(e) => setFormData({ ...formData, vinKemnaker: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-300 block mb-1">Sertifikasi Uji BNSP</label>
              <input
                type="text"
                value={formData.bnspCertification}
                onChange={(e) => setFormData({ ...formData, bnspCertification: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-indigo-300 block mb-1">Nomor Induk Berusaha (NIB)</label>
              <input
                type="text"
                value={formData.nib}
                onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          {/* Logo Upload Section */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <label className="text-xs font-bold text-indigo-400 block">Logo Lembaga (Upload dari Penyimpanan atau URL)</label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {formData.logoUrl && (
                <img src={formData.logoUrl} alt="Logo Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0" />
              )}
              <div className="flex-1 w-full space-y-2">
                <input
                  type="text"
                  value={formData.logoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="https://... (atau upload file di sebelah)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition cursor-pointer shrink-0 flex items-center space-x-1.5">
                <span>Pilih File Gambar</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, logoUrl: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Contact and Address Edit */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Kontak & Alamat Pusat</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Alamat Kantor Pusat *</label>
                <textarea
                  rows={2}
                  value={formData.headOfficeAddress}
                  onChange={(e) => setFormData({ ...formData, headOfficeAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp Admin / Telepon *</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Resmi *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Tentang Lembaga</label>
            <textarea
              rows={3}
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>

          {/* Org structure inputs */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Pengurus & Struktur Organisasi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block">Pembina</label>
                <input
                  type="text"
                  value={formData.orgStructure.pembina}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, pembina: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Direktur Utama</label>
                <input
                  type="text"
                  value={formData.orgStructure.direkturUtama}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, direkturUtama: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Head Instructor</label>
                <input
                  type="text"
                  value={formData.orgStructure.headInstructor}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, headInstructor: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Admin Pelatihan</label>
                <input
                  type="text"
                  value={formData.orgStructure.adminPelatihan}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, adminPelatihan: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Kepala Lab Hardware</label>
                <input
                  type="text"
                  value={formData.orgStructure.kepalaLabHardware}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, kepalaLabHardware: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Kepala Lab Software</label>
                <input
                  type="text"
                  value={formData.orgStructure.kepalaLabSoftware}
                  onChange={(e) => setFormData({ ...formData, orgStructure: { ...formData.orgStructure, kepalaLabSoftware: e.target.value } })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      ) : null}

      {/* Official Legalities Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            <span>SK KEMENKUMHAM RI</span>
          </div>
          <p className="text-sm font-mono font-extrabold text-white">{profile.skKemenkumham}</p>
          <p className="text-[11px] text-slate-400">Pengesahan Badan Hukum Kemenkumham RI</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>VIN KEMNAKER RI</span>
          </div>
          <p className="text-sm font-mono font-extrabold text-white">{profile.vinKemnaker}</p>
          <p className="text-[11px] text-slate-400">Nomor Induk Lembaga Kementerian Ketenagakerjaan</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>SERTIFIKASI BNSP</span>
          </div>
          <p className="text-sm font-mono font-extrabold text-white">{profile.bnspCertification}</p>
          <p className="text-[11px] text-slate-400">Uji Kompetensi Nasional Badan Nasional Sertifikasi Profesi</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>NOMOR INDUK BERUSAHA</span>
          </div>
          <p className="text-sm font-mono font-extrabold text-white">{profile.nib}</p>
          <p className="text-[11px] text-slate-400">Izin Operasional Penyelenggara Pelatihan Resmi</p>
        </div>
      </div>

      {/* Main Profile Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Profil & Latar Belakang LPK SM Flasher</span>
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
              {profile.aboutText}
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-3">
            <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Visi Lembaga</h4>
            <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 italic">
              "{profile.vision}"
            </p>

            <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider pt-2">Misi Utama</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {profile.mission.map((m, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Location Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>Kontak & Alamat Pusat</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Alamat Kantor Pusat:</span>
                <span>{profile.headOfficeAddress}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">WhatsApp Admin LPK:</span>
                <span className="font-mono text-indigo-300 font-bold">{profile.contactPhone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Email Resmi:</span>
                <span>{profile.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Structure Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Struktur Organisasi Lembaga</h3>
              <p className="text-xs text-slate-400">Pengurus, Dewan Pembina, & Tim Pengajar Master Teknisi LPK SM Flasher</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              DEWAN PEMBINA
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.pembina}</h4>
            <p className="text-[11px] text-slate-400">Pembina & Penasihat LPK</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              DIREKTUR UTAMA
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.direkturUtama}</h4>
            <p className="text-[11px] text-slate-400">Direktur LPK SM Flasher Training Centre</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              HEAD INSTRUCTOR
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.headInstructor}</h4>
            <p className="text-[11px] text-slate-400">Instruktur Utama & Master Penguji BNSP</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              ADMIN PELATIHAN
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.adminPelatihan}</h4>
            <p className="text-[11px] text-slate-400">Administrasi Siswa & Layanan Pendaftaran</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              KEPALA LAB HARDWARE
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.kepalaLabHardware}</h4>
            <p className="text-[11px] text-slate-400">Kepala Lab Reballing & Board Repair</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              KEPALA LAB SOFTWARE
            </span>
            <h4 className="text-sm font-extrabold text-white pt-2">{profile.orgStructure.kepalaLabSoftware}</h4>
            <p className="text-[11px] text-slate-400">Kepala Lab Direct ISP eMMC & UFS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

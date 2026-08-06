import React, { useState } from 'react';
import { Alumni, User, Registration } from '../types';
import {
  Users,
  Phone,
  MapPin,
  Briefcase,
  Plus,
  Search,
  Trash2,
  X,
  FileText,
  CheckCircle2,
  Clock,
  UserCheck,
  Upload,
  Image as ImageIcon,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AlumniViewProps {
  alumniList: Alumni[];
  registrations?: Registration[];
  currentUser: User;
  onAddAlumni: (alumni: Alumni) => void;
  onDeleteAlumni: (id: string) => void;
}

export const AlumniView: React.FC<AlumniViewProps> = ({
  alumniList,
  registrations = [],
  currentUser,
  onAddAlumni,
  onDeleteAlumni
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [activeSubTab, setActiveSubTab] = useState<'alumni' | 'pendaftaran' | 'galeri'>('alumni');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for manual or converted alumni input
  const [name, setName] = useState('');
  const [classProgram, setClassProgram] = useState('Android & iPhone Expert Class');
  const [batchYear, setBatchYear] = useState('Angkatan 2026');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [testimonial, setTestimonial] = useState('');

  // Filtered Alumni List
  const filteredAlumni = alumniList.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.workplaceOrBusiness.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.batchYear.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Registrations List
  const filteredRegistrations = registrations.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.whatsappNumber.includes(searchQuery)
  );

  const handleSubmitAlumni = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newAlumni: Alumni = {
      id: `alm-${Date.now()}`,
      name,
      classProgram,
      batchYear,
      phone,
      address: address || 'Indonesia',
      workplaceOrBusiness: workplace || 'Teknisi Handphone Mandiri / Owner Store',
      photoUrl:
        photoUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      testimonial: testimonial || undefined
    };

    onAddAlumni(newAlumni);
    setIsModalOpen(false);

    // Reset Form
    setName('');
    setPhone('');
    setAddress('');
    setWorkplace('');
    setPhotoUrl('');
    setTestimonial('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhotoUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pre-fill modal with student registration info to convert to Alumni
  const handleConvertRegistrationToAlumni = (reg: Registration) => {
    setName(reg.fullName);
    setClassProgram(reg.selectedClass);
    setBatchYear('Angkatan 2026');
    setPhone(reg.whatsappNumber);
    setAddress(reg.address);
    setWorkplace(`Alumni LPK - ${reg.selectedClass}`);
    setPhotoUrl(reg.selfiePhotoUrl || reg.ktpPhotoUrl || '');
    setTestimonial(`Siswa lulusan pendaftaran ${reg.selectedClass}.`);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>DIREKTORI FOTO & DATA SISWA ALUMNI</span>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                Data Alumni & Siswa Pendaftaran LPK SM Flasher
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Database terpadu foto alumni lulusan sertifikasi BNSP, profil tempat usaha teknisi, serta data pendaftaran siswa baru.
              </p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setName('');
                setPhone('');
                setAddress('');
                setWorkplace('');
                setPhotoUrl('');
                setTestimonial('');
                setIsModalOpen(true);
              }}
              className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0 border border-indigo-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>Input Data Alumni (Admin)</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation Bar & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Sub Tab Switcher */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveSubTab('alumni')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
                activeSubTab === 'alumni'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data Alumni Resmi ({alumniList.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('pendaftaran')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
                activeSubTab === 'pendaftaran'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Data Siswa Form Pendaftaran ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('galeri')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
                activeSubTab === 'galeri'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>Foto Profil & Usaha Alumni</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, kota, kelas, toko..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* SUB TAB 1: DATA ALUMNI RESMI */}
      {activeSubTab === 'alumni' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAlumni.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
              <Users className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="font-bold text-slate-300">Belum ada data alumni ditemukan</p>
              <p className="text-slate-500">Coba kata kunci pencarian lain atau tambahkan data alumni baru.</p>
            </div>
          ) : (
            filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl hover:border-indigo-500/40 transition relative group"
              >
                {isAdmin && (
                  <button
                    onClick={() => onDeleteAlumni(alumni.id)}
                    className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition rounded-lg hover:bg-slate-800"
                    title="Hapus Alumni"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center space-x-3.5">
                  <img
                    src={alumni.photoUrl}
                    alt={alumni.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500/40 shrink-0 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white">{alumni.name}</h3>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {alumni.batchYear}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{alumni.classProgram}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate font-semibold text-white">{alumni.workplaceOrBusiness}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{alumni.address}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <a
                      href={`https://wa.me/${alumni.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-300 font-mono font-bold hover:underline"
                    >
                      {alumni.phone}
                    </a>
                  </div>
                </div>

                {alumni.testimonial && (
                  <p className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 italic leading-relaxed">
                    "{alumni.testimonial}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* SUB TAB 2: DATA SISWA DARI FORM PENDAFTARAN */}
      {activeSubTab === 'pendaftaran' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>
                Data hasil pengisian form pendaftaran siswa LPK SM Flasher. Admin dapat memverifikasi & menjadikan siswa sebagai alumni resmi.
              </span>
            </div>
            <span className="font-bold text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              Total: {filteredRegistrations.length} Pendaftar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRegistrations.length === 0 ? (
              <div className="col-span-full p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                Belum ada data pendaftaran siswa.
              </div>
            ) : (
              filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3 gap-3">
                    <div className="flex items-center space-x-3">
                      {reg.selfiePhotoUrl ? (
                        <img
                          src={reg.selfiePhotoUrl}
                          alt={reg.fullName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold shrink-0">
                          {reg.fullName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-extrabold text-white">{reg.fullName}</h3>
                        <p className="text-xs font-semibold text-indigo-300 mt-0.5">{reg.selectedClass}</p>
                        <p className="text-[10px] text-slate-500">
                          Biaya: Rp {reg.classFee.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border shrink-0 ${
                        reg.status === 'Disetujui'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : reg.status === 'Ditolak'
                          ? 'bg-red-500/20 text-red-300 border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 block">WhatsApp:</span>
                      <a
                        href={`https://wa.me/${reg.whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 font-mono font-bold hover:underline truncate block"
                      >
                        {reg.whatsappNumber}
                      </a>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">Alamat / Domisili:</span>
                      <span className="truncate block font-medium">{reg.address}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">Tanggal Lahir:</span>
                      <span className="truncate block">{reg.birthPlaceDate || '-'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">No. KTP / NIK:</span>
                      <span className="truncate block font-mono">{reg.ktpNumber || '-'}</span>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        Terdaftar: {new Date(reg.createdAt).toLocaleDateString('id-ID')}
                      </span>

                      <button
                        onClick={() => handleConvertRegistrationToAlumni(reg)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Jadikan Alumni Resmi</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 3: GALERI FOTO ALUMNI & USAHA */}
      {activeSubTab === 'galeri' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAlumni.map((alumni) => (
            <div
              key={alumni.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 p-4 hover:border-indigo-500/40 transition"
            >
              <div className="aspect-square rounded-xl bg-slate-950 overflow-hidden relative border border-slate-800">
                <img
                  src={alumni.photoUrl}
                  alt={alumni.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/90 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/30">
                  {alumni.batchYear}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">{alumni.name}</h4>
                <p className="text-xs font-semibold text-indigo-400 mt-0.5">{alumni.workplaceOrBusiness}</p>
                <p className="text-[11px] text-slate-400 mt-1">{alumni.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Convert Alumni */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-white space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold">Input Data Alumni LPK</h3>

            <form onSubmit={handleSubmitAlumni} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Nama Lengkap Alumni *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Kom"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Angkatan Lulus *</label>
                  <input
                    type="text"
                    required
                    value={batchYear}
                    onChange={(e) => setBatchYear(e.target.value)}
                    placeholder="Angkatan 2026"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Program Kelas</label>
                  <input
                    type="text"
                    required
                    value={classProgram}
                    onChange={(e) => setClassProgram(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">No. WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08123456789"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Alamat Kota / Wilayah *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Bandung, Jawa Barat"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Tempat Usaha / Bekerja *</label>
                <input
                  type="text"
                  required
                  value={workplace}
                  onChange={(e) => setWorkplace(e.target.value)}
                  placeholder="Owner SM Cell Bandung"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Foto Profil Alumni *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://... atau upload file"
                    className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                  <label className="px-3 py-2.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-200 text-xs font-bold rounded-lg transition cursor-pointer flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Pesan / Testimonial Alumni</label>
                <textarea
                  rows={2}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Kesan dan pesan selama belajar di LPK SM Flasher..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-xs rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-xs font-bold rounded-lg shadow"
                >
                  Simpan Data Alumni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

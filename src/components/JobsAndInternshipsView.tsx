import React, { useState } from 'react';
import { JobOpening, User, AdminSettings } from '../types';
import { Briefcase, MapPin, DollarSign, Send, CheckCircle2, Plus, Trash2, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface JobsAndInternshipsViewProps {
  jobs: JobOpening[];
  currentUser: User;
  adminSettings: AdminSettings;
  onAddJob?: (job: JobOpening) => void;
  onDeleteJob?: (id: string) => void;
}

export const JobsAndInternshipsView: React.FC<JobsAndInternshipsViewProps> = ({
  jobs,
  currentUser,
  adminSettings,
  onAddJob,
  onDeleteJob
}) => {
  const isAdmin = currentUser.role === 'admin';

  // Apply modal states
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState(currentUser.name);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Lulusan Pelatihan LPK SM Flasher');
  const [cvNotes, setCvNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Admin Add Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalaryRange, setNewSalaryRange] = useState('');
  const [newType, setNewType] = useState<'Lowongan Kerja' | 'Program Magang'>('Lowongan Kerja');
  const [newDescription, setNewDescription] = useState('');
  const [newRequirements, setNewRequirements] = useState('');
  const [newContactPhone, setNewContactPhone] = useState(adminSettings.whatsappAdmin);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const message = `*LAMARAN KERJA / MAGANG TEKNISI LPK SM FLASHER*
---------------------------------------
*Posisi & Perusahaan:* ${selectedJob.title} (${selectedJob.companyName})
*Nama Pelamar:* ${applicantName}
*No. WhatsApp:* ${whatsappNumber}
*Pengalaman / Kelas:* ${experienceLevel}
*Catatan Keahlian:* ${cvNotes}
---------------------------------------
Saya berminat mengajukan lamaran untuk posisi ini. Terima kasih Admin LPK SM Flasher.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${adminSettings.whatsappAdmin.replace(/[^0-9]/g, '')}?text=${encoded}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompanyName.trim()) return;

    const reqArray = newRequirements
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const createdJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: newTitle.trim(),
      companyName: newCompanyName.trim(),
      location: newLocation.trim() || 'Jambi / Indonesia',
      salaryRange: newSalaryRange.trim() || 'Kompetitif / Bagi Hasil',
      type: newType,
      description: newDescription.trim() || 'Deskripsi pekerjaan & magang teknisi HP.',
      requirements: reqArray.length > 0 ? reqArray : ['Sertifikat LPK SM Flasher / BNSP', 'Siap Kerja Tim'],
      contactPersonPhone: newContactPhone.trim() || adminSettings.whatsappAdmin,
      createdAt: new Date().toISOString()
    };

    if (onAddJob) {
      onAddJob(createdJob);
    }

    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewCompanyName('');
    setNewLocation('');
    setNewSalaryRange('');
    setNewDescription('');
    setNewRequirements('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Info Lowongan Kerja & Program Magang Teknisi</h2>
            <p className="text-xs text-slate-400">Peluang karir langsung disalurkan ke service center mitra LPK SM Flasher</p>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Lowongan / Magang Baru</span>
          </button>
        )}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition relative group">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded ${
                    job.type === 'Program Magang' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {job.type}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">{job.title}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">{job.companyName}</p>
                </div>

                {isAdmin && onDeleteJob && (
                  <button
                    onClick={() => {
                      if (confirm(`Hapus lowongan "${job.title}"?`)) {
                        onDeleteJob(job.id);
                      }
                    }}
                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-lg transition"
                    title="Hapus Lowongan (Admin)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-emerald-300 font-bold">{job.salaryRange}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {job.description}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Persyaratan Siswa:</span>
                <ul className="space-y-1">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedJob(job);
                setIsSuccess(false);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5"
            >
              <span>Lamar / Daftar Magang Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Admin Add Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Khusus Panel Admin</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Posting Lowongan Kerja / Magang Baru</h3>
            <p className="text-xs text-slate-400 mb-4">Informasi akan langsung dipublikasikan kepada seluruh siswa LPK SM Flasher</p>

            <form onSubmit={handleCreateJob} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Jenis Program *</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNewType('Lowongan Kerja')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                      newType === 'Lowongan Kerja'
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Lowongan Kerja
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('Program Magang')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                      newType === 'Program Magang'
                        ? 'bg-amber-600 border-amber-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Program Magang
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Judul Posisi Pekerjaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Teknisi Hardware Android & Reballing BGA"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nama Perusahaan / Service Center *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Mitra Service Center SM Flasher Jambi"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Lokasi Penempatan</label>
                  <input
                    type="text"
                    placeholder="Kota Jambi / Jakarta"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Kisaran Gaji / Insentif</label>
                  <input
                    type="text"
                    placeholder="Rp 3.500.000 - Rp 6.000.000"
                    value={newSalaryRange}
                    onChange={(e) => setNewSalaryRange(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Deskripsi Pekerjaan</label>
                <textarea
                  rows={3}
                  placeholder="Detail tanggung jawab pekerjaan..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Persyaratan (Satu Per Baris)</label>
                <textarea
                  rows={3}
                  placeholder={`Lulusan LPK SM Flasher\nMampu Reballing IC BGA\nDisiplin dan jujur`}
                  value={newRequirements}
                  onChange={(e) => setNewRequirements(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nomor Kontak WhatsApp Admin Penyalur</label>
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg shadow flex items-center space-x-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Publikasikan Lowongan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-white">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-indigo-400 uppercase tracking-wider">Formulir Lamaran / Magang</h3>
            <h4 className="text-lg font-extrabold text-white mt-1">{selectedJob.title}</h4>
            <p className="text-xs text-slate-400">{selectedJob.companyName} &bull; {selectedJob.location}</p>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h5 className="text-base font-bold text-white">Lamaran Terkirim ke WhatsApp Admin!</h5>
                <p className="text-xs text-slate-300">
                  Aplikasi lamaran Anda telah diproses dan diteruskan ke tim penempatan kerja LPK SM Flasher.
                </p>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mt-4 px-5 py-2 bg-indigo-600 text-xs font-bold rounded-xl"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3.5 mt-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nama Lengkap Siswa *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="text"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="081234567890"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Tingkat Pengalaman / Sertifikat *</label>
                  <input
                    type="text"
                    required
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Catatan Keahlian Tambahan / Resume Ringkas</label>
                  <textarea
                    rows={3}
                    value={cvNotes}
                    onChange={(e) => setCvNotes(e.target.value)}
                    placeholder="Sebutkan kemampuan khusus Anda (misal: Reballing BGA, Interposer, eMMC UFS)..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setSelectedJob(null)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                    Batal
                  </button>
                  <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-xs font-bold rounded-lg shadow flex items-center space-x-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pendaftaran via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

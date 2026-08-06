import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { X, UserPlus, Search, ShieldCheck, UserCheck, Key, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface AdminUserModalProps {
  users: User[];
  onAddUser: (newUser: User) => void;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  onClose: () => void;
}

export const AdminUserModal: React.FC<AdminUserModalProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');

  // New User Form State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('siswa');
  const [newClassProgram, setNewClassProgram] = useState('Pelatihan Teknisi HP Android & iPhone');
  
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password reset state
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetNewPassword, setResetNewPassword] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.classProgram.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const usernameTrim = newUsername.trim().toLowerCase();
    const nameTrim = newName.trim();
    const passTrim = newPassword.trim();

    if (!usernameTrim || !nameTrim || !passTrim) {
      setErrorMsg('Semua kolom form wajib diisi.');
      return;
    }

    if (users.some((u) => u.username.toLowerCase() === usernameTrim)) {
      setErrorMsg(`Username "${usernameTrim}" sudah digunakan oleh peserta lain.`);
      return;
    }

    const createdUser: User = {
      id: `usr-${Date.now()}`,
      username: usernameTrim,
      passwordHash: passTrim,
      name: nameTrim,
      role: newRole,
      classProgram: newClassProgram,
      status: 'Aktif',
      createdAt: new Date().toISOString()
    };

    onAddUser(createdUser);

    setSuccessMsg(`Akun untuk "${nameTrim}" (@${usernameTrim}) berhasil didaftarkan! User dapat langsung login.`);
    setNewUsername('');
    setNewPassword('');
    setNewName('');
    setNewRole('siswa');
  };

  const handleToggleStatus = (user: User) => {
    const nextStatus = user.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    onUpdateUser({
      ...user,
      status: nextStatus
    });
  };

  const handleSaveResetPassword = (user: User) => {
    if (!resetNewPassword.trim()) return;
    onUpdateUser({
      ...user,
      passwordHash: resetNewPassword.trim()
    });
    setResetUserId(null);
    setResetNewPassword('');
    setSuccessMsg(`Password untuk user @${user.username} telah diperbarui.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Manajemen Akun Peserta & Instruktur</h2>
              <p className="text-xs text-slate-400">
                Pendaftaran & Pengaturan Akses LPK SM FLASHER TRAINING CENTRE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="px-6 pt-3 bg-slate-900/80 border-b border-slate-800 flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition border-b-2 ${
              activeTab === 'list'
                ? 'bg-slate-800 text-indigo-400 border-indigo-400'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            Daftar Akun Terdaftar ({users.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('add');
              setSuccessMsg('');
              setErrorMsg('');
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'add'
                ? 'bg-slate-800 text-indigo-400 border-indigo-400'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Daftarkan Akun Baru</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'list' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari nama, username, atau program kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* User List Table / Cards */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                <div className="divide-y divide-slate-800">
                  {filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      Tidak ada data akun yang sesuai dengan kata kunci.
                    </div>
                  ) : (
                    filteredUsers.map((u) => (
                      <div
                        key={u.id}
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-800/40 transition"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              u.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            }`}
                          >
                            {u.role === 'admin' ? (
                              <ShieldCheck className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-slate-100">{u.name}</span>
                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                  u.role === 'admin'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {u.role}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded ${
                                  u.status === 'Aktif'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {u.status}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>Username: <strong className="text-slate-200">@{u.username}</strong></span>
                              <span>Password: <strong className="text-slate-200">{u.passwordHash}</strong></span>
                              <span>Program: <span className="text-slate-300">{u.classProgram}</span></span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60 justify-end">
                          {resetUserId === u.id ? (
                            <div className="flex items-center space-x-1.5">
                              <input
                                type="text"
                                placeholder="Password baru..."
                                value={resetNewPassword}
                                onChange={(e) => setResetNewPassword(e.target.value)}
                                className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                              />
                              <button
                                onClick={() => handleSaveResetPassword(u)}
                                className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded hover:bg-amber-400"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setResetUserId(null)}
                                className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded hover:text-white"
                              >
                                Batal
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setResetUserId(u.id);
                                  setResetNewPassword(u.passwordHash);
                                }}
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 flex items-center space-x-1"
                                title="Ubah Password"
                              >
                                <Key className="w-3 h-3 text-amber-400" />
                                <span>Reset Pass</span>
                              </button>

                              <button
                                onClick={() => handleToggleStatus(u)}
                                className={`px-2.5 py-1 text-xs rounded border transition flex items-center space-x-1 ${
                                  u.status === 'Aktif'
                                    ? 'bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border-slate-700'
                                    : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-800'
                                }`}
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>{u.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}</span>
                              </button>

                              {u.username !== 'admin' && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Yakin ingin menghapus akun "${u.name}"?`)) {
                                      onDeleteUser(u.id);
                                    }
                                  }}
                                  className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 rounded border border-red-800/80"
                                  title="Hapus Akun"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ADD NEW USER FORM */
            <form onSubmit={handleCreateUser} className="space-y-4 max-w-xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                Formulir Pendaftaran Akun Siswa / Instruktur
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nama Lengkap Siswa / Instruktur
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Budi Santoso (Teknisi Android)"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Username Login (Huruf Kecil)
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Contoh: budi.teknisi"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Kata Sandi (Password)
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Contoh: siswa123"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Role / Hak Akses
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="siswa">Siswa / Peserta Pelatihan</option>
                    <option value="admin">Admin / Instruktur Utama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Program Kelas Pelatihan
                  </label>
                  <select
                    value={newClassProgram}
                    onChange={(e) => setNewClassProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Pelatihan Teknisi HP Android & iPhone">Pelatihan Teknisi HP Android & iPhone</option>
                    <option value="Kelas Basic Hardware & Skematik">Kelas Basic Hardware & Skematik</option>
                    <option value="Kelas Expert Board & Double Layer iPhone">Kelas Expert Board & Double Layer iPhone</option>
                    <option value="Kelas Special Software, eMMC & UFS">Kelas Special Software, eMMC & UFS</option>
                    <option value="Manajemen LPK SM FLASHER">Manajemen LPK SM FLASHER</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition mt-4 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Simpan & Daftarkan Akun Peserta</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

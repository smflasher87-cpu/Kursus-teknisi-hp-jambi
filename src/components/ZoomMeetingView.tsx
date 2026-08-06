import React, { useState } from 'react';
import { ZoomMeeting, User } from '../types';
import { Video, Calendar, Clock, Plus, Trash2, ShieldCheck, CheckCircle2, Play, ExternalLink, X, Users, Lock, Key, Radio } from 'lucide-react';

interface ZoomMeetingViewProps {
  meetings: ZoomMeeting[];
  currentUser: User;
  onAddMeeting?: (meeting: ZoomMeeting) => void;
  onUpdateMeetingStatus?: (id: string, status: ZoomMeeting['status']) => void;
  onDeleteMeeting?: (id: string) => void;
}

export const ZoomMeetingView: React.FC<ZoomMeetingViewProps> = ({
  meetings,
  currentUser,
  onAddMeeting,
  onUpdateMeetingStatus,
  onDeleteMeeting
}) => {
  const isAdmin = currentUser.role === 'admin';

  // Modal State for Scheduling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [hostName, setHostName] = useState(currentUser.name);

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !joinUrl.trim()) return;

    const scheduledIso = scheduledDate && scheduledTime
      ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
      : new Date().toISOString();

    const newMeeting: ZoomMeeting = {
      id: `zoom-${Date.now()}`,
      title: title.trim(),
      topic: topic.trim() || 'Sesi Live Mentoring & Pembahasan Kasus Handphone',
      meetingId: meetingId.trim() || `${Math.floor(100000000 + Math.random() * 900000000)}`,
      passcode: passcode.trim() || 'SMFLASHER2026',
      joinUrl: joinUrl.trim(),
      scheduledTime: scheduledIso,
      durationMinutes: Number(durationMinutes) || 60,
      hostName: hostName.trim() || 'Instruktur Utama LPK SM Flasher',
      status: 'Akan Datang',
      createdAt: new Date().toISOString()
    };

    if (onAddMeeting) {
      onAddMeeting(newMeeting);
    }

    setIsModalOpen(false);
    // Reset
    setTitle('');
    setTopic('');
    setMeetingId('');
    setPasscode('');
    setJoinUrl('');
    setScheduledDate('');
    setScheduledTime('');
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Zoom Live Mentoring & Kelas Tatap Muka</h2>
            <p className="text-xs text-slate-400">Sesi live tanya jawab, reballing interaktif, dan persiapan sertifikasi BNSP</p>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Jadwalkan Zoom Meeting Baru</span>
          </button>
        )}
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <Video className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">Belum ada Jadwal Zoom Live Meeting</h3>
            <p className="text-xs">Jadwal meeting baru akan dipublikasikan langsung oleh Admin & Instruktur LPK SM Flasher.</p>
          </div>
        ) : (
          meetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 transition relative ${
                meeting.status === 'Sedang Berlangsung'
                  ? 'border-emerald-500/60 ring-1 ring-emerald-500/30 bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {meeting.status === 'Sedang Berlangsung' ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                        <span>SEDANG BERLANGSUNG (LIVE NOW)</span>
                      </span>
                    ) : meeting.status === 'Akan Datang' ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>AKAN DATANG</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-800 text-slate-400 border border-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SELESAI</span>
                      </span>
                    )}

                    <span className="text-xs text-slate-400">Host: <strong className="text-white">{meeting.hostName}</strong></span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mt-1">{meeting.title}</h3>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    {meeting.topic}
                  </p>
                </div>

                {isAdmin && onDeleteMeeting && (
                  <div className="flex items-center gap-2 self-start">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus jadwal meeting "${meeting.title}"?`)) {
                          onDeleteMeeting(meeting.id);
                        }
                      }}
                      className="p-2 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-xl transition"
                      title="Hapus Meeting (Admin)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Details and Join Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Waktu Pelaksanaan</span>
                    <span className="font-semibold text-white">{formatDate(meeting.scheduledTime)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-slate-300">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Meeting ID & Passcode</span>
                    <span className="font-mono text-amber-300 font-bold">ID: {meeting.meetingId} | Pass: {meeting.passcode || 'Tidak Ada'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <a
                    href={meeting.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto px-5 py-2.5 text-xs font-extrabold rounded-xl shadow transition flex items-center justify-center space-x-2 ${
                      meeting.status === 'Sedang Berlangsung'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Gabung Meeting Zoom (Siswa)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Admin Status Changer */}
              {isAdmin && onUpdateMeetingStatus && (
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl">
                  <span className="font-bold text-indigo-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ubah Status Meeting (Admin):</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateMeetingStatus(meeting.id, 'Akan Datang')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        meeting.status === 'Akan Datang'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Akan Datang
                    </button>
                    <button
                      onClick={() => onUpdateMeetingStatus(meeting.id, 'Sedang Berlangsung')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        meeting.status === 'Sedang Berlangsung'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Mulai (Live)
                    </button>
                    <button
                      onClick={() => onUpdateMeetingStatus(meeting.id, 'Selesai')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        meeting.status === 'Selesai'
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Schedule Meeting Modal (Admin) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-rose-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Khusus Instruktur / Admin</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Jadwalkan Zoom Live Meeting Baru</h3>
            <p className="text-xs text-slate-400 mb-4">Siswa dapat langsung mengklik link Zoom untuk bergabung pada jam yang ditentukan</p>

            <form onSubmit={handleScheduleMeeting} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Judul / Topik Sesi Zoom *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Live Mentoring Troubleshooting iPhone Mati Total & Reballing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Deskripsi & Pokok Bahasan</label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan materi yang akan dibahas..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Link URL Zoom Meeting (Join URL) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://zoom.us/j/1234567890?pwd=..."
                  value={joinUrl}
                  onChange={(e) => setJoinUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Meeting ID</label>
                  <input
                    type="text"
                    placeholder="891 2345 6789"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Passcode Meeting</label>
                  <input
                    type="text"
                    placeholder="SMFLASHER2026"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Tanggal *</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Jam Pelaksanaan *</label>
                  <input
                    type="time"
                    required
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nama Host / Instruktur</label>
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-xs font-bold rounded-lg shadow flex items-center space-x-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Jadwalkan Zoom Meeting</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

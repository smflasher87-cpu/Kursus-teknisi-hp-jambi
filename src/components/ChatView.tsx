import React, { useState, useRef, useEffect } from 'react';
import { User, ChatMessage } from '../types';
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  Phone,
  Video as VideoIcon,
  PhoneOff,
  Image as ImageIcon,
  FileText,
  Play,
  Pause,
  Download,
  Users,
  UserCheck,
  ShieldCheck,
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Camera,
  RotateCcw,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface ChatViewProps {
  currentUser: User;
  allUsers: User[];
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  currentUser,
  allUsers,
  messages,
  onSendMessage
}) => {
  const isAdmin = currentUser.role === 'admin';

  // Active channel: 'community' or 'private_{userId}'
  const [activeChannelId, setActiveChannelId] = useState<string>('community');
  const [textInput, setTextInput] = useState('');

  // Voice Note Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  // Audio Playback States for Voice Notes
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Call Modal States (Voice & Video Call)
  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    type: 'voice' | 'video';
    targetName: string;
    targetRole: string;
    status: 'Ringing' | 'Connected' | 'Ended';
    isMuted: boolean;
    isVideoOff: boolean;
    callSeconds: number;
  } | null>(null);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const callTimerRef = useRef<any>(null);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom when messages change or channel changes
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId]);

  // List of private chat partners for Admin view
  const studentList = allUsers.filter((u) => u.role === 'siswa');

  // Filter messages for current channel
  const channelMessages = messages.filter((m) => {
    if (activeChannelId === 'community') {
      return m.channelId === 'community';
    }
    return m.channelId === activeChannelId;
  });

  // Handle Text Send
  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      channelId: activeChannelId,
      type: 'text',
      text: textInput.trim(),
      createdAt: new Date().toISOString()
    };

    onSendMessage(newMsg);
    setTextInput('');
  };

  // Handle File / Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith('image/');
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const newMsg: ChatMessage = {
        id: `chat-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        channelId: activeChannelId,
        type: isImg ? 'image' : 'file',
        mediaUrl: base64Data,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        text: isImg ? `Mengirim gambar: ${file.name}` : `Mengirim berkas: ${file.name}`,
        createdAt: new Date().toISOString()
      };
      onSendMessage(newMsg);
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle Voice Note Recording Start
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const audioUrl = reader.result as string;
          const newMsg: ChatMessage = {
            id: `chat-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderRole: currentUser.role,
            channelId: activeChannelId,
            type: 'audio',
            mediaUrl: audioUrl,
            audioDuration: recordingSeconds || 5,
            text: 'Pesan Suara (Voice Note)',
            createdAt: new Date().toISOString()
          };
          onSendMessage(newMsg);
        };
        reader.readAsDataURL(audioBlob);

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Izin mikrofon diperlukan untuk mengirim pesan suara (voice note).');
    }
  };

  // Handle Voice Note Recording Stop & Send
  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  // Cancel Voice Recording
  const cancelVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      audioChunksRef.current = [];
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  // Audio Playback Handler
  const togglePlayAudio = (msgId: string, audioUrl?: string) => {
    if (playingAudioId === msgId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
      setPlayingAudioId(msgId);
      audio.onended = () => {
        setPlayingAudioId(null);
      };
    }
  };

  // Initiate Call (Voice or Video)
  const handleStartCall = async (type: 'voice' | 'video') => {
    const targetName =
      activeChannelId === 'community'
        ? 'Grup Komunitas SM Flasher'
        : isAdmin
        ? allUsers.find((u) => `private_${u.id}` === activeChannelId)?.name || 'Peserta'
        : 'Admin LPK SM Flasher';

    const targetRole =
      activeChannelId === 'community' ? 'Group Call' : isAdmin ? 'Peserta' : 'Instruktur Utama';

    setActiveCall({
      isOpen: true,
      type,
      targetName,
      targetRole,
      status: 'Ringing',
      isMuted: false,
      isVideoOff: false,
      callSeconds: 0
    });

    // Request Media Camera/Microphone stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video'
      });
      mediaStreamRef.current = stream;

      if (localVideoRef.current && type === 'video') {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera/Microphone stream notice:', err);
    }

    // Connect after 2.5s ringing simulation
    setTimeout(() => {
      setActiveCall((prev) => (prev ? { ...prev, status: 'Connected' } : null));

      callTimerRef.current = setInterval(() => {
        setActiveCall((prev) =>
          prev ? { ...prev, callSeconds: prev.callSeconds + 1 } : null
        );
      }, 1000);
    }, 2500);
  };

  // End Call & Log to Chat
  const handleEndCall = () => {
    if (!activeCall) return;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    clearInterval(callTimerRef.current);

    const formattedDuration = `${Math.floor(activeCall.callSeconds / 60)
      .toString()
      .padStart(2, '0')}:${(activeCall.callSeconds % 60).toString().padStart(2, '0')}`;

    // Send Call Log Message
    const callLogMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      channelId: activeChannelId,
      type: 'call_log',
      callType: activeCall.type,
      callDuration: activeCall.callSeconds > 0 ? formattedDuration : 'Tidak Terjawab',
      text: `${activeCall.type === 'video' ? 'Panggilan Video' : 'Panggilan Suara'} • ${
        activeCall.callSeconds > 0 ? `Durasi ${formattedDuration}` : 'Dibatalkan'
      }`,
      createdAt: new Date().toISOString()
    };

    onSendMessage(callLogMsg);
    setActiveCall(null);
  };

  const activeChannelName =
    activeChannelId === 'community'
      ? 'Grup Komunitas Peserta & Alumni'
      : isAdmin
      ? allUsers.find((u) => `private_${u.id}` === activeChannelId)?.name || 'Obrolan Privat'
      : 'Chat Direct Admin LPK SM Flasher';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>PUSAT OBROLAN & DUKUNGAN INTENSIP</span>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                Obrolan Peserta & Live Chat Admin
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Diskusi seputar materi hardware/software, kirim foto skematik, pesan suara (voice note), serta panggilan suara & video interaktif.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[620px]">
        {/* Left Sidebar Channels Column */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 space-y-4 bg-slate-950/60">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
            <span>Saluran Obrolan</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400 font-mono">
              Live Active
            </span>
          </div>

          <div className="space-y-2">
            {/* Community Channel Button */}
            <button
              type="button"
              onClick={() => setActiveChannelId('community')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center space-x-3 ${
                activeChannelId === 'community'
                  ? 'bg-indigo-950/80 border-indigo-500/80 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">Komunitas Siswa & Alumni</span>
                  <span className="text-[9px] text-indigo-400 font-extrabold uppercase bg-indigo-500/20 px-1.5 py-0.5 rounded">
                    Publik
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Grup utama diskusi pengerjaan kasus HP
                </p>
              </div>
            </button>

            {/* Private Admin / Student Channels */}
            {!isAdmin ? (
              <button
                type="button"
                onClick={() => setActiveChannelId(`private_${currentUser.id}`)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center space-x-3 ${
                  activeChannelId === `private_${currentUser.id}`
                    ? 'bg-indigo-950/80 border-indigo-500/80 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">Chat Privat Admin</span>
                    <span className="text-[9px] text-emerald-400 font-extrabold uppercase bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      Privat
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    Konsultasi langsung dengan Instruktur Utama
                  </p>
                </div>
              </button>
            ) : (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 px-2 block">
                  Daftar Chat Privat Peserta ({studentList.length})
                </span>

                {studentList.map((student) => {
                  const channelKey = `private_${student.id}`;
                  const isSelected = activeChannelId === channelKey;

                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => setActiveChannelId(channelKey)}
                      className={`w-full p-2.5 rounded-xl border text-left transition flex items-center space-x-2.5 ${
                        isSelected
                          ? 'bg-indigo-950/80 border-indigo-500/80 shadow'
                          : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{student.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{student.classProgram}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Active Chat Conversation Area Column */}
        <div className="lg:col-span-8 flex flex-col h-full bg-slate-900">
          {/* Chat Room Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                  <span>{activeChannelName}</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  {activeChannelId === 'community'
                    ? 'Terhubung dengan semua siswa & instruktur'
                    : 'Ruang obrolan privat aman'}
                </p>
              </div>
            </div>

            {/* Voice & Video Call Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleStartCall('voice')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Panggilan Suara</span>
              </button>

              <button
                type="button"
                onClick={() => handleStartCall('video')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Panggilan Video</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Feed Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[480px]">
            {channelMessages.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs space-y-2">
                <p>Belum ada pesan pada obrolan ini.</p>
                <p className="text-[11px] text-slate-600">
                  Ketik pesan pertama, kirim gambar skematik, atau rekaman suara di bawah ini!
                </p>
              </div>
            ) : (
              channelMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
                      <span className="font-bold text-slate-300">{msg.senderName}</span>
                      {msg.senderRole === 'admin' && (
                        <span className="bg-indigo-500/20 text-indigo-300 font-extrabold px-1.5 py-0.2 rounded border border-indigo-500/30">
                          Instruktur
                        </span>
                      )}
                      <span>•</span>
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Message Bubble Box */}
                    <div
                      className={`p-3 rounded-2xl max-w-sm sm:max-w-md text-xs space-y-2 shadow-md ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                      }`}
                    >
                      {/* Text Content */}
                      {msg.text && msg.type !== 'call_log' && (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      )}

                      {/* Image Message */}
                      {msg.type === 'image' && msg.mediaUrl && (
                        <div className="space-y-1.5">
                          <img
                            src={msg.mediaUrl}
                            alt={msg.fileName || 'Gambar Chat'}
                            className="w-full max-h-56 object-cover rounded-xl border border-black/20"
                          />
                          {msg.fileName && (
                            <p className="text-[10px] opacity-80 font-mono truncate">{msg.fileName}</p>
                          )}
                        </div>
                      )}

                      {/* File Message */}
                      {msg.type === 'file' && (
                        <div className="flex items-center space-x-3 bg-black/20 p-2.5 rounded-xl border border-white/10">
                          <FileText className="w-6 h-6 text-indigo-300 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs truncate">{msg.fileName || 'Berkas'}</p>
                            <p className="text-[10px] opacity-75">{msg.fileSize || 'Dokumen'}</p>
                          </div>
                          {msg.mediaUrl && (
                            <a
                              href={msg.mediaUrl}
                              download={msg.fileName || 'file'}
                              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Audio / Voice Note Message */}
                      {msg.type === 'audio' && (
                        <div className="flex items-center space-x-3 bg-black/25 p-2.5 rounded-xl border border-white/10 min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => togglePlayAudio(msg.id, msg.mediaUrl)}
                            className="w-9 h-9 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center shrink-0 shadow transition"
                          >
                            {playingAudioId === msg.id ? (
                              <Pause className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-[10px] opacity-90">
                              <span className="font-bold uppercase tracking-wider">Voice Note</span>
                              <span className="font-mono">
                                00:{msg.audioDuration ? msg.audioDuration.toString().padStart(2, '0') : '05'}
                              </span>
                            </div>
                            {/* Audio Wave Visualizer Simulation */}
                            <div className="flex items-center space-x-0.5 h-3">
                              {[40, 70, 30, 90, 60, 100, 50, 80, 40, 60, 80, 30, 90, 50].map((h, i) => (
                                <div
                                  key={i}
                                  style={{ height: `${h}%` }}
                                  className={`w-1 rounded-full ${
                                    playingAudioId === msg.id ? 'bg-indigo-300 animate-pulse' : 'bg-white/40'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Call Log Message */}
                      {msg.type === 'call_log' && (
                        <div className="flex items-center space-x-2 text-xs py-1">
                          {msg.callType === 'video' ? (
                            <VideoIcon className="w-4 h-4 text-indigo-300" />
                          ) : (
                            <Phone className="w-4 h-4 text-emerald-400" />
                          )}
                          <span className="font-bold">{msg.text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Chat Input Form Bar */}
          <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90 space-y-2">
            {/* Recording Status Bar */}
            {isRecording && (
              <div className="flex items-center justify-between bg-red-950/80 border border-red-500/40 p-2.5 rounded-xl text-red-200 text-xs animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold">Merekam Pesan Suara... ({recordingSeconds}s)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={cancelVoiceRecording}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[11px] font-bold flex items-center space-x-1 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Voice Note</span>
                  </button>
                </div>
              </div>
            )}

            {!isRecording && (
              <form onSubmit={handleSendText} className="flex items-center gap-2">
                {/* File / Image Attachment Button */}
                <label className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer transition shrink-0 border border-slate-700">
                  <Paperclip className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*,.pdf,.zip,.rar,.bin"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>

                {/* Voice Note Record Button */}
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  title="Rekam Pesan Suara (Voice Note)"
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-xl transition shrink-0 border border-slate-700"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Text Message Input Field */}
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Ketik pesan obrolan atau pertanyaan Anda..."
                  className="flex-1 py-2.5 px-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl transition shrink-0 shadow-lg shadow-indigo-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Voice / Video Call Modal */}
      {activeCall && activeCall.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg text-center space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Close Button */}
            <button
              onClick={handleEndCall}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {activeCall.type === 'video' ? 'PANGGILAN VIDEO LIVE' : 'PANGGILAN SUARA LIVE'}
              </span>
              <h2 className="text-xl font-extrabold text-white pt-2">{activeCall.targetName}</h2>
              <p className="text-xs text-slate-400">{activeCall.targetRole}</p>
            </div>

            {/* Video Call Live Preview / Audio Visualizer Box */}
            <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
              {activeCall.type === 'video' && !activeCall.isVideoOff ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-indigo-600/30 border-2 border-indigo-500 flex items-center justify-center text-indigo-300 text-2xl font-extrabold shadow-lg">
                    {activeCall.targetName.charAt(0)}
                  </div>
                  {activeCall.status === 'Connected' && (
                    <div className="flex items-center space-x-1 h-6">
                      {[30, 80, 40, 100, 60, 90, 50, 70].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-1.5 bg-indigo-500 rounded-full animate-bounce"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Call Status Overlay Tag */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-emerald-400 font-bold flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  {activeCall.status === 'Ringing'
                    ? 'Menghubungkan...'
                    : `Tersambung ${Math.floor(activeCall.callSeconds / 60)
                        .toString()
                        .padStart(2, '0')}:${(activeCall.callSeconds % 60)
                        .toString()
                        .padStart(2, '0')}`}
                </span>
              </div>
            </div>

            {/* Call Control Buttons Bar */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {/* Mute Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveCall((prev) => (prev ? { ...prev, isMuted: !prev.isMuted } : null))
                }
                className={`p-4 rounded-2xl transition shadow-lg ${
                  activeCall.isMuted
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {activeCall.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {/* Toggle Video Button (For Video Call) */}
              {activeCall.type === 'video' && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveCall((prev) => (prev ? { ...prev, isVideoOff: !prev.isVideoOff } : null))
                  }
                  className={`p-4 rounded-2xl transition shadow-lg ${
                    activeCall.isVideoOff
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <Camera className="w-6 h-6" />
                </button>
              )}

              {/* End Call Button */}
              <button
                type="button"
                onClick={handleEndCall}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl shadow-xl transition flex items-center space-x-2 px-6"
              >
                <PhoneOff className="w-6 h-6" />
                <span className="font-extrabold text-xs">Tutup Panggilan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

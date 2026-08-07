import React, { useState, useRef, useEffect } from 'react';
import { User, ChatMessage } from '../types';
import { playChatNotificationSound } from '../utils/audio';
import {
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Image as ImageIcon,
  Play,
  Pause,
  ShieldCheck,
  UserCheck,
  Volume2,
  Download,
  Users,
  Circle
} from 'lucide-react';

interface FloatingChatWidgetProps {
  currentUser: User;
  allUsers: User[];
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  currentUser,
  allUsers,
  messages,
  onSendMessage
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannelId, setActiveChannelId] = useState<string>('community');
  const [textInput, setTextInput] = useState('');

  // Voice Note Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  // Audio Playback
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeChannelId, isOpen]);

  // Online Users (Simulated active status for participants and admins)
  const onlineUsers = allUsers.filter((u) => u.status === 'Aktif');

  // Filter messages for current active channel
  const channelMessages = messages.filter((m) => {
    if (activeChannelId === 'community') {
      return m.channelId === 'community';
    }
    return m.channelId === activeChannelId;
  });

  const handleSend = (e?: React.FormEvent) => {
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
    playChatNotificationSound();
  };

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
        text: isImg ? `Mengirim gambar: ${file.name}` : `Mengirim file: ${file.name}`,
        createdAt: new Date().toISOString()
      };
      onSendMessage(newMsg);
      playChatNotificationSound();
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
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
          playChatNotificationSound();
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Izin mikrofon diperlukan untuk merekam voice note.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  const togglePlayAudio = (msgId: string, audioUrl?: string) => {
    if (playingAudioId === msgId) {
      if (audioRef.current) audioRef.current.pause();
      setPlayingAudioId(null);
      return;
    }
    if (audioRef.current) audioRef.current.pause();

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
      setPlayingAudioId(msgId);
      audio.onended = () => setPlayingAudioId(null);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto font-sans">
      {/* Floating Chat Box Popup Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-fadeIn">
          {/* Top Bar Header */}
          <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 -right-0.5" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white flex items-center space-x-1">
                  <span>Obrolan & Chat Admin</span>
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>{onlineUsers.length} Peserta & Admin Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Minimize Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Channel Selector Tabs */}
          <div className="flex border-b border-slate-800/80 bg-slate-950/60 p-1">
            <button
              onClick={() => setActiveChannelId('community')}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center space-x-1 ${
                activeChannelId === 'community'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Grup Komunitas</span>
            </button>

            {isAdmin ? (
              <select
                value={activeChannelId}
                onChange={(e) => setActiveChannelId(e.target.value)}
                className="flex-1 py-1 px-2 text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-200 rounded-lg"
              >
                <option value="community">Grup Komunitas</option>
                {allUsers
                  .filter((u) => u.role === 'siswa')
                  .map((s) => (
                    <option key={s.id} value={`private_${s.id}`}>
                      Private: {s.name} (Online)
                    </option>
                  ))}
              </select>
            ) : (
              <button
                onClick={() => setActiveChannelId(`private_${currentUser.id}`)}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition flex items-center justify-center space-x-1 ${
                  activeChannelId !== 'community'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Private Admin</span>
              </button>
            )}
          </div>

          {/* Online Participants Bar */}
          <div className="px-3 py-1.5 bg-slate-950/40 border-b border-slate-800/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Online:</span>
            {onlineUsers.map((u) => (
              <div
                key={u.id}
                className="inline-flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded-full text-[10px] text-slate-300 shrink-0 border border-slate-700/50"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="truncate max-w-[80px]">{u.name}</span>
              </div>
            ))}
          </div>

          {/* Message Thread Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-900/50">
            {channelMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500 space-y-2">
                <MessageSquare className="w-8 h-8 opacity-40 text-indigo-400" />
                <p className="text-xs">Belum ada obrolan. Kirim pesan pertama Anda ke Admin atau Komunitas!</p>
              </div>
            ) : (
              channelMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const isSenderAdmin = msg.senderRole === 'admin';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fadeIn`}
                  >
                    <div className="flex items-center space-x-1 mb-0.5">
                      <span className="text-[10px] font-extrabold text-slate-400">{msg.senderName}</span>
                      {isSenderAdmin && (
                        <span className="bg-indigo-500/20 text-indigo-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-indigo-500/30">
                          Admin
                        </span>
                      )}
                      <span className="text-[9px] text-slate-500">{formatTime(msg.createdAt)}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : isSenderAdmin
                          ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                          : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}
                    >
                      {msg.type === 'text' && <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>}

                      {msg.type === 'image' && (
                        <div className="space-y-1">
                          <img
                            src={msg.mediaUrl}
                            alt="attachment"
                            className="rounded-lg max-h-40 w-full object-cover border border-slate-700 cursor-pointer"
                            onClick={() => msg.mediaUrl && window.open(msg.mediaUrl, '_blank')}
                          />
                          {msg.text && <p className="text-[10px] opacity-80 mt-1">{msg.text}</p>}
                        </div>
                      )}

                      {msg.type === 'file' && (
                        <a
                          href={msg.mediaUrl}
                          download={msg.fileName}
                          className="flex items-center space-x-2 bg-slate-950/60 p-2 rounded-lg border border-slate-700/50 text-xs font-semibold"
                        >
                          <Download className="w-4 h-4 text-indigo-400 shrink-0" />
                          <div className="truncate">
                            <p className="truncate text-white">{msg.fileName}</p>
                            <span className="text-[9px] text-slate-400">{msg.fileSize}</span>
                          </div>
                        </a>
                      )}

                      {msg.type === 'audio' && (
                        <div className="flex items-center space-x-2 py-0.5">
                          <button
                            onClick={() => togglePlayAudio(msg.id, msg.mediaUrl)}
                            className="p-2 bg-indigo-500/30 hover:bg-indigo-500/50 rounded-full text-white transition shrink-0"
                          >
                            {playingAudioId === msg.id ? (
                              <Pause className="w-3.5 h-3.5" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-indigo-400 transition-all ${
                                  playingAudioId === msg.id ? 'w-full duration-[5000ms]' : 'w-0'
                                }`}
                              />
                            </div>
                            <span className="text-[9px] text-slate-300 block mt-1">
                              Voice Note ({msg.audioDuration || 5}s)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800">
            {isRecording ? (
              <div className="flex items-center justify-between bg-rose-500/10 border border-rose-500/30 p-2 rounded-xl text-xs text-rose-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-mono font-bold">Merekam Voice Note... ({recordingSeconds}s)</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs"
                >
                  Kirim Voice
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="flex items-center space-x-1.5">
                <label className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg cursor-pointer border border-slate-800">
                  <Paperclip className="w-4 h-4" />
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={startRecording}
                  className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-900 rounded-lg border border-slate-800 transition"
                  title="Kirim Pesan Suara"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />

                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Bottom-Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-full shadow-2xl border border-indigo-400/40 hover:scale-105 transition duration-200"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-900 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <span className="text-xs tracking-wide">Obrolan & Chat Admin</span>

        {/* Pulse Aura Ring */}
        <span className="absolute -inset-1 rounded-full bg-indigo-500/20 blur-sm pointer-events-none group-hover:bg-indigo-500/40 transition" />
      </button>
    </div>
  );
};

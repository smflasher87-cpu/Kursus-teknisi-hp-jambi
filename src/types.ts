export type UserRole = 'admin' | 'siswa';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  classProgram: string;
  status: 'Aktif' | 'Nonaktif';
  createdAt: string;
  lastLogin?: string;
  customCertificateUrl?: string; // Admin uploaded custom certificate link
}

export interface Video {
  id: string;
  title: string;
  category: string; // e.g., 'Android Hardware', 'iPhone Hardware', 'Android Software', 'iPhone Software'
  deviceType: 'Android' | 'iPhone' | 'Umum';
  moduleType: 'Hardware' | 'Software' | 'Umum';
  level: 'Basic' | 'Expert' | 'Semua Level';
  videoUrl: string;
  duration: string;
  description: string;
  pdfFileName?: string;
  pdfTitle?: string;
  pdfContent?: string;
  tags: string[];
  addedBy: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  completedVideoIds: string[];
  lastWatchedVideoId?: string;
  updatedAt: string;
}

export interface VideoNote {
  videoId: string;
  userId: string;
  text: string;
  updatedAt: string;
}

export interface Registration {
  id: string;
  fullName: string;
  birthPlaceDate: string;
  address: string;
  ktpNumber: string;
  ktpPhotoUrl?: string;
  whatsappNumber: string;
  selfiePhotoUrl?: string;
  paymentProofUrl?: string;
  selectedClass: string;
  classFee: number;
  status: 'Menunggu Verifikasi' | 'Disetujui' | 'Ditolak';
  createdAt: string;
}

export interface Alumni {
  id: string;
  name: string;
  classProgram: string;
  batchYear: string;
  phone: string;
  address: string;
  workplaceOrBusiness: string;
  photoUrl: string;
  testimonial?: string;
}

export interface CasePostComment {
  id: string;
  authorName: string;
  authorRole: string;
  text: string;
  createdAt: string;
}

export interface CasePost {
  id: string;
  authorId: string;
  authorName: string;
  deviceType: 'Android' | 'iPhone';
  deviceModel: string;
  symptoms: string;
  solutionText?: string;
  isSolved: boolean;
  photoUrl?: string;
  createdAt: string;
  likesCount: number;
  comments: CasePostComment[];
}

export interface JobOpening {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salaryRange: string;
  type: 'Lowongan Kerja' | 'Program Magang';
  description: string;
  requirements: string[];
  contactPersonPhone: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  whatsappNumber: string;
  experienceLevel: string;
  cvNotes: string;
  status: 'Terkirim' | 'Diproses';
  createdAt: string;
}

export interface ToolRequest {
  id: string;
  studentName: string;
  whatsappNumber: string;
  requestType: 'Request Skematik / Firmware' | 'Sewa Alat Teknisi';
  itemDetails: string;
  notes?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Ujian BNSP' | 'Jadwal Kelas' | 'Penting' | 'General';
  content: string;
  date: string;
  author: string;
  isPinned?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'foto' | 'video';
  url: string;
  category: 'Suasana Kelas' | 'Praktek Reballing' | 'Sertifikasi BNSP' | 'Kelulusan';
  description?: string;
  date: string;
}

export interface InstitutionProfile {
  name: string;
  legalCompany: string;
  skKemenkumham: string;
  vinKemnaker: string;
  bnspCertification: string;
  nib: string;
  aboutText: string;
  vision: string;
  mission: string[];
  headOfficeAddress: string;
  contactPhone: string;
  contactEmail: string;
  logoUrl?: string;
  orgStructure: {
    pembina: string;
    direkturUtama: string;
    headInstructor: string;
    adminPelatihan: string;
    kepalaLabHardware: string;
    kepalaLabSoftware: string;
  };
}

export interface AdminSettings {
  whatsappAdmin: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  logoUrl: string;
  classFees: {
    androidBasic: number;
    androidExpert: number;
    iphoneBasic: number;
    iphoneExpert: number;
  };
}

export interface PartCompatibleItem {
  id: string;
  componentCode: string;
  componentName: string;
  category: 'IC Power' | 'IC Charger' | 'IC RF / Transceiver' | 'IC PA' | 'IC Audio' | 'IC WiFi / BT' | 'IC Display & Backlight' | 'CPU / Memory' | 'Komponen Lain';
  compatibleDevices: string[];
  crossCompatibilityNotes: string;
  pinCountOrPackage?: string;
  functionDescription: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'siswa';
  channelId: string; // 'community' or 'private_{userId}'
  type: 'text' | 'image' | 'file' | 'audio' | 'call_log';
  text?: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  audioDuration?: number; // seconds
  callType?: 'voice' | 'video';
  callDuration?: string;
  createdAt: string;
}

export interface FreeToolSoftware {
  id: string;
  title: string;
  category: 'Flashing Tool' | 'Unlocking / FRP' | 'Driver' | 'Firmware Tool' | 'Diagram / Pinout' | 'Lainnya';
  version?: string;
  fileSize?: string;
  description: string;
  downloadUrl: string;
  postedBy: string;
  createdAt: string;
}

export interface ZoomMeeting {
  id: string;
  title: string;
  topic: string;
  meetingId: string;
  passcode?: string;
  joinUrl: string;
  scheduledTime: string;
  durationMinutes: number;
  hostName: string;
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
  createdAt: string;
}


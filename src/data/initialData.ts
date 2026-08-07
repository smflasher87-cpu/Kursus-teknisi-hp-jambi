import {
  User,
  Video,
  Alumni,
  CasePost,
  JobOpening,
  Announcement,
  GalleryItem,
  InstitutionProfile,
  AdminSettings,
  Registration,
  ChatMessage,
  PartCompatibleItem,
  FreeToolSoftware,
  ZoomMeeting
} from '../types';

export const INITIAL_PROGRESS = [
  {
    userId: 'usr-siswa-1',
    completedVideoIds: ['vid-and-sw-01', 'vid-and-hw-01']
  },
  {
    userId: 'usr-siswa-2',
    completedVideoIds: ['vid-iph-hw-01']
  },
  {
    userId: 'usr-siswa-5',
    completedVideoIds: ['vid-and-sw-01']
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-101',
    fullName: 'Rizky Pratama',
    birthPlaceDate: 'Jakarta, 14 Juni 1999',
    address: 'Jl. Merdeka No. 45, Jakarta Selatan',
    ktpNumber: '3174011406990002',
    whatsappNumber: '081298765432',
    selectedClass: 'Android Expert & Reballing BGA',
    classFee: 6500000,
    status: 'Disetujui',
    createdAt: '2026-08-01T08:00:00Z'
  }
];

export const INITIAL_ADMIN_SETTINGS: AdminSettings = {
  whatsappAdmin: '081368838003',
  bankName: 'Bank BCA',
  bankAccountName: 'Marsuki',
  bankAccountNumber: '8190870716',
  logoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
  classFees: {
    androidBasic: 4500000,
    androidExpert: 6500000,
    iphoneBasic: 10000000,
    iphoneExpert: 16000000
  }
};

export const INITIAL_INSTITUTION_PROFILE: InstitutionProfile = {
  name: 'Lembaga Pelatihan Kerja (LPK)',
  legalCompany: 'PT. SM Flasher Training Centre',
  skKemenkumham: 'AHU-0034819.AH.01.01.Tahun 2024',
  vinKemnaker: '2408317401',
  bnspCertification: 'NO. REG. LPK-SMF/BNSP/2024',
  nib: '2808240019284',
  aboutText: 'LPK PT. SM Flasher Training Centre adalah lembaga pendidikan non-formal terakreditasi yang berfokus pada melatih calon teknisi handphone profesional dan mencetak wirausaha mandiri di bidang reparasi telepon seluler Android dan iPhone dari tingkat dasar hingga mahir (Basic to Expert).',
  vision: 'Menjadi Pusat Pelatihan Teknisi Telepon Seluler Terbaik dan Terpercaya di Indonesia yang Mencetak Tenaga Kerja Kompeten Berstandar Nasional BNSP.',
  mission: [
    'Menyelenggarakan pelatihan kurikulum terpadu berbasis praktek langsung 80% dan teori 20%.',
    'Menyediakan fasilitas lab hardware dan software modern sesuai perkembangan teknologi smarthphone terbaru.',
    'Bimbingan pasca pelatihan seumur hidup (Lifetime Mentoring) melalui forum komunitas alumni.',
    'Memfasilitasi uji kompetensi teknisi berlisensi resmi BNSP.'
  ],
  headOfficeAddress: 'Jln. Marsda Surya Dharma No.23 RT.39 Kenali Asam Bawah Kec. Kota Baru Kota Jambi Propinsi Jambi 36128',
  contactPhone: '081368838003',
  contactEmail: 'smflasher87@gmail.com',
  logoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
  orgStructure: {
    pembina: 'H. Suherman, S.T., M.Kom',
    direkturUtama: 'Marsuki (Founder SM Flasher)',
    headInstructor: 'Master Budi Raharjo, S.T.',
    adminPelatihan: 'Siti Aminah, A.Md.',
    kepalaLabHardware: 'Rahmat Hidayat (Expert Reballing)',
    kepalaLabSoftware: 'Andi Wijaya (UFS & eMMC Specialist)'
  }
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-1',
    username: 'admin',
    passwordHash: 'admin123',
    name: 'Administrator LPK SM Flasher',
    role: 'admin',
    classProgram: 'Pusat Instruktur & Manajemen',
    status: 'Aktif',
    createdAt: '2026-01-01T00:00:00Z',
    lastLogin: '2026-08-06T00:00:00Z'
  },
  {
    id: 'usr-siswa-1',
    username: 'budi.teknisi',
    passwordHash: 'siswa123',
    name: 'Budi Santoso',
    role: 'siswa',
    classProgram: 'Android Expert & Reballing',
    status: 'Aktif',
    createdAt: '2026-02-15T10:00:00Z',
    lastLogin: '2026-08-05T14:30:00Z'
  },
  {
    id: 'usr-siswa-2',
    username: 'dian.iphone',
    passwordHash: 'siswa123',
    name: 'Dian Permana',
    role: 'siswa',
    classProgram: 'iPhone Hardware & Board Repair',
    status: 'Aktif',
    createdAt: '2026-03-01T08:00:00Z',
    lastLogin: '2026-08-04T18:20:00Z'
  },
  {
    id: 'usr-siswa-5',
    username: 'Marsuki',
    passwordHash: 'Klinikhp2018',
    name: 'Marsuki (Siswa Teknisi)',
    role: 'siswa',
    classProgram: 'Pelatihan Teknisi HP Android & iPhone',
    status: 'Aktif',
    createdAt: '2026-08-06T00:00:00Z',
    lastLogin: '2026-08-06T00:00:00Z'
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid-and-sw-01',
    title: 'Flashing Firmware Android Xiaomi, Samsung & OPPO via UFI Box & QPST',
    category: 'Android Software',
    deviceType: 'Android',
    moduleType: 'Software',
    level: 'Basic',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '22:15',
    description: 'Panduan lengkap langkah demi langkah flashing ulang OS Android yang bootloop, mentok logo, atau terkunci akun Google FRP.',
    pdfFileName: 'Modul_01_SOP_Flashing_Android_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan SOP Flashing & Repair Firmware Android',
    pdfContent: `SOP FLASHING FIRMWARE ANDROID LPK SM FLASHER:

1. CARA MASUK MODE DOWNLOAD / EDL 9008:
   - Xiaomi: Gunakan Testpoint kuis atau kombinasi kabel EDL.
   - Samsung: Tahan Volume Up + Volume Down lalu tancapkan kabel USB.
   - OPPO / Realme: Gunakan MediaTek Broom Mode (Tahan Vol Up + Down).

2. LANGKAH PENGERJAAN:
   - Buka Tool UFI / QPST / Odin.
   - Load File Rawprogram0.xml dan Patch0.xml.
   - Pastikan driver Qualcomm HS-USB QDLoader 9008 terdeteksi bersih di Device Manager.
   - Klik Flash dan tunggu hingga indikator berubah warna Hijau (PASS).`,
    tags: ['Flashing', 'Android Software', 'EDL 9008', 'FRP Unlock', 'Firmware'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-02-10T09:00:00Z'
  },
  {
    id: 'vid-and-hw-01',
    title: 'Teknik Reballing IC Power & IC CPU Qualcomm Snapdragon Tanpa Bubble',
    category: 'Android Hardware',
    deviceType: 'Android',
    moduleType: 'Hardware',
    level: 'Expert',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '35:40',
    description: 'Tutorial cetak kaki IC BGA (Reballing) dengan cetakan stencil presisi, pengaturan suhu blower Quick 861DW 340°C, dan penggunaan timah pasta 183°C.',
    pdfFileName: 'Modul_02_SOP_Reballing_IC_BGA_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan Teknis Reballing IC BGA & Blower Hot Air',
    pdfContent: `SOP REBALLING IC BGA LPK SM FLASHER:

1. PERSIAPAN ALAT:
   - Blower Quick 861DW (Setelan Suhu 340°C - 350°C, Angin 3.5).
   - Timah Pasta Relife / Mechanic 183°C.
   - Cetakan Stencil BGA Presisi Tinggi.

2. LANGKAH REBALLING:
   - Bersihkan sisa timah pada IC menggunakan solder wick dan flux Amtech.
   - Pasangkan IC pada stencil, kunci dengan penjepit.
   - Oleskan timah pasta secara merata menggunakan spatula mikro.
   - Blower dari jarak 3cm secara memutar hingga timah membentuk bola sempurna.`,
    tags: ['Reballing', 'Android Hardware', 'IC Power', 'CPU', 'BGA Stencil'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-02-12T14:30:00Z'
  },
  {
    id: 'vid-iph-hw-01',
    title: 'Anatomi Motherboard Double Layer iPhone 11 / 12 / 13 Pro Separasi Interposer',
    category: 'iPhone Hardware',
    deviceType: 'iPhone',
    moduleType: 'Hardware',
    level: 'Expert',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '42:10',
    description: 'Praktek memisahkan mesin atas dan bawah (Double Layer Board) iPhone menggunakan Heating Station Sugon 8620, pembersihan timah low-temp, dan jumper jalur VDD_MAIN.',
    pdfFileName: 'Modul_03_SOP_Separasi_Interposer_iPhone_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan Separasi & Reballing Double Layer Board iPhone',
    pdfContent: `SOP SEPARASI INTERPOSER IPHONE LPK SM FLASHER:

1. PERSIAPAN HEATING PLATFORM:
   - Atur suhu Heating Station pada 180°C - 200°C.
   - Letakkan pcb mesin iPhone presisi pada mould.

2. PROSEDUR ANGKAT BOARD ATAS:
   - Tunggu timah interposer meleleh (sekitar 2-3 menit).
   - Angkat mesin layer atas dengan pinset secara tegak lurus tanpa paksaan.
   - Ukur hambatan dalam mode Diode Multimeter pada jalur VDD_MAIN dan VDD_BOOST.`,
    tags: ['iPhone Hardware', 'Double Layer', 'Interposer', 'Heating Station', 'VDD_MAIN'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-02-18T11:00:00Z'
  },
  {
    id: 'vid-iph-sw-01',
    title: 'Bypass DFU Mode, Recovery 3uTools, & iTunes Error Code Solution',
    category: 'iPhone Software',
    deviceType: 'iPhone',
    moduleType: 'Software',
    level: 'Basic',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '18:50',
    description: 'Solusi mengatasi error flashing iTunes (Error 4013, Error 9, Error 14) serta restore firmware iOS bersih via 3uTools.',
    pdfFileName: 'Modul_04_SOP_Flashing_iOS_3uTools_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan Analisis Kode Error Restore iTunes & 3uTools',
    pdfContent: `ANALISIS KODE ERROR RESTORE ITUNES & 3UTOOLS:

1. ERROR 4013 / 4014:
   - Kerusakan jalur data NAND Flash, IC Audio, atau kabel Flex charging/Front Sensor short.

2. ERROR 9:
   - Jalur I2C / SPI antara CPU dan NAND terputus. Periksa Resistor R0805.

3. ERROR 14:
   - Memori NAND penuh atau file IPSW corrupt. Gunakan mode Fix Flash di 3uTools.`,
    tags: ['iPhone Software', '3uTools', 'DFU Mode', 'Error 4013', 'iOS Restore'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-02-22T16:15:00Z'
  },
  {
    id: 'vid-and-sw-02',
    title: 'Direct eMMC / UFS Repartition & Repair Bad Sector via UFI Box',
    category: 'Android Software',
    deviceType: 'Android',
    moduleType: 'Software',
    level: 'Expert',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '31:05',
    description: 'Teknik solder kawat jumper Direct ISP (CMD, CLK, DATA0, VCC, VCCQ) ke board untuk membenahi kesehatan IC eMMC/UFS yang 90% reserved block.',
    pdfFileName: 'Modul_05_SOP_Direct_ISP_eMMC_UFI_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan Jumper Direct ISP eMMC UFI Box',
    pdfContent: `SOP DIRECT ISP EMMC UFI BOX LPK SM FLASHER:

1. PINOUT JUMPER DIRECT ISP:
   - CMD, CLK, DATA0, VCC (3.3V), VCCQ (1.8V), GND.
   - Gunakan kawat enameled 0.01mm dan mikroskop stereo.

2. PROSEDUR REPARTITION:
   - Buka UFI eMMC Tool.
   - Klik Identify eMMC, pastikan chip terdeteksi.
   - Lakukan Factory Reset & Resize Userarea.
   - Tulis ulang Dump File Boot1, Boot2, extCSD, dan Userarea.`,
    tags: ['eMMC', 'UFS', 'Direct ISP', 'UFI Box', 'Android Repair'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-02-25T10:00:00Z'
  },
  {
    id: 'vid-and-hw-03',
    title: 'Ganti Kaca LCD Glass OCA Laminating & Separator Machine Manual',
    category: 'Android Hardware',
    deviceType: 'Android',
    moduleType: 'Hardware',
    level: 'Basic',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '27:30',
    description: 'Prosedur memisahkan kaca LCD pecah menggunakan kawat pemisah kawat molybdenum 0.03mm dan vakum separator serta laminating OCA tanpa gelembung.',
    pdfFileName: 'Modul_06_SOP_Ganti_Kaca_LCD_OCA_SM_Flasher.pdf',
    pdfTitle: 'Buku Panduan Pengoperasian Mesin Separator & OCA Laminator',
    pdfContent: `SOP GANTI KACA LCD OCA LPK SM FLASHER:

1. SUHU SEPARATOR:
   - Atur suhu meja separator vakum pada 80°C - 90°C.
   - Biarkan LCD menempel selama 1-2 menit hingga lem OCA melunak.

2. TEKNIK KAWAT PEMISAH:
   - Masukkan kawat molybdenum dari sudut atas LCD secara rata.
   - Tarik kawat selang-seling kiri dan kanan sambil menekan ke arah kaca luar.
   - Bersihkan sisa lem dengan cairan remover 8333.`,
    tags: ['LCD Repair', 'OCA Laminating', 'Glass Separator', 'AMOLED', 'Debubble'],
    addedBy: 'Master Teknisi SM FLASHER',
    createdAt: '2026-03-01T15:45:00Z'
  }
];

export const INITIAL_ALUMNI: Alumni[] = [
  {
    id: 'alm-1',
    name: 'Rahmat Hidayat',
    classProgram: 'Android & iPhone Expert Class',
    batchYear: 'Angkatan 2024',
    phone: '081298765432',
    address: 'Kota Bandung, Jawa Barat',
    workplaceOrBusiness: 'Owner "Flasher Cell Service HP Center"',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    testimonial: 'Pelatihan di LPK SM Flasher membuka jalan saya membuka toko service sendiri. Pengajaran reballing CPU & bypass eMMC sangat praktis!'
  },
  {
    id: 'alm-2',
    name: 'Andi Saputra',
    classProgram: 'iPhone Hardware Specialist',
    batchYear: 'Angkatan 2025',
    phone: '082134567890',
    address: 'Jakarta Selatan, DKI Jakarta',
    workplaceOrBusiness: 'Head Technician di iHospital Repair',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    testimonial: 'SOP interposer iPhone & Face ID dari Master Marsuki sangat akurat. Langsung bisa diterapkan di tempat kerja.'
  }
];

export const INITIAL_CASE_POSTS: CasePost[] = [
  {
    id: 'case-1',
    authorId: 'usr-siswa-1',
    authorName: 'Budi Santoso',
    deviceType: 'Android',
    deviceModel: 'Xiaomi Redmi Note 10 Pro',
    symptoms: 'HP mati total tiba-tiba setelah diisi daya. Dicolok USB Tester arus hanya 0.01A diam.',
    solutionText: 'Ternyata kapasitor C201 pada jalur VPH_PWR short ke ground dekat IC Charger PM6150L. Setelah dicongkel, HP langsung menyala normal!',
    isSolved: true,
    photoUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-08-04T10:00:00Z',
    likesCount: 12,
    comments: [
      {
        id: 'c-1',
        authorName: 'Marsuki (Instruktur)',
        authorRole: 'admin',
        text: 'Mantap Budi! Penanganan short VPH_PWR yang sangat tepat. Selalu ukur Diode mode sebelum ganti IC.',
        createdAt: '2026-08-04T11:15:00Z'
      }
    ]
  },
  {
    id: 'case-2',
    authorId: 'usr-siswa-2',
    authorName: 'Dian Permana',
    deviceType: 'iPhone',
    deviceModel: 'iPhone 11 Pro',
    symptoms: 'Sinyal Searching / No Service terus menerus. Baseband Firmware di Settings Kosong.',
    solutionText: 'Separasi Interposer board, reballing IC Baseband Qualcomm & ganti resistor R0805 jalur I2C0.',
    isSolved: true,
    photoUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-08-05T14:20:00Z',
    likesCount: 8,
    comments: []
  }
];

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Teknisi Senior Hardware iPhone & Android',
    companyName: 'PT. Global Smartphone Repair Center',
    location: 'Jakarta Pusat',
    salaryRange: 'Rp 6.000.000 - Rp 9.000.000 / Bulan',
    type: 'Lowongan Kerja',
    description: 'Dibutuhkan teknisi berpengalaman yang menguasai reballing IC, pengerjaan double layer board iPhone, dan pembacaan skematik Borneo.',
    requirements: [
      'Alumni LPK SM Flasher (Sertifikat BNSP nilai tambah)',
      'Menguasai Blower, Solder Mikroskoping, & Multimeter',
      'Jujur, teliti, & berdedikasi tinggi'
    ],
    contactPersonPhone: '081368838003',
    createdAt: '2026-08-01T09:00:00Z'
  },
  {
    id: 'job-2',
    title: 'Program Magang Teknisi Muda (Internship)',
    companyName: 'Klinik HP Indonesia Network',
    location: 'Bandung & Surabaya',
    salaryRange: 'Uang Saku + Uang Makan + Mess',
    type: 'Program Magang',
    description: 'Kesempatan magang kerja langsung di laboratorium servis resmi dengan pendampingan Master Teknisi SM Flasher.',
    requirements: [
      'Telah lulus pelatihan Android Basic atau iPhone Basic di LPK SM Flasher',
      'Siap ditempatkan selama 3 bulan magang'
    ],
    contactPersonPhone: '081368838003',
    createdAt: '2026-08-03T11:00:00Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Pendaftaran Sertifikasi Uji Kompetensi BNSP Teknisi HP Angkatan 2026 Open Registration',
    category: 'Ujian BNSP',
    content: 'Diberitahukan kepada seluruh alumni dan siswa aktif LPK SM Flasher bahwa Uji Kompetensi BNSP akan dilaksanakan bulan depan. Harap melengkapi dokumen persyaratan KTP dan Sertifikat Pelatihan.',
    date: '05 Agustus 2026',
    author: 'Admin LPK SM Flasher',
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'Pembaruan Update Library Skematik Borneo & File Dump UFS Qualcomm v3.4',
    category: 'General',
    content: 'Modul materi baru dan link download dump file UFS untuk seri HP terbaru 2026 telah ditambahkan di portal. Silahkan cek menu Materi Video & SOP.',
    date: '02 Agustus 2026',
    author: 'Master Marsuki'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Suasana Praktek Reballing IC CPU dan BGA di Lab Hardware',
    type: 'foto',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    category: 'Praktek Reballing',
    description: 'Peserta sedang mengoperasikan mikroskop stereo & blower presisi.',
    date: '2026-07-20'
  },
  {
    id: 'gal-2',
    title: 'Penyerahan Sertifikat Uji Kompetensi BNSP Angkatan 12',
    type: 'foto',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    category: 'Sertifikasi BNSP',
    description: 'Foto bersama asesor BNSP dan peserta yang lulus kompetensi.',
    date: '2026-07-10'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'usr-admin-1',
    senderName: 'Master Marsuki (Instruktur Utama)',
    senderRole: 'admin',
    channelId: 'community',
    type: 'text',
    text: 'Selamat datang teman-teman di grup Obrolan Komunitas Siswa & Alumni LPK SM Flasher! Gunakan grup ini untuk diskusi seputar pengerjaan kasus HP, konsultasi alat, dan jadwal kelas.',
    createdAt: '2026-08-06T08:00:00Z'
  },
  {
    id: 'msg-2',
    senderId: 'usr-siswa-1',
    senderName: 'Andi Saputra',
    senderRole: 'siswa',
    channelId: 'community',
    type: 'text',
    text: 'Halo Master, izin bertanya untuk pengukuran diode mode pada Jalur VPH_PWR Poco X3 Pro, nilai standar yang normal berapa V ya?',
    createdAt: '2026-08-06T08:05:00Z'
  },
  {
    id: 'msg-3',
    senderId: 'usr-admin-1',
    senderName: 'Master Marsuki (Instruktur Utama)',
    senderRole: 'admin',
    channelId: 'community',
    type: 'audio',
    text: 'Pesan Suara dari Instruktur',
    audioDuration: 18,
    createdAt: '2026-08-06T08:07:00Z'
  },
  {
    id: 'msg-4',
    senderId: 'usr-admin-1',
    senderName: 'Master Marsuki (Instruktur Utama)',
    senderRole: 'admin',
    channelId: 'community',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    fileName: 'Skematik_VPH_PocoX3Pro.jpg',
    text: 'Ini titik pengukurannya Andi, periksa kapasitor dekat C201.',
    createdAt: '2026-08-06T08:08:00Z'
  },
  {
    id: 'msg-5',
    senderId: 'usr-siswa-1',
    senderName: 'Andi Saputra',
    senderRole: 'siswa',
    channelId: 'private_usr-siswa-1',
    type: 'text',
    text: 'Halo Admin, saya mau konsultasi privat untuk pengambilan sertifikat uji kompetensi BNSP.',
    createdAt: '2026-08-06T08:15:00Z'
  },
  {
    id: 'msg-6',
    senderId: 'usr-admin-1',
    senderName: 'Admin LPK SM Flasher',
    senderRole: 'admin',
    channelId: 'private_usr-siswa-1',
    type: 'text',
    text: 'Siap Andi. Sertifikat BNSP Anda sudah selesai diisikan oleh asesor. Silakan kirimkan alamat pengiriman atau ambil langsung di kantor pusat Kenali Asam Bawah Jambi.',
    createdAt: '2026-08-06T08:16:00Z'
  }
];

export const INITIAL_PART_COMPATIBLE: PartCompatibleItem[] = [
  {
    id: 'pcd-1',
    componentCode: 'PM660L',
    componentName: 'IC Power Sub Qualcomm (Sub-PMIC & Flash LED Driver)',
    category: 'IC Power',
    compatibleDevices: [
      'Redmi Note 5 (Whyred)',
      'Redmi Note 7 (Lavender)',
      'Asus Zenfone Max Pro M1',
      'Realme 2 Pro',
      'Vivo V11 Pro',
      'Oppo R15'
    ],
    pinCountOrPackage: 'BGA 144 Ball',
    functionDescription: 'Pengendali tegangan sekunder LDO, driver lampu kilat LED, dan manajemen sub-power.',
    crossCompatibilityNotes: 'Kode suffix 002 dan 003 kompatibel penuh 100%. Tidak perlu re-program.'
  },
  {
    id: 'pcd-2',
    componentCode: 'PM660',
    componentName: 'IC Power Utama Qualcomm (Main PMIC)',
    category: 'IC Power',
    compatibleDevices: [
      'Redmi Note 5',
      'Redmi Note 7',
      'Asus Zenfone Max Pro M1 / M2',
      'Nokia 6.1 Plus',
      'Mi A2'
    ],
    pinCountOrPackage: 'BGA 156 Ball',
    functionDescription: 'IC Power utama pengatur tegangan VDD, BUCK CPU, GPU, dan sistem boot utama.',
    crossCompatibilityNotes: 'Kompatibel langsung pada chipset Snapdragon 636 & 660.'
  },
  {
    id: 'pcd-3',
    componentCode: 'PMI632',
    componentName: 'IC Charger & Display Backlight Sub-PMIC Qualcomm',
    category: 'IC Charger',
    compatibleDevices: [
      'Redmi 7',
      'Redmi 8 / 8A',
      'Redmi Note 8',
      'Samsung A11 (A115F)',
      'Realme C3 / C11'
    ],
    pinCountOrPackage: 'BGA 81 Ball',
    functionDescription: 'Mengatur arus pengisian baterai (Charging), driver LCD backlight, dan USB Type-C controller.',
    crossCompatibilityNotes: 'Gunakan suffix 502 atau 602. Jika ganti dari seri 502 ke 602 pastikan tegangan charging tested 2A.'
  },
  {
    id: 'pcd-4',
    componentCode: 'BQ25601',
    componentName: 'IC Charging Fast Charger I2C Controller',
    category: 'IC Charger',
    compatibleDevices: [
      'Redmi Note 8 Pro',
      'Redmi 9',
      'Oppo A5s',
      'Oppo A12',
      'Realme C2',
      'Vivo Y91 / Y93 / Y95'
    ],
    pinCountOrPackage: 'QFN 24-Pin',
    functionDescription: 'Regulator switching charging baterai Li-Ion dengan proteksi tegangan lebih OVP.',
    crossCompatibilityNotes: 'Sama persis dan interchangeable dengan BQ25601D dan BQ25600.'
  },
  {
    id: 'pcd-5',
    componentCode: '1610A3 / 1612A1 (U2 / HYDRA)',
    componentName: 'IC Tristar USB & Charging Logic Controller iPhone',
    category: 'IC Charger',
    compatibleDevices: [
      'iPhone 6s / 6s Plus',
      'iPhone 7 / 7 Plus',
      'iPhone 8 / 8 Plus',
      'iPhone X'
    ],
    pinCountOrPackage: 'BGA 36 Ball',
    functionDescription: 'Mengontrol jalur aksesori Lightning, USB data communication, dan proteksi fast charging.',
    crossCompatibilityNotes: 'Versi 1612A1 dapat dipasang menggantikan 1610A3 (Backward Compatible).'
  },
  {
    id: 'pcd-6',
    componentCode: 'MT6357CRV',
    componentName: 'IC Power Utama MediaTek Helio',
    category: 'IC Power',
    compatibleDevices: [
      'Redmi 6A / 6',
      'Oppo A1k',
      'Oppo A31',
      'Realme C2',
      'Vivo Y91C',
      'Samsung A01 Core'
    ],
    pinCountOrPackage: 'BGA 169 Ball',
    functionDescription: 'IC Power utama pemicu tegangan VCORE MediaTek Helio A22 & P35.',
    crossCompatibilityNotes: 'Kode MT6357CRV dan MT6357MRV identik. Dipasang tanpa modifikasi.'
  },
  {
    id: 'pcd-7',
    componentCode: 'WTR2965',
    componentName: 'IC Transceiver RF 4G LTE Qualcomm',
    category: 'IC RF / Transceiver',
    compatibleDevices: [
      'Redmi Note 4X (Snapdragon)',
      'Redmi 5 Plus',
      'Samsung J7 Pro',
      'Oppo A71 (CPH1801)',
      'Vivo Y65'
    ],
    pinCountOrPackage: 'BGA 64 Ball',
    functionDescription: 'Penerima dan pemancar frekuensi radio 2G/3G/4G LTE (Sinyal Hilang / Panggilan Darurat).',
    crossCompatibilityNotes: 'Dapat digunakan pada seluruh smartphone Qualcomm Snapdragon 425, 435, dan 625.'
  },
  {
    id: 'pcd-8',
    componentCode: 'SKY77643-21',
    componentName: 'IC Power Amplifier (PA) 4G Multi-Band',
    category: 'IC PA',
    compatibleDevices: [
      'Redmi Note 4X',
      'Redmi 5A',
      'Oppo A37f',
      'Samsung J2 Prime',
      'Vivo Y53'
    ],
    pinCountOrPackage: 'LGA 42 Pin',
    functionDescription: 'Penguat daya sinyal pemancar 3G & 4G LTE band 1, 3, 5, 8, 40.',
    crossCompatibilityNotes: 'Kompatibel dengan SKY77643-11 & VC7643.'
  },
  {
    id: 'pcd-9',
    componentCode: 'TPS65132',
    componentName: 'IC Display Bias Regulator (AVDD & VSN LCD)',
    category: 'IC Display & Backlight',
    compatibleDevices: [
      'Redmi Note 3 Pro',
      'Redmi Note 4',
      'Asus Zenfone 3',
      'Oppo F1s',
      'Vivo V5'
    ],
    pinCountOrPackage: 'WCSP 15 Ball',
    functionDescription: 'Menghasilkan tegangan positif +5.0V (AVDD) dan negatif -5.0V (AVEE/VSN) untuk layar LCD.',
    crossCompatibilityNotes: 'Interchangeable dengan TPS65132A dan SM5109.'
  },
  {
    id: 'pcd-10',
    componentCode: '338S00295',
    componentName: 'IC Audio Codec iPhone 7 / 7 Plus',
    category: 'IC Audio',
    compatibleDevices: [
      'iPhone 7',
      'iPhone 7 Plus'
    ],
    pinCountOrPackage: 'BGA 98 Ball',
    functionDescription: 'Pengolah audio mic, speaker, dan earpiece (Solusi HP tidak bisa rekam suara / mikrofon mati).',
    crossCompatibilityNotes: 'Penyebab umum penyakit "Loop Disease" / Audio abu-abu pada iPhone 7. Wajib jumper pad C12.'
  }
];

export const INITIAL_FREE_TOOLS: FreeToolSoftware[] = [
  {
    id: 'ftool-1',
    title: 'Odin Flash Tool v3.14.4 Official (Samsung Firmware Flasher)',
    category: 'Flashing Tool',
    version: 'v3.14.4',
    fileSize: '3.8 MB',
    description: 'Tool resmi untuk flashing firmware Samsung (BL, AP, CP, CSC, HOME_CSC) via Download Mode. Bebas virus & teruji.',
    downloadUrl: 'https://dl.samsungodin.com/Odin3_v3.14.4.zip',
    postedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'ftool-2',
    title: 'SP Flash Tool v5.1924 (MediaTek All Chipset Flasher)',
    category: 'Flashing Tool',
    version: 'v5.1924.00',
    fileSize: '62.4 MB',
    description: 'Software flashing khusus HP Android chipset MediaTek (MT6737, MT6765, MT6768, dll). Support scatter file & format/download.',
    downloadUrl: 'https://spflashtools.com/wp-content/uploads/SP_Flash_Tool_v5.1924_Win.zip',
    postedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-02T11:30:00Z'
  },
  {
    id: 'ftool-3',
    title: 'Qualcomm QFIL / QPST Tool Latest 2026',
    category: 'Flashing Tool',
    version: 'v2.7.496',
    fileSize: '48.1 MB',
    description: 'Tool resmi flashing modem & firmware Qualcomm via Mode Emergency Download (EDL 9008). Support rawprogram0.xml.',
    downloadUrl: 'https://qpsttool.com/wp-content/uploads/QPST_2.7.496.zip',
    postedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-03T09:15:00Z'
  },
  {
    id: 'ftool-4',
    title: 'Driver USB Teknisi All-in-One (MTK, Qualcomm, SPD, Samsung, Apple)',
    category: 'Driver',
    version: 'v2026.1',
    fileSize: '120.5 MB',
    description: 'Paket installer driver lengkap untuk mendeteksi port EDL 9008, BROM MediaTek, Fastboot ADB, VCOM, dan Apple DFU Mode di Windows 10/11 64-bit.',
    downloadUrl: 'https://smflasher.com/downloads/drivers/Driver_Teknisi_AIO_SM_Flasher.exe',
    postedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-04T14:20:00Z'
  },
  {
    id: 'ftool-5',
    title: 'Fastboot FRP & Bootloader Unlock Tool Free Edition',
    category: 'Unlocking / FRP',
    version: 'v1.0.8',
    fileSize: '15.2 MB',
    description: 'Utility ringan untuk hapus FRP Google Account via Fastboot Mode & Erase Persistent Partition Xiaomi, OPPO, Vivo, dan Infinix.',
    downloadUrl: 'https://smflasher.com/downloads/tools/FRP_Fastboot_Unlocker_Free.zip',
    postedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-05T16:00:00Z'
  }
];

export const INITIAL_ZOOM_MEETINGS: ZoomMeeting[] = [
  {
    id: 'zoom-101',
    title: 'Sesi Live Mentoring Reballing IC BGA & Troubleshooting Hardware',
    topic: 'Tanya jawab interaktif kasus mati total Android & iPhone bersama Instruktur Utama Master Budi',
    meetingId: '891 2345 6789',
    passcode: 'SMFLASHER2026',
    joinUrl: 'https://zoom.us/j/89123456789?pwd=SMFLASHER2026',
    scheduledTime: '2026-08-07T19:30:00.000Z',
    durationMinutes: 90,
    hostName: 'Master Budi Raharjo (Instruktur Utama)',
    status: 'Sedang Berlangsung',
    createdAt: '2026-08-05T08:00:00Z'
  },
  {
    id: 'zoom-102',
    title: 'Persiapan Uji Kompetensi BNSP Teknisi HP & Pembekalan Sertifikasi',
    topic: 'Kisi-kisi soal teori dan simulasi praktek reballing & penganalisisan skematik di depan Asesor BNSP',
    meetingId: '812 9988 7766',
    passcode: 'BNSP2026',
    joinUrl: 'https://zoom.us/j/81299887766?pwd=BNSP2026',
    scheduledTime: '2026-08-10T14:00:00.000Z',
    durationMinutes: 120,
    hostName: 'Marsuki (Direktur LPK SM Flasher)',
    status: 'Akan Datang',
    createdAt: '2026-08-06T09:00:00Z'
  }
];

export const INITIAL_PDF_MODULES = [
  {
    id: 'pdf-01',
    title: 'Buku Panduan Dasar Hardware Teknisi HP Android & Pengukuran Avometer',
    category: 'Android Hardware',
    description: 'Panduan lengkap membaca hambatan dalam (diode mode), jalur VBUS, VBAT, VSYS, dan cara melacak short circuit menggunakan MBR Injection.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Panduan_Dasar_Hardware_SM_Flasher.pdf',
    fileSize: '3.4 MB',
    uploadedBy: 'Master Budi Raharjo',
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'pdf-02',
    title: 'SOP Reballing BGA CPU & RAM UFS Dual-Deck Step-by-Step',
    category: 'Android Hardware',
    description: 'Buku saku standar operasional cetak ulang kaki IC BGA (CPU Snapdragon/MediaTek + RAM) dengan timah pasta 183°C dan blower 330°C.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'SOP_Reballing_BGA_SM_Flasher.pdf',
    fileSize: '5.1 MB',
    uploadedBy: 'Rahmat Hidayat',
    createdAt: '2026-08-02T10:30:00Z'
  },
  {
    id: 'pdf-03',
    title: 'Modul Panduan Flashing, Direct eMMC/UFS & Repair IMEI NVRAM',
    category: 'Flashing & Software',
    description: 'Petunjuk praktis penggantian IC eMMC/UFS, penulisan CID, backup dump, restore NVRAM, IMEI null, dan fix baseband bermasalah.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'Modul_Software_Direct_UFS_SMF.pdf',
    fileSize: '8.2 MB',
    uploadedBy: 'Andi Wijaya',
    createdAt: '2026-08-03T11:00:00Z'
  },
  {
    id: 'pdf-04',
    title: 'Panduan Troubleshooting iPhone Hardware (Power IC, Audio IC & Baseband)',
    category: 'iPhone Hardware',
    description: 'Skematik panduan pengukuran tegangan BUCK & LDO pada iPhone X hingga iPhone 14 Pro Max. Mengatasi audio grayed out & no service.',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileName: 'iPhone_Hardware_Troubleshooting_SMF.pdf',
    fileSize: '6.7 MB',
    uploadedBy: 'Master Syahrul Flasher',
    createdAt: '2026-08-04T09:15:00Z'
  }
];

export const INITIAL_LCD_COMPATIBILITY = [
  {
    id: 'lcd-101',
    brand: 'Xiaomi / Poco',
    phoneModel: 'Poco X3 Pro',
    lcdPartCode: 'IPS 120Hz FHD+ Flex 40-Pin',
    compatibleModels: ['Poco X3 Pro', 'Poco X3 NFC', 'Redmi Note 10 Pro (Revisi Flex A)'],
    flexPinoutNote: 'Sama persis 100% plug and play tanpa modifikasi. Touchscreen & Refresh rate 120Hz berjalan lancar.',
    displayTech: 'IPS LCD 120Hz',
    addedBy: 'Instruktur Syahrul',
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'lcd-102',
    brand: 'Oppo / Realme',
    phoneModel: 'Oppo A53 (2020)',
    lcdPartCode: 'IPS 90Hz HD+ Pin Flex Dual',
    compatibleModels: ['Oppo A53 (CPH2127)', 'Oppo A33 (CPH2137)', 'Realme C17 (RMX2101)'],
    flexPinoutNote: 'Soket flex LCD dan touchscreen identik. Presisi frame dan kecerahan lampu backlight sama.',
    displayTech: 'IPS LCD 90Hz',
    addedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-02T09:00:00Z'
  },
  {
    id: 'lcd-103',
    brand: 'Samsung',
    phoneModel: 'Samsung Galaxy A12',
    lcdPartCode: 'PLS LCD HD+ Flex A125',
    compatibleModels: ['Samsung Galaxy A12 (SM-A125F)', 'Samsung Galaxy A12 Nacho (SM-A127F)', 'Samsung Galaxy M12 (SM-M127F)'],
    flexPinoutNote: 'Keduanya dapat dipasang teringat IC driver display sama. Perhatikan revisi kaca kamera depan.',
    displayTech: 'PLS LCD',
    addedBy: 'Teknisi Rahmat',
    createdAt: '2026-08-03T10:00:00Z'
  },
  {
    id: 'lcd-104',
    brand: 'Vivo',
    phoneModel: 'Vivo Y20',
    lcdPartCode: 'IPS HD+ Halo FullView',
    compatibleModels: ['Vivo Y20', 'Vivo Y20s', 'Vivo Y20i', 'Vivo Y12s', 'Vivo Y15s (2021)', 'Vivo Y20 2021'],
    flexPinoutNote: 'Universal 1 seri Vivo Y-series 2020-2022. Pastikan rapat di frame samping agar tidak renggang.',
    displayTech: 'IPS LCD',
    addedBy: 'Admin LPK SM Flasher',
    createdAt: '2026-08-04T14:00:00Z'
  },
  {
    id: 'lcd-105',
    brand: 'Infinix / Tecno',
    phoneModel: 'Infinix Hot 10 Play',
    lcdPartCode: 'IPS HD+ Pin Flex X688',
    compatibleModels: ['Infinix Hot 10 Play (X688B)', 'Infinix Smart 5 (X657)', 'Tecno Spark 6 Go (KE5)'],
    flexPinoutNote: 'Soket flex sama persis. Gambar jernih tanpa cacat garis.',
    displayTech: 'IPS LCD',
    addedBy: 'Andi Wijaya',
    createdAt: '2026-08-05T12:00:00Z'
  },
  {
    id: 'lcd-106',
    brand: 'iPhone',
    phoneModel: 'iPhone 11',
    lcdPartCode: 'Liquid Retina HD Flex Dual 3D-Touch',
    compatibleModels: ['iPhone 11 (A2111, A2221, A2223)'],
    flexPinoutNote: 'Khusus iPhone 11. Untuk menghilangkan notifikasi "Important Display Message", pindahkan IC Eprom EEPROM dari LCD original lama ke LCD baru.',
    displayTech: 'Liquid Retina IPS',
    addedBy: 'Master Syahrul Flasher',
    createdAt: '2026-08-06T15:00:00Z'
  }
];


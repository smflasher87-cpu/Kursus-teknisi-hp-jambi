import React, { useState, useEffect } from 'react';
import {
  User,
  Video,
  AdminSettings,
  Registration,
  Alumni,
  CasePost,
  JobOpening,
  GalleryItem,
  Announcement,
  ChatMessage,
  PartCompatibleItem,
  FreeToolSoftware,
  ZoomMeeting
} from './types';
import {
  INITIAL_USERS,
  INITIAL_VIDEOS,
  INITIAL_PROGRESS,
  INITIAL_ADMIN_SETTINGS,
  INITIAL_INSTITUTION_PROFILE,
  INITIAL_ALUMNI,
  INITIAL_CASE_POSTS,
  INITIAL_JOBS,
  INITIAL_GALLERY,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_PART_COMPATIBLE,
  INITIAL_FREE_TOOLS,
  INITIAL_ZOOM_MEETINGS
} from './data/initialData';

import { LoginPage } from './components/LoginPage';
import { Navbar, NavTab } from './components/Navbar';
import { ProgressOverview } from './components/ProgressOverview';
import { VideoCard } from './components/VideoCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AdminUserModal } from './components/AdminUserModal';
import { AdminVideoModal } from './components/AdminVideoModal';
import { TechnicianToolbox } from './components/TechnicianToolbox';
import { CertificateModal } from './components/CertificateModal';

import { RegistrationModal } from './components/RegistrationModal';
import { InstitutionProfileView } from './components/InstitutionProfileView';
import { AlumniView } from './components/AlumniView';
import { CaseSharingView } from './components/CaseSharingView';
import { JobsAndInternshipsView } from './components/JobsAndInternshipsView';
import { ToolAndSchematicRequestModal } from './components/ToolAndSchematicRequestModal';
import { GalleryView } from './components/GalleryView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { AiDamageAnalysisView } from './components/AiDamageAnalysisView';
import { ChatView } from './components/ChatView';
import { PartCompatibleView } from './components/PartCompatibleView';
import { FreeSoftwareToolsView } from './components/FreeSoftwareToolsView';
import { ZoomMeetingView } from './components/ZoomMeetingView';
import { FloatingChatWidget } from './components/FloatingChatWidget';

import bgImage from './assets/images/smflasher_bg_1786027934305.jpg';

import { Search, Film, AlertCircle, Wrench, ShieldCheck, UserCheck, Plus, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<NavTab>('materi');

  // Users
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sm_flasher_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_USERS;
  });

  // Videos
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('sm_flasher_videos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_VIDEOS;
  });

  // Current Logged-In User (NULL by default)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sm_flasher_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  // Admin Settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('sm_flasher_admin_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ADMIN_SETTINGS;
  });

  // Institution Profile
  const [institutionProfile, setInstitutionProfile] = useState(() => {
    const saved = localStorage.getItem('sm_flasher_institution_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_INSTITUTION_PROFILE;
  });

  // Registrations
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('sm_flasher_registrations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_REGISTRATIONS;
  });

  // Alumni
  const [alumniList, setAlumniList] = useState<Alumni[]>(() => {
    const saved = localStorage.getItem('sm_flasher_alumni');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ALUMNI;
  });

  // Case Posts
  const [casePosts, setCasePosts] = useState<CasePost[]>(() => {
    const saved = localStorage.getItem('sm_flasher_cases');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CASE_POSTS;
  });

  // Job Openings
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem('sm_flasher_jobs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_JOBS;
  });

  // Gallery
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('sm_flasher_gallery');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_GALLERY;
  });

  // Announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('sm_flasher_announcements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sm_flasher_chat_messages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CHAT_MESSAGES;
  });

  // PCD Part Compatible Items
  const [pcdItems, setPcdItems] = useState<PartCompatibleItem[]>(() => {
    const saved = localStorage.getItem('sm_flasher_pcd_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PART_COMPATIBLE;
  });

  // Free Tool Software
  const [freeTools, setFreeTools] = useState<FreeToolSoftware[]>(() => {
    const saved = localStorage.getItem('sm_flasher_free_tools');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_FREE_TOOLS;
  });

  // Zoom Meetings
  const [zoomMeetings, setZoomMeetings] = useState<ZoomMeeting[]>(() => {
    const saved = localStorage.getItem('sm_flasher_zoom_meetings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ZOOM_MEETINGS;
  });

  // Completed Map
  const [completedMap, setCompletedMap] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('sm_flasher_completed_map');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const map: Record<string, string[]> = {};
    INITIAL_PROGRESS.forEach((p) => {
      map[p.userId] = p.completedVideoIds;
    });
    return map;
  });

  // Notes Map
  const [notesMap, setNotesMap] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('sm_flasher_notes_map');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  // UI Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Video');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Modals
  const [isAdminUsersOpen, setIsAdminUsersOpen] = useState(false);
  const [isAdminVideosOpen, setIsAdminVideosOpen] = useState(false);
  const [isAdminSettingsOpen, setIsAdminSettingsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isToolRequestModalOpen, setIsToolRequestModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('sm_flasher_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('sm_flasher_videos', JSON.stringify(videos)); }, [videos]);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sm_flasher_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sm_flasher_current_user');
    }
  }, [currentUser]);

  useEffect(() => { localStorage.setItem('sm_flasher_admin_settings', JSON.stringify(adminSettings)); }, [adminSettings]);
  useEffect(() => { localStorage.setItem('sm_flasher_institution_profile', JSON.stringify(institutionProfile)); }, [institutionProfile]);
  useEffect(() => { localStorage.setItem('sm_flasher_registrations', JSON.stringify(registrations)); }, [registrations]);
  useEffect(() => { localStorage.setItem('sm_flasher_alumni', JSON.stringify(alumniList)); }, [alumniList]);
  useEffect(() => { localStorage.setItem('sm_flasher_cases', JSON.stringify(casePosts)); }, [casePosts]);
  useEffect(() => { localStorage.setItem('sm_flasher_jobs', JSON.stringify(jobOpenings)); }, [jobOpenings]);
  useEffect(() => { localStorage.setItem('sm_flasher_gallery', JSON.stringify(galleryItems)); }, [galleryItems]);
  useEffect(() => { localStorage.setItem('sm_flasher_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('sm_flasher_chat_messages', JSON.stringify(chatMessages)); }, [chatMessages]);
  useEffect(() => { localStorage.setItem('sm_flasher_pcd_items', JSON.stringify(pcdItems)); }, [pcdItems]);
  useEffect(() => { localStorage.setItem('sm_flasher_free_tools', JSON.stringify(freeTools)); }, [freeTools]);
  useEffect(() => { localStorage.setItem('sm_flasher_zoom_meetings', JSON.stringify(zoomMeetings)); }, [zoomMeetings]);
  useEffect(() => { localStorage.setItem('sm_flasher_completed_map', JSON.stringify(completedMap)); }, [completedMap]);
  useEffect(() => { localStorage.setItem('sm_flasher_notes_map', JSON.stringify(notesMap)); }, [notesMap]);

  // Job Handlers
  const handleAddJob = (newJob: JobOpening) => setJobOpenings((prev) => [newJob, ...prev]);
  const handleDeleteJob = (id: string) => setJobOpenings((prev) => prev.filter((j) => j.id !== id));

  // Free Tool Handlers
  const handleAddFreeTool = (newTool: FreeToolSoftware) => setFreeTools((prev) => [newTool, ...prev]);
  const handleDeleteFreeTool = (id: string) => setFreeTools((prev) => prev.filter((t) => t.id !== id));

  // Zoom Meeting Handlers
  const handleAddZoomMeeting = (newMeeting: ZoomMeeting) => setZoomMeetings((prev) => [newMeeting, ...prev]);
  const handleUpdateZoomMeetingStatus = (id: string, status: ZoomMeeting['status']) => {
    setZoomMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };
  const handleDeleteZoomMeeting = (id: string) => setZoomMeetings((prev) => prev.filter((m) => m.id !== id));

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedVideo(null);
    setIsAdminUsersOpen(false);
    setIsAdminVideosOpen(false);
    setIsAdminSettingsOpen(false);
  };

  // Progress Toggle
  const handleToggleComplete = (videoId: string) => {
    if (!currentUser) return;
    const userId = currentUser.id;
    const userCompleted = completedMap[userId] || [];

    const isAlreadyDone = userCompleted.includes(videoId);
    const updatedList = isAlreadyDone
      ? userCompleted.filter((id) => id !== videoId)
      : [...userCompleted, videoId];

    setCompletedMap((prev) => ({ ...prev, [userId]: updatedList }));
  };

  // Note Saving
  const handleSaveNote = (videoId: string, text: string) => {
    if (!currentUser) return;
    const key = `${currentUser.id}_${videoId}`;
    setNotesMap((prev) => ({ ...prev, [key]: text }));
  };

  // Registration Handler
  const handleAddRegistration = (reg: Registration) => {
    setRegistrations((prev) => [reg, ...prev]);
  };

  // Alumni Handlers
  const handleAddAlumni = (alumni: Alumni) => {
    setAlumniList((prev) => [alumni, ...prev]);
  };

  const handleDeleteAlumni = (id: string) => {
    setAlumniList((prev) => prev.filter((a) => a.id !== id));
  };

  // Case Posts Handlers
  const handleAddCasePost = (post: CasePost) => {
    setCasePosts((prev) => [post, ...prev]);
  };

  const handleAddCommentToPost = (postId: string, text: string) => {
    if (!currentUser) return;
    setCasePosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c-${Date.now()}`,
                authorName: currentUser.name,
                text,
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return post;
      })
    );
  };

  const handleToggleLikePost = (postId: string) => {
    setCasePosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, likesCount: post.likesCount + 1 };
        }
        return post;
      })
    );
  };

  // Gallery Handlers
  const handleAddGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  // Announcement Handlers
  const handleAddAnnouncement = (ann: Announcement) => {
    setAnnouncements((prev) => [ann, ...prev]);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // User & Video Admin Handlers
  const handleAddUser = (newUser: User) => setUsers((prev) => [...prev, newUser]);
  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };
  const handleDeleteUser = (userId: string) => setUsers((prev) => prev.filter((u) => u.id !== userId));

  const handleAddVideo = (newVideo: Video) => setVideos((prev) => [newVideo, ...prev]);
  const handleUpdateVideo = (updatedVideo: Video) => {
    setVideos((prev) => prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)));
    if (selectedVideo && selectedVideo.id === updatedVideo.id) {
      setSelectedVideo(updatedVideo);
    }
  };
  const handleDeleteVideo = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
    if (selectedVideo && selectedVideo.id === videoId) setSelectedVideo(null);
  };

  const handleUpdateUserCustomCert = (userId: string, certUrl: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, customCertificateUrl: certUrl } : u))
    );
  };

  // 1. MANDATORY LOGIN CHECK: If not logged in, show LoginPage
  if (!currentUser) {
    return (
      <>
        <LoginPage
          users={users}
          onLoginSuccess={handleLoginSuccess}
          onOpenRegistration={() => setIsRegistrationModalOpen(true)}
        />
        {isRegistrationModalOpen && (
          <RegistrationModal
            adminSettings={adminSettings}
            onSubmitRegistration={handleAddRegistration}
            onClose={() => setIsRegistrationModalOpen(false)}
          />
        )}
      </>
    );
  }

  const userCompletedVideoIds = completedMap[currentUser.id] || [];

  const filteredVideos = videos.filter((v) => {
    const matchesCategory =
      selectedCategory === 'Semua Video' || v.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      v.title.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.category.toLowerCase().includes(query) ||
      (v.tags && v.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Fixed Fullscreen Background Image with Subtle Dark Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/85 to-slate-950 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header Navbar */}
        <Navbar
          currentUser={currentUser}
          adminSettings={adminSettings}
          activeTab={activeTab}
          onChangeTab={(tab) => {
            if (tab === 'pendaftaran') {
              setIsRegistrationModalOpen(true);
            } else if (tab === 'request') {
              setIsToolRequestModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          onOpenAdminUsers={() => setIsAdminUsersOpen(true)}
          onOpenAdminVideos={() => setIsAdminVideosOpen(true)}
          onOpenAdminSettings={() => setIsAdminSettingsOpen(true)}
          onLogout={handleLogout}
        />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'materi' && (
          <div className="space-y-6">
            <ProgressOverview
              videos={videos}
              completedVideoIds={userCompletedVideoIds}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />

            <TechnicianToolbox />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto flex items-center space-x-2">
                <Film className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  {selectedCategory === 'Semua Video' ? 'Daftar Modul & Video Pelatihan' : selectedCategory}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 font-bold border border-slate-800">
                  {filteredVideos.length} Video
                </span>
              </div>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5">
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => setIsAdminVideosOpen(true)}
                    className="w-full sm:w-auto px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan Materi Oleh Admin</span>
                  </button>
                )}

                <div className="w-full sm:w-64 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari materi, skematik, atau modul..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            </div>

            {filteredVideos.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">Tidak ada video yang ditemukan</h4>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua Video');
                  }}
                  className="px-4 py-2 bg-slate-800 text-amber-400 text-xs font-bold rounded-xl"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isCompleted={userCompletedVideoIds.includes(video.id)}
                    onSelect={(v) => setSelectedVideo(v)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analisa' && (
          <AiDamageAnalysisView
            currentUser={currentUser}
            onShareToCommunity={(caseData) => {
              const newPost: CasePost = {
                id: `case-${Date.now()}`,
                authorId: currentUser.id,
                authorName: currentUser.name,
                deviceType: caseData.deviceType,
                deviceModel: caseData.deviceModel,
                symptoms: caseData.symptoms,
                solutionText: caseData.solutionText,
                isSolved: true,
                createdAt: new Date().toISOString(),
                likesCount: 1,
                comments: []
              };
              handleAddCasePost(newPost);
              setActiveTab('kasus');
            }}
          />
        )}

        {activeTab === 'pcd' && (
          <PartCompatibleView
            items={pcdItems}
            currentUser={currentUser}
            onAddItem={(newItem) => setPcdItems((prev) => [newItem, ...prev])}
            onDeleteItem={(id) => setPcdItems((prev) => prev.filter((item) => item.id !== id))}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            currentUser={currentUser}
            allUsers={users}
            messages={chatMessages}
            onSendMessage={(newMsg) => setChatMessages((prev) => [...prev, newMsg])}
          />
        )}

        {activeTab === 'profil' && (
          <InstitutionProfileView
            profile={institutionProfile}
            currentUser={currentUser}
            onUpdateProfile={(updated) => setInstitutionProfile(updated)}
          />
        )}

        {activeTab === 'alumni' && (
          <AlumniView
            alumniList={alumniList}
            registrations={registrations}
            currentUser={currentUser}
            onAddAlumni={handleAddAlumni}
            onDeleteAlumni={handleDeleteAlumni}
          />
        )}

        {activeTab === 'kasus' && (
          <CaseSharingView
            casePosts={casePosts}
            currentUser={currentUser}
            onAddPost={handleAddCasePost}
            onAddComment={handleAddCommentToPost}
            onToggleLike={handleToggleLikePost}
          />
        )}

        {activeTab === 'loker' && (
          <JobsAndInternshipsView
            jobs={jobOpenings}
            currentUser={currentUser}
            adminSettings={adminSettings}
            onAddJob={handleAddJob}
            onDeleteJob={handleDeleteJob}
          />
        )}

        {activeTab === 'freetools' && (
          <FreeSoftwareToolsView
            tools={freeTools}
            currentUser={currentUser}
            onAddTool={handleAddFreeTool}
            onDeleteTool={handleDeleteFreeTool}
          />
        )}

        {activeTab === 'zoom' && (
          <ZoomMeetingView
            meetings={zoomMeetings}
            currentUser={currentUser}
            onAddMeeting={handleAddZoomMeeting}
            onUpdateMeetingStatus={handleUpdateZoomMeetingStatus}
            onDeleteMeeting={handleDeleteZoomMeeting}
          />
        )}

        {activeTab === 'galeri' && (
          <GalleryView
            galleryItems={galleryItems}
            currentUser={currentUser}
            onAddItem={handleAddGalleryItem}
            onDeleteItem={handleDeleteGalleryItem}
          />
        )}

        {activeTab === 'pengumuman' && (
          <AnnouncementsView
            announcements={announcements}
            currentUser={currentUser}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Wrench className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold text-slate-200 tracking-wider">
              LPK SM FLASHER TRAINING CENTRE
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {institutionProfile.legalCompany} &bull; SK KEMENKUMHAM: {institutionProfile.skKemenkumham} &bull; VIN Kemnaker: {institutionProfile.vinKemnaker}
          </p>
        </div>
      </footer>

      {/* Modals */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isCompleted={userCompletedVideoIds.includes(selectedVideo.id)}
          onToggleComplete={handleToggleComplete}
          savedNote={notesMap[`${currentUser.id}_${selectedVideo.id}`]}
          onSaveNote={handleSaveNote}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {isRegistrationModalOpen && (
        <RegistrationModal
          adminSettings={adminSettings}
          onSubmitRegistration={handleAddRegistration}
          onClose={() => setIsRegistrationModalOpen(false)}
        />
      )}

      {isToolRequestModalOpen && (
        <ToolAndSchematicRequestModal
          currentUser={currentUser}
          adminSettings={adminSettings}
          onClose={() => setIsToolRequestModalOpen(false)}
        />
      )}

      {isAdminSettingsOpen && currentUser.role === 'admin' && (
        <AdminSettingsModal
          settings={adminSettings}
          users={users}
          onSaveSettings={(updated) => setAdminSettings(updated)}
          onUpdateUserCustomCert={handleUpdateUserCustomCert}
          onClose={() => setIsAdminSettingsOpen(false)}
        />
      )}

      {isAdminUsersOpen && currentUser.role === 'admin' && (
        <AdminUserModal
          users={users}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
          onClose={() => setIsAdminUsersOpen(false)}
        />
      )}

      {isAdminVideosOpen && currentUser.role === 'admin' && (
        <AdminVideoModal
          videos={videos}
          onAddVideo={handleAddVideo}
          onUpdateVideo={handleUpdateVideo}
          onDeleteVideo={handleDeleteVideo}
          onClose={() => setIsAdminVideosOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          currentUser={currentUser}
          completedCount={userCompletedVideoIds.length}
          totalCount={videos.length}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}
      {/* Real-time Floating Chat Widget in Bottom Right */}
      <FloatingChatWidget
        currentUser={currentUser}
        allUsers={users}
        messages={chatMessages}
        onSendMessage={(newMsg) => setChatMessages((prev) => [...prev, newMsg])}
      />
      </div>
    </div>
  );
}

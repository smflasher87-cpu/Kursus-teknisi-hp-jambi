import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App & Auth
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleDrive = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan Access Token Google Drive dari Firebase');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Drive Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getDriveAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutDrive = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Google Drive API Helpers
 */
export const TARGET_GOOGLE_DRIVE_ACCOUNT = 'smflasher.jambi2019@gmail.com';
export const DRIVE_FOLDER_NAME = 'LPK SM Flasher - Database & Media';

let cachedFolderId: string | null = null;

/**
 * Get or create root folder on Google Drive
 */
export const getOrCreateDriveFolder = async (token: string): Promise<string> => {
  if (cachedFolderId) return cachedFolderId;

  try {
    // Check if folder exists
    const query = encodeURIComponent(`name = '${DRIVE_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
    const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const searchData = await searchRes.json();

    if (searchData.files && searchData.files.length > 0) {
      cachedFolderId = searchData.files[0].id;
      return cachedFolderId!;
    }

    // Create folder if not found
    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: DRIVE_FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder'
      })
    });
    const folderData = await createRes.json();
    cachedFolderId = folderData.id;
    return cachedFolderId!;
  } catch (err) {
    console.error('Error creating Drive folder:', err);
    throw err;
  }
};

/**
 * Backup state JSON to Google Drive
 */
export const backupStateToDrive = async (token: string, dbData: Record<string, any>) => {
  try {
    const folderId = await getOrCreateDriveFolder(token);
    const fileName = 'sm_flasher_cloud_db.json';

    // Search if file already exists in folder
    const query = encodeURIComponent(`name = '${fileName}' and '${folderId}' in parents and trashed = false`);
    const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const searchData = await searchRes.json();

    const jsonBlob = new Blob([JSON.stringify(dbData, null, 2)], { type: 'application/json' });

    if (searchData.files && searchData.files.length > 0) {
      // Update existing file
      const fileId = searchData.files[0].id;
      await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: jsonBlob
      });
    } else {
      // Create new file with metadata
      const metadata = {
        name: fileName,
        mimeType: 'application/json',
        parents: [folderId]
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', jsonBlob);

      await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
    }
  } catch (err) {
    console.error('Backup state to Drive failed:', err);
  }
};

/**
 * Upload Media File (Video, Image, PDF) directly to Google Drive
 */
export const uploadFileToDrive = async (
  token: string,
  file: File | Blob,
  fileName: string,
  mimeType: string
): Promise<{ fileId: string; webViewLink: string }> => {
  const folderId = await getOrCreateDriveFolder(token);

  const metadata = {
    name: fileName,
    parents: [folderId]
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file, fileName);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink,webContentLink', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form
  });

  if (!res.ok) {
    throw new Error(`Google Drive upload error: ${res.statusText}`);
  }

  const data = await res.json();
  return {
    fileId: data.id,
    webViewLink: data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`
  };
};

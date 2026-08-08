import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App & Firestore
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Test server connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'app_state', 'connection_test'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or configuration issue:', error);
    }
  }
}
testFirestoreConnection();

/**
 * Save data to both localStorage and Firestore doc in real-time
 */
export async function saveRealtimeData<T>(key: string, data: T): Promise<void> {
  // 1. Save to localStorage immediately for instant local UI update
  try {
    localStorage.setItem(`sm_flasher_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save warning:', e);
  }

  // 2. Broadcast across tabs
  try {
    const bc = new BroadcastChannel('sm_flasher_bc_channel');
    bc.postMessage({ key, payload: data });
    bc.close();
  } catch (e) {}

  // 3. Write to Firestore for cross-device/browser online real-time sync
  try {
    const docRef = doc(db, 'app_state', key);
    await setDoc(docRef, {
      items: data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.warn(`Firestore save error for ${key}:`, error);
  }
}

/**
 * Subscribe to real-time changes from Firestore for a key
 */
export function subscribeRealtimeData<T>(
  key: string,
  initialData: T,
  onUpdate: (data: T) => void
): () => void {
  const docRef = doc(db, 'app_state', key);

  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.data();
        if (val && val.items !== undefined) {
          // Update localStorage cache
          try {
            localStorage.setItem(`sm_flasher_${key}`, JSON.stringify(val.items));
          } catch (e) {}
          onUpdate(val.items as T);
        }
      } else {
        // Seed initial data to Firestore if doc doesn't exist
        saveRealtimeData(key, initialData);
      }
    },
    (error) => {
      console.warn(`Firestore snapshot listener error for ${key}:`, error);
    }
  );

  return unsubscribe;
}

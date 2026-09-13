import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, firebaseEnabled } from './client';
import { projects as demoProjects } from '@/lib/seed';
import { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  if (!firebaseEnabled || !db) return demoProjects;
  try {
    const snapshot = await getDocs(query(collection(db, 'projects'), orderBy('updatedAt', 'desc')));
    if (snapshot.empty) return demoProjects;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.warn('Firestore fetch failed, falling back to seed projects:', error);
    return demoProjects;
  }
}

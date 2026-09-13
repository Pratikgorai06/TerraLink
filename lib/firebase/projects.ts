import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, firebaseEnabled } from './client';
import { projects as demoProjects } from '@/lib/seed';
import { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  if (!firebaseEnabled || !db) return demoProjects;
  const snapshot = await getDocs(query(collection(db, 'projects'), orderBy('updatedAt', 'desc')));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
}

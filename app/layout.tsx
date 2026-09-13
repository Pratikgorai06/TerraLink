import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BhoomiSetu — Land Acquisition Command Center',
  description: 'Real-time national land acquisition and management system demo.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

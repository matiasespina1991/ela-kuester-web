// src/app/layout.tsx
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';
import { FirstLoadProvider } from '@/context/FirstLoadContext';

export const metadata = {
  title: 'Ela Kuester',
  description: 'London based fashion designer, stylist and artist.',
  openGraph: {
    images: [
      {
        url: '/images/opengraph-image.jpg',
        alt: 'Ela Kuester Logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html style={{ height: '100%' }} lang="en">
      <body style={{ height: '100%' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

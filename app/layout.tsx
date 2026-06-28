import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { Toaster } from 'sonner';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Release Checklist',
  description: 'Release Checklist Tool',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <Providers>
            {children}
            <Toaster richColors position='top-right' />
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}

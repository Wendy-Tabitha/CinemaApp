import './globals.css';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
}

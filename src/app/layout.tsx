import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'A simple chat application built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

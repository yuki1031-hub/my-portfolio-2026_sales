import type { Metadata } from 'next';
import './globals.css';
import Bezel from '../components/Bezel';

export const metadata: Metadata = {
  title: 'HISHIKAWA.Y',
  description: 'Portfolio of Hishikawa Yuki — LINE chatbot, LP design, freelance engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Bezel>{children}</Bezel>
      </body>
    </html>
  );
}

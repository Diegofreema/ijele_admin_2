import { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import './global.css';
import { ViewTransitions } from 'next-view-transitions';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body id={'root'}>
          <AppWrappers>{children}</AppWrappers>
        </body>
      </html>
    </ViewTransitions>
  );
}

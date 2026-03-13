'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

const AppLayout = ({ children, hideSidebar = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Header />
      {!hideSidebar && <Sidebar />}
      <main className={`pt-14 min-h-screen ${!hideSidebar ? 'sm:pl-56' : ''} transition-all duration-200`}>
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

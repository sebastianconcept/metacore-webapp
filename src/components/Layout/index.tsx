import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileNavigation from './MobileNavigation';
import TopNavigation from './TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <DesktopSidebar className="hidden lg:flex" />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopNavigation />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
        
        {/* Mobile Navigation */}
        <MobileNavigation className="lg:hidden" />
      </div>
    </div>
  );
}
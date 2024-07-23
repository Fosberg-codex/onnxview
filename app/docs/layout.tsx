"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const DocsLayout = ({ children }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    { href: '/docs/getting-started', title: 'Getting Started' },
    { href: '/docs/installation', title: 'Installation' },
    { href: '/docs/configuration', title: 'Configuration' },
    { href: '/docs/api-reference', title: 'API Reference' },
    { href: '/docs/examples', title: 'Examples' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Docs</h1>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 bg-gray-100 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded transition duration-150 ease-in-out"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={toggleSidebar}></div>
            <aside className="absolute top-0 left-0 w-64 h-full bg-white overflow-y-auto">
              <div className="p-4">
                <button 
                  onClick={toggleSidebar}
                  className="mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  <X size={24} />
                </button>
                <nav>
                  <ul className="space-y-2">
                    {sidebarItems.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          className="block py-2 px-4 text-blue-600 hover:bg-blue-100 rounded transition duration-150 ease-in-out"
                          onClick={toggleSidebar}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 My Docs. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DocsLayout;
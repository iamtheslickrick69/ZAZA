'use client';

import {
  HomeIcon,
  Package,
  Component,
  Sparkles,
  Mail,
  Moon,
  Sun,
  Shield,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { useEffect, useState } from 'react';
import { HoneycombLoader } from '@/components/ui/honeycomb-loader';

const navigationItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '#',
  },
  {
    title: 'Products',
    icon: Package,
    href: '#products',
  },
  {
    title: 'Components',
    icon: Component,
    href: '#components',
  },
  {
    title: 'Features',
    icon: Sparkles,
    href: '#features',
  },
  {
    title: 'Contact',
    icon: Mail,
    href: '#contact',
  },
  {
    title: 'Vault',
    icon: Shield,
    href: '/vault',
  },
];

export function DockNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3'>
        {/* Brand Icon */}
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
          <DockLabel>Home</DockLabel>
          <DockIcon>
            <a href='/' className='h-full w-full flex items-center justify-center'>
              <HoneycombLoader size={24} />
            </a>
          </DockIcon>
        </DockItem>

        {/* Navigation Items */}
        {navigationItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <DockItem
              key={idx}
              className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <a
                  href={item.href}
                  className='h-full w-full flex items-center justify-center'
                >
                  <Icon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
                </a>
              </DockIcon>
            </DockItem>
          );
        })}

        {/* Theme Toggle */}
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button
              onClick={handleThemeToggle}
              className='h-full w-full flex items-center justify-center'
              aria-label='Toggle theme'
            >
              {mounted && theme === 'dark' ? (
                <Sun className='h-full w-full text-neutral-600 dark:text-neutral-300' />
              ) : (
                <Moon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
              )}
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}

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
import Link from 'next/link';

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-out ${
        isScrolled ? 'top-1 scale-95' : 'top-2 scale-100'
      }`}
      style={{ willChange: 'transform, top' }}
    >
      <Dock className='items-center'>
        {/* Brand Logo */}
        <Link href="/" className='flex items-center justify-center px-3 py-2'>
          <span className='text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-100 hover:text-neutral-900 dark:hover:text-white transition-colors duration-75'>
            RUIXEN
          </span>
        </Link>

        {/* Divider */}
        <div className='h-8 w-px bg-white/20 dark:bg-white/10 mx-1' />

        {navigationItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <DockItem
              key={idx}
              className='glass-dock-item aspect-square rounded-full backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/40 dark:border-white/30 hover:bg-white/70 dark:hover:bg-white/40 transition-all duration-75'
              style={{
                boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.25), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <a href={item.href} className='h-full w-full flex items-center justify-center group'>
                  <Icon className='w-5 h-5 text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-75' />
                </a>
              </DockIcon>
            </DockItem>
          );
        })}

        {/* Divider */}
        <div className='h-8 w-px bg-white/20 dark:bg-white/10 mx-1' />

        {/* Theme Toggle */}
        <DockItem
          className='glass-dock-item aspect-square rounded-full backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/40 dark:border-white/30 hover:bg-white/70 dark:hover:bg-white/40 transition-all duration-75'
          style={{
            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.25), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button
              onClick={handleThemeToggle}
              className='h-full w-full flex items-center justify-center group'
              aria-label='Toggle theme'
            >
              {mounted && theme === 'dark' ? (
                <Sun className='w-5 h-5 text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-75' />
              ) : (
                <Moon className='w-5 h-5 text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-75' />
              )}
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}

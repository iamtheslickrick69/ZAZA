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
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Show dock on scroll
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);

    // Show initially for 3 seconds, then hide
    const initialTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(initialTimeout);
    };
  }, [isHovered]);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out'
      style={{
        transform: `translate(-50%, ${isVisible || isHovered ? '0' : '120%'})`,
        opacity: isVisible || isHovered ? 1 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Dock className='items-end pb-3'>
        {/* Brand Icon */}
        <DockItem className='aspect-square rounded-full bg-muted'>
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
              className='aspect-square rounded-full bg-muted'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <a
                  href={item.href}
                  className='h-full w-full flex items-center justify-center'
                >
                  <Icon className='h-full w-full text-muted-foreground' />
                </a>
              </DockIcon>
            </DockItem>
          );
        })}

        {/* Theme Toggle */}
        <DockItem className='aspect-square rounded-full bg-muted'>
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button
              onClick={handleThemeToggle}
              className='h-full w-full flex items-center justify-center'
              aria-label='Toggle theme'
            >
              {mounted && theme === 'dark' ? (
                <Sun className='h-full w-full text-muted-foreground' />
              ) : (
                <Moon className='h-full w-full text-muted-foreground' />
              )}
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}

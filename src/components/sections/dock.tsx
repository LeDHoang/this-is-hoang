'use client';

import React from 'react';
import {
  Home as HomeIcon,
  User as UserIcon,
  Code as CodeIcon,
  Briefcase as BriefcaseIcon,
  BookOpen as BookOpenIcon,
  Star as StarIcon,
  Mail as MailIcon,
} from 'lucide-react';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';

const navItems = [
  { title: 'Home', icon: <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#home' },
  { title: 'Bio', icon: <UserIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#bio' },
  { title: 'Projects', icon: <CodeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#projects' },
  { title: 'Experience', icon: <BriefcaseIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#experience' },
  { title: 'Education', icon: <BookOpenIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#education' },
  { title: 'Skills', icon: <StarIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#skills' },
  { title: 'Contact', icon: <MailIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />, href: '#contact' },
];

export function BottomDock() {
  return (
    <div className='fixed bottom-0 left-0 w-full flex justify-center z-50'>
      <Dock className='items-end pb-3'>
        {navItems.map((item, idx) => (
          <a key={idx} href={item.href} className='outline-none'>
            <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
      </Dock>
    </div>
  );
} 
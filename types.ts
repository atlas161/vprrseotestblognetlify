import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  colSpan: number;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  SERVICES = 'services',
  BLOG = 'blog',
  TECH = 'tech',
  GALLERY = 'gallery',
  ZONE = 'zone',
  REVIEWS = 'reviews',
  CONTACT = 'contact'
}

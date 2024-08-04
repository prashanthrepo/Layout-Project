// 'use client';
import Carousel01 from '@/public/images/carousel-01.jpg';
import Carousel02 from '@/public/images/carousel-02.jpg';
import Carousel03 from '@/public/images/carousel-03.jpg';
import Carousel04 from '@/public/images/carousel-04.jpg';
import Carousel05 from '@/public/images/carousel-05.jpg';
import { Metadata } from 'next';
import Hero from '@/components/hero';
import Faqs from '@/components/faqs';
import Footer from '@/components/ui/footer';
import HeaderMain from '@/components/ui/headerMain';
import ListingSlider from '@/components/ui/listingSlider';
export const metadata: Metadata = {
  title: 'Paypersqft - Dashboard',
  description: 'Paypersqft - Buy plots online',
};

const homepagelistings = [
  {
    title: 'Adithya homes, Lavender hills, Bangalore',
    priceRange: '3,500 sqft - 5,500 sqft',
    image:
      'https://photos.zillowstatic.com/fp/5b71ec386771bd6d6da31ce5669980e6-p_d.jpg',
    location: 'Adithya homes, lavender hills, Bangalore',
    status: 'Available',
  },
  {
    title: 'Pristan homes, Lakeside, Bangalore',
    priceRange: '6,500 sqft - 8,500 sqft',
    image:
      'https://photos.zillowstatic.com/fp/6d5b6fca3dcc4ba0aece6a62ca2ad827-p_d.jpg',
    location: 'Pristan homes, Lakeside, Bangalore',
    status: 'Available',
  },
  {
    title: 'Brigade Villas, Bangalore',
    priceRange: '8,500 sqft - 12,500 sqft',
    image:
      'https://photos.zillowstatic.com/fp/3a0b5cb2f53e19acbf9ed2ffe368090d-p_d.jpg',
    location: 'Brigade Villas, Bangalore',
    status: 'Available',
  },
  {
    title: 'Pristan homes, Lakeside, Bangalore',
    priceRange: '6,500 sqft - 8,500 sqft',
    image:
      'https://photos.zillowstatic.com/fp/78b18b0f619c7de85cee3a23272ccdf4-p_d.jpg',
    location: 'Pristan homes, Lakeside, Bangalore',
    status: 'Available',
  },
];
export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderMain />
      <main className="grow">
        <Hero />
        <ListingSlider data={homepagelistings} />
      </main>
      <Footer />
    </div>
  );
}

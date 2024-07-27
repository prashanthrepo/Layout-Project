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
    image: Carousel01,
    location: 'Adithya homes, lavender hills, Bangalore',
    status: 'Available',
  },
  {
    title: 'Pristan homes, Lakeside, Bangalore',
    priceRange: '6,500 sqft - 8,500 sqft',
    image: Carousel02,
    location: 'Pristan homes, Lakeside, Bangalore',
    status: 'Available',
  },
  {
    title: 'Brigade Villas, Bangalore',
    priceRange: '8,500 sqft - 12,500 sqft',
    image: Carousel03,
    location: 'Brigade Villas, Bangalore',
    status: 'Available',
  },
  {
    title: 'Pristan homes, Lakeside, Bangalore',
    priceRange: '6,500 sqft - 8,500 sqft',
    image: Carousel04,
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

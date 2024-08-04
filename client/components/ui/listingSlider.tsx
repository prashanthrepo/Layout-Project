'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Illustration from '@/public/images/features-illustration.svg';

import Icon01 from '@/public/images/icon-01.svg';
import Icon02 from '@/public/images/icon-02.svg';
import Icon03 from '@/public/images/icon-03.svg';
import Icon04 from '@/public/images/icon-04.svg';

// Import Swiper
import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper.min.css';
Swiper.use([Navigation]);

export default function ListingSlider({ data }) {
  useEffect(() => {
    const carousel = new Swiper('.carousel', {
      slidesPerView: 'auto',
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    });
  }, []);

  return (
    <section className="relative text-black">
      {/* Bg */}
      <div className="absolute inset-0 -z-10" aria-hidden="true" />

      {/* Illustration */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">
          {/* Section header */}
          <div className="flex space-between pb-8 md:pb-12">
            <div>
              <h2 className="h5 sm:h4  ">
                Plots and villas near Varthur, Bangalore.
              </h2>
              <span className="text-sm sm:text-base">
                Based on homes you recently viewed
              </span>
            </div>
            <div className="hidden sm:flex grow justify-end space-x-3">
              <button className="carousel-prev relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
                <span className="sr-only">Previous</span>
                <svg
                  className="fill-white group-hover:fill-white transition duration-150 ease-in-out"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m3.914 5 3.5-3.5L6 .086 1.086 5H1v.086L.086 6 1 6.914V7h.086L6 11.914 7.414 10.5 3.914 7H13V5z" />
                </svg>
              </button>
              <button className="carousel-next relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
                <span className="sr-only">Next</span>
                <svg
                  className="fill-white group-hover:fill-white transition duration-150 ease-in-out"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m9.086 5-3.5-3.5L7 .086 11.914 5H12v.086l.914.914-.914.914V7h-.086L7 11.914 5.586 10.5l3.5-3.5H0V5z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="pb-12 md:pb-16">
            <div className="carousel swiper-container max-w-sm mx-auto sm:max-w-none">
              <div className="swiper-wrapper  flex space-x-2">
                {data?.map((item, key) => (
                  <div
                    className="swiper-slide rounded-2xl max-w-[346px] h-auto  bg-white shadow-lg"
                    key={key}>
                    <Image
                      className="w-full aspect-[4/2] object-cover h-full"
                      src={item?.image}
                      height="235"
                      width="200"
                      alt="Carousel 01"
                    />
                    <div className="p-5">
                      <h4 className="text-lg truncate">{item?.title}</h4>
                      <p className="mt-1 text-sm font-bold">
                        {item?.priceRange} | {item?.status}
                      </p>
                      <p className="mt-1 text-sm">{item?.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

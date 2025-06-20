"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

type ProductGalleryProps = {
  images: { src: string }[];
  productName: string;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const hasImages = images && images.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg border bg-background">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full aspect-square  overflow-hidden"
        >
          {hasImages ? (
            images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={`${productName} ${idx + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src="/placeholder.svg"
                  alt={productName}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {hasImages && images.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="w-full"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-16 h-16 cursor-pointer">
                <Image
                  src={image.src}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded border"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductGallery;

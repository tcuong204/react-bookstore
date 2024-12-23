"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import Link from "next/link";
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 320px;

  .swiper-slide {
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: red;
  }
  .swiper-button-prev {
    color: #ccc;
    height: calc(var(--swiper-navigation-size) / 44 * 27);
    border-radius: 50px;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
  }
  .swiper-button-prev:after {
    font-size: 8px;
  }
  .swiper-button-next:after {
    font-size: 8px;
  }
  .swiper-button-next:hover {
    transform: scale(1.5);
  }
  .swiper-button-prev:hover {
    transform: scale(1.5);
  }
  .swiper-pagination-bullet-active {
    width: 25px;
    border-radius: 8px;
  }
  .swiper-button-next {
    color: #ccc;
    transition: transform 0.3s ease-in-out;
    height: calc(var(--swiper-navigation-size) / 44 * 27);
    background-color: #fff;
    border-radius: 15px;
  }
`;
export default () => {
  return (
    <div>
      <StyledSwiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={60}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop
        style={{ width: 800 }}
      >
        <SwiperSlide>
          <Link href="/products">
            <img src="https://cdn0.fahasa.com/media/magentothem/banner7/trangpatnership_840x320.jpg"></img>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/products">
            <img src="https://cdn0.fahasa.com/media/magentothem/banner7/herobanner_1512_840x320.jpg"></img>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/products">
            <img src="https://cdn0.fahasa.com/media/magentothem/banner7/BlindboxT1224_banner_840x320.jpg"></img>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/products">
            <img src="https://cdn0.fahasa.com/media/magentothem/banner7/laprap1224_laprap1124_slide_840x320.jpg"></img>
          </Link>
        </SwiperSlide>
      </StyledSwiper>
    </div>
  );
};

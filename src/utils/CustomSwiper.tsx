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
const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 316px;

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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </StyledSwiper>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

export default function Modal({ images, onClose }) {
  useEffect(() => {
    console.log('Modal received images:', images);
  }, [images]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        <Swiper
          className='modal-swiper-container'
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}>
          {images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <img src={imgSrc} alt="" className="modal-image" />
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="close-button" onClick={onClose}>✖</span>
      </div>
    </div>
  );
}

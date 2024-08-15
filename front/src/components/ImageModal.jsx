import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import '../css/imgmodal.css'
import 'swiper/css/pagination';


export default function ImageModal ({linkModal}) {

  return (
    <div >
      <div>
        <div className='modal-box'></div>
        <div className='modal-content-box'>
          <div className='modal-img-box'>
            <div onClick={linkModal} className='modal-close'>✖</div>
            <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{delay: 3500,
                      disableOnInteraction: false,}}
                    pagination={{ clickable: true }}>
              <SwiperSlide>       
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/1.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/2.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/3.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/4.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/5.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/6.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/7.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/8.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
              <img className='modal-img' src="http://woljeongyeonga.com/uploads/main/introduction/a/sero/9.jpg" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      
    </div>
  );
}
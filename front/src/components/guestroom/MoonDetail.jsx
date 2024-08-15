import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Modal from "./Modal.jsx";
import { useIntersectionObserver } from "../modules/useIntersectionObserver.js";

export default function MoonDetail({
  title,
  info,
  initpeople,
  maxpeople,
  img1,
  img2,
  img3,
  img4,
  img5,
  rdsize,
}) {
  const [modalImages, setModalImages] = useState([]);

  const introductionRef = useIntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains("fade-in")) {
            entry.target.classList.add("fade-in");
          }
        } else {
          entry.target.classList.remove("fade-in");
        }
      });
    },
    { threshold: 0.01 }
  );

  const descRef = useIntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains("fade-in")) {
            entry.target.classList.add("fade-in");
          }
        } else {
          entry.target.classList.remove("fade-in");
        }
      });
    },
    { threshold: 0.01 }
  );

  const openModal = (images) => {
    console.log("Opening modal with images:", images);
    setModalImages(images);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalImages([]);
  };

  return (
    <div className="moon-detail">
      <div ref={introductionRef} className="introduction animation-right">
        <Swiper
          className="swiper-container"
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {[img1, img2, img3, img4, img5].map((imgSrc, index) => {
            if (imgSrc) return (
              <SwiperSlide key={index}>
                <div
                  className="introduction-img"
                  onClick={() => openModal([img1, img2, img3, img4, img5].filter((img) => img !== "" && img !== null))}
                >
                  <img src={imgSrc} alt="" />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div ref={descRef} className="desc animation-left">
        <div className="title">{title}</div>
        <div>
          {info && <p>{info.split("<br />").map((line) => (
            <>
              {line}<br />
            </>
          ))}</p>}
          <br />
          {initpeople && <p>기준 {initpeople}인/최대 {maxpeople}인</p>}
          {/* <br /> */}
          {rdsize && <p>{rdsize}</p>}
        </div>
      </div>

      {modalImages.length > 0 && (
        <Modal images={modalImages} onClose={closeModal} />
      )}
    </div>
  );
}

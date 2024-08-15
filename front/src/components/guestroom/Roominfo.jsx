import React from 'react';
import { useIntersectionObserver } from '../modules/useIntersectionObserver';

export default function Roominfo({ livingroominfo, bedroominfo, kitcheninfo, bathroominfo, zacuziinfo, tubinfo, poolinfo }) {
  const SpanRef = useIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in');
        }
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.01 });

  const infoRef = useIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in');
        }
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.01 });

  const infoRef2 = useIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in');
        }
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.01 });

  const infoRef3 = useIntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains('fade-in')) {
          entry.target.classList.add('fade-in');
        }
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.01 });
  console.log("bathroominfo => ", bathroominfo);

  return (
    <div className="room-information">
      <div ref={SpanRef} className='title animation-left'>
        <span > INFORMATION</span>
      </div>
      <div ref={infoRef} className="room-info-container animation-up">
        <div className="room-info-box">
          <div className="room-info-box-title">LIVING ROOM</div>
          <ul className="room-info-box-text-wrap">
            {livingroominfo && livingroominfo.split("<br />").map((line) => (
              <li>
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="room-info-box">
          <div className="room-info-box-title">BEDROOM</div>
          <ul className="room-info-box-text-wrap">
            {bedroominfo && bedroominfo.split("<br />").map((line) => (
              <li>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div ref={infoRef2} className="room-info-container animation-up">
        <div className="room-info-box">
          <div className="room-info-box-title">KITCHEN</div>
          <ul className="room-info-box-text-wrap">
            {kitcheninfo && kitcheninfo.split("<br />").map((line) => (
              <li>
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="room-info-box">
          <div className="room-info-box-title">BATHROOM</div>
          <ul className="room-info-box-text-wrap">
            {bathroominfo && bathroominfo.split("<br />").map((line) => (
              <li>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {(zacuziinfo || tubinfo || poolinfo) && (
        <div ref={infoRef3} className="room-info-container animation-up">
          {zacuziinfo && (
            <div className="room-info-box">
              <div className="room-info-box-title">JACUZZI</div>
              <ul className="room-info-box-text-wrap">
                <li>{zacuziinfo}</li>
              </ul>
            </div>
          )}
          {tubinfo && (
            <div className="room-info-box">
              <div className="room-info-box-title">TUB</div>
              <ul className="room-info-box-text-wrap">
                <li>{tubinfo}</li>
              </ul>
            </div>
          )}
          {poolinfo && (
            <div className="room-info-box">
              <div className="room-info-box-title">POOL</div>
              <ul className="room-info-box-text-wrap">
                <li>{poolinfo}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
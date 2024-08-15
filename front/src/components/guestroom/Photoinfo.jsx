import React from 'react';
import { useIntersectionObserver } from '../modules/useIntersectionObserver';


export default function Photoinfo({ into }) {
  const photoinfoRef = useIntersectionObserver((entries, observer) => {
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

  return (
    <div ref={photoinfoRef} className="view-img-info animation-right">{into}</div>
  );
}
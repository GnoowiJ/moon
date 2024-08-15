import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/reservationDetail.css';
import RevDetailComp from '../../components/reservations/RevDetailComp';

export default function ReservationDetail() {
  return (
    <div className="a-outlet">
      <RevDetailComp isAdmin={true}></RevDetailComp>
    </div>
  );
}

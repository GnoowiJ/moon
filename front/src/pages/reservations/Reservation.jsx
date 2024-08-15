import React from "react";
import "../../css/reservation.css";
import TitleImage from "../../components/TitleImage.jsx";
import RevComp from "../../components/reservations/RevComp.jsx";


export default function Reservation() {
 
  return (
    <div className="outlet">
      <TitleImage img="/img/reservation_top.jpg" title="실시간 예약" />
      <RevComp isAdmin={false} />
    </div>
  );
}

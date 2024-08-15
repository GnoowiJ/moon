import React from "react";

export default function TitleImage({ img, title }) {
  return (
    <div className="title">
      <img src={img} alt="Landscape" />
      <div className="title-text">{title}</div>
    </div>
  );
}

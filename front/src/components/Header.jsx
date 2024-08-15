import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    const handleShow = () => {
      if (400 < window.scrollY) {
        setIsShow(false)
      } else if (400 > window.scrollY) {
        setIsShow(true)
      }
    }
    window.addEventListener("scroll", handleShow)
    return () => {
      window.removeEventListener("scroll", handleShow)
    }
  }, [])

  return (
    <div className="header-main">
      <div className="header-background">
        <div className="header-content">
          <div>
            <Link to="/">
              <img
                className="header-logo"
                src="http://woljeongyeonga.com/uploads/logo-color-v3.png"
                alt=""
              />
            </Link>
          </div>
          <nav className="header-nav">
            <div className="nav-list">
              <Link to="/outsideview">
                <h3>외관</h3>
              </Link>
                <div className={isShow ? "nav-1 show" : "nav-1 none"}>
                  <Link to="/outsideview">외부전경</Link>
                </div>
            </div>
            <div className="nav-list">
              <Link to="/guestroomlocation">
                <h3>객실</h3>
              </Link>
                <div className={isShow ? "nav-2 show" : "nav-2 none"}>
                  <div>
                  <Link to="/guestroomlocation">객실위치</Link>
                  </div>
                  <div className="nav-2-box"> 
                    <div>
                      <Link to="/room/A101"><p>A101호</p></Link>
                      <Link to="/room/A102"><p>A102호</p></Link>
                      <Link to="/room/A201"><p>A201호</p></Link>
                    </div>
                    <div>
                      <Link to="/room/B105"><p>B105호</p></Link>
                      <Link to="/room/B106"><p>B106호</p></Link>
                      <Link to="/room/B205"><p>B205호</p></Link>
                    </div>
                  </div>
                  <div>
                  <Link to="/cafe"> 카페(공용주방)</Link>
                  </div>  
                </div>
            </div>
            <div className="nav-list">
              <Link to="/gallery">
                <h3>갤러리</h3>
              </Link>
                <div className={isShow ? "nav-3 show" : "nav-3 none"}>
                  <Link to="/gallery">갤러리</Link>
                </div>
            </div>
            <div className="nav-list">
              <Link to="/information">
                <h3>안내</h3>
              </Link>
                <div className={isShow ? "nav-4 show" : "nav-4 none"}>
                  <Link to="/information/reserve">예약안내</Link>
                  <Link to="information/location">오시는 길</Link>
                  <Link to="information/nearbytravel">주변 여행지</Link>
                </div>
            </div>
            <div className="nav-list">
              <Link to="/reservation">
                <h3>실시간예약</h3>
              </Link>
                <div className={isShow ? "nav-5 show" : "nav-5 none"}>
                  <Link to="/reservation">예약하기</Link>
                  <Link to="/reservation/check">예약확인/취소</Link>
                </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

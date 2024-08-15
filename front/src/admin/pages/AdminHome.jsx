import React from 'react';

import '../css/adminHome.css';
import axios from 'axios';
import * as cookie from '../../util/cookies';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getAdmin } from '../../util/localStorage';
import CheckInOut from './CheckInOut';

export default function AdminHome() {
  const adminInfo = getAdmin();
  const navigate = useNavigate();
  // 로그인 테스트
  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginObj = {};
    formData.forEach((value, key) => (loginObj[key] = value));
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/adminAccount/login",
      data: loginObj
    }).then((result) => {
      const rst = result.data.cnt;
      if (rst) {
        cookie.setCookie("x-auth-jwt", result.data.token, null);
        const adminInfo = jwtDecode(result.data.token);
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        alert("로그인 성공");
        navigate("/admin");
      } else alert("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
    }).catch((error) => console.log(error));
  }

  return (
    <>
      {adminInfo ? <AdminMain /> : <AdminLoginPage handleLogin={handleLogin} />}
    </>
  );
}

function AdminLoginPage({ handleLogin }) {
  return (
    <div className="outlet admin-home">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <h2>관리자 로그인</h2>
          <div className="login-inputs">
            <p>
              아이디 <input type="text" name="id" />
            </p>
            <p>
              비밀번호 <input type="password" name="pw" />
            </p>
          </div>
          <button className="btn-white login-btn" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminMain() {
  return <CheckInOut />;
}

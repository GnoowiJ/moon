import React from 'react';
import '.././admin/css/error404.css';
import { Link } from 'react-router-dom';
export default function Error404({ message, isAdmin }) {
  return (
    <div className="error">
      <h2>{message}</h2>
      <Link to={isAdmin ? '/admin' : '/'} className="btn-green">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

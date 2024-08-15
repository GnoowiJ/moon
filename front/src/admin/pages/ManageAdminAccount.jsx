import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getAdmin } from '../../util/localStorage';
import Error404 from '../../components/Error404';
import '../css/manageaccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ManageAdminAccount() {
  const [isIdDuple, setIsIdDuple] = useState(false);
  const [formData, setFormData] = useState({ id: "", pw: "", aname: "" });
  const [toggle, setToggle] = useState({ list: true, create: false });
  const [adminList, setAdminList] = useState([]);
  const adminInfo = getAdmin();

  useEffect(() => {
    getAdminList();
  }, [])

  /**
   * 관리자 계정 생성 formData 만들기(id의 경우 id 중복체크도 진행)
   * @param {*} e 
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "id") checkIdDuple(value);
  }

  /**
   * 관리자 계정 생성(서버 연동)
   * @param {*} e 
   */
  function createAdminAccount(e) {
    e.preventDefault();
    if (validateCheck(formData)) {
      if (!isIdDuple) {
        axios({
          method: "post",
          url: "http://127.0.0.1:8080/adminAccount/createAdminAccount",
          data: formData
        }).then((result) => {
          if (result.data.cnt) {
            alert("계정 생성 완료.");
            setToggle({ list: true, create: false });
            setFormData({ id: "", pw: "", aname: "" });
            getAdminList();
          }
        }).catch((error) => alert("계정 생성 중 오류가 발생했습니다."));
      } else alert("입력한 아이디를 확인하고 다시 입력하세요.");
    } else alert("각 항목을 빠짐없이 입력하세요.");
  }

  /**
   * validation check
   * @param {*} data 
   * @returns 
   */
  function validateCheck(data) {
    let flag = true;
    if (!data.id) flag = false;
    else if (!data.pw) flag = false;
    else if (!data.aname) flag = false;
    return flag;
  }

  /**
   * 관리자 id 중복체크
   * @param {*} id 
   */
  function checkIdDuple(id) {
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/adminAccount/checkidduple",
      data: { id: id }
    }).then((result) => {
      if (result.data.cnt) setIsIdDuple(true);
      else setIsIdDuple(false);
    })
  }

  /**
   * 메뉴 toggle
   * @param {*} menu 
   */
  function handleToggle(menu) {
    if (menu === "list") setToggle({ list: true, create: false });
    else if (menu === "create") setToggle({ list: false, create: true });
  }

  /**
   * 관리자 계정 리스트 조회
   */
  function getAdminList() {
    axios.get("http://127.0.0.1:8080/adminAccount/getAdminAccount")
      .then((result) => {
        console.log(result.data);
        setAdminList(result.data)
      })
      .catch((error) => console.log(error));
  }

  /**
   * 관리자 계정 삭제
   * @param {*} aid 
   * @param {*} aname 
   */
  function handleDeleteAdmin(aid, aname) {
    const confirm = window.confirm(`${aname} 계정을 삭제하시겠습니까?`);
    if (confirm) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8080/adminAccount/deleteAdminAccount",
        data: { aid: aid }
      }).then((result) => {
        if (result.data.cnt) {
          alert(`${aname} 계정이 삭제되었습니다.`);
          setToggle({ list: true, create: false });
          getAdminList();
        }
      }).catch((error) => alert(`${aname} 계정 삭제 중 오류가 발생했습니다.`));
    }
  }

  if (adminInfo) {
    if (adminInfo.isSuper) {
      return (
        <div className='outlet manageaccount-outlet'>
          <div className='manageaccount-menu'>
            <div className={`manageaccount-menu-list ${toggle.list ? "active" : ""}`} onClick={() => handleToggle("list")}>계정 목록</div>
            <div className={`manageaccount-menu-list ${toggle.create ? "active" : ""}`} onClick={() => handleToggle("create")}>계정 생성</div>
          </div>
          <div>
            {toggle.list && <ManageAccount adminList={adminList} handleDeleteAdmin={handleDeleteAdmin} />}
            {toggle.create && <CreateAdminAccountPage createAdminAccount={createAdminAccount} handleChange={handleChange}
              formData={formData} isIdDuple={isIdDuple} />}
          </div>
        </div>
      );
    } else return <Error404 message={"접근 권한이 없습니다. 담당자에게 문의하세요."} isAdmin={true} />
  } else return <Error404 message={"접근 권한이 없습니다."} isAdmin={true} />;
}

/**
 * 관리자 계정 목록 화면
 * @param {*} param0 
 * @returns 
 */
function ManageAccount({ adminList, handleDeleteAdmin }) {
  return (
    <div className='manageaccount-box'>
      <h2>관리자 계정 목록</h2>
      <ul className="manageaccount-lists">
        {adminList.map((admin, index) => (
          <li key={index}>
            <span>{admin.a_name}</span>
            <button
              className="season-delete-button"
              onClick={() => handleDeleteAdmin(admin.a_id, admin.a_name)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 관리자 계정 생성 화면
 * @param {*} param0 
 * @returns 
 */
function CreateAdminAccountPage({ createAdminAccount, handleChange, formData, isIdDuple }) {
  return (
    <div className="login-box">
      <form onSubmit={createAdminAccount}>
        <h2>관리자 계정 생성</h2>
        <div className="login-inputs">
          <p>
            아이디 <input type="text" name="id" value={formData.id} onChange={handleChange} />
          </p>
          <p>
            {formData.id ? (!isIdDuple ? <span>사용 가능한 아이디입니다.</span> : <span style={{ color: "#f00" }}>해당 아이디는 이미 사용중입니다.</span>) : ""}
          </p>
          <p>
            비밀번호 <input type="password" name="pw" value={formData.pw} onChange={handleChange} />
          </p>
          <p>
            이름 <input type="text" name="aname" value={formData.aname} onChange={handleChange} />
          </p>
        </div>
        <button className="btn-white login-btn" type="submit">
          계정 생성
        </button>
      </form>
    </div>
  );
}
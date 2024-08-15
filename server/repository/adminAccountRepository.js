import { db } from "../db/db_mysql80.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * 관리자 로그인 처리
 * @param {*} id 
 * @param {*} pw 
 * @returns 
 */
export const adminLogin = async (id, pw) => {
  const sql = `
    SELECT COUNT(a_id) AS cnt,
     ANY_VALUE(a_pw) AS a_pw,
     ANY_VALUE(a_name) AS a_name,
     ANY_VALUE(is_super) AS is_super 
    FROM admins
    WHERE a_id = ?
  `;
  const result = {};
  let loginResult = 0;
  let loginToken = "";
  // id로 먼저 정보 조회
  try {
    const [result] = await db.execute(sql, [id]);
    const getUser = result[0];

    if (getUser.cnt) {
      // 비밀번호 비교(bcrypt 적용)
      if (bcrypt.compareSync(pw, getUser.a_pw)) {
        loginResult = 1;
        // token
        loginToken = jwt.sign({ adminId: id, adminName: getUser.a_name, isSuper: getUser.is_super }, "bW9vbkFkbWlu");
      }
    }
  } catch (error) { console.log("login Error Check => ", error); }
  result.cnt = loginResult;
  result.token = loginToken;
  return result;
}

/**
 * 관리자 계정 생성
 * @param {*} adminData 
 * @returns 
 */
export const createAdminAccount = async (adminData) => {
  const sql = `
    INSERT INTO admins(a_id, a_pw, a_name, is_super)
    VALUES (?, ?, ?, false)
  `;

  const params = [adminData.id, bcrypt.hashSync(adminData.pw, 7), adminData.aname];
  return db.execute(sql, params)
    .then((result) => {
      return { cnt: result[0].affectedRows }
    })
    .catch((error) => console.log(error));
};

/**
 * 아이디 중복 체크
 * @param {*} id 
 * @returns 
 */
export const checkIdDuple = async (id) => {
  const sql = `
    SELECT COUNT(*) AS cnt FROM admins
    WHERE a_id = ?
  `
  return db.execute(sql, [id])
    .then((result) => result[0][0])
    .catch((error) => console.log(error));
}

/**
 * 관리자 계정 리스트 조회
 * @returns 
 */
export const getAdminAccount = async () => {
  const sql = `
    SELECT * FROM admins
    WHERE is_super = false
  `;

  return db.execute(sql)
    .then((result) => result[0])
    .catch((error) => console.log(error));
}

/**
 * 관리자 계정 삭제
 * @param {*} aid 
 * @returns 
 */
export const deleteAdminAccount = async (aid) => {
  const sql = `
    DELETE FROM admins
    WHERE a_id = ?
  `;

  return db.execute(sql, [aid])
    .then((result) => {
      return { cnt: result[0].affectedRows }
    }).catch((error) => console.log(error));
}
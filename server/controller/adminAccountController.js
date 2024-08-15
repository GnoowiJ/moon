import * as repository from "../repository/adminAccountRepository.js";

/**
 * 관리자 로그인 처리 controller
 * @param {*} req 
 * @param {*} res 
 */
export const adminLogin = async (req, res) => {
  const { id, pw } = req.body;
  const result = await repository.adminLogin(id, pw);
  console.log("login result => ", result);
  res.json(result);
  res.end();
};

/**
 * 관리자 계정 생성 controller
 * @param {*} req 
 * @param {*} res 
 */
export const createAdminAccount = async (req, res) => {
  const adminData = req.body;
  const result = await repository.createAdminAccount(adminData);
  res.json(result);
  res.end();
}

/**
 * 아이디 중복 체크 controller
 * @param {*} req 
 * @param {*} res 
 */
export const checkIdDuple = async (req, res) => {
  const { id } = req.body;
  const result = await repository.checkIdDuple(id);
  res.json(result);
  res.end();
}

/**
 * 관리자 계정 리스트 조회 controller
 * @param {*} req 
 * @param {*} res 
 */
export const getAdminAccount = async (req, res) => {
  const result = await repository.getAdminAccount();
  res.json(result);
  res.end();
}

/**
 * 관리자 계정 삭제 controller
 * @param {*} req 
 * @param {*} res 
 */
export const deleteAdminAccount = async (req, res) => {
  const { aid } = req.body;
  res.json(await repository.deleteAdminAccount(aid));
  res.end();
}
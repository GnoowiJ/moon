import * as repository from "../repository/reservationRepository.js";
import * as roomRepository from "../repository/roomRepository.js";

/**
 * 예약현황 조회 controller
 * 1) 예약리스트 조회 => reservationRepository에서 진행
 * 2) 객실리스트 조회 => roomReposotiry에서 진행
 * @param {*} req 
 * @param {*} res 
 */
export const getRevList = async (req, res) => {
  const getParam = req.body;
  const params = [];
  getParam.forEach((get) => {
    params.push(get.fullDate);
  })
  const revList = await repository.getRevList(params);
  const roomList = await roomRepository.getRoomList();
  res.json({ revList: revList, roomList: roomList });
  res.end();
};

export const getStatistics = async (req, res) => {
  const result = await repository.getStatistics();
  res.json(result);
  res.end();
}
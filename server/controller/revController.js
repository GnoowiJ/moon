import * as repository from '../repository/revRepository.js';

export const getAvailableRooms = async (req, res) => {
  const params = req.body;
  // console.log(params);
  const result = await repository.getAvailableRooms(params);
  res.json(result);
  res.end();
};
export const getRoomInfo = async (req, res) => {
  const params = req.body.r_id;
  console.log([params]);
  const result = await repository.getRoomInfo([params]);
  res.json(result);
  res.end();
};
export const getRoomDetailsInfo = async (req, res) => {
  const params = req.body.r_id;
  console.log([params]);
  const result = await repository.getRoomDetailsInfo([params]);
  res.json(result);
  res.end();
};

//

export const putRevInfos = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.putRevInfos(params);
  res.json({ cnt: result });
  res.end();
};

//
export const confirmRev = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.confirmRev(params);
  res.json(result[0]);
  res.end();
};

export const confirmByEmail = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.confirmByEmail(params);
  res.json(result[0]);
  res.end();
};

//
export const getRevInfos = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.getRevInfos(params);
  res.json(result[0]);
  res.end();
};
//
export const updateRevState = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.updateRevState(params);
  res.json({ cnt: result });
  res.end();
};
export const deleteRev = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.deleteRev(params);
  res.json({ cnt: result });
  res.end();
};
export const getHistoryRevInfos = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.getHistoryRevInfos(params);
  res.json(result[0]);
  res.end();
};
//
export const getCheckinData = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.getCheckinData(params);
  console.log(result);
  res.json(result);
  res.end();
};
export const getCheckoutData = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.getCheckoutData(params);
  res.json(result);
  res.end();
};
export const getPresentData = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.getPresentData(params);
  res.json(result);
  res.end();
};
export const moveEndData = async (req, res) => {
  const params = req.body;
  console.log(params);
  const result = await repository.moveEndData(params);
  res.json({ cnt: result });
  res.end();
};

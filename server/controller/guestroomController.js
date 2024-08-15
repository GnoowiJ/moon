import * as repository from "../repository/guestroomRepository.js";

export const roomList = async (req, res) => {
  const result = await repository.roomList();

  res.json(result);
  res.end();

}
import * as repository from "../repository/popupRepository.js";

export const popupDelete = async (req, res) => {
  const {pid} = req.body;
  const result = await repository.popDelete(pid);

  res.json(result);
  res.end();
}

export const popupList = async (req, res) => {
  const result = await repository.popupList();
  res.json(result);
  res.end();
}

export const popupImg = async (req, res) => {
  const popImg = req.body;
  const result = await repository.popupImg(popImg)

  res.json(result);
  res.end();

}
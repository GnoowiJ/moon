import * as repository from "../repository/roomRepository.js";

export const getroomdetail = async (req, res) => {
  const { rid } = req.params;
  const roomResult = await repository.getroomdetail(rid);
  // console.log("12 ", roomResult);
  res.json(roomResult);
  res.end();
};



export const getroomprice = async (req, res) => {
  const { rid } = req.params;
  const roomprice = await repository.getRoomprice(rid);
  // console.log("12 ", roomResult);
  res.json(roomprice);
  res.end();
};

export const getpopdays = async (req, res) => {
  const popdays = await repository.getpopdays();
  res.json(popdays);
  res.end()
}

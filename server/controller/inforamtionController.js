import * as repository from "../repository/informationRepository.js";


export const infoPrice = async (req, res) => {
  const result = await repository.infoPrice()

  res.json(result);
  res.end();
}
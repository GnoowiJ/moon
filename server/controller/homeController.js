import * as repository from '../repository/homeRepository.js'

export const homePopup = async (req, res) => {
  const result = await repository.homePopImg()

  res.json(result);
  res.end();
}
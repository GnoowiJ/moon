import * as repository from '../repository/roompriceRepository.js';

export const upload = async (req, res) => {
  const {
    r_id,
    season,
    pop_weekday,
    pop_weekend,
    un_weekday,
    un_weekend,
    add_person,
  } = req.body;

  try {
    const result = await repository.insertRoomPrice(
      r_id,
      season,
      pop_weekday,
      pop_weekend,
      un_weekday,
      un_weekend,
      add_person
    );
    res.status(200).json({ message: 'Price added successfully!', result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding price', error });
  }
};

export const uploadSeason = async (req, res) => {
  const { start_date, end_date } = req.body;

  try {
    // Validate date format
    if (
      !start_date ||
      !end_date ||
      isNaN(new Date(start_date)) ||
      isNaN(new Date(end_date))
    ) {
      throw new Error('Invalid date format');
    }
    const newSeason = await repository.insertSeason(start_date, end_date);
    res.json(newSeason);
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await repository.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

export const getSeason = async (req, res) => {
  try {
    const seasons = await repository.getAllSeason();
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seasons', error });
  }
};

export const deleteSeason = async (req, res) => {
  const { pop_id } = req.params;

  try {
    await repository.deleteSeason(pop_id);
    res.status(200).json({ message: 'Season deleted successfully!' });
  } catch (error) {
    console.error('성수기 기간 삭제 중 오류가 발생했습니다.', error);
    res.status(500).json({ error: '성수기 기간 삭제 중 오류가 발생했습니다.' });
  }
};

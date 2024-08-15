import { db } from '../db/db_mysql80.js';

// 객실 가격 정보를 데이터베이스에 삽입
export const insertRoomPrice = async (
  r_id,
  season,
  pop_weekday,
  pop_weekend,
  un_weekday,
  un_weekend,
  add_person
) => {
  const isDuple = await selectRoomExistingPrice(r_id);
  console.log('가격정보 존재 여부 ==> ', isDuple.cnt);
  let sql = '';
  let params = null;
  if (isDuple.cnt) {
    // update
    if (season === '성수기') {
      sql = `
                UPDATE price SET pop_weekday = ?,
                    pop_weekend = ?,
                    add_person = ?
                WHERE r_id = ?
            `;
      params = [pop_weekday, pop_weekend, add_person, r_id];
    } else if (season === '비수기') {
      sql = `
                UPDATE price SET un_weekday = ?,
                    un_weekend = ?,
                    add_person = ?
                WHERE r_id = ?
            `;
      params = [un_weekday, un_weekend, add_person, r_id];
    }
  } else {
    // insert
    sql = `
            INSERT INTO price (r_id, pop_weekday, pop_weekend, un_weekday, un_weekend, add_person)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    params = [
      r_id,
      pop_weekday,
      pop_weekend,
      un_weekday,
      un_weekend,
      add_person,
    ];
  }

  return db
    .execute(sql, params)
    .then((result) => result[0])
    .catch((error) => {
      console.error('Error inserting room price:', error);
      throw error;
    });
};

// 모든 방 목록을 조회
export const getAllRooms = async () => {
  const sql = `
        SELECT gu.r_id,
    pr.pop_weekday,
    pr.pop_weekend,
    pr.un_weekday,
    pr.un_weekend,
    pr.add_person
FROM guestroom gu
LEFT OUTER JOIN price pr ON gu.r_id = pr.r_id
    `;

  return db
    .execute(sql)
    .then((result) => result[0])
    .catch((error) => {
      console.error('Error fetching rooms:', error);
      throw error;
    });
};

// 성수기 기간 조회
export const getAllSeason = async () => {
  const sql = `
        SELECT * FROM pop_days
    `;

  return db
    .execute(sql)
    .then((result) => result[0])
    .catch((error) => {
      console.error('Error fetching seasons:', error);
      throw error;
    });
};

// 성수기 기간을 데이터베이스에 삽입
export const insertSeason = async (start_date, end_date) => {
  const sql = `
        INSERT INTO pop_days (start_date, end_date)
        VALUES (?, ?)
    `;
  const params = [start_date, end_date];
  const sql2 = `
             SELECT * FROM pop_days
         `;
  return db
    .execute(sql, params)
    .then((result) => result[0].affectedRows)
    .then((result) => {
      if (result) {
        return db.execute(sql2).then((res) => res[0]);
      }
    })
    .catch((error) => {
      console.error('Error inserting season:', error);
      throw error;
    });
};

// 성수기 기간을 삭제
export const deleteSeason = async (pop_id) => {
  const sql = `
        DELETE FROM pop_days WHERE pop_id = ?
    `;
  const params = [pop_id];

  return db
    .execute(sql, params)
    .then((result) => result[0])
    .catch((error) => {
      console.error('Error deleting season:', error);
      throw error;
    });
};

// r_id로 가격정보가 존재하는지 여부 조회
const selectRoomExistingPrice = async (rid) => {
  const sql = `
        select COUNT(*) AS cnt 
        FROM price
        WHERE r_id = ?
    `;
  return db
    .execute(sql, [rid])
    .then((result) => result[0][0])
    .catch((error) => console.log(error));
};

import { db } from "../db/db_mysql80.js";

/**
 * 예약리스트 조회
 * @param {*} dateYearMonth 
 * @returns 
 */
export const getRevList = async (params) => {
  const sql = `
    SELECT * FROM
      (SELECT rev_id,
        r_id,
        c_name,
        DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS checkin_date,
        DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS checkout_date,
        rev_state
    FROM reservation
      UNION ALL
      SELECT rev_id,
        r_id,
        c_name,
        DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS checkin_date,
        DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS checkout_date,
        '퇴실 완료' AS rev_state
    FROM history) UR
      WHERE DATE_FORMAT(UR.checkin_date, '%Y-%m-%d') <= ?
      AND DATE_FORMAT(UR.checkout_date, '%Y-%m-%d') >= ?
  `;
  const selectArr = [];
  for (let i = 0; i < params.length; i++) {
    const [result] = await db.execute(sql, [params[i], params[i]]);
    result.forEach((rev) => {
      const revFilter = selectArr.filter((fil) => fil.rev_id === rev.rev_id)[0];
      if (!revFilter) selectArr.push(rev);
    })
  }
  return selectArr;
}

/**
 * 월별 통계 산출을 위한 당월 예약리스트 조회
 * @returns 
 */
export const getStatistics = async () => {
  const sql = `
  SELECT * FROM
        (SELECT rev_id,
          r_id,
          c_name,
          DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS checkin_date,
          DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS checkout_date,
          rev_state
      FROM reservation
        UNION ALL
        SELECT rev_id,
          r_id,
          c_name,
          DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS checkin_date,
          DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS checkout_date,
          '퇴실 완료' AS rev_state
      FROM history) UR
        WHERE DATE_FORMAT(UR.checkin_date, '%Y-%m') <= DATE_FORMAT(NOW(), '%Y-%m')
        OR DATE_FORMAT(UR.checkout_date, '%Y-%m') >= DATE_FORMAT(NOW(), '%Y-%m')
  `;

  return db.execute(sql)
    .then((result) => result[0])
    .catch((error) => console.log(error));
}
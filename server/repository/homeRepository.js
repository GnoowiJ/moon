import {db} from "../db/db_mysql80.js";

export const homePopImg = async () => {

  const sql = `
  select p_id, p_img from popup
  order by p_date desc
  `;

  return db.execute(sql)
          .then(result => result[0])
          .catch(error => console.log(error))
}
import {db} from "../db/db_mysql80.js";

/* popup delete */
export const popDelete = async (pid) => {
  console.log('repository=', pid);
  const sql = `
  delete from popup where p_id = ?
  `;

  return db.execute(sql, [pid])
          .then(result => {
            return {cnt : result[0].affectedRows}
          })
          .catch(error => console.log(error))
}


/* popup list 가져오기 */
export const popupList = async () => {

  const sql = `
  select p_id, p_img, p_date from popup
  order by p_date desc
  `;

  return db.execute(sql)
          .then(result => result[0])
          .catch(error => console.log(error));
}

 
/* popup img 등록 */
export const popupImg = async (popImg) => {
  let result_rows = 0;
  const sql = `
  insert into popup(p_img, p_date)
  values(?, now())
  `;
  if(!popImg.uploadImage){
    result_rows = 0;
  }else{
    try {
      const [rows] = await db.execute(sql, [popImg.uploadImage])
      result_rows = rows.affectedRows;
    } catch (error) {
      console.log(error);
    }
  }

  return {cnt: result_rows}
}
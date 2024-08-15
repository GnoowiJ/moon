import {db} from "../db/db_mysql80.js";

/* 갤러리 이미지 삭제 */

export const galleryDelete = async (gid) => {
  const sql = `
  delete from gallery where g_id = ?
  `;

  return db.execute(sql, [gid])
          .then((result) => {
            return {cnt: result[0].affectedRows};
          })
          .catch(error => console.log(error))
          
}


/* 이미지리스트 */
export const galleryList = async () => {
  const sql = `
  select g_id, g_img, g_name, DATE_FORMAT(g_date, '%Y-%m-%d') AS gdate, rev_id  from gallery
  order by g_date desc  
  `;

  return db 
      .execute(sql)
      .then((result) => result[0])
      .catch((error) => console.log(error));
}

/* 갤러리 이미지 등록 */
export const galleryUpload = async (imgUpload) => {
  const params = [
    imgUpload.uploadImage,
    imgUpload.gname,
    imgUpload.grev
  ]
  let result_rows = 0;
  const sql = `
  insert into gallery(g_img, g_name, g_date, rev_id)
  values(?, ?, now(), ?)
  `;

  if(!imgUpload.uploadImage){
    result_rows = 0
  }else{
    try{
      const [rows] = await db.execute(sql, params);
      console.log('rows-->', rows);
      result_rows = rows.affectedRows;
    } catch(error){
      console.log(error);
    }
  }


  return {cnt: result_rows}
}
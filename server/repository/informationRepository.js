import {db} from "../db/db_mysql80.js";


export const infoPrice = async () => {
  const sql = `
  select g.r_id, g.init_people as ini_people, g.max_people, 
  g.zacuzi, g.tub, g.pool, gd.size, p.pop_weekday, p.pop_weekend, p.un_weekday, p.un_weekend
  from guestroom g inner join guestroomdetail gd inner join price p on g.r_id = gd.r_id
  and g.r_id = p.r_id
  where gd.is_room = 1
  `;

  
  return db.execute(sql)
          .then(result=> result[0])
          .catch(error => console.log(error))
}
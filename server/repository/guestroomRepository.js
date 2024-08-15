import {db} from "../db/db_mysql80.js";

export const roomList = async () => {

  const sql = `
    select GR.r_id,
      GR.r_banner,
      GR.init_people,
      GR.max_people,
      GR.zacuzi,
      GR.tub,
      GR.pool,
      GD.rd_name,
      GD.is_room
      from guestroom GR inner join guestroomdetail GD ON GR.r_id = GD.r_id
      where GD.is_room = 1
    `

    return db.execute(sql)
            .then(result => result[0])
            .catch(error => console.log(error))
}
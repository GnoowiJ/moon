import { db } from "../db/db_mysql80.js";

export const getroomdetail = async (rid) => {
    const sql = `
    select GR.r_id,
        GR.r_banner,
        GR.size AS rsize,
        GR.init_people,
        GR.max_people,
        GR.facilities,
        GR.significant,
        GR.livingroom,
        GR.bedroom,
        GR.kitchen,
        GR.bathroom,
        GR.video,
        GR.zacuzi,
        GR.tub,
        GR.pool,
        GD.rd_id,
        GD.rd_name,
        GD.rd_info,
        GD.size AS rdsize,
        GD.img1,
        GD.img2,
        GD.img3,
        GD.img4,
        GD.img5,
        GD.is_room
        from guestroom GR inner join guestroomdetail GD ON GR.r_id = GD.r_id
    where GR.r_id = ?
    `


    return db.execute(sql, [rid])
        .then((result) => result[0])
        .catch((error) => console.log(error));
}

/**
 * 객실 리스트 조회
 * @returns 
 */
export const getRoomList = async () => {
    const sql = `
        SELECT r_id FROM guestroom
    `;
    return db.execute(sql)
        .then((result) => result[0])
        .catch((error) => console.log(error));
}


// 객실 가격 조회
export const getRoomprice = async (rid) => {
    const sql = `
    select * from  price where r_id = ?
    `
    return db.execute(sql, [rid])
        .then((result) => result[0][0])
        .catch((error) => console.log(error));
};

export const getpopdays = async () => {
    const sql = `
        SELECT pop_id,
        DATE_FORMAT(start_date, '%Y-%m-%d') as popStart,
        DATE_FORMAT(end_date, '%Y-%m-%d') as popEnd 
        FROM pop_days order by popStart 
    `;
    return db.execute(sql)
        .then((result) => result[0])
        .catch((error) => console.log(error));
};
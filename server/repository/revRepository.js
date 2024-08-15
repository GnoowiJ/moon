import { db } from '../db/db_mysql80.js';

// page1
export const getAvailableRooms = async (params) => {
  const roomParams = [
    params.startDate,
    params.startDate,
    params.endDate,
    params.endDate,
  ];
  const sql = `
  select r_id
  from guestroom
  where guestroom.r_id not in 
  (SELECT r_id
        FROM reservation
      WHERE
    ( DATE_FORMAT(c_checkin_date, '%Y-%m-%d')<=? and  DATE_FORMAT(c_checkout_date, '%Y-%m-%d')>? ) or 
    ( DATE_FORMAT(c_checkin_date, '%Y-%m-%d')<? and  DATE_FORMAT(c_checkout_date, '%Y-%m-%d')>=? ) )
    `;

  return db
    .execute(sql, roomParams)
    .then((result) => {
      console.log(params.startDate, result);
      return result[0];
    })
    .catch((error) => console.log(error));
};

export const getRoomInfo = async (params) => {
  const sql = `
select r_id, r_banner, init_people as ini_people, max_people from guestroom where r_id=?
    `;

  return db
    .execute(sql, params)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const getRoomDetailsInfo = async (params) => {
  const sql = `
select rd_name from guestroomdetail where r_id=? and is_room = 0
    `;

  return db
    .execute(sql, params)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

// page2
export const putRevInfos = async (params) => {
  let revParams;
  let sql;
  if (params.c_name === '관리자') {
    revParams = [
      params.rev_id,
      params.r_id,

      '관리자',
      '000000000000',
      '33.pairi',
      'gmail.com',

      '1',
      params.c_checkin_date,
      params.c_checkout_date,
      '0',
      params.c_message,

      0,
      0,
      0,
      0,
      0,
      0,
    ];
    sql = `
    insert into reservation(
      rev_id,
      r_id,
      
      c_name,
      c_phone,
      c_email_id,
      c_email_domain,
  
      c_nop,
      c_checkin_date,
      c_checkout_date,
      c_total_fee,
      c_message,
      
      s_more_p,
      s_bbq,
      s_meat,
      s_grill,
      s_hotpool,
      s_campfire,
      
      rev_state) 
      values(?,?,
        ?,?,?,?,
        ?,?,?,?,?,
        ?,?,?,?,?,?,
        "예약 불가")
      `;
  } else {
    revParams = [
      params.rev_id,
      params.r_id,

      params.c_name,
      params.c_phone,
      params.c_email_id,
      params.c_email_domain,

      params.c_nop,
      params.c_checkin_date,
      params.c_checkout_date,
      params.c_total_fee,
      params.c_message,

      params.s_more_p,
      params.s_bbq,
      params.s_meat,
      params.s_grill,
      params.s_hotpool,
      params.s_campfire,
    ];

    sql = `
  insert into reservation(
    rev_id,
    r_id,
    
    c_name,
    c_phone,
    c_email_id,
    c_email_domain,

    c_nop,
    c_checkin_date,
    c_checkout_date,
    c_total_fee,
    c_message,
    
    s_more_p,
    s_bbq,
    s_meat,
    s_grill,
    s_hotpool,
    s_campfire,
    
    rev_state) 
    values(?,?,
			?,?,?,?,
      ?,?,?,?,?,
			?,?,?,?,?,?,
			"미확정")
    `;
  }

  return db
    .execute(sql, revParams)
    .then((result) => result[0].affectedRows)
    .catch((error) => console.log(error));
};
export const confirmRev = async (params) => {
  const nameRevParams = [params.c_name, params.rev_no];
  const sql = `
  select count(*) as cnt from reservation where c_name=? and rev_id= ?
  `;
  return db
    .execute(sql, nameRevParams)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};
export const confirmByEmail = async (params) => {
  const nameMailParams = [
    params.c_name,
    params.c_email_id,
    params.c_email_domain,
  ];
  const sql = `
  select rev_id from reservation where c_name=? and c_email_id= ? and c_email_domain= ?
  `;
  return db
    .execute(sql, nameMailParams)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const getRevInfos = async (params) => {
  const rev_id = [params.rev_id];
  const sql = `
  select rev_id ,
  r_id,
  c_name,
  c_phone,
  c_email_id,
  c_email_domain,
  c_nop,
  c_message,
  DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS c_checkin_date,
  DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS c_checkout_date,
  c_total_fee,
  rev_state,

  s_more_p,
  s_bbq,
  s_meat,
  s_grill,
  s_hotpool,
  s_campfire
  
  from reservation where rev_id=?
  `;
  return db
    .execute(sql, rev_id)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const updateRevState = async (params) => {
  const revUpdateParams = [params.new_state, params.rev_id];
  console.log(revUpdateParams);
  const sql = `
  update reservation 
  set rev_state = ?
  where rev_id = ?;
  `;
  return db
    .execute(sql, revUpdateParams)
    .then((result) => result[0].affectedRows)
    .catch((error) => console.log(error));
};
export const deleteRev = async (params) => {
  const revDeleteParams = [params.rev_id];
  console.log(revDeleteParams);
  const sql = `
  delete from reservation 
  where rev_id = ?;
  `;
  return db
    .execute(sql, revDeleteParams)
    .then((result) => result[0].affectedRows)
    .catch((error) => console.log(error));
};

export const getHistoryRevInfos = async (params) => {
  const rev_id = [params.rev_id];
  const sql = `
  select rev_id ,
  r_id,
  c_name,
  c_phone,
  c_email_id,
  c_email_domain,
  c_nop,
  c_message,
  DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS c_checkin_date,
  DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS c_checkout_date,
  c_total_fee,

  s_more_p,
  s_bbq,
  s_meat,
  s_grill,
  s_hotpool,
  s_campfire
  
  from history where rev_id=?
  `;
  return db
    .execute(sql, rev_id)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};
export const getCheckinData = async (params) => {
  const day = [params.day, params.day];
  const sql = `
  select * from
  (select rev_id ,
  r_id,
  c_name,
  c_phone,
  c_nop,
  c_message,
  DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS checkin_date,
  rev_state,

  s_more_p,
  s_bbq,
  s_meat,
  s_grill,
  s_hotpool,
  s_campfire
  
  from reservation) as rev
  where  checkin_date=? and rev_state ="예약 확정" or checkin_date=? and rev_state ="입실 완료" 
  `;
  return db
    .execute(sql, day)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const getCheckoutData = async (params) => {
  const day = [params.day];
  const sql = `
  select * from
  (select rev_id ,
  r_id,
  c_name,
  c_phone,
  c_nop,
  c_message,
  DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS c_checkout_date,
  rev_state
  
  from reservation) as rev
  where rev_state ="입실 완료" and c_checkout_date=?
  `;
  return db
    .execute(sql, day)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const getPresentData = async (params) => {
  const day = [params.day, params.day];
  const sql = `
  select * from
  (select rev_id ,
  r_id,
  c_name,
  c_phone,
  c_nop,
  c_message,
  DATE_FORMAT(c_checkin_date, '%Y-%m-%d') AS c_checkin_date,
  DATE_FORMAT(c_checkout_date, '%Y-%m-%d') AS c_checkout_date,
  rev_state
  
  from reservation) as rev
  where rev_state ="입실 완료" and c_checkin_date <= ? and c_checkout_date >= ? 
  `;
  return db
    .execute(sql, day)
    .then((result) => result[0])
    .catch((error) => console.log(error));
};

export const moveEndData = async (params) => {
  const revMoveParams = [params.rev_id];
  const sql = `
  INSERT INTO history(
    rev_id,
    r_id,
    
    c_name,
    c_phone,
    c_email_id,
    c_email_domain,

    c_nop,
    c_checkin_date,
    c_checkout_date,
    c_total_fee,
    c_message,
    
    s_more_p,
    s_bbq,
    s_meat,
    s_grill,
    s_hotpool,
    s_campfire 
  )
  SELECT  
  rev_id,
    r_id,
    
    c_name,
    c_phone,
    c_email_id,
    c_email_domain,

    c_nop,
    c_checkin_date,
    c_checkout_date,
    c_total_fee,
    c_message,
    
    s_more_p,
    s_bbq,
    s_meat,
    s_grill,
    s_hotpool,
    s_campfire
  FROM reservation
  WHERE rev_id = ? 
  `;
  const sql2 = ` delete from reservation where rev_id = ? `;
  await db.execute(sql, revMoveParams);
  return db
    .execute(sql2, revMoveParams)
    .then((result) => result[0].affectedRows)
    .catch((error) => console.log(error));
};

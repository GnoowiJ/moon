import mysql from "mysql2";

// sql 접속정보
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "mysql1234",
  database: "moon",
});

export const db = pool.promise();

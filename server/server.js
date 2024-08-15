import express from "express";
import cors from "cors";
import path from "path";
import galleryRouter from "./router/galleryRouter.js";
import popupRouter from "./router/popupRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import reservationRouter from "./router/reservationRouter.js";
import roomRouter from "./router/roomRouter.js";
import revRouter from "./router/revRouter.js";
import homeRouter from "./router/homeRouter.js";
import adminAccountRouter from "./router/adminAccountRouter.js";
import guestroomRouter from "./router/guestroomRouter.js";
import roompriceRouter from "./router/roompriceRouter.js";
import informationRouter from "./router/informationRouter.js";


const server = express();
const port = 8080;

server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use("/uploads", express.static(path.join("uploads")));
server.use("/uploads/popupImg", express.static(path.join("uploads/popupImg")));

// router 입력영역
server.use("/home", homeRouter);
server.use("/gallery", galleryRouter);
server.use("/popup", popupRouter);
server.use("/upload", uploadRouter);
server.use("/reservation", reservationRouter);
server.use("/room", roomRouter);
server.use("/rev", revRouter);
server.use("/adminAccount", adminAccountRouter);
server.use("/guestroomlocation", guestroomRouter);
server.use("/roomprice", roompriceRouter);
server.use("/information", informationRouter)


server.listen(port, () => console.log(`Server RUNNING!! ==> PORT: ${port}`));

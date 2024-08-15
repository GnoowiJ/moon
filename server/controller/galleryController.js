import * as repository from "../repository/galleryRepository.js";


/* 갤러리 이미지 삭제 */
export const galleryDelete = async (req, res) => {
  const {gid} = req.body
  const result = await repository.galleryDelete(gid);
  res.json(result);
  res.end();
}


/* 갤러리 이미지리스트 가져오기 */

export const galleryList = async (req, res) => {
  const result = await repository.galleryList();
  res.json(result);
  res.end();
}

/* 갤러리 이미지 등록하기 */

export const galleryUpload = async (req, res) => {
  const imgUpload = req.body;
  const result = await repository.galleryUpload(imgUpload);
  res.json(result);
  res.end();
}
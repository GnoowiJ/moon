import { setGalleryList } from "../reducers/galReducer";
import { axiosPost } from "./reduxAxios.js";

export const getGalList = () => {
  const url = "http://127.0.0.1:8080/gallery/galleryList"
  return async (dispatch) => {
    const galList = await axiosPost({ url });
    dispatch(setGalleryList(galList))
  }
}

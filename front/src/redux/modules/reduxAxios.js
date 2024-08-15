import axios from "axios";

/**
 * POST 송수신용 Axios
 * @param {*} param0 
 * @returns 
 */
export async function axiosPost({ url, data }) {
  let results = null;
  try {
    results = await axios({ method: "post", url: url, data: data }).then(
      (res) => res.data
    );
  } catch (error) { }
  return results;
}

/**
 * GET 송수신용 Axios
 * @param {*} param0 
 * @returns 
 */
export async function axiosGet({ url }) {
  let results = null;
  try {
    results = await axios({ method: "get", url: url })
      .then((res) => res.data);
  } catch (error) { }
  return results;
}
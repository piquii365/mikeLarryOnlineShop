import axios from "axios";
export const BASE_URL = "http://localhost:3001";
export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
export const axiosMediaPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-type": "multipart/form-data" },
  withCredentials: true,
});
let refresh = false;
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401 && !refresh) {
      refresh = true;
      const res = await axios.post(
        "/admin/refresh",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        return axios(err.config);
      }
      refresh = false;
      return err;
    }
  }
);

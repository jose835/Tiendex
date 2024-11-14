import axios from "axios";

export const getCountries = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_GENERAL}/country/`);
}
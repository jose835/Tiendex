import axios from "axios";
import { postData } from "../../hooks/usePost";

export const getProducts = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/product/`);
};

export const createProduct = async (product: unknown) => {
  return await postData(`${import.meta.env.VITE_API_URL_INVENTORY}/product/`, product);
};

export const getCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/category/`);
}

export const getSubCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/subcategory/`)
}

export const getUnitMeasures = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/unit-mensuare/`)
}
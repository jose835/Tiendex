import axios from "axios";
import { postData } from "../../hooks/usePost";

export const getProducts = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/products/`);
};

export const createProduct = async (product: unknown) => {
  return await postData(`${import.meta.env.VITE_API_URL_INVENTORY}/products/`, product);
};

export const createProductPrice = async (productPrice: unknown) => {
  return await postData(`${import.meta.env.VITE_API_URL_INVENTORY}/product-price/`, productPrice);
};

export const createVariant = async (variant: unknown) => {
  return await postData(`${import.meta.env.VITE_API_URL_INVENTORY}/product-variant/`, variant);
}

export const createCombination = async (combination: unknown) => {
  return await postData(`${import.meta.env.VITE_API_URL_INVENTORY}/product-combination/`, combination);
}

export const getCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/category/`);
}

export const getSubCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/subcategory/`)
}

export const getUnitMeasures = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL_INVENTORY}/unit-mensuare/`)
}
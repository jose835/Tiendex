import { showToast } from "../../../components/Toast"
import { CategoryProps } from "../../../types/types"
import { supabase } from "../../supabase-client"

export const getCategories = async (): Promise<CategoryProps[]> => {
  const { data, error } = await supabase.from('category').select('*');

  if (error) {
    showToast(error.message, false);
    throw new Error(error.message);
  }

  return data as CategoryProps[];
};
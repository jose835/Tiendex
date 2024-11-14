import axios from "axios";

export async function postData(endpoint: string, data: any) {
  try {
    const response = await axios.post(endpoint, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error.response?.data };
    } else {
      return { success: false, error: "Unexpected error occurred" };
    }
  }
}

import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

/**
 * Pings the backend server to start it up, resulting in faster
 * subsequent responses.
 */
export const sendHello = async () => {
  const res = await axios.get(BACKEND_URL);
  return res.data;
};

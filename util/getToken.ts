import dotenv from "dotenv";
import { sign } from "jsonwebtoken";

dotenv.config();

export const getAuthToken = async (username: string) => {
  if (!username) {
    return;
  }

  const token = sign(username, process.env.API_ACCESS_TOKEN);
  return token;
};

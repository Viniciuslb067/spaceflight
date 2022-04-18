import axios from "../../../lib/axios";

export const getAllArticles = (): Promise<Articles[]> => {
  return axios.request().get("/articles");
}
import axios from "../../../lib/axios";

export const getArticleById = ({ id }: GetArticleOptions): Promise<Articles> => {
  return axios.request().get(`/articles/${id}`);
};
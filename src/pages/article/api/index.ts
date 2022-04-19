import axios from "../../../lib/axios";

export const getArticleById = ({
  id,
}: GetArticleOptions): Promise<Articles> => {
  return axios.request().get(`/articles/${id}`);
};

export const updateArticle = ({ id, data }: UpdateArticleOptions) => {
  return axios.request().put(`/articles/${id}`, data);
};

export const removeArticle = ({ id }: RemoveArticeOptions) => {
  return axios.request().delete(`/articles/${id}`);
}

import axios from "../../../lib/axios";

export const getAllArticles = (): Promise<Articles[]> => {
  return axios.request().get(`/articles`);
};

export const getAllArticlesFiltered = ({
  searchTerms,
}: GetAllArticlesOptions): Promise<Articles[]> => {
  return axios
    .request()
    .get(
      `/articles?title=${searchTerms?.title}&order_by=${searchTerms?.order_by}&take=${searchTerms?.take}&skip=${searchTerms?.skip}`
    );
};

export const createArticles = ({
  data,
}: CreateArticleOptions): Promise<Articles> => {
  return axios.request().post("/articles", data);
};

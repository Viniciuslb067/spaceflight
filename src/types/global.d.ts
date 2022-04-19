type Articles = {
    id: number,
    featured: boolean,
    title: string,
    url: string,
    imageUrl: string,
    newsSite: string,
    summary: string,
    publishedAt: Date,
    launches: [
      {
        id: string,
        provider: string
      }
    ],
    events: [
      {
        id: string,
        provider: string
      }
    ]
}

type CreateArticleOptions = {
  data: Article;
}

type GetAllArticlesOptions = {
  searchTerms?: {
    title?: string;
    order_by?: string;
    take?: number;
    skip?: number;
  }
}

type GetArticleOptions = {
  id: number;
}
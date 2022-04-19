import { Route, Routes } from "react-router-dom"
import { Home } from "../pages"
import { Article } from "../pages/article"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  )
}
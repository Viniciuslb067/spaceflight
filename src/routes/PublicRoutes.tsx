import { Route, Routes } from "react-router-dom"
import { Home } from "../pages"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
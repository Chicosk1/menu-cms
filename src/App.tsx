import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "./components/layout/app-layout"
import { CategoryPage } from "./components/pages/category-page"

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/categories" />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Route>
    </Routes>
  )
}

export default App

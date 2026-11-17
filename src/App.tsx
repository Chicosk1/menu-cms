import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "./components/layout/app-layout"
import { CategoryPage } from "./components/pages/category-page"
import { GuestCheckDetailPage } from "./components/pages/guest-check-detail-page"
import { GuestCheckPage } from "./components/pages/guest-check-page"
import { ProductPage } from "./components/pages/product-page"
import { SpotPage } from "./components/pages/spot-page"

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/categories" />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/spots" element={<SpotPage />} />
        <Route path="/guest-checks" element={<GuestCheckPage />} />
        <Route path="/guest-checks/:id" element={<GuestCheckDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App

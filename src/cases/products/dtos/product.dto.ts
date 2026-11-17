import type { CategoryDTO } from "@/cases/categories/dtos/category.dto"

export interface ProductDTO {
  id: string
  name: string
  active: boolean
  description: string | null
  price: number | string
  picture: string | null
  vegetarian: boolean
  isNew: boolean
  category: CategoryDTO | null
}

// Dados enviados no cadastro e na edição, com os nomes de campos esperados pela API
export interface ProductFormDTO {
  name: string
  description: string | null
  price: number
  picture_url: string | null
  category_id: string
  vegetarian: boolean
  isNew: boolean
  active: boolean
}

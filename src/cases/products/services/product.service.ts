import { api } from "@/lib/axios"
import type { ProductDTO, ProductFormDTO } from "../dtos/product.dto"

const ENDPOINT = "/products"

export const ProductService = {
  async listAll(categoryId?: string | null): Promise<ProductDTO[]> {
    const result = await api.get<ProductDTO[]>(ENDPOINT, {
      params: categoryId ? { categoryId } : undefined,
    })
    return result.data
  },

  async findOne(id: string): Promise<ProductDTO> {
    const result = await api.get<ProductDTO>(
      `${ENDPOINT}/${id}`,
    )

    return result.data
  },

  async create(product: ProductFormDTO): Promise<ProductDTO> {
    const result = await api.post<ProductDTO>(ENDPOINT, product)
    return result.data
  },

  async update(id: string, product: ProductFormDTO): Promise<ProductDTO> {
    const result = await api.patch<ProductDTO>(`${ENDPOINT}/${id}`, product)
    return result.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`)
  },
}

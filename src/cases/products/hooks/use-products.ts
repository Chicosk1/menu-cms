import { getErrorMessage } from "@/lib/error-message"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ProductFormDTO } from "../dtos/product.dto"
import { ProductService } from "../services/product.service"

const QUERY_KEY = ["products"]

export function useProducts(categoryId?: string | null) {
  return useQuery({
    queryKey: [...QUERY_KEY, categoryId ?? "all"],
    queryFn: () => ProductService.listAll(categoryId),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: ProductFormDTO) => ProductService.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success("Produto cadastrado com sucesso!")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Não foi possível cadastrar o produto."))
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductFormDTO }) =>
      ProductService.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success("Produto atualizado com sucesso!")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Não foi possível atualizar o produto."))
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ProductService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      toast.success("Produto excluído com sucesso!")
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Não foi possível excluir o produto. Verifique se ele está vinculado a algum pedido."))
    },
  })
}

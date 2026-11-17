import { getErrorMessage } from "@/lib/error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CategoryFormDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";

const QUERY_KEY = ['categories'];

export function useCategories() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => CategoryService.listAll()
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: CategoryFormDTO) => CategoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Categoria cadastrada com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível cadastrar a categoria.'));
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }: { id: string; category: CategoryFormDTO }) =>
            CategoryService.update(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Categoria atualizada com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível atualizar a categoria.'));
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => CategoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Categoria excluída com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível excluir a categoria. Verifique se existem produtos vinculados a ela.'));
        }
    });
}

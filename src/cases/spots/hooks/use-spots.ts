import { getErrorMessage } from "@/lib/error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SpotFormDTO } from "../dtos/spot.dto";
import { SpotService } from "../services/spot.service";

const QUERY_KEY = ['spots'];

export function useSpots() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => SpotService.listAll()
    });
}

export function useCreateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (spot: SpotFormDTO) => SpotService.create(spot),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Mesa cadastrada com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível cadastrar a mesa.'));
        }
    });
}

export function useUpdateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, spot }: { id: string; spot: SpotFormDTO }) =>
            SpotService.update(id, spot),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Mesa atualizada com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível atualizar a mesa.'));
        }
    });
}

export function useDeleteSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SpotService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success('Mesa excluída com sucesso!');
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível excluir a mesa. Verifique se existem comandas vinculadas a ela.'));
        }
    });
}

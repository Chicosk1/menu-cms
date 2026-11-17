import { getErrorMessage } from "@/lib/error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ORDER_STATUS_LABELS, type OrderDTO, type OrderFilters, type OrderStatus } from "../dtos/order.dto";
import { OrderService } from "../services/order.service";

const QUERY_KEY = ['orders'];

// Novos pedidos chegam pelo cardápio digital, por isso a lista é atualizada periodicamente.
const REFETCH_INTERVAL = 30_000;

export function useOrders(filters: OrderFilters = {}) {
    return useQuery({
        queryKey: [...QUERY_KEY, filters],
        queryFn: () => OrderService.listAll(filters),
        refetchInterval: REFETCH_INTERVAL
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
            OrderService.updateStatus(id, status),

        // Atualização otimista: o pedido muda de status na tela antes da resposta da API
        // (evita que o cartão do Kanban "volte" para a coluna antiga enquanto a API responde).
        onMutate: async ({ id, status }) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });
            const previousData = queryClient.getQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY });

            queryClient.setQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY }, (orders) =>
                orders?.map((order) => (order.id === id ? { ...order, status } : order))
            );

            return { previousData };
        },
        onSuccess: (_order, { status }) => {
            toast.success(`Status do pedido alterado para "${ORDER_STATUS_LABELS[status]}".`);
        },
        onError: (error, _variables, context) => {
            // Desfaz a atualização otimista
            context?.previousData.forEach(([queryKey, data]) => queryClient.setQueryData(queryKey, data));
            toast.error(getErrorMessage(error, 'Não foi possível alterar o status do pedido.'));
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        }
    });
}

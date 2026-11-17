import { getErrorMessage } from "@/lib/error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ORDER_STATUS_LABELS, type OrderStatus } from "../dtos/order.dto";
import { OrderService } from "../services/order.service";

const QUERY_KEY = ['orders'];

// Novos pedidos chegam pelo cardápio digital, por isso a lista é atualizada periodicamente.
const REFETCH_INTERVAL = 30_000;

export function useOrders(guestCheckId?: string) {
    return useQuery({
        queryKey: [...QUERY_KEY, guestCheckId ?? 'all'],
        queryFn: () => OrderService.listAll(guestCheckId),
        refetchInterval: REFETCH_INTERVAL
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
            OrderService.updateStatus(id, status),
        onSuccess: (_order, { status }) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success(`Status do pedido alterado para "${ORDER_STATUS_LABELS[status]}".`);
        },
        onError: (error) => {
            toast.error(getErrorMessage(error, 'Não foi possível alterar o status do pedido.'));
        }
    });
}

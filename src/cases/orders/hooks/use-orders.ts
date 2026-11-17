import { useQuery } from "@tanstack/react-query";
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

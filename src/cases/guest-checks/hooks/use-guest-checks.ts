import { useQuery } from "@tanstack/react-query";
import { GuestCheckService } from "../services/guest-check.service";

const QUERY_KEY = ['guest-checks'];

// As comandas recebem pedidos do cardápio digital a todo momento,
// por isso a listagem é atualizada periodicamente.
const REFETCH_INTERVAL = 30_000;

export function useOpenedGuestChecks() {
    return useQuery({
        queryKey: [...QUERY_KEY, 'OPENED'],
        queryFn: () => GuestCheckService.listOpened(),
        refetchInterval: REFETCH_INTERVAL
    });
}

export function useGuestCheck(id: string) {
    return useQuery({
        queryKey: [...QUERY_KEY, id],
        queryFn: () => GuestCheckService.findOne(id)
    });
}

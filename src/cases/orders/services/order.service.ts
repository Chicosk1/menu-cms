import { api } from "@/lib/axios";
import type { OrderDTO } from "../dtos/order.dto";

const ENDPOINT = '/orders';

export const OrderService = {
    async listAll(guestCheckId?: string): Promise<OrderDTO[]> {
        const result = await api.get<OrderDTO[]>(ENDPOINT, {
            params: guestCheckId ? { guestCheckId } : undefined
        });
        return result.data;
    },

    async findOne(id: string): Promise<OrderDTO> {
        const result = await api.get<OrderDTO>(`${ENDPOINT}/${id}`);
        return result.data;
    },
}

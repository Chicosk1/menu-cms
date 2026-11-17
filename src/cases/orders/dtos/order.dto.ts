import type { GuestCheckDTO, GuestCheckStatus } from "@/cases/guest-checks/dtos/guest-check.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

// Valores do enum OrderStatus da API
export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'DELIVERY';

export const ORDER_STATUSES: OrderStatus[] = ['NEW', 'PREPARING', 'READY', 'DELIVERY'];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    NEW: 'Novo',
    PREPARING: 'Em preparo',
    READY: 'Pronto',
    DELIVERY: 'Entregue',
};

export interface OrderItemDTO {
    id: string;
    product: ProductDTO;
    quantity: number;
    price: number | string;
    subtotal: number | string;
}

export interface OrderDTO {
    id: string;
    createdAt: string;
    status: OrderStatus;
    total: number | string;
    items: OrderItemDTO[];
    guestCheck: GuestCheckDTO;
}

export interface OrderFilters {
    guestCheckId?: string;
    guestCheckStatus?: GuestCheckStatus;
}

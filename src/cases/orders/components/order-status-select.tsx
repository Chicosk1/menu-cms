import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderDTO, type OrderStatus } from "../dtos/order.dto";
import { useUpdateOrderStatus } from "../hooks/use-orders";

const items = ORDER_STATUSES.map((status) => ({
    label: ORDER_STATUS_LABELS[status],
    value: status,
}));

interface OrderStatusSelectProps {
    order: OrderDTO;
}

export function OrderStatusSelect({ order }: OrderStatusSelectProps) {

    const updateOrderStatus = useUpdateOrderStatus();

    function handleChange(status: OrderStatus | null) {
        if (!status || status === order.status) return;

        updateOrderStatus.mutate({ id: order.id, status });
    }

    return (
        <Select
            items={items}
            value={order.status}
            onValueChange={handleChange}
            disabled={updateOrderStatus.isPending}
        >
            <SelectTrigger size="sm" className="w-36 bg-card" aria-label="Alterar status do pedido">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

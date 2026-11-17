import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { ORDER_STATUS_LABELS, type OrderDTO, type OrderStatus } from "../dtos/order.dto";
import { OrderKanbanCard } from "./order-kanban-card";
import { OrderStatusBadge } from "./order-status-badge";

interface OrderKanbanColumnProps {
    status: OrderStatus;
    orders: OrderDTO[];
}

export function OrderKanbanColumn({ status, orders }: OrderKanbanColumnProps) {

    // O id da coluna é o próprio status: ao soltar um cartão aqui, o pedido recebe esse status
    const { setNodeRef, isOver } = useDroppable({ id: status });

    return (
        <section
            ref={setNodeRef}
            aria-label={`Coluna ${ORDER_STATUS_LABELS[status]}`}
            className={cn(
                "flex min-w-0 flex-col gap-3 rounded-xl border bg-sidebar p-3 transition-colors",
                isOver && "border-primary bg-primary/10"
            )}
        >
            <header className="flex items-center justify-between">
                <OrderStatusBadge status={status} />
                <span className="text-xs font-medium text-muted-foreground">{orders.length}</span>
            </header>

            <div className="flex min-h-40 flex-1 flex-col gap-3">
                {orders.map((order) => (
                    <OrderKanbanCard key={order.id} order={order} />
                ))}

                {orders.length === 0 && (
                    <p className="m-auto text-xs text-muted-foreground">Nenhum pedido</p>
                )}
            </div>
        </section>
    )
}

import { formatCurrency, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { Armchair, Clock } from "lucide-react";
import type { OrderDTO } from "../dtos/order.dto";

interface OrderKanbanCardContentProps {
    order: OrderDTO;
    className?: string;
}

// Conteúdo do cartão, usado na coluna e na pré-visualização durante o arraste
export function OrderKanbanCardContent({ order, className }: OrderKanbanCardContentProps) {
    return (
        <div className={cn("flex flex-col gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs", className)}>
            <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-semibold text-brand">
                    <Armchair className="size-4" />
                    {order.guestCheck.spot.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {formatTime(order.createdAt)}
                </span>
            </div>

            <ul className="flex flex-col gap-1">
                {order.items.map((item) => (
                    <li key={item.id} className="flex gap-2">
                        <span className="font-medium">{item.quantity}x</span>
                        <span>{item.product.name}</span>
                    </li>
                ))}
            </ul>

            <div className="border-t pt-2 text-right font-semibold">{formatCurrency(order.total)}</div>
        </div>
    )
}

interface OrderKanbanCardProps {
    order: OrderDTO;
}

export function OrderKanbanCard({ order }: OrderKanbanCardProps) {

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: order.id,
        attributes: { roleDescription: 'pedido arrastável' }
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            aria-label={`Pedido da ${order.guestCheck.spot.name} feito às ${formatTime(order.createdAt)}`}
            className={cn(
                "cursor-grab touch-none rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isDragging && "opacity-40"
            )}
        >
            <OrderKanbanCardContent order={order} />
        </div>
    )
}

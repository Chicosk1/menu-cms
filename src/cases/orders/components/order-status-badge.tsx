import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BellRing, ChefHat, CircleCheckBig, CircleDot, type LucideIcon } from "lucide-react";
import { ORDER_STATUS_LABELS, type OrderStatus } from "../dtos/order.dto";

const STATUS_STYLES: Record<OrderStatus, { className: string; icon: LucideIcon }> = {
    NEW: { className: 'bg-blue-100 text-blue-800', icon: CircleDot },
    PREPARING: { className: 'bg-amber-100 text-amber-800', icon: ChefHat },
    READY: { className: 'bg-green-100 text-green-800', icon: BellRing },
    DELIVERY: { className: 'bg-muted text-muted-foreground', icon: CircleCheckBig },
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const { className: statusClassName, icon: Icon } = STATUS_STYLES[status];

    return (
        <Badge className={cn(statusClassName, className)}>
            <Icon data-icon="inline-start" />
            {ORDER_STATUS_LABELS[status]}
        </Badge>
    )
}

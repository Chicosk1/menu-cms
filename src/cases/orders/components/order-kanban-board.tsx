import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type Announcements,
    type DragEndEvent,
    type DragStartEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core";
import { useState } from "react";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderDTO, type OrderStatus } from "../dtos/order.dto";
import { useUpdateOrderStatus } from "../hooks/use-orders";
import { OrderKanbanCardContent } from "./order-kanban-card";
import { OrderKanbanColumn } from "./order-kanban-column";

// Mensagens lidas por leitores de tela durante o arraste
function columnLabel(id?: UniqueIdentifier) {
    return ORDER_STATUS_LABELS[id as OrderStatus];
}

const announcements: Announcements = {
    onDragStart: () => 'Pedido selecionado.',
    onDragOver: ({ over }) => (over ? `Sobre a coluna ${columnLabel(over.id)}.` : 'Fora das colunas.'),
    onDragEnd: ({ over }) => (over ? `Pedido solto na coluna ${columnLabel(over.id)}.` : 'Pedido solto fora das colunas.'),
    onDragCancel: () => 'Movimento cancelado.',
};

const screenReaderInstructions = {
    draggable: 'Para mover um pedido, pressione espaço ou enter, use as setas para trocar de coluna e pressione espaço ou enter novamente para soltar. Pressione esc para cancelar.',
};

interface OrderKanbanBoardProps {
    orders: OrderDTO[];
}

export function OrderKanbanBoard({ orders }: OrderKanbanBoardProps) {

    const updateOrderStatus = useUpdateOrderStatus();
    const [activeOrder, setActiveOrder] = useState<OrderDTO | null>(null);

    const sensors = useSensors(
        // O arraste só começa após mover 5px, para não confundir com um clique
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor),
    );

    function handleDragStart({ active }: DragStartEvent) {
        setActiveOrder(orders.find((order) => order.id === active.id) ?? null);
    }

    function handleDragEnd({ active, over }: DragEndEvent) {
        setActiveOrder(null);

        const order = orders.find((order) => order.id === active.id);
        const status = over?.id as OrderStatus | undefined;

        if (!order || !status || order.status === status) return;

        updateOrderStatus.mutate({ id: order.id, status });
    }

    return (
        <DndContext
            sensors={sensors}
            accessibility={{ announcements, screenReaderInstructions }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveOrder(null)}
        >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {ORDER_STATUSES.map((status) => (
                    <OrderKanbanColumn
                        key={status}
                        status={status}
                        orders={orders.filter((order) => order.status === status)}
                    />
                ))}
            </div>

            <DragOverlay dropAnimation={null}>
                {activeOrder && (
                    <OrderKanbanCardContent order={activeOrder} className="cursor-grabbing rotate-2 shadow-lg" />
                )}
            </DragOverlay>
        </DndContext>
    )
}

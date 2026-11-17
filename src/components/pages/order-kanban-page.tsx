import { OrderKanbanBoard } from "@/cases/orders/components/order-kanban-board";
import { useOrders } from "@/cases/orders/hooks/use-orders";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";

export function OrderKanbanPage() {

    // Somente os pedidos das comandas em aberto
    const { data: orders = [], isLoading, isError, error, refetch } = useOrders({ guestCheckStatus: 'OPENED' });

    function renderContent() {
        if (isLoading) {
            return <LoadingState message="Carregando pedidos..." />;
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />;
        }

        if (orders.length === 0) {
            return (
                <EmptyState
                    title="Nenhum pedido nas comandas em aberto"
                    description="Os pedidos feitos pelas mesas no cardápio digital aparecem aqui."
                />
            );
        }

        return <OrderKanbanBoard orders={orders} />;
    }

    return (
        <div>
            <PageHeader
                title="Pedidos"
                description="Arraste os cartões entre as colunas para alterar o status dos pedidos das comandas em aberto."
            />

            {renderContent()}
        </div>
    )
}

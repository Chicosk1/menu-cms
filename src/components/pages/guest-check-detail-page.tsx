import { useGuestCheck } from "@/cases/guest-checks/hooks/use-guest-checks";
import { OrderCard } from "@/cases/orders/components/order-card";
import { useOrders } from "@/cases/orders/hooks/use-orders";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function GuestCheckDetailPage() {

    const { id = '' } = useParams();

    const guestCheckQuery = useGuestCheck(id);
    const ordersQuery = useOrders({ guestCheckId: id });

    const guestCheck = guestCheckQuery.data;
    const orders = ordersQuery.data ?? [];
    const total = orders.reduce((sum, order) => sum + Number(order.total), 0);

    function renderOrders() {
        if (ordersQuery.isLoading) {
            return <LoadingState message="Carregando pedidos..." />;
        }

        if (ordersQuery.isError) {
            return <ErrorState error={ordersQuery.error} onRetry={ordersQuery.refetch} />;
        }

        if (orders.length === 0) {
            return (
                <EmptyState
                    title="Nenhum pedido nesta comanda"
                    description="Os pedidos feitos pela mesa no cardápio digital aparecem aqui."
                />
            );
        }

        return (
            <div className="grid items-start gap-4 xl:grid-cols-2">
                {orders.map((order, index) => (
                    <OrderCard key={order.id} order={order} title={`Pedido ${index + 1}`} />
                ))}
            </div>
        );
    }

    function renderContent() {
        if (guestCheckQuery.isLoading) {
            return <LoadingState message="Carregando comanda..." />;
        }

        if (guestCheckQuery.isError || !guestCheck) {
            return <ErrorState error={guestCheckQuery.error} onRetry={guestCheckQuery.refetch} />;
        }

        return (
            <>
                <PageHeader
                    title={`Comanda - ${guestCheck.spot.name}`}
                    description="Pedidos feitos pela mesa desde a abertura da comanda."
                />

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <Card size="sm">
                        <CardHeader>
                            <CardDescription>Aberta em</CardDescription>
                            <CardTitle className="text-lg">{formatDateTime(guestCheck.createdAt)}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card size="sm">
                        <CardHeader>
                            <CardDescription>Situação</CardDescription>
                            <CardTitle>
                                <Badge variant={guestCheck.status === 'OPENED' ? 'default' : 'outline'}>
                                    {guestCheck.status === 'OPENED' ? 'Em aberto' : 'Fechada'}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card size="sm">
                        <CardHeader>
                            <CardDescription>Total acumulado</CardDescription>
                            <CardTitle className="text-lg text-brand">
                                {ordersQuery.isSuccess ? formatCurrency(total) : '—'}
                                <span className="ml-2 text-xs font-normal text-muted-foreground">
                                    ({orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'})
                                </span>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <h2 className="mb-4 text-lg font-semibold text-brand">Pedidos</h2>
                {renderOrders()}
            </>
        );
    }

    return (
        <div>
            <Link to="/guest-checks" className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'mb-4 -ml-2' })}>
                <ArrowLeft /> Voltar para comandas
            </Link>

            {renderContent()}
        </div>
    )
}

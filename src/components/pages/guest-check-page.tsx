import { GuestCheckTable } from "@/cases/guest-checks/components/guest-check-table";
import { useOpenedGuestChecks } from "@/cases/guest-checks/hooks/use-guest-checks";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";

export function GuestCheckPage() {

    const { data: guestChecks = [], isLoading, isError, error, refetch } = useOpenedGuestChecks();

    function renderContent() {
        if (isLoading) {
            return <LoadingState message="Carregando comandas..." />;
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />;
        }

        if (guestChecks.length === 0) {
            return (
                <EmptyState
                    title="Nenhuma comanda em aberto"
                    description="As comandas são abertas automaticamente no primeiro pedido feito pela mesa no cardápio digital."
                />
            );
        }

        return <GuestCheckTable guestChecks={guestChecks} />;
    }

    return (
        <div>
            <PageHeader title="Comandas" description="Acompanhe as comandas em aberto e os pedidos de cada mesa." />

            {renderContent()}
        </div>
    )
}

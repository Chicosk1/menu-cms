import { SpotFormDialog } from "@/cases/spots/components/spot-form-dialog";
import { SpotTable } from "@/cases/spots/components/spot-table";
import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";
import { useDeleteSpot, useSpots } from "@/cases/spots/hooks/use-spots";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function SpotPage() {

    const { data: spots = [], isLoading, isError, error, refetch } = useSpots();
    const deleteSpot = useDeleteSpot();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState<SpotDTO | null>(null);
    const [spotToDelete, setSpotToDelete] = useState<SpotDTO | null>(null);

    function handleNew() {
        setSelectedSpot(null);
        setIsFormOpen(true);
    }

    function handleEdit(spot: SpotDTO) {
        setSelectedSpot(spot);
        setIsFormOpen(true);
    }

    function handleConfirmDelete() {
        if (!spotToDelete) return;

        deleteSpot.mutate(spotToDelete.id, {
            onSettled: () => setSpotToDelete(null)
        });
    }

    function renderContent() {
        if (isLoading) {
            return <LoadingState message="Carregando mesas..." />;
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />;
        }

        if (spots.length === 0) {
            return (
                <EmptyState
                    title="Nenhuma mesa cadastrada"
                    description='Clique em "Nova mesa" para cadastrar a primeira.'
                />
            );
        }

        return (
            <SpotTable
                spots={spots}
                onEdit={handleEdit}
                onDelete={setSpotToDelete}
            />
        );
    }

    return (
        <div>
            <PageHeader title="Mesas" description="Gerencie as mesas e locais de atendimento do restaurante.">
                <Button onClick={handleNew}>
                    <Plus /> Nova mesa
                </Button>
            </PageHeader>

            {renderContent()}

            {isFormOpen && (
                <SpotFormDialog
                    spot={selectedSpot}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <DeleteDialog
                open={spotToDelete !== null}
                title="Excluir mesa"
                description={`Tem certeza que deseja excluir a mesa "${spotToDelete?.name}"? Essa ação não pode ser desfeita.`}
                isPending={deleteSpot.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setSpotToDelete(null)}
            />
        </div>
    )
}

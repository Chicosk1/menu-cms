import { CategoryFormDialog } from "@/cases/categories/components/category-form-dialog";
import { CategoryTable } from "@/cases/categories/components/category-table";
import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";
import { useCategories, useDeleteCategory } from "@/cases/categories/hooks/use-category";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CategoryPage() {

    const { data: categories = [], isLoading, isError, error, refetch } = useCategories();
    const deleteCategory = useDeleteCategory();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDTO | null>(null);

    function handleNew() {
        setSelectedCategory(null);
        setIsFormOpen(true);
    }

    function handleEdit(category: CategoryDTO) {
        setSelectedCategory(category);
        setIsFormOpen(true);
    }

    function handleConfirmDelete() {
        if (!categoryToDelete) return;

        deleteCategory.mutate(categoryToDelete.id, {
            onSettled: () => setCategoryToDelete(null)
        });
    }

    function renderContent() {
        if (isLoading) {
            return <LoadingState message="Carregando categorias..." />;
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />;
        }

        if (categories.length === 0) {
            return (
                <EmptyState
                    title="Nenhuma categoria cadastrada"
                    description='Clique em "Nova categoria" para cadastrar a primeira.'
                />
            );
        }

        return (
            <CategoryTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={setCategoryToDelete}
            />
        );
    }

    return (
        <div>
            <PageHeader title="Categorias" description="Gerencie as categorias do cardápio digital.">
                <Button onClick={handleNew}>
                    <Plus /> Nova categoria
                </Button>
            </PageHeader>

            {renderContent()}

            {isFormOpen && (
                <CategoryFormDialog
                    category={selectedCategory}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <DeleteDialog
                open={categoryToDelete !== null}
                title="Excluir categoria"
                description={`Tem certeza que deseja excluir a categoria "${categoryToDelete?.name}"? Essa ação não pode ser desfeita.`}
                isPending={deleteCategory.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setCategoryToDelete(null)}
            />
        </div>
    )
}

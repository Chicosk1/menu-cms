import { ProductCategoryFilter } from "@/cases/products/components/product-category-filter";
import { ProductFormDialog } from "@/cases/products/components/product-form-dialog";
import { ProductTable } from "@/cases/products/components/product-table";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useDeleteProduct, useProducts } from "@/cases/products/hooks/use-products";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/query-states";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ProductPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    const { data: products = [], isLoading, isError, error, refetch } = useProducts(categoryId);
    const deleteProduct = useDeleteProduct();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null);
    const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(null);

    function handleFilterChange(newCategoryId: string | null) {
        setSearchParams(newCategoryId ? { categoryId: newCategoryId } : {});
    }

    function handleNew() {
        setSelectedProduct(null);
        setIsFormOpen(true);
    }

    function handleEdit(product: ProductDTO) {
        setSelectedProduct(product);
        setIsFormOpen(true);
    }

    function handleConfirmDelete() {
        if (!productToDelete) return;

        deleteProduct.mutate(productToDelete.id, {
            onSettled: () => setProductToDelete(null)
        });
    }

    function renderContent() {
        if (isLoading) {
            return <LoadingState message="Carregando produtos..." />;
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />;
        }

        if (products.length === 0) {
            return categoryId ? (
                <EmptyState
                    title="Nenhum produto nesta categoria"
                    description="Escolha outra categoria no filtro ou cadastre um novo produto."
                />
            ) : (
                <EmptyState
                    title="Nenhum produto cadastrado"
                    description='Clique em "Novo produto" para cadastrar o primeiro.'
                />
            );
        }

        return (
            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={setProductToDelete}
            />
        );
    }

    return (
        <div>
            <PageHeader title="Produtos" description="Gerencie os produtos do cardápio digital.">
                <ProductCategoryFilter value={categoryId} onChange={handleFilterChange} />
                <Button onClick={handleNew}>
                    <Plus /> Novo produto
                </Button>
            </PageHeader>

            {renderContent()}

            {isFormOpen && (
                <ProductFormDialog
                    product={selectedProduct}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <DeleteDialog
                open={productToDelete !== null}
                title="Excluir produto"
                description={`Tem certeza que deseja excluir o produto "${productToDelete?.name}"? Essa ação não pode ser desfeita.`}
                isPending={deleteProduct.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setProductToDelete(null)}
            />
        </div>
    )
}

export interface CategoryDTO {
    id: string;
    name: string;
    icon: string | null;
    displayOrder: number;
    active: boolean;
}

// Dados enviados no cadastro e na edição (sem o id, que é gerado pela API)
export type CategoryFormDTO = Omit<CategoryDTO, 'id'>;

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState, type FormEvent } from "react";
import type { CategoryDTO, CategoryFormDTO } from "../dtos/category.dto";
import { useCreateCategory, useUpdateCategory } from "../hooks/use-category";

interface CategoryFormDialogProps {
    category: CategoryDTO | null;
    onClose: () => void;
}

interface FormErrors {
    name?: string;
    displayOrder?: string;
}

export function CategoryFormDialog({ category, onClose }: CategoryFormDialogProps) {

    const isEditing = category !== null;

    const [name, setName] = useState(category?.name ?? '');
    const [icon, setIcon] = useState(category?.icon ?? '');
    const [displayOrder, setDisplayOrder] = useState(String(category?.displayOrder ?? 0));
    const [active, setActive] = useState(category?.active ?? true);
    const [errors, setErrors] = useState<FormErrors>({});

    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const isPending = createCategory.isPending || updateCategory.isPending;

    function validate(): FormErrors {
        const newErrors: FormErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Informe o nome da categoria.';
        }

        if (displayOrder === '' || !Number.isInteger(Number(displayOrder)) || Number(displayOrder) < 0) {
            newErrors.displayOrder = 'Informe um número inteiro maior ou igual a zero.';
        }

        return newErrors;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const data: CategoryFormDTO = {
            name: name.trim(),
            icon: icon.trim() || null,
            displayOrder: Number(displayOrder),
            active,
        };

        if (isEditing) {
            updateCategory.mutate({ id: category.id, category: data }, { onSuccess: onClose });
        } else {
            createCategory.mutate(data, { onSuccess: onClose });
        }
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
                    <DialogDescription>
                        Preencha os dados da categoria que aparece no cardápio digital.
                    </DialogDescription>
                </DialogHeader>

                <form id="category-form" onSubmit={handleSubmit} noValidate>
                    <FieldGroup>
                        <Field data-invalid={!!errors.name}>
                            <FieldLabel htmlFor="name">Nome *</FieldLabel>
                            <Input
                                id="name"
                                value={name}
                                maxLength={60}
                                aria-invalid={!!errors.name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <FieldError>{errors.name}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="icon">Ícone (URL da imagem)</FieldLabel>
                            <div className="flex items-center gap-3">
                                <Input
                                    id="icon"
                                    value={icon}
                                    placeholder="https://..."
                                    onChange={(event) => setIcon(event.target.value)}
                                />
                                {icon.trim() && (
                                    <img src={icon} alt="Pré-visualização do ícone" className="size-9 shrink-0 object-contain" />
                                )}
                            </div>
                        </Field>

                        <Field data-invalid={!!errors.displayOrder}>
                            <FieldLabel htmlFor="displayOrder">Ordem de exibição *</FieldLabel>
                            <Input
                                id="displayOrder"
                                type="number"
                                min={0}
                                step={1}
                                value={displayOrder}
                                aria-invalid={!!errors.displayOrder}
                                onChange={(event) => setDisplayOrder(event.target.value)}
                            />
                            <FieldDescription>As categorias são exibidas da menor para a maior ordem.</FieldDescription>
                            <FieldError>{errors.displayOrder}</FieldError>
                        </Field>

                        <Field orientation="horizontal">
                            <Switch id="active" checked={active} onCheckedChange={setActive} />
                            <FieldLabel htmlFor="active">Categoria ativa</FieldLabel>
                        </Field>
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />} disabled={isPending}>
                        Cancelar
                    </DialogClose>
                    <Button type="submit" form="category-form" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

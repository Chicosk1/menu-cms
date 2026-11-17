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
import type { SpotDTO, SpotFormDTO } from "../dtos/spot.dto";
import { useCreateSpot, useUpdateSpot } from "../hooks/use-spots";

interface SpotFormDialogProps {
    spot: SpotDTO | null;
    onClose: () => void;
}

interface FormErrors {
    name?: string;
}

export function SpotFormDialog({ spot, onClose }: SpotFormDialogProps) {

    const isEditing = spot !== null;

    const [name, setName] = useState(spot?.name ?? '');
    const [active, setActive] = useState(spot?.active ?? true);
    const [errors, setErrors] = useState<FormErrors>({});

    const createSpot = useCreateSpot();
    const updateSpot = useUpdateSpot();
    const isPending = createSpot.isPending || updateSpot.isPending;

    function validate(): FormErrors {
        const newErrors: FormErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Informe o nome da mesa.';
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

        const data: SpotFormDTO = {
            name: name.trim(),
            active,
        };

        if (isEditing) {
            updateSpot.mutate({ id: spot.id, spot: data }, { onSuccess: onClose });
        } else {
            createSpot.mutate(data, { onSuccess: onClose });
        }
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar mesa' : 'Nova mesa'}</DialogTitle>
                    <DialogDescription>
                        Preencha os dados da mesa (ou local) de atendimento do restaurante.
                    </DialogDescription>
                </DialogHeader>

                <form id="spot-form" onSubmit={handleSubmit} noValidate>
                    <FieldGroup>
                        <Field data-invalid={!!errors.name}>
                            <FieldLabel htmlFor="name">Nome *</FieldLabel>
                            <Input
                                id="name"
                                value={name}
                                maxLength={60}
                                placeholder="Ex.: Mesa 01"
                                aria-invalid={!!errors.name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <FieldError>{errors.name}</FieldError>
                        </Field>

                        <Field orientation="horizontal">
                            <Switch id="active" checked={active} onCheckedChange={setActive} />
                            <FieldLabel htmlFor="active">Mesa ativa</FieldLabel>
                        </Field>
                        <FieldDescription>
                            Mesas inativas não ficam disponíveis para abrir novas comandas.
                        </FieldDescription>
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />} disabled={isPending}>
                        Cancelar
                    </DialogClose>
                    <Button type="submit" form="spot-form" disabled={isPending}>
                        {isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

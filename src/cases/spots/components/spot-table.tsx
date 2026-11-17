import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Armchair, Pencil, Trash2 } from "lucide-react";
import type { SpotDTO } from "../dtos/spot.dto";

interface SpotTableProps {
    spots: SpotDTO[];
    onEdit: (spot: SpotDTO) => void;
    onDelete: (spot: SpotDTO) => void;
}

export function SpotTable({ spots, onEdit, onDelete }: SpotTableProps) {

    // Ordenação natural: "Mesa 2" antes de "Mesa 10"
    const sortedSpots = [...spots].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', { numeric: true })
    );

    return (
        <div className="rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Nome</TableHead>
                        <TableHead className="w-32">Situação</TableHead>
                        <TableHead className="w-28 pr-4 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sortedSpots.map((spot) => (
                        <TableRow key={spot.id}>
                            <TableCell className="pl-4">
                                <div className="flex items-center gap-3 font-medium">
                                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-brand">
                                        <Armchair className="size-4" />
                                    </span>
                                    {spot.name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={spot.active ? 'default' : 'outline'}>
                                    {spot.active ? 'Ativa' : 'Inativa'}
                                </Badge>
                            </TableCell>
                            <TableCell className="pr-4 text-right">
                                <Button variant="ghost" size="icon-sm" title="Editar" onClick={() => onEdit(spot)}>
                                    <Pencil />
                                </Button>
                                <Button variant="ghost" size="icon-sm" title="Excluir" className="text-destructive" onClick={() => onDelete(spot)}>
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

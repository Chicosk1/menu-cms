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
import { Pencil, Trash2, Utensils } from "lucide-react";
import type { CategoryDTO } from "../dtos/category.dto";

interface CategoryTableProps {
    categories: CategoryDTO[];
    onEdit: (category: CategoryDTO) => void;
    onDelete: (category: CategoryDTO) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    return (
        <div className="rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20 pl-4">Ícone</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="w-40">Ordem de exibição</TableHead>
                        <TableHead className="w-32">Situação</TableHead>
                        <TableHead className="w-28 pr-4 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="pl-4">
                                {category.icon ?
                                    (<img src={category.icon} alt={category.name} className="size-10 object-contain" />)
                                        :
                                    (<Utensils className="size-8 text-brand" />)}
                            </TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.displayOrder}</TableCell>
                            <TableCell>
                                <Badge variant={category.active ? 'default' : 'outline'}>
                                    {category.active ? 'Ativa' : 'Inativa'}
                                </Badge>
                            </TableCell>
                            <TableCell className="pr-4 text-right">
                                <Button variant="ghost" size="icon-sm" title="Editar" onClick={() => onEdit(category)}>
                                    <Pencil />
                                </Button>
                                <Button variant="ghost" size="icon-sm" title="Excluir" className="text-destructive" onClick={() => onDelete(category)}>
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

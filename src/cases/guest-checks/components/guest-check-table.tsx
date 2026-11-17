import { buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { Armchair, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { GuestCheckSummaryDTO } from "../dtos/guest-check.dto";

interface GuestCheckTableProps {
    guestChecks: GuestCheckSummaryDTO[];
}

export function GuestCheckTable({ guestChecks }: GuestCheckTableProps) {
    return (
        <div className="rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="pl-4">Mesa</TableHead>
                        <TableHead className="w-48">Aberta em</TableHead>
                        <TableHead className="w-40 text-right">Total acumulado</TableHead>
                        <TableHead className="w-40 pr-4 text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {guestChecks.map((guestCheck) => (
                        <TableRow key={guestCheck.id}>
                            <TableCell className="pl-4">
                                <div className="flex items-center gap-3 font-medium">
                                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-brand">
                                        <Armchair className="size-4" />
                                    </span>
                                    {guestCheck.spot.name}
                                </div>
                            </TableCell>
                            <TableCell>{formatDateTime(guestCheck.createdAt)}</TableCell>
                            <TableCell className="text-right font-medium">
                                {formatCurrency(guestCheck.total)}
                            </TableCell>
                            <TableCell className="pr-4 text-right">
                                <Link
                                    to={`/guest-checks/${guestCheck.id}`}
                                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                >
                                    <Eye /> Ver pedidos
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

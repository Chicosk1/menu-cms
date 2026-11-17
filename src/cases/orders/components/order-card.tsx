import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatTime } from "@/lib/format";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderStatusSelect } from "./order-status-select";

interface OrderCardProps {
    order: OrderDTO;
    title: string;
}

export function OrderCard({ order, title }: OrderCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">{title}</CardTitle>
                <CardDescription>Feito às {formatTime(order.createdAt)}</CardDescription>
                <CardAction>
                    <OrderStatusBadge status={order.status} />
                </CardAction>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="w-16 text-center">Qtd.</TableHead>
                            <TableHead className="w-28 text-right">Preço unit.</TableHead>
                            <TableHead className="w-28 text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="whitespace-normal">{item.product.name}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <CardFooter className="flex-wrap justify-between gap-3 border-t">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status</span>
                    <OrderStatusSelect order={order} />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Total do pedido</span>
                    <span className="text-base font-semibold text-brand">{formatCurrency(order.total)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { ImageOff, Leaf, Pencil, Sparkles, Trash2 } from "lucide-react"
import type { ProductDTO } from "../dtos/product.dto"

interface ProductTableProps {
  products: ProductDTO[]
  onEdit: (product: ProductDTO) => void
  onDelete: (product: ProductDTO) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 pl-4">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead>Indicadores</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead className="w-28 pr-4 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="pl-4">
                {product.picture ? (
                  <img
                    src={product.picture}
                    alt={product.name}
                    className="size-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <ImageOff className="size-5" />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <p className="font-medium">{product.name}</p>
                {product.description && (
                  <p className="max-w-xs truncate text-xs text-muted-foreground">
                    {product.description}
                  </p>
                )}
              </TableCell>
              <TableCell>{product.category?.name ?? "Sem categoria"}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.vegetarian && (
                    <Badge className="bg-green-100 text-green-800">
                      <Leaf /> Vegetariano
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Sparkles /> Novidade
                    </Badge>
                  )}
                  {!product.vegetarian && !product.isNew && (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={product.active ? "default" : "outline"}>
                  {product.active ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <Button variant="ghost" size="icon-sm" title="Editar" onClick={() => onEdit(product)}>
                  <Pencil />
                </Button>
                <Button variant="ghost" size="icon-sm" title="Excluir" className="text-destructive" onClick={() => onDelete(product)}>
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

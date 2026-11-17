import { useCategories } from "@/cases/categories/hooks/use-category"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductCategoryFilterProps {
  value: string | null
  onChange: (categoryId: string | null) => void
}

export function ProductCategoryFilter({ value, onChange }: ProductCategoryFilterProps) {

  const { data: categories = [] } = useCategories()

  const items = [
    { label: "Todas as categorias", value: null },
    ...categories.map((category) => ({ label: category.name, value: category.id })),
  ]

  return (
    <Select items={items} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-56 bg-card" aria-label="Filtrar por categoria">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value ?? "all"} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

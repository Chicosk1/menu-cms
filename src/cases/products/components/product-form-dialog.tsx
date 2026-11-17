import { useCategories } from "@/cases/categories/hooks/use-category"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useState, type FormEvent } from "react"
import type { ProductDTO, ProductFormDTO } from "../dtos/product.dto"
import { useCreateProduct, useUpdateProduct } from "../hooks/use-products"

interface ProductFormDialogProps {
  product: ProductDTO | null
  onClose: () => void
}

interface FormErrors {
  name?: string
  price?: string
  categoryId?: string
  picture?: string
}

export function ProductFormDialog({ product, onClose }: ProductFormDialogProps) {

  const isEditing = product !== null

  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState(product ? Number(product.price).toFixed(2) : "")
  const [categoryId, setCategoryId] = useState<string | null>(product?.category?.id ?? null)
  const [picture, setPicture] = useState(product?.picture ?? "")
  const [vegetarian, setVegetarian] = useState(product?.vegetarian ?? false)
  const [isNew, setIsNew] = useState(product?.isNew ?? false)
  const [active, setActive] = useState(product?.active ?? true)
  const [errors, setErrors] = useState<FormErrors>({})

  const { data: categories = [] } = useCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const isPending = createProduct.isPending || updateProduct.isPending

  // A API só aceita categorias ativas; a categoria atual do produto continua disponível na edição
  const categoryItems = [
    { label: "Selecione uma categoria", value: null, disabled: false },
    ...categories.map((category) => ({
      label: category.active ? category.name : `${category.name} (inativa)`,
      value: category.id,
      disabled: !category.active && category.id !== product?.category?.id,
    })),
  ]

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = "Informe o nome do produto."
    }

    if (price === "" || Number.isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Informe um preço maior que zero."
    }

    if (!categoryId) {
      newErrors.categoryId = "Selecione a categoria do produto."
    }

    if (picture.trim() && !/^https?:\/\//.test(picture.trim())) {
      newErrors.picture = "Informe uma URL começando com http:// ou https://."
    }

    return newErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0 || !categoryId) {
      return
    }

    const data: ProductFormDTO = {
      name: name.trim(),
      description: description.trim() || null,
      price: Math.round(Number(price) * 100) / 100,
      picture_url: picture.trim() || null,
      category_id: categoryId,
      vegetarian,
      isNew,
      active,
    }

    if (isEditing) {
      updateProduct.mutate({ id: product.id, product: data }, { onSuccess: onClose })
    } else {
      createProduct.mutate(data, { onSuccess: onClose })
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar produto" : "Novo produto"}</DialogTitle>
          <DialogDescription>
            Preencha os dados do produto que aparece no cardápio digital.
          </DialogDescription>
        </DialogHeader>

        <form id="product-form" onSubmit={handleSubmit} noValidate>
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
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.price}>
                <FieldLabel htmlFor="price">Preço (R$) *</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  min={0.01}
                  step={0.01}
                  placeholder="0,00"
                  value={price}
                  aria-invalid={!!errors.price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <FieldError>{errors.price}</FieldError>
              </Field>

              <Field data-invalid={!!errors.categoryId}>
                <FieldLabel htmlFor="category">Categoria *</FieldLabel>
                <Select items={categoryItems} value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger id="category" className="w-full" aria-invalid={!!errors.categoryId}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryItems.map((item) => (
                      <SelectItem key={item.value ?? "none"} value={item.value} disabled={item.disabled}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.categoryId}</FieldError>
              </Field>
            </div>

            <Field data-invalid={!!errors.picture}>
              <FieldLabel htmlFor="picture">Imagem (URL)</FieldLabel>
              <div className="flex items-center gap-3">
                <Input
                  id="picture"
                  value={picture}
                  placeholder="https://..."
                  aria-invalid={!!errors.picture}
                  onChange={(event) => setPicture(event.target.value)}
                />
                {picture.trim() && (
                  <img src={picture} alt="Pré-visualização da imagem" className="size-12 shrink-0 rounded-md object-cover" />
                )}
              </div>
              <FieldError>{errors.picture}</FieldError>
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field orientation="horizontal">
                <Switch id="vegetarian" checked={vegetarian} onCheckedChange={setVegetarian} />
                <FieldLabel htmlFor="vegetarian">Vegetariano</FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <Switch id="isNew" checked={isNew} onCheckedChange={setIsNew} />
                <FieldLabel htmlFor="isNew">Novidade</FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <Switch id="active" checked={active} onCheckedChange={setActive} />
                <FieldLabel htmlFor="active">Ativo</FieldLabel>
              </Field>
            </div>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />} disabled={isPending}>
            Cancelar
          </DialogClose>
          <Button type="submit" form="product-form" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

// A API devolve colunas numeric como texto (ex.: "29.90"), por isso aceita string ou número.
export function formatCurrency(value: number | string): string {
    return currencyFormatter.format(Number(value));
}

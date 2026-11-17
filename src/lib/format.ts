const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

// A API devolve colunas numeric como texto (ex.: "29.90"), por isso aceita string ou número.
export function formatCurrency(value: number | string): string {
    return currencyFormatter.format(Number(value));
}

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
});

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short',
});

// Datas chegam da API em ISO (UTC) e são exibidas no fuso do navegador.
export function formatDateTime(value: string): string {
    return dateTimeFormatter.format(new Date(value));
}

export function formatTime(value: string): string {
    return timeFormatter.format(new Date(value));
}

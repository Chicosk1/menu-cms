import { isAxiosError } from 'axios';

// Lê a mensagem de erro devolvida pela API NestJS (ex.: NotFoundException).
// Para erros internos (500) ou sem resposta, usa a mensagem padrão informada.
export function getErrorMessage(error: unknown, fallback: string): string {
    if (isAxiosError(error) && error.response && error.response.status < 500) {
        const message = error.response.data?.message;

        if (Array.isArray(message)) {
            return message.join(', ');
        }

        if (typeof message === 'string') {
            return message;
        }
    }

    return fallback;
}

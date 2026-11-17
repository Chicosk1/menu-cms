import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { getErrorMessage } from '@/lib/error-message'
import { CircleAlert, Inbox } from 'lucide-react'

export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
      <Spinner className="size-5" />
      <span>{message}</span>
    </div>
  )
}

interface ErrorStateProps {
  error: unknown
  onRetry: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Não foi possível carregar os dados</AlertTitle>
      <AlertDescription>
        {getErrorMessage(error, 'Verifique se a API está em execução e tente novamente.')}
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      </AlertAction>
    </Alert>
  )
}

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

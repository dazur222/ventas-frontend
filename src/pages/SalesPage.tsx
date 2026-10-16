import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'
import type { Navigate } from '../types/navigation'

export default function SalesPage({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHeading eyebrow="OPERACIÓN COMERCIAL" title="Notas de venta" description="Consulta las operaciones de venta registradas.">
      <Button onClick={() => navigate('new-sale')} icon={<Plus size={17} />}>Nueva nota de venta</Button>
    </PageHeading>
    <EmptyState>No hay notas de venta para mostrar.</EmptyState>
  </>
}

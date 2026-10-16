import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'
import type { Navigate } from '../types/navigation'

export default function DashboardPage({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHeading title="Resumen general" description="Actividad de El Gardenia.">
      <Button onClick={() => navigate('new-sale')} icon={<Plus size={17} />}>Nueva nota de venta</Button>
    </PageHeading>
    <EmptyState>No hay datos de ventas para mostrar.</EmptyState>
  </>
}

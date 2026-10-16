import { ChevronLeft } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'
import type { Navigate } from '../types/navigation'

export default function NewSalePage({ navigate }: { navigate: Navigate }) {
  return <>
    <div className="back-row">
      <button className="back-link" onClick={() => navigate('sales')}><ChevronLeft size={16} /> Volver a notas de venta</button>
    </div>
    <PageHeading eyebrow="OPERACIÓN COMERCIAL" title="Nueva nota de venta" description="El registro de notas de venta aún no está disponible." />
    <EmptyState>No hay un endpoint configurado para crear notas de venta.</EmptyState>
  </>
}

import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'

export default function ReportsPage() {
  return <>
    <PageHeading eyebrow="ANÁLISIS COMERCIAL" title="Reportes" description="Los reportes aparecerán cuando haya datos disponibles." />
    <EmptyState>No hay datos de reportes para mostrar.</EmptyState>
  </>
}

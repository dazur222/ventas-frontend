import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'

export default function CustomersPage() {
  return <>
    <PageHeading eyebrow="CATÁLOGOS" title="Clientes" description="Administra la información comercial de tus clientes." />
    <EmptyState>No hay datos de clientes para mostrar.</EmptyState>
  </>
}

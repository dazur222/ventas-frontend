import EmptyState from '../components/ui/EmptyState'
import PageHeading from '../components/ui/PageHeading'

export default function SettingsPage() {
  return <>
    <PageHeading eyebrow="SISTEMA" title="Configuración" description="Preferencias generales de la aplicación." />
    <EmptyState>No hay opciones de configuración disponibles.</EmptyState>
  </>
}

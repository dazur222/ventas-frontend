import { Bell, CalendarDays, ChevronRight, Search } from 'lucide-react'

type TopbarProps = { title: string }

export default function Topbar({ title }: TopbarProps) {
  const today = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date())

  return <header className="topbar">
    <div className="breadcrumbs"><span>El Gardenia</span><ChevronRight size={14} /><strong>{title}</strong></div>
    <div className="topbar-actions">
      <div className="search-shell"><Search size={16} /><span>Buscar...</span></div>
      <button className="icon-button topbar-notice" aria-label="Notificaciones"><Bell size={18} /></button>
      <div className="topbar-separator" />
      <div className="topbar-date"><CalendarDays size={15} /><span>{today}</span></div>
    </div>
  </header>
}

import {
  ArrowRight, Beer, ChevronDown, ChevronLeft, CircleHelp, ClipboardList,
  FileBarChart2, LayoutDashboard, Settings2, Users,
} from 'lucide-react'
import type { Navigate, Page } from '../../types/navigation'

const navGroups = [
  { label: 'GENERAL', items: [{ id: 'dashboard' as Page, label: 'Resumen', icon: LayoutDashboard }] },
  { label: 'OPERACIÓN', items: [
    { id: 'sales' as Page, label: 'Notas de venta', icon: ClipboardList },
    { id: 'customers' as Page, label: 'Clientes', icon: Users },
    { id: 'products' as Page, label: 'Productos', icon: Beer },
  ] },
  { label: 'ANÁLISIS', items: [{ id: 'reports' as Page, label: 'Reportes', icon: FileBarChart2 }] },
]

function BrandMark() {
  return <div className="brand-mark"><Beer size={21} strokeWidth={1.7} /><span className="brand-dot" /></div>
}

type SidebarProps = { page: Page; navigate: Navigate }

export default function Sidebar({ page, navigate }: SidebarProps) {
  return <aside className="sidebar">
    <div className="brand-lockup">
      <BrandMark />
      <div><div className="brand-name">EL GARDENIA</div><div className="brand-subtitle">GESTIÓN COMERCIAL</div></div>
      <button className="sidebar-collapse" aria-label="Contraer menú"><ChevronLeft size={15} /></button>
    </div>
    <div className="workspace">
      <div className="workspace-avatar">EG</div>
      <div className="workspace-copy"><strong>El Gardenia</strong><span>Ventas de cerveza</span></div>
      <ChevronDown size={15} className="muted-icon" />
    </div>
    <nav className="side-nav">
      {navGroups.map(group => <div className="nav-group" key={group.label}>
        <div className="nav-label">{group.label}</div>
        {group.items.map(item => {
          const Icon = item.icon
          const isActive = page === item.id || (page === 'new-sale' && item.id === 'sales')
          return <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{item.label}</span>
          </button>
        })}
      </div>)}
    </nav>
    <div className="sidebar-bottom">
      <button className={`nav-item ${page === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}>
        <Settings2 size={18} /><span>Configuración</span>
      </button>
      <div className="help-card">
        <div className="help-icon"><CircleHelp size={17} /></div>
        <div><strong>¿Necesitas ayuda?</strong><p>Consulta la guía del sistema.</p><button>Ver guía <ArrowRight size={13} /></button></div>
      </div>
    </div>
  </aside>
}

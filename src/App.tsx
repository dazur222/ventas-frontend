import { useState, type ReactNode } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Beer, CalendarDays,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Clock3,
  CreditCard, Download, FileBarChart2, Filter, LayoutDashboard, LogOut, MoreHorizontal,
  Package, Plus, Search, Settings2, ShoppingBag, SlidersHorizontal, Sparkles,
  Users, Wallet, X,
} from 'lucide-react'

type Page = 'dashboard' | 'sales' | 'new-sale' | 'customers' | 'products' | 'reports' | 'settings'

const navGroups = [
  { label: 'GENERAL', items: [{ id: 'dashboard' as Page, label: 'Resumen', icon: LayoutDashboard }] },
  { label: 'OPERACIÓN', items: [
    { id: 'sales' as Page, label: 'Notas de venta', icon: ClipboardList },
    { id: 'customers' as Page, label: 'Clientes', icon: Users },
    { id: 'products' as Page, label: 'Productos', icon: Beer },
  ] },
  { label: 'ANÁLISIS', items: [{ id: 'reports' as Page, label: 'Reportes', icon: FileBarChart2 }] },
]

const sales = [
  { folio: 'NV-0268', customer: 'Cervecería Norte', initials: 'CN', color: 'lavender', date: '14 oct 2026 · 10:42', items: '24 latas · 2 barriles', method: 'Transferencia', total: '$8,450.00', status: 'Pagada' },
  { folio: 'NV-0267', customer: 'Restaurante La Estación', initials: 'LE', color: 'peach', date: '14 oct 2026 · 09:18', items: '48 latas', method: 'Efectivo', total: '$3,840.00', status: 'Pagada' },
  { folio: 'NV-0266', customer: 'Distribuidora Sierra', initials: 'DS', color: 'mint', date: '13 oct 2026 · 17:35', items: '5 barriles · 24 latas', method: 'Crédito', total: '$12,680.00', status: 'Pendiente' },
  { folio: 'NV-0265', customer: 'Bar La Cima', initials: 'BC', color: 'yellow', date: '13 oct 2026 · 16:02', items: '36 latas', method: 'Transferencia', total: '$2,880.00', status: 'Pagada' },
  { folio: 'NV-0264', customer: 'Hotel Mirador', initials: 'HM', color: 'blue', date: '13 oct 2026 · 12:41', items: '3 barriles', method: 'Transferencia', total: '$7,200.00', status: 'Pagada' },
]

const customers = [
  { name: 'Cervecería Norte', initials: 'CN', color: 'lavender', type: 'Distribuidor', sales: '42', balance: '$0.00', status: 'Activo' },
  { name: 'Restaurante La Estación', initials: 'LE', color: 'peach', type: 'Mayoreo', sales: '28', balance: '$0.00', status: 'Activo' },
  { name: 'Distribuidora Sierra', initials: 'DS', color: 'mint', type: 'Distribuidor', sales: '19', balance: '$12,680.00', status: 'Activo' },
  { name: 'Bar La Cima', initials: 'BC', color: 'yellow', type: 'Mayoreo', sales: '15', balance: '$0.00', status: 'Activo' },
  { name: 'Hotel Mirador', initials: 'HM', color: 'blue', type: 'Mayoreo', sales: '11', balance: '$0.00', status: 'Activo' },
]

const products = [
  { name: 'Lager · Lata 355 ml', sku: 'CERV-LAG-355', type: 'Lata', price: '$80.00', stock: '1,240', tone: 'gold', status: 'Disponible' },
  { name: 'IPA · Lata 355 ml', sku: 'CERV-IPA-355', type: 'Lata', price: '$95.00', stock: '860', tone: 'orange', status: 'Disponible' },
  { name: 'Lager · Barril 30 L', sku: 'CERV-LAG-30L', type: 'Barril', price: '$2,400.00', stock: '34', tone: 'green', status: 'Disponible' },
  { name: 'Stout · Lata 355 ml', sku: 'CERV-STO-355', type: 'Lata', price: '$90.00', stock: '18', tone: 'plum', status: 'Stock bajo' },
]

function money(value: string) { return value }

function BrandMark() {
  return <div className="brand-mark"><Beer size={21} strokeWidth={1.7} /><span className="brand-dot" /></div>
}

function Sidebar({ page, navigate }: { page: Page; navigate: (p: Page) => void }) {
  return <aside className="sidebar">
    <div className="brand-lockup"><BrandMark /><div><div className="brand-name">EL GARDENIA</div><div className="brand-subtitle">GESTIÓN COMERCIAL</div></div><button className="sidebar-collapse" aria-label="Contraer menú"><ChevronLeft size={15} /></button></div>
    <div className="workspace"><div className="workspace-avatar">EG</div><div className="workspace-copy"><strong>El Gardenia</strong><span>Ventas de cerveza</span></div><ChevronDown size={15} className="muted-icon" /></div>
    <nav className="side-nav">
      {navGroups.map(group => <div className="nav-group" key={group.label}>
        <div className="nav-label">{group.label}</div>
        {group.items.map(item => { const Icon = item.icon; return <button key={item.id} className={`nav-item ${page === item.id || (page === 'new-sale' && item.id === 'sales') ? 'active' : ''}`} onClick={() => navigate(item.id)}><Icon size={18} strokeWidth={1.8} /><span>{item.label}</span>{item.id === 'sales' && <span className="nav-count">12</span>}</button> })}
      </div>)}
    </nav>
    <div className="sidebar-bottom">
      <button className={`nav-item ${page === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}><Settings2 size={18} /><span>Configuración</span></button>
      <div className="help-card"><div className="help-icon"><CircleHelp size={17} /></div><div><strong>¿Necesitas ayuda?</strong><p>Consulta la guía del sistema.</p><button onClick={() => {}}>Ver guía <ArrowRight size={13} /></button></div></div>
      <div className="profile"><div className="profile-avatar">DG</div><div className="profile-info"><strong>Administrador</strong><span>Cuenta de demostración</span></div><button className="icon-button profile-more" aria-label="Opciones de usuario"><MoreHorizontal size={19} /></button></div>
    </div>
  </aside>
}

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="topbar"><div className="breadcrumbs"><span>El Gardenia</span><ChevronRight size={14} /><strong>{title}</strong></div><div className="topbar-actions"><div className="search-shell"><Search size={16} /><span>Buscar algo...</span><kbd>⌘ K</kbd></div><button className="icon-button topbar-notice" aria-label="Notificaciones"><Bell size={18} /><span className="notice-dot" /></button><div className="topbar-separator" /><div className="topbar-date"><CalendarDays size={15} /><span>Miércoles, 14 de octubre</span></div></div></header>
}

function PageHeading({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description: string; children?: React.ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1><p>{description}</p></div><div className="heading-actions">{children}</div></div>
}

function Button({ children, variant = 'primary', onClick, icon }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'quiet'; onClick?: () => void; icon?: React.ReactNode }) {
  return <button onClick={onClick} className={`button button-${variant}`}>{icon}{children}</button>
}

function StatCard({ label, value, change, direction, icon, detail }: { label: string; value: string; change: string; direction: 'up' | 'down'; icon: React.ReactNode; detail: string }) {
  return <div className="stat-card"><div className="stat-top"><span className="stat-label">{label}</span><div className="stat-icon">{icon}</div></div><div className="stat-value">{value}</div><div className="stat-bottom"><span className={`change ${direction}`}>
    {direction === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}
  </span><span className="stat-detail">{detail}</span></div></div>
}

function SalesChart() {
  const values = [26, 35, 29, 43, 37, 48, 40, 55, 46, 61, 51, 68, 58, 73, 63, 84, 70, 78, 64, 91, 76, 85, 72, 96, 82, 100, 86, 91]
  const points = values.map((v, i) => `${i * 12},${118 - v}`).join(' ')
  const area = `0,118 ${points} 324,118`
  return <div className="chart-container">
    <div className="chart-y-labels"><span>$15 mil</span><span>$10 mil</span><span>$5 mil</span><span>$0</span></div>
    <div className="chart-plot"><div className="chart-grid"><span /><span /><span /><span /></div><svg viewBox="0 0 324 124" preserveAspectRatio="none" role="img" aria-label="Gráfica ilustrativa de ventas"><defs><linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4d8c70" stopOpacity=".24" /><stop offset="100%" stopColor="#4d8c70" stopOpacity="0" /></linearGradient></defs><polygon points={area} fill="url(#salesFill)" /><polyline points={points} fill="none" stroke="#3f8265" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /><circle cx="312" cy="22" r="4" fill="#fff" stroke="#3f8265" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x-labels"><span>1 oct</span><span>5 oct</span><span>9 oct</span><span>13 oct</span><span>14 oct</span></div></div>
  </div>
}

function ProductBars() {
  const rows = [{ name: 'Lager · Lata 355 ml', sold: '1,284 piezas', pct: 86, color: 'bar-green' }, { name: 'IPA · Lata 355 ml', sold: '862 piezas', pct: 64, color: 'bar-amber' }, { name: 'Lager · Barril 30 L', sold: '48 barriles', pct: 43, color: 'bar-slate' }, { name: 'Stout · Lata 355 ml', sold: '316 piezas', pct: 28, color: 'bar-orange' }]
  return <div className="product-bars">{rows.map(row => <div className="product-bar-row" key={row.name}><div className="product-bar-meta"><span>{row.name}</span><span>{row.sold}</span></div><div className="bar-track"><div className={`bar-fill ${row.color}`} style={{ width: `${row.pct}%` }} /></div></div>)}</div>
}

function Avatar({ initials, color }: { initials: string; color: string }) { return <span className={`customer-avatar avatar-${color}`}>{initials}</span> }

function SalesTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? sales.slice(0, 4) : sales
  return <div className="table-wrap"><table className="data-table"><thead><tr><th>FOLIO</th><th>CLIENTE</th><th>FECHA</th>{!compact && <th>PRODUCTOS</th>}<th>MÉTODO</th><th className="align-right">TOTAL</th><th>ESTADO</th><th /></tr></thead><tbody>{rows.map(sale => <tr key={sale.folio}><td><span className="folio">{sale.folio}</span></td><td><div className="table-person"><Avatar initials={sale.initials} color={sale.color} /><span>{sale.customer}</span></div></td><td><span className="date-cell">{sale.date}</span></td>{!compact && <td><span className="date-cell">{sale.items}</span></td>}<td><span className="method-cell"><span className={`method-dot ${sale.method === 'Efectivo' ? 'cash' : sale.method === 'Crédito' ? 'credit' : 'transfer'}`} />{sale.method}</span></td><td className="align-right total-cell">{sale.total}</td><td><span className={`status ${sale.status === 'Pagada' ? 'status-paid' : 'status-pending'}`}><span />{sale.status}</span></td><td><button className="row-menu" aria-label={`Opciones ${sale.folio}`}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div>
}

function Dashboard({ navigate }: { navigate: (p: Page) => void }) {
  return <>
    <PageHeading eyebrow="MIÉRCOLES, 14 DE OCTUBRE DE 2026" title="Resumen general" description="Aquí tienes un vistazo de cómo van las ventas de El Gardenia.">
      <Button variant="secondary" icon={<Download size={16} />}>Exportar</Button><Button onClick={() => navigate('new-sale')} icon={<Plus size={17} />}>Nueva nota de venta</Button>
    </PageHeading>
    <div className="demo-notice"><Sparkles size={15} /><span><strong>Vista de demostración</strong> Los datos que ves son de ejemplo y no representan ventas reales.</span><button aria-label="Cerrar aviso"><X size={15} /></button></div>
    <section className="stats-grid">
      <StatCard label="VENTAS DEL MES" value="$128,450" change="12.8%" direction="up" icon={<Wallet size={18} />} detail="vs. mes anterior" />
      <StatCard label="NOTAS DE VENTA" value="86" change="8.2%" direction="up" icon={<ClipboardList size={18} />} detail="vs. mes anterior" />
      <StatCard label="TICKET PROMEDIO" value="$1,493.60" change="2.4%" direction="down" icon={<CreditCard size={18} />} detail="vs. mes anterior" />
      <StatCard label="POR COBRAR" value="$12,680" change="3 notas" direction="down" icon={<Clock3 size={18} />} detail="pendientes de pago" />
    </section>
    <section className="dashboard-grid">
      <div className="panel sales-chart-panel"><div className="panel-header"><div><h2>Ventas en el tiempo</h2><p>Comportamiento de ventas durante octubre</p></div><button className="select-button">Este mes <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i /> Ventas totales</span><strong>$128,450.00</strong><span className="legend-comparison"><ArrowUpRight size={13} /> 12.8%</span></div><SalesChart /><div className="chart-footnote"><span>Datos ilustrativos</span><span>Actualizado al 14 oct, 10:45 h</span></div></div>
      <div className="panel top-products-panel"><div className="panel-header"><div><h2>Productos más vendidos</h2><p>Por volumen de unidades</p></div><button className="icon-button" aria-label="Más opciones"><MoreHorizontal size={19} /></button></div><ProductBars /><button className="text-link" onClick={() => navigate('products')}>Ver catálogo completo <ArrowRight size={14} /></button></div>
    </section>
    <section className="panel recent-panel"><div className="panel-header"><div><h2>Notas de venta recientes</h2><p>Actividad registrada más reciente</p></div><Button variant="secondary" onClick={() => navigate('sales')}>Ver todas <ArrowRight size={15} /></Button></div><SalesTable compact /></section>
  </>
}

function SalesPage({ navigate }: { navigate: (p: Page) => void }) {
  return <><PageHeading eyebrow="OPERACIÓN COMERCIAL" title="Notas de venta" description="Consulta y organiza las operaciones de venta registradas."><Button variant="secondary" icon={<Download size={16} />}>Exportar</Button><Button onClick={() => navigate('new-sale')} icon={<Plus size={17} />}>Nueva nota de venta</Button></PageHeading>
    <div className="list-summary"><div><span className="summary-number">268</span><span className="summary-label">notas en total</span></div><div className="summary-divider" /><div><span className="summary-number">$128,450.00</span><span className="summary-label">ventas de octubre</span></div><div className="summary-divider" /><div><span className="summary-number">3</span><span className="summary-label">pendientes de pago</span></div></div>
    <div className="panel list-panel"><div className="list-toolbar"><div className="list-search"><Search size={16} /><input placeholder="Buscar por folio o cliente..." /></div><button className="filter-button"><CalendarDays size={15} /> Este mes <ChevronDown size={14} /></button><button className="filter-button"><Filter size={15} /> Estado <ChevronDown size={14} /></button><button className="filter-square" aria-label="Más filtros"><SlidersHorizontal size={16} /></button></div><SalesTable /><div className="pagination"><span>Mostrando <strong>1–5</strong> de <strong>268</strong> resultados</span><div><button className="page-arrow" aria-label="Anterior"><ChevronLeft size={16} /></button><button className="page-number current">1</button><button className="page-number">2</button><button className="page-number">3</button><span>...</span><button className="page-number">54</button><button className="page-arrow" aria-label="Siguiente"><ChevronRight size={16} /></button></div></div></div>
  </>
}

function NewSalePage({ navigate }: { navigate: (p: Page) => void }) {
  return <><div className="back-row"><button className="back-link" onClick={() => navigate('sales')}><ChevronLeft size={16} /> Volver a notas de venta</button><span className="draft-chip">BORRADOR DE DEMOSTRACIÓN</span></div><PageHeading eyebrow="OPERACIÓN COMERCIAL" title="Nueva nota de venta" description="Registra la venta de cerveza y sus partidas."><Button variant="secondary">Cancelar</Button><Button icon={<ClipboardList size={16} />}>Guardar nota de venta</Button></PageHeading>
    <div className="sale-form-layout"><div className="form-main"><section className="panel form-panel"><div className="form-section-heading"><div className="section-number">01</div><div><h2>Información de la venta</h2><p>Datos generales de la operación.</p></div></div><div className="form-grid"><label className="field"><span>Fecha de venta <b>*</b></span><div className="input-frame"><CalendarDays size={16} /><input type="text" value="14/10/2026" readOnly /></div></label><label className="field"><span>Cliente <b>*</b></span><div className="input-frame"><Users size={16} /><span className="placeholder-value">Seleccionar cliente</span><ChevronDown size={15} className="field-end-icon" /></div></label><label className="field"><span>Método de pago</span><div className="input-frame"><CreditCard size={16} /><span className="placeholder-value">Seleccionar método</span><ChevronDown size={15} className="field-end-icon" /></div></label><label className="field"><span>Referencia / pedido</span><div className="input-frame"><input placeholder="Ej. PED-1042" /></div></label><label className="field full-field"><span>Observaciones</span><textarea placeholder="Agrega alguna nota sobre la venta..." rows={3} /></label></div></section>
      <section className="panel form-panel items-panel"><div className="form-section-heading"><div className="section-number">02</div><div><h2>Productos de la venta</h2><p>Agrega las presentaciones y cantidades.</p></div><Button variant="secondary" icon={<Plus size={15} />}>Agregar producto</Button></div><div className="items-table"><div className="items-head"><span>PRODUCTO</span><span>CANTIDAD</span><span>PRECIO UNITARIO</span><span>IMPORTE</span><span /></div><div className="item-line"><div className="item-product"><div className="product-mini-icon gold"><Beer size={18} /></div><div><strong>Lager · Lata 355 ml</strong><span>Unidad: lata</span></div><ChevronDown size={14} className="item-chevron" /></div><div className="static-input">24</div><div className="static-input">$80.00</div><strong className="item-total">$1,920.00</strong><button className="delete-row" aria-label="Eliminar partida"><X size={15} /></button></div><div className="item-line"><div className="item-product"><div className="product-mini-icon green"><Beer size={18} /></div><div><strong>Lager · Barril 30 L</strong><span>Unidad: barril</span></div><ChevronDown size={14} className="item-chevron" /></div><div className="static-input">2</div><div className="static-input">$2,400.00</div><strong className="item-total">$4,800.00</strong><button className="delete-row" aria-label="Eliminar partida"><X size={15} /></button></div></div><div className="add-item-row"><Plus size={15} /><span>Agregar otra partida</span></div><div className="tax-note"><CircleHelp size={15} /><span>Los impuestos se definirán conforme a los criterios fiscales confirmados por contabilidad.</span></div></section></div>
      <aside className="form-aside"><section className="panel summary-panel"><div className="summary-panel-title"><ShoppingBag size={17} /><h2>Resumen</h2></div><div className="summary-line"><span>Partidas</span><strong>2</strong></div><div className="summary-line"><span>Unidades totales</span><strong>26</strong></div><div className="summary-divider-line" /><div className="summary-line"><span>Subtotal</span><strong>$6,720.00</strong></div><div className="summary-line muted"><span>Impuestos</span><span>Por definir</span></div><div className="summary-total"><span>Total de venta</span><strong>$6,720.00</strong></div><p className="summary-disclaimer">Importes ilustrativos. No se calculan impuestos en esta vista.</p><Button>Guardar como borrador</Button><Button variant="secondary">Guardar y finalizar</Button></section><section className="helper-card"><div className="helper-icon"><Sparkles size={17} /></div><div><strong>Un pequeño recordatorio</strong><p>El precio unitario se registra en cada partida para conservar el precio aplicado a esa venta.</p></div></section></aside></div>
  </>
}

function CustomersPage() {
  return <><PageHeading eyebrow="CATÁLOGOS" title="Clientes" description="Administra la información comercial de tus clientes."><Button variant="secondary" icon={<Download size={16} />}>Exportar</Button><Button icon={<Plus size={17} />}>Nuevo cliente</Button></PageHeading><div className="list-summary"><div><span className="summary-number">124</span><span className="summary-label">clientes registrados</span></div><div className="summary-divider" /><div><span className="summary-number">118</span><span className="summary-label">activos</span></div><div className="summary-divider" /><div><span className="summary-number">3</span><span className="summary-label">tipos de cliente</span></div></div><div className="panel list-panel"><div className="list-toolbar"><div className="list-search"><Search size={16} /><input placeholder="Buscar cliente..." /></div><button className="filter-button"><Users size={15} /> Tipo de cliente <ChevronDown size={14} /></button><button className="filter-button"><Filter size={15} /> Estado <ChevronDown size={14} /></button><button className="filter-square" aria-label="Más filtros"><SlidersHorizontal size={16} /></button></div><div className="table-wrap"><table className="data-table"><thead><tr><th>CLIENTE</th><th>TIPO</th><th>NOTAS DE VENTA</th><th>SALDO PENDIENTE</th><th>ESTADO</th><th /></tr></thead><tbody>{customers.map(c => <tr key={c.name}><td><div className="table-person"><Avatar initials={c.initials} color={c.color} /><div className="person-with-sub"><strong>{c.name}</strong><span>Cliente desde enero 2026</span></div></div></td><td><span className="type-chip">{c.type}</span></td><td>{c.sales}</td><td className="total-cell">{c.balance}</td><td><span className="status status-paid"><span />{c.status}</span></td><td><button className="row-menu" aria-label="Opciones del cliente"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div><div className="pagination"><span>Mostrando <strong>1–5</strong> de <strong>124</strong> clientes</span><div><button className="page-arrow"><ChevronLeft size={16} /></button><button className="page-number current">1</button><button className="page-number">2</button><button className="page-number">3</button><button className="page-arrow"><ChevronRight size={16} /></button></div></div></div></>
}

function ProductsPage() {
  return <><PageHeading eyebrow="CATÁLOGOS" title="Productos" description="Consulta las presentaciones de cerveza disponibles para venta."><Button variant="secondary" icon={<Download size={16} />}>Exportar</Button><Button icon={<Plus size={17} />}>Nuevo producto</Button></PageHeading><div className="list-summary"><div><span className="summary-number">18</span><span className="summary-label">productos registrados</span></div><div className="summary-divider" /><div><span className="summary-number">12</span><span className="summary-label">presentaciones en lata</span></div><div className="summary-divider" /><div><span className="summary-number">6</span><span className="summary-label">presentaciones en barril</span></div></div><div className="panel list-panel"><div className="list-toolbar"><div className="list-search"><Search size={16} /><input placeholder="Buscar producto..." /></div><button className="filter-button"><Package size={15} /> Presentación <ChevronDown size={14} /></button><button className="filter-button"><Filter size={15} /> Estado <ChevronDown size={14} /></button><button className="filter-square"><SlidersHorizontal size={16} /></button></div><div className="table-wrap"><table className="data-table"><thead><tr><th>PRODUCTO</th><th>PRESENTACIÓN</th><th>PRECIO DE REFERENCIA</th><th>EXISTENCIA ILUSTRATIVA</th><th>ESTADO</th><th /></tr></thead><tbody>{products.map(p => <tr key={p.sku}><td><div className="table-person"><div className={`product-mini-icon ${p.tone}`}><Beer size={18} /></div><div className="person-with-sub"><strong>{p.name}</strong><span>{p.sku}</span></div></div></td><td>{p.type}</td><td className="total-cell">{p.price}</td><td>{p.stock} <span className="date-cell">{p.type === 'Lata' ? 'piezas' : 'barriles'}</span></td><td><span className={`status ${p.status === 'Disponible' ? 'status-paid' : 'status-pending'}`}><span />{p.status}</span></td><td><button className="row-menu"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div><div className="pagination"><span>Mostrando <strong>1–4</strong> de <strong>18</strong> productos</span><div><button className="page-arrow"><ChevronLeft size={16} /></button><button className="page-number current">1</button><button className="page-number">2</button><button className="page-number">3</button><button className="page-arrow"><ChevronRight size={16} /></button></div></div></div></>
}

function ReportsPage() {
  return <><PageHeading eyebrow="ANÁLISIS COMERCIAL" title="Reportes" description="Una vista general del comportamiento comercial de la cervecería."><Button variant="secondary" icon={<CalendarDays size={16} />}>1–14 oct 2026</Button><Button variant="secondary" icon={<Download size={16} />}>Exportar reporte</Button></PageHeading><div className="report-filter-note"><Activity size={15} /><span>Datos de demostración · Periodo del 1 al 14 de octubre de 2026</span></div><div className="stats-grid report-stats"><StatCard label="VENTAS BRUTAS" value="$128,450" change="12.8%" direction="up" icon={<Wallet size={18} />} detail="vs. periodo anterior" /><StatCard label="UNIDADES VENDIDAS" value="2,510" change="6.4%" direction="up" icon={<Package size={18} />} detail="vs. periodo anterior" /><StatCard label="CLIENTES CON VENTA" value="38" change="4.1%" direction="up" icon={<Users size={18} />} detail="vs. periodo anterior" /><StatCard label="VENTA PROMEDIO" value="$1,493.60" change="2.4%" direction="down" icon={<CreditCard size={18} />} detail="vs. periodo anterior" /></div><div className="dashboard-grid report-grid"><div className="panel sales-chart-panel"><div className="panel-header"><div><h2>Ventas por día</h2><p>Importe total por fecha de venta</p></div><button className="select-button">Por día <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i /> Ventas totales</span><strong>$128,450.00</strong></div><SalesChart /></div><div className="panel top-products-panel"><div className="panel-header"><div><h2>Composición de ventas</h2><p>Por presentación</p></div></div><div className="donut-wrap"><div className="donut-chart"><div><strong>2,510</strong><span>unidades</span></div></div><div className="donut-legend"><span><i className="legend-lager" /> Latas <strong>72%</strong></span><span><i className="legend-barrel" /> Barriles <strong>28%</strong></span></div></div></div></div><section className="panel recent-panel"><div className="panel-header"><div><h2>Principales productos</h2><p>Ordenados por ventas de ejemplo</p></div></div><ProductBars /></section></>
}

function SettingsPage() {
  return <><PageHeading eyebrow="SISTEMA" title="Configuración" description="Preferencias generales de la aplicación."><Button variant="secondary" icon={<Settings2 size={16} />}>Vista general</Button></PageHeading><div className="settings-layout"><div className="settings-menu panel"><button className="settings-menu-item active"><Settings2 size={17} /> General</button><button className="settings-menu-item"><Users size={17} /> Usuarios y permisos</button><button className="settings-menu-item"><CreditCard size={17} /> Métodos de pago</button><button className="settings-menu-item"><FileBarChart2 size={17} /> Preferencias de reportes</button></div><div className="panel settings-content"><div className="settings-section-title"><h2>Información del negocio</h2><p>Datos de referencia que identifican al establecimiento.</p></div><label className="field"><span>Nombre comercial</span><div className="input-frame"><input readOnly value="El Gardenia" /></div></label><label className="field"><span>Área de operación</span><div className="input-frame"><input readOnly value="Ventas de cerveza" /></div></label><label className="field"><span>Moneda</span><div className="input-frame"><input readOnly value="Peso mexicano (MXN)" /></div></label><div className="settings-bottom-note"><CircleHelp size={16} /> Esta pantalla es una maqueta visual. Los ajustes todavía no se guardan.</div></div></div></>
}

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Resumen', subtitle: 'Resumen general' }, sales: { title: 'Notas de venta', subtitle: 'Notas de venta' }, 'new-sale': { title: 'Nueva nota', subtitle: 'Nueva nota de venta' }, customers: { title: 'Clientes', subtitle: 'Clientes' }, products: { title: 'Productos', subtitle: 'Productos' }, reports: { title: 'Reportes', subtitle: 'Reportes' }, settings: { title: 'Configuración', subtitle: 'Configuración' },
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const navigate = (nextPage: Page) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const content = () => {
    switch (page) {
      case 'dashboard': return <Dashboard navigate={navigate} />
      case 'sales': return <SalesPage navigate={navigate} />
      case 'new-sale': return <NewSalePage navigate={navigate} />
      case 'customers': return <CustomersPage />
      case 'products': return <ProductsPage />
      case 'reports': return <ReportsPage />
      case 'settings': return <SettingsPage />
    }
  }
  return <div className="app-shell"><Sidebar page={page} navigate={navigate} /><main className="main-area"><Topbar title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} /><div className="content-area">{content()}<footer className="app-footer"><span>EL GARDENIA <span className="footer-separator">·</span> Gestión comercial</span><span>Prototipo de interfaz <span className="footer-separator">·</span> v0.1</span></footer></div></main></div>
}

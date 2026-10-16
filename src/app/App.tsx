import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import CustomersPage from '../pages/CustomersPage'
import DashboardPage from '../pages/DashboardPage'
import NewSalePage from '../pages/NewSalePage'
import ReportsPage from '../pages/ReportsPage'
import SalesPage from '../pages/SalesPage'
import SettingsPage from '../pages/SettingsPage'
import ProductsPage from '../features/products/ProductsPage'
import type { Navigate, Page } from '../types/navigation'

const pageMeta: Record<Page, { title: string }> = {
  dashboard: { title: 'Resumen' },
  sales: { title: 'Notas de venta' },
  'new-sale': { title: 'Nueva nota' },
  customers: { title: 'Clientes' },
  products: { title: 'Productos' },
  reports: { title: 'Reportes' },
  settings: { title: 'Configuración' },
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const navigate: Navigate = nextPage => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = {
    dashboard: <DashboardPage navigate={navigate} />,
    sales: <SalesPage navigate={navigate} />,
    'new-sale': <NewSalePage navigate={navigate} />,
    customers: <CustomersPage />,
    products: <ProductsPage />,
    reports: <ReportsPage />,
    settings: <SettingsPage />,
  }

  return <div className="app-shell">
    <Sidebar page={page} navigate={navigate} />
    <main className="main-area">
      <Topbar title={pageMeta[page].title} />
      <div className="content-area">
        {pages[page]}
        <footer className="app-footer"><span>EL GARDENIA <span className="footer-separator">·</span> Gestión comercial</span></footer>
      </div>
    </main>
  </div>
}

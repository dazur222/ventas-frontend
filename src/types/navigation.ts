export type Page = 'dashboard' | 'sales' | 'new-sale' | 'customers' | 'products' | 'reports' | 'settings'

export type Navigate = (page: Page) => void

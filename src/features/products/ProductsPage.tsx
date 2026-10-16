import { useCallback, useEffect, useState } from 'react'
import { Beer, Package, Plus } from 'lucide-react'
import Button from '../../components/ui/Button'
import PageHeading from '../../components/ui/PageHeading'
import BeerFormModal from './BeerFormModal'
import PresentationFormModal from './PresentationFormModal'
import { getBeerStyles, getBeers, getContainerTypes, getPresentations } from './productApi'
import type { BeerRecord, BeerStyle, ContainerType, PresentationRecord } from './types'

export default function ProductsPage() {
  const [beers, setBeers] = useState<BeerRecord[]>([])
  const [styles, setStyles] = useState<BeerStyle[]>([])
  const [containerTypes, setContainerTypes] = useState<ContainerType[]>([])
  const [presentations, setPresentations] = useState<PresentationRecord[]>([])
  const [beersLoading, setBeersLoading] = useState(true)
  const [stylesLoading, setStylesLoading] = useState(true)
  const [containerTypesLoading, setContainerTypesLoading] = useState(true)
  const [presentationsLoading, setPresentationsLoading] = useState(true)
  const [beersError, setBeersError] = useState('')
  const [stylesError, setStylesError] = useState('')
  const [containerTypesError, setContainerTypesError] = useState('')
  const [presentationsError, setPresentationsError] = useState('')
  const [isBeerFormOpen, setIsBeerFormOpen] = useState(false)
  const [isPresentationFormOpen, setIsPresentationFormOpen] = useState(false)
  const [presentationNotice, setPresentationNotice] = useState('')

  const refreshBeers = useCallback(async () => {
    setBeersLoading(true)
    setBeersError('')
    try {
      setBeers(await getBeers())
    } catch (error) {
      setBeersError(error instanceof Error ? error.message : 'Ocurrió un error al actualizar las cervezas.')
    } finally {
      setBeersLoading(false)
    }
  }, [])

  const refreshPresentations = useCallback(async () => {
    setPresentationsLoading(true)
    setPresentationsError('')
    try {
      setPresentations(await getPresentations())
    } catch (error) {
      setPresentationsError(error instanceof Error ? error.message : 'Ocurrió un error al actualizar las presentaciones.')
    } finally {
      setPresentationsLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    getBeers().then(data => { if (active) setBeers(data) })
      .catch(error => { if (active) setBeersError(error instanceof Error ? error.message : 'Ocurrió un error al cargar las cervezas.') })
      .finally(() => { if (active) setBeersLoading(false) })
    getBeerStyles().then(data => { if (active) setStyles(data) })
      .catch(error => { if (active) setStylesError(error instanceof Error ? error.message : 'Ocurrió un error al cargar los estilos.') })
      .finally(() => { if (active) setStylesLoading(false) })
    getContainerTypes().then(data => { if (active) setContainerTypes(data) })
      .catch(error => { if (active) setContainerTypesError(error instanceof Error ? error.message : 'Ocurrió un error al cargar los tipos de envase.') })
      .finally(() => { if (active) setContainerTypesLoading(false) })
    getPresentations().then(data => { if (active) setPresentations(data) })
      .catch(error => { if (active) setPresentationsError(error instanceof Error ? error.message : 'Ocurrió un error al cargar las presentaciones.') })
      .finally(() => { if (active) setPresentationsLoading(false) })
    return () => { active = false }
  }, [])

  const handlePresentationSaved = async () => {
    setPresentationNotice('La presentación se guardó correctamente.')
    await refreshPresentations()
  }

  return <>
    <PageHeading eyebrow="CATÁLOGOS" title="Productos" description="Administra las cervezas y las presentaciones disponibles para venta.">
      <Button variant="secondary" onClick={() => { setPresentationNotice(''); setIsPresentationFormOpen(true) }} icon={<Package size={16} />}>Nueva presentación</Button>
      <Button onClick={() => setIsBeerFormOpen(true)} icon={<Plus size={17} />}>Nueva cerveza</Button>
    </PageHeading>

    <div className="list-summary">
      <div><span className="summary-number">{beersLoading ? '—' : beers.length}</span><span className="summary-label">cervezas registradas</span></div>
      <div className="summary-divider" />
      <div><span className="summary-number">{presentationsLoading ? '—' : presentations.length}</span><span className="summary-label">presentaciones registradas</span></div>
    </div>

    <section className="panel list-panel catalog-section">
      <div className="panel-header catalog-panel-header"><div><h2>Cervezas</h2><p>Catálogo de cervezas registrado en el sistema.</p></div></div>
      {beersError && <div className="catalog-message catalog-error" role="alert">{beersError}</div>}
      {beersLoading ? <div className="catalog-message">Cargando cervezas...</div>
        : !beersError && beers.length === 0 ? <div className="catalog-message">Todavía no hay cervezas registradas.</div>
          : !beersError && <div className="table-wrap"><table className="data-table">
            <thead><tr><th>CERVEZA</th><th>ESTILO</th><th>GRADOS DE ALCOHOL</th><th>IBU</th></tr></thead>
            <tbody>{beers.map(beer => <tr key={beer.id}>
              <td><div className="table-person"><div className="product-mini-icon green"><Beer size={18} /></div><div className="person-with-sub"><strong>{beer.nombre}</strong><span>ID {beer.id}</span></div></div></td>
              <td>{beer.estiloCerveza}</td><td>{beer.gradosAlcohol === null ? '—' : `${beer.gradosAlcohol}%`}</td><td>{beer.ibu ?? '—'}</td>
            </tr>)}</tbody>
          </table></div>}
    </section>

    <section className="panel list-panel catalog-section">
      <div className="panel-header catalog-panel-header"><div><h2>Presentaciones</h2><p>Presentaciones de envase registradas.</p></div></div>
      {presentationNotice && <div className="catalog-message catalog-success" role="status">{presentationNotice}</div>}
      {presentationsError && <div className="catalog-message catalog-error" role="alert">{presentationsError}</div>}
      {presentationsLoading ? <div className="catalog-message">Cargando presentaciones...</div>
        : !presentationsError && presentations.length === 0 ? <div className="catalog-message">Todavía no hay presentaciones registradas.</div>
          : !presentationsError && <div className="table-wrap"><table className="data-table">
            <thead><tr><th>TIPO DE ENVASE</th><th>CONTENIDO</th><th>ID</th></tr></thead>
            <tbody>{presentations.map(presentation => <tr key={presentation.id}>
              <td>{presentation.tipoEnvase.nombre}</td><td>{presentation.litros} L</td><td>{presentation.id}</td>
            </tr>)}</tbody>
          </table></div>}
    </section>

    {isBeerFormOpen && <BeerFormModal
      styles={styles}
      stylesLoading={stylesLoading}
      stylesError={stylesError}
      onClose={() => setIsBeerFormOpen(false)}
      onSaved={refreshBeers}
    />}
    {isPresentationFormOpen && <PresentationFormModal
      containerTypes={containerTypes}
      containerTypesLoading={containerTypesLoading}
      containerTypesError={containerTypesError}
      onClose={() => setIsPresentationFormOpen(false)}
      onSaved={handlePresentationSaved}
    />}
  </>
}

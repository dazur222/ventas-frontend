import { useState, type FormEvent } from 'react'
import { createBeer } from './productApi'
import type { BeerStyle } from './types'

type BeerFormModalProps = {
  styles: BeerStyle[]
  stylesLoading: boolean
  stylesError: string
  onClose: () => void
  onSaved: () => Promise<void>
}

export default function BeerFormModal({
  styles,
  stylesLoading,
  stylesError,
  onClose,
  onSaved,
}: BeerFormModalProps) {
  const [name, setName] = useState('')
  const [alcohol, setAlcohol] = useState('')
  const [ibu, setIbu] = useState('')
  const [styleId, setStyleId] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await createBeer({
        nombre: name.trim(),
        gradosAlcohol: Number(alcohol),
        ibu: Number(ibu),
        estiloCervezaId: Number(styleId),
      })
      await onSaved()
      onClose()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Ocurrió un error al guardar la cerveza.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="beer-modal-backdrop" onMouseDown={event => {
    if (event.target === event.currentTarget && !saving) onClose()
  }}>
    <section className="beer-modal" role="dialog" aria-modal="true" aria-labelledby="beer-modal-title">
      <div className="beer-modal-header">
        <div><span className="eyebrow">CATÁLOGOS</span><h2 id="beer-modal-title">Nueva cerveza</h2><p>Ingresa los datos de la cerveza que quieres registrar.</p></div>
        <button className="icon-button" type="button" aria-label="Cerrar formulario" onClick={onClose} disabled={saving}>×</button>
      </div>
      <form onSubmit={submit}>
        <label className="beer-form-field"><span>Nombre <b>*</b></span><input autoFocus required maxLength={120} value={name} onChange={event => setName(event.target.value)} /></label>
        <label className="beer-form-field"><span>Grados de alcohol <b>*</b></span><div className="beer-alcohol-input"><input required type="number" min="0.1" max="100" step="0.01" value={alcohol} onChange={event => setAlcohol(event.target.value)} /><span>%</span></div></label>
        <label className="beer-form-field"><span>IBU <b>*</b></span><input required type="number" min="0" step="1" value={ibu} onChange={event => setIbu(event.target.value)} /></label>
        <label className="beer-form-field"><span>Tipo de cerveza <b>*</b></span><select required value={styleId} onChange={event => setStyleId(event.target.value)} disabled={stylesLoading || styles.length === 0}><option value="">{stylesLoading ? 'Cargando tipos...' : 'Selecciona un tipo'}</option>{styles.map(style => <option key={style.id} value={style.id}>{style.nombre}</option>)}</select>{stylesError && <span className="beer-form-error" role="alert">{stylesError}</span>}{!stylesLoading && !stylesError && styles.length === 0 && <span className="beer-form-error">No hay tipos de cerveza disponibles.</span>}</label>
        {error && <div className="beer-form-error beer-save-error" role="alert">{error}</div>}
        <div className="beer-modal-actions"><button className="button button-secondary" type="button" onClick={onClose} disabled={saving}>Cancelar</button><button className="button button-primary" type="submit" disabled={saving || stylesLoading || styles.length === 0}>{saving ? 'Guardando...' : 'Guardar cerveza'}</button></div>
      </form>
    </section>
  </div>
}

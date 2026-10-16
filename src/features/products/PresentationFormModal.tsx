import { useState, type FormEvent } from 'react'
import { createPresentation } from './productApi'
import type { ContainerType } from './types'

type PresentationFormModalProps = {
  containerTypes: ContainerType[]
  containerTypesLoading: boolean
  containerTypesError: string
  onClose: () => void
  onSaved: () => Promise<void>
}

export default function PresentationFormModal({
  containerTypes,
  containerTypesLoading,
  containerTypesError,
  onClose,
  onSaved,
}: PresentationFormModalProps) {
  const [liters, setLiters] = useState('')
  const [containerTypeId, setContainerTypeId] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await createPresentation({
        litros: Number(liters),
        tipoEnvase: { id: Number(containerTypeId) },
      })
      await onSaved()
      onClose()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Ocurrió un error al guardar la presentación.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="beer-modal-backdrop" onMouseDown={event => {
    if (event.target === event.currentTarget && !saving) onClose()
  }}>
    <section className="beer-modal" role="dialog" aria-modal="true" aria-labelledby="presentation-modal-title">
      <div className="beer-modal-header">
        <div><span className="eyebrow">CATÁLOGOS</span><h2 id="presentation-modal-title">Nueva presentación</h2><p>Define la capacidad y el tipo de envase.</p></div>
        <button className="icon-button" type="button" aria-label="Cerrar formulario" onClick={onClose} disabled={saving}>×</button>
      </div>
      <form onSubmit={submit}>
        <label className="beer-form-field"><span>Contenido en litros <b>*</b></span><div className="beer-alcohol-input"><input autoFocus required type="number" min="0.01" max="1000" step="0.01" value={liters} onChange={event => setLiters(event.target.value)} /><span>L</span></div></label>
        <label className="beer-form-field"><span>Tipo de envase <b>*</b></span><select required value={containerTypeId} onChange={event => setContainerTypeId(event.target.value)} disabled={containerTypesLoading || containerTypes.length === 0}><option value="">{containerTypesLoading ? 'Cargando tipos de envase...' : 'Selecciona un tipo de envase'}</option>{containerTypes.map(type => <option key={type.id} value={type.id}>{type.nombre}</option>)}</select>{containerTypesError && <span className="beer-form-error" role="alert">{containerTypesError}</span>}{!containerTypesLoading && !containerTypesError && containerTypes.length === 0 && <span className="beer-form-error">No hay tipos de envase disponibles.</span>}</label>
        {error && <div className="beer-form-error beer-save-error" role="alert">{error}</div>}
        <div className="beer-modal-actions"><button className="button button-secondary" type="button" onClick={onClose} disabled={saving}>Cancelar</button><button className="button button-primary" type="submit" disabled={saving || containerTypesLoading || containerTypes.length === 0}>{saving ? 'Guardando...' : 'Guardar presentación'}</button></div>
      </form>
    </section>
  </div>
}

import type { BeerRecord, BeerStyle, ContainerType, PresentationRecord } from './types'

const API_URL = '/api'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isBeerStyle(value: unknown): value is BeerStyle {
  return isRecord(value) && typeof value.id === 'number' && typeof value.nombre === 'string'
}

export function isContainerType(value: unknown): value is ContainerType {
  return isRecord(value) && typeof value.id === 'number' && typeof value.nombre === 'string'
}

function isBeerRecord(value: unknown): value is BeerRecord {
  return isRecord(value)
    && typeof value.id === 'number'
    && typeof value.nombre === 'string'
    && (typeof value.gradosAlcohol === 'number' || value.gradosAlcohol === null)
    && (typeof value.ibu === 'number' || value.ibu === null)
    && typeof value.estiloCerveza === 'string'
}

function isPresentationRecord(value: unknown): value is PresentationRecord {
  return isRecord(value)
    && typeof value.id === 'number'
    && typeof value.litros === 'number'
    && isContainerType(value.tipoEnvase)
}

async function getCollection<T>(
  endpoint: string,
  isItem: (value: unknown) => value is T,
  label: string,
): Promise<T[]> {
  const response = await fetch(`${API_URL}/${endpoint}`)
  if (!response.ok) throw new Error(`No se pudieron cargar ${label} (HTTP ${response.status}).`)
  const data: unknown = await response.json()
  if (!Array.isArray(data) || !data.every(isItem)) {
    throw new Error(`La respuesta de ${label} tiene un formato inesperado.`)
  }
  return data
}

export const getBeerStyles = () => getCollection('estilo-cerveza', isBeerStyle, 'los estilos de cerveza')
export const getBeers = () => getCollection('cerveza', isBeerRecord, 'las cervezas')
export const getContainerTypes = () => getCollection('tipo-envase', isContainerType, 'los tipos de envase')
export const getPresentations = () => getCollection('presentacion', isPresentationRecord, 'las presentaciones')

export async function createBeer(beer: {
  nombre: string
  gradosAlcohol: number
  ibu: number
  estiloCervezaId: number
}): Promise<void> {
  const response = await fetch(`${API_URL}/cerveza`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(beer),
  })
  if (!response.ok) throw new Error(`No se pudo guardar la cerveza (HTTP ${response.status}).`)
}

export async function createPresentation(presentation: {
  litros: number
  tipoEnvase: { id: number }
}): Promise<void> {
  const response = await fetch(`${API_URL}/presentacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(presentation),
  })
  if (!response.ok) throw new Error(`No se pudo guardar la presentación (HTTP ${response.status}).`)
}

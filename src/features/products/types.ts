export type BeerStyle = { id: number; nombre: string }
export type ContainerType = { id: number; nombre: string }

export type BeerRecord = {
  id: number
  nombre: string
  gradosAlcohol: number | null
  ibu: number | null
  estiloCerveza: string
}

export type PresentationRecord = {
  id: number
  litros: number
  tipoEnvase: ContainerType
}

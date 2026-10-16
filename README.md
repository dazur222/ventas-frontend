# El Gardenia — Frontend de demostración

Prototipo visual de una aplicación web para registrar ventas de cerveza y consultar clientes, productos y reportes.

## Tecnologías

- React
- TypeScript
- Vite
- lucide-react
- CSS responsive propio

## Requisitos

- Node.js 20 o posterior
- npm

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal, normalmente `http://localhost:5173`.

## Generar build de producción

```bash
npm run build
npm run preview
```

## Alcance actual

Los catálogos de cerveza, estilos, tipos de envase y presentaciones se consultan desde el backend local. En Productos, se usan `GET /estilo-cerveza`, `GET /cerveza`, `GET /tipo-envase` y `GET /presentacion`; las cervezas se envían mediante `POST /cerveza` y las presentaciones mediante `POST /presentacion`. Durante el desarrollo, Vite reenvía las solicitudes `/api/*` a `localhost:1137`; la API debe estar disponible localmente. Las secciones que aún no tienen endpoints muestran estados vacíos en lugar de datos de ejemplo.

Pantallas incluidas:

- Resumen general
- Notas de venta
- Nueva nota de venta
- Clientes
- Productos
- Reportes
- Configuración

## Estructura

```text
src/
├── app/                  # Composición de la aplicación y navegación entre páginas
├── components/
│   ├── layout/           # Barra lateral y encabezado
│   └── ui/               # Controles y componentes visuales reutilizables
├── features/
│   └── products/         # Catálogo, formularios, tipos y comunicación con la API
├── pages/                # Páginas de navegación
├── types/                # Tipos compartidos
├── main.tsx              # Punto de entrada de React
├── styles.css            # Estilos globales
└── catalog.css           # Estilos del catálogo de productos
```
# ventas-frontend

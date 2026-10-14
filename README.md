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

La aplicación es una maqueta de interfaz. Utiliza datos estáticos de ejemplo y no se conecta a un backend ni a una base de datos. Los controles de formularios, filtros, exportación y guardado son visuales; no realizan operaciones comerciales ni persisten cambios. La navegación entre las pantallas principales sí funciona.

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
├── App.tsx       # Pantallas y componentes del prototipo
├── main.tsx      # Punto de entrada de React
└── styles.css    # Estilos responsive
```
# ventas-frontend

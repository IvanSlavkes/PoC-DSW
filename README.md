# PoC Angular — To-Do List

Demo técnica del grupo **Angular** para la Prueba de Concepto (PoC) del bloque temático **"FE Frameworks"** — Desarrollo de Software, UTN FRRo (2026).

Compara Angular frente a React y Vue mediante la implementación de una misma mini-aplicación equivalente en cada tecnología. El desarrollo completo del análisis (cómo funciona, aspectos técnicos, ecosistema, ventajas/desventajas) está en el informe del bloque.

## Integrantes

- [Completar con nombres del grupo]

## Stack

- **Angular 22** + **TypeScript**
- **Angular CLI** (bundler y dev server)
- **Standalone Components** (sin NgModules)
- **Signals** (`signal`, `computed`, `effect`) — sistema reactivo de Angular
- **Reactive Forms** — manejo de formularios
- **json-server** — simula la API REST sin backend real

## Alcance funcional

Aplicación de gestión de tareas (to-do list):

- CRUD completo de tareas (crear, ver, editar, eliminar)
- Listado con filtro por estado (`pendiente` / `completada`)
- Cambio rápido de estado (toggle pendiente ⇄ completada) sin pasar por el formulario
- Consumo de una API REST mockeada (`GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`)

Fuera de alcance (a propósito, para mantener la comparación acotada entre los 3 grupos): autenticación, roles, categorías/etiquetas y persistencia en base de datos real.

## Estructura del proyecto

```
src/
├── app/
│   ├── models/        # Modelo de datos (Task, TaskSinId)
│   ├── services/       # Service que consume la API REST (TareaService)
│   └── components/
│       ├── lista-tareas/       # Componente orquestador: filtro, modal, CRUD
│       ├── item-tarea/         # Tarjeta individual de cada tarea
│       └── formulario-tarea/   # Formulario reactivo de crear/editar
└── db.json             # Datos semilla para la API mockeada (json-server)
```

## Arquitectura

La app sigue el patrón **componente padre (orquestador) + componentes hijos reutilizables**:

```
ListaTareas (padre / orquestador — habla con la API)
 │
 ├── FormularioTarea (formulario dentro de un modal)
 │
 └── ItemTarea (una tarjeta por tarea, repetida con @for)
```

Ningún componente hijo llama a la API directamente: `ItemTarea` y `FormularioTarea` solo emiten eventos (`output`) que `ListaTareas` escucha y traduce en llamadas al service.

## Cómo correrlo

Se necesitan **dos terminales** corriendo en simultáneo:

```bash
# Terminal 1 — instalar dependencias (primera vez)
npm install

# Terminal 1 — levantar la API mockeada
npx json-server --watch db.json --port 3000

# Terminal 2 — levantar la app Angular
ng serve
```

Abrir `http://localhost:4200` en el navegador. La API mockeada corre en `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `ng serve` | Levanta el entorno de desarrollo |
| `ng build` | Genera el build de producción |
| `npx json-server --watch db.json --port 3000` | Levanta la API REST mockeada, persistiendo los cambios en `db.json` |

## Documentación relacionada

- Informe completo de la PoC (bloque "FE Frameworks"): React, Vue y Angular — comparación conjunta y conclusiones.
- Repositorio de la cátedra: [utnfrrodsw/poc](https://github.com/utnfrrodsw/poc)

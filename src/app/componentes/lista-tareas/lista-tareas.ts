import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Tarea } from '../../services/tarea';
import { Task, TaskSinId } from '../../models/tarea.model';
import { ItemTarea } from '../item-tarea/item-tarea';
import { FormularioTarea } from '../formulario-tarea/formulario-tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [ItemTarea, FormularioTarea],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareas implements OnInit {
  // Inyecta el service que habla con la API (json-server)
  private tareaService = inject(Tarea);

  // Lista completa de tareas, tal cual viene de la API
  tareas = signal<Task[]>([]);

  // Filtro activo actualmente: todas / pendientes / completadas
  filtro = signal<'todas' | 'pendiente' | 'completada'>('todas');

  // Guarda la tarea que se está editando (NULL = crear nueva)
  tareaEnEdicion = signal<Task | null>(null);

  // Controla si el formulario es visible o no
  mostrarFormulario = signal(false);

  // Signal derivada: se recalcula sola cada vez que cambian "tareas" o "filtro".
  // No hay que llamarla manualmente, Angular la mantiene actualizada.
  tareasFiltradas = computed(() => {
    const filtroActual = this.filtro();
    const listaCompleta = this.tareas();

    // Si el filtro es TODAS, no hace falta filtrar nada
    if (filtroActual === 'todas') {
      return listaCompleta;
    }

    // Si no, se queda solo con las tareas cuyo estado coincide con el filtro elegido
    return listaCompleta.filter(tarea => tarea.estado === filtroActual);
  });

  // Se ejecuta apenas esta listo el componente y muestra TODAS las TAREAS
  ngOnInit(): void {
    this.cargarTareas();
  }

  // Pide todas las tareas a la API y actualiza la signal TAREAS
  cargarTareas(): void {
    this.tareaService.getTasks().subscribe(data => {
      this.tareas.set(data);
    });
  }

  // Cambia el filtro activo (llamado desde los botones Todas / Pendientes / Completadas)
  cambiarFiltro(nuevoFiltro: 'todas' | 'pendiente' | 'completada'): void {
    this.filtro.set(nuevoFiltro);
  }

  // Abre el formulario en modo CREAR: limpia cualquier edición previa y muestra el form vacio
  abrirFormulario(): void {
    this.tareaEnEdicion.set(null);
    this.mostrarFormulario.set(true);
  }

  // Cierra el formulario y limpia el estado de edición
  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.tareaEnEdicion.set(null);
  }

  // Se ejecuta cuando el formulario emite el evento GUARDAR
  onGuardar(datos: TaskSinId): void {
    const enEdicion = this.tareaEnEdicion();

    if (enEdicion) {
      // Hay una tarea en edición -> se actualiza esa tarea existente (PUT)
      this.tareaService.updateTask(enEdicion.id, { ...datos, id: enEdicion.id }).subscribe(() => {
        this.cerrarFormulario();
        this.cargarTareas(); // Recarga la lista para reflejar el cambio
      });
    } else {
      // No hay tarea en edición -> se crea una tarea nueva (POST)
      this.tareaService.createTask(datos as Task).subscribe(() => {
        this.cerrarFormulario();
        this.cargarTareas();
      });
    }
  }

  // Se ejecuta cuando item-tarea emite el evento "editar"
  onEditar(tarea: Task): void {
    this.tareaEnEdicion.set(tarea); // guarda cuál tarea se va a editar
    this.mostrarFormulario.set(true); // abre el modal (el form se precarga solo, vía effect())
  }

  // Se ejecuta cuando item-tarea emite el evento "eliminar"
  onEliminar(id: number): void {
    this.tareaService.deleteTask(id).subscribe(() => {
      this.cargarTareas(); // recarga la lista sin la tarea borrada
    });
  }

  // Se ejecuta cuando item-tarea emite el evento "cambiarEstado" (botón toggle)
  onCambiarEstado(tarea: Task): void {
    // Invierte el estado: si estaba pendiente pasa a completada, y viceversa
    const nuevoEstado: 'pendiente' | 'completada' =
      tarea.estado === 'pendiente' ? 'completada' : 'pendiente';

    // Copia todos los datos de la tarea original, pero con el estado nuevo
    const tareaActualizada: Task = { ...tarea, estado: nuevoEstado };

    // Actualiza esa tarea en la API (mismo método que usa la edición completa)
    this.tareaService.updateTask(tarea.id, tareaActualizada).subscribe(() => {
      this.cargarTareas();
    });
  }
}
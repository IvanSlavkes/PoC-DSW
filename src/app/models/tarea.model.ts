export interface Task{  // Modelo de datos de una Tarea, define la FORMA que tienen
  id: number;
  nombre: string;
  descripcion?: string;
  estado: "pendiente" | "completada";
}

export type TaskSinId = Omit<Task, 'id'>; //Es para crear nuevas tareas, skipea el ID (la API se lo da cuando se guarda)
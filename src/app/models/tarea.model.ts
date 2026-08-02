export interface Task{
  id: number;
  nombre: string;
  descripcion?: string;
  estado: "pendiente" | "completada";
  // fechaDesde: Date;
  // fechaHasta?: Date;
}

export type TaskSinId = Omit<Task, 'id'>;
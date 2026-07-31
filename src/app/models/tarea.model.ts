export interface Task{
  id: number;
  nombre: string;
  descripcion?: string;
  estado: "pendiente" | "completada";
  fechaDesde: Date;
  fechaHasta?: Date;
}
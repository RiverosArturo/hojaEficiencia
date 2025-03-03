import { tablas } from "@/data";
import { calcularTotal } from "./calcularTotal";

export const obtenerRangoMasAlto = (codigo:string) => {
  const lista = tablas[codigo];

  if (!lista || lista.length === 0) return null; // Validar si hay datos

  return lista.reduce((max, actual) => 
    actual.rango[1] > max ? actual.rango[1] : max, 
    0 // Inicializamos en 0 para evitar errores con listas vacías
  );
};

export const calcularPorcentaje = ( codigoTabla: string, calcular: number ) => {
  const valorMax = obtenerRangoMasAlto(codigoTabla) ?? 0;
  const total =calcularTotal( codigoTabla, Array.from({ length: valorMax }, (_, i) => i + 1) );
  return Math.round((calcular * 100) / total * 100) / 100;
}
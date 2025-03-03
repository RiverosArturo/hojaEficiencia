import { tablas } from "@/data";

export const calcularTotal = (codigoTabla: string, numerosSeleccionados: number[]) => {
  const tabla = tablas[codigoTabla];
  if (!tabla) return 0;
  return numerosSeleccionados.reduce((total, numero) => {
    const fila = tabla.find(({ rango }) => numero >= rango[0] && numero <= rango[1]);
    return fila ? total + fila.valor : total;
  }, 0);
};

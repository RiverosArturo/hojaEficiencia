export const parseNumeros = (entrada: string): number[] => {
  const numeros: number[] = [];
  const partes = entrada.split(",").map((parte) => parte.trim());
  partes.forEach((parte) => {
    if (parte.includes("-")) {
      const [inicio, fin] = parte.split("-").map(Number);
      if (!isNaN(inicio) && !isNaN(fin) && inicio <= fin) {
        for (let i = inicio; i <= fin; i++) {
          numeros.push(i);
        }
      }
    } else {
      const num = parseInt(parte, 10);
      if (!isNaN(num)) {
        numeros.push(num);
      }
    }
  });
  return numeros;
};
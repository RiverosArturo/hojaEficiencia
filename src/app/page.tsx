
"use client";
import { tablas } from "@/data";
import { calcularPorcentaje, calcularTotal, parseNumeros } from "@/utils";
import { useState } from "react";

export default function Home() {
  const [codigoTabla, setCodigoTabla] = useState<string>("");
  const [numerosInput, setNumerosInput] = useState<string>("");
  const [resultado, setResultado] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [sugerencias, setSugerencias] = useState<string[]>([]);

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setCodigoTabla(valor);
    setSugerencias(Object.keys(tablas).filter((codigo) => codigo.startsWith(valor)));
  };

  const seleccionarCodigo = (codigo: string) => {
    setCodigoTabla(codigo);
    setSugerencias([]);
  };

  const handleCalcular = () => {
    if (!tablas[codigoTabla]) return;
    const numerosSeleccionados = parseNumeros(numerosInput);
    setResultado(calcularTotal(codigoTabla, numerosSeleccionados));
    setTotal( calcularPorcentaje( codigoTabla, calcularTotal(codigoTabla, numerosSeleccionados) ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-gray-800 text-2xl font-bold mb-4 text-center">Calculadora</h1>
        <label className="block text-gray-700 font-medium">Ingresar código de tabla:</label>
        <input type="text" value={codigoTabla} onChange={handleCodigoChange}
          placeholder="Escribe o selecciona un código" className="text-gray-800 w-full p-2 border rounded mb-2" />

        {sugerencias.length > 0 && (
          <ul className="bg-white border rounded shadow max-h-40 overflow-auto mb-4">
            {sugerencias.map((codigo) => (
              <li key={codigo} className="text-gray-800 p-2 hover:bg-gray-200 cursor-pointer" onClick={() =>
                seleccionarCodigo(codigo)}>
                {codigo}
              </li>
            ))}
          </ul>
        )}
        <label className="block text-gray-800 font-medium">O seleccionar tabla:</label>
        <select value={codigoTabla} onChange={(e) => setCodigoTabla(e.target.value)}
          className="w-full p-2 border rounded mb-4">
          <option value="" className="text-gray-800">Seleccionar...</option>
          {Object.keys(tablas).map((codigo) => (
            <option key={codigo} value={codigo}>Tabla {codigo}</option>
          ))}
        </select>
        <label className="block text-gray-800 font-medium">Ingresar números o rangos:</label>
        <input type="text" value={numerosInput} onChange={(e) => setNumerosInput(e.target.value)}
          placeholder="Ej: 1-9,37-41,47" className="text-gray-800 w-full p-2 border rounded mb-4" />
        <button onClick={handleCalcular}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Calcular
        </button>
        <h2 className="text-gray-800 text-xl font-bold mt-4 text-center">Total: {resultado}</h2>
        <h2 className="text-gray-800 text-xl font-bold mt-4 text-center">Porcentaje: {total}%</h2>
      </div>
    </div>
  );
}
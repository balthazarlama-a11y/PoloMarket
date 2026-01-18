/**
 * Valida un RUT chileno
 * @param rut - RUT en formato "12345678-9" o "123456789"
 * @returns true si el RUT es válido
 */
export function validateRUT(rut: string): boolean {
  const cleanRut = rut.replace(/\./g, "").replace(/-/g, "");
  if (!/^[0-9]+[0-9kK]{1}$/.test(cleanRut)) return false;
  
  const num = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);
  
  let sum = 0;
  let mul = 2;
  for (let i = num.length - 1; i >= 0; i--) {
    sum += parseInt(num[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  
  const res = 11 - (sum % 11);
  const calculatedDv = res === 11 ? "0" : res === 10 ? "K" : res.toString();
  
  return calculatedDv.toLowerCase() === dv.toLowerCase();
}

/**
 * Formatea un RUT chileno
 * @param rut - RUT sin formato
 * @returns RUT formateado "12.345.678-9"
 */
export function formatRUT(rut: string): string {
  const cleanRut = rut.replace(/\./g, "").replace(/-/g, "");
  if (cleanRut.length < 2) return cleanRut;
  
  const num = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  // Agregar puntos cada 3 dígitos desde la derecha
  let formatted = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `${formatted}-${dv}`;
}

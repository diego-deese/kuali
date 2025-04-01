
export const isNumber = (value: any): boolean => {
  if (value === null || value === undefined || value === '') return false

  if (typeof value === 'number') return !isNaN(value)

  const num = Number(value)

  return !isNaN(num) && String(num) === String(value)
}

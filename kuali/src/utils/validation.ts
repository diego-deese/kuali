export const isNumber = (value: any): boolean => {
  if (value === null || value === undefined || value === '') return false

  if (typeof value === 'number') return !isNaN(value)

  const num = Number(value)

  return !isNaN(num) && String(num) === String(value)
}

export const isString = (string: any): boolean => {
  return typeof string === 'string' || string instanceof String
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isBoolean = (value: any): boolean => {
  return (
    value === true || value === false || value === 'true' || value === 'false'
  )
}

interface Option {
  id: number
  label: string
}

export const mapToOption = (
  source: object,
  idKey: string,
  labelKey: string,
): Option => {
  return { id: source[idKey], label: source[labelKey] }
}

export const mapArrayToOptions = (
  sourceArray: object[],
  idKey: string,
  labelKey: string,
): Option[] => {
  return sourceArray.map((item) => {
    return mapToOption(item, idKey, labelKey)
  })
}

export interface Option {
  id: number
  label: string
}

export interface UseSelectInputProps {
  options: Option[]
  value?: Option | null
  onSelect?: (option: Option) => void
  onEditOption?: (id: number, newLabel: string) => void
  onDeleteOption?: (id: number) => void
}

export interface SelectInputProps {
  label?: string
  placeholder?: string
  options?: Option[]
  editable?: boolean
  onEditOption?: (id: number, newLabel: string) => void
  onDeleteOption?: (id: number) => void
  onSelect?: (option: Option) => void
  value?: Option | null
}

export interface OptionProps {
  label?: string
  editable?: boolean
  onPress?: () => void
  onEdit?: (newLabel: string) => void
  onDelete?: () => void
}

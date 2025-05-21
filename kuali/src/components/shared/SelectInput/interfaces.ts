export interface Option {
  id: number
  label: string
}

export interface UseSelectInputProps {
  value?: Option | null
  onSelect?: (option: Option) => void
  onDeleteOption?: (id: number) => void
  onAddOption?: (label: string) => Promise<Option | void>
}

export interface SelectInputProps {
  label?: string
  headerInputPlaceholder?: string
  placeholder?: string
  options?: Option[]
  editable?: boolean
  value?: Option | null
  error?: boolean
  errorMessage?: string
  onSelect?: (option: Option) => void
  onEditOption?: (id: number, newLabel: string) => void
  onDeleteOption?: (id: number) => void
  onAddOption?: (label: string) => Promise<Option | void>
}

export interface OptionProps {
  label?: string
  editable?: boolean
  onPress?: () => void
  onEdit?: (newLabel: string) => void
  onDelete?: () => void
}

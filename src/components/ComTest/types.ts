export interface ComTestProps {
  modelValue: number[]
}

export interface ComTestEmits {
  (e: 'update:modelValue', values: number[]): void
}
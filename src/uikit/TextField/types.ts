import { ReactNode } from 'react'

export type TextFieldProps = {
  value: string | number
  defaultValue: string
  onChangeText: (text: string) => void
  label: string
  help: ReactNode
  hasError: boolean
  disabled: boolean
  prefix: string
  suffix: string
  right: ReactNode
  placeholder: string
  keyboardType?: 'default' | 'numeric' | 'email-address'
  maxLength?: number
  editable: boolean
}
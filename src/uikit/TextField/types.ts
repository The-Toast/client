import { ReactNode, Ref } from 'react'
import { TextInput } from 'react-native'

export type TextFieldProps = {
  value?: string | number
  defaultValue?: string
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
  label?: string
  help?: ReactNode
  hasError?: boolean
  disabled?: boolean
  prefix?: string
  suffix?: string
  right?: ReactNode
  placeholder?: string
  keyboardType?: 'default' | 'numeric' | 'email-address'
  maxLength?: number
  editable?: boolean
  returnKeyType?: 'done' | 'next' | 'go' | 'send' | 'search' | 'default'
  secureTextEntry?: boolean
  // 내부 TextInput에 접근하기 위한 ref (포커스 제어 등)
  inputRef?: Ref<TextInput>
}
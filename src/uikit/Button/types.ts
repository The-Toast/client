import { ReactNode } from 'react'
import {PressableProps, StyleProp, ViewStyle} from 'react-native'
import { ButtonSize, ButtonVariant } from 'styles'

export type ButtonProps = PressableProps & {
  children: string
  size?: ButtonSize
  variant?: ButtonVariant
  style?: StyleProp<ViewStyle>
}
import { ViewStyle } from 'react-native'
import { Text } from 'components'
import { buttonSizes, buttonVariants, ButtonSize, ButtonVariant } from 'styles/button'

import * as S from './styled'

export type ButtonProps = {
  children: string
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  style?: ViewStyle
  onPress?: () => void
}

export default function Button(
  {children, size = 'large', variant = 'primary', disabled, style, onPress}: ButtonProps
) {
  const s = buttonSizes[size]
  const v = buttonVariants[variant]

  const bg =
    disabled && 'disabledBg' in v ? (v as any).disabledBg : v.bg
  const textColor =
    disabled && 'disabledText' in v ? (v as any).disabledText : v.textColor

  return (
    <S.StyledButton
      onPress={onPress}
      disabled={disabled}
      bg={bg}
      paddingVertical={s.paddingVertical}
      paddingHorizontal={s.paddingHorizontal}
      radius={s.radius}
      style={style}
    >
      <Text type={s.textType} color={textColor}>
        {children}
      </Text>
    </S.StyledButton>
  )
}
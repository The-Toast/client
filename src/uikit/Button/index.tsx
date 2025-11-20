import React, { forwardRef, memo } from 'react'
import styled from '@emotion/native'
import { PressableProps, StyleProp, ViewStyle, View } from 'react-native'
import { Text } from 'uikit'
import { buttonSizes, buttonVariants, ButtonSize, ButtonVariant } from 'styles'

export type ButtonProps = PressableProps & {
  children: string
  size?: ButtonSize
  variant?: ButtonVariant
  style?: StyleProp<ViewStyle>
}

const StyledButton = styled.Pressable<{
  bg: string
  height: number
  radius: number
  paddingHorizontal: number
}>(({ bg, height, radius, paddingHorizontal }) => ({
  // Layout
  height,
  paddingHorizontal,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',

  // Style
  backgroundColor: bg,
  borderRadius: radius
}))

const Button = forwardRef<View, ButtonProps>(
  (
    { children, size = 'medium', variant = 'primary', disabled, style, accessibilityRole, hitSlop, ...rest },
    ref
  ) => {
    const s = buttonSizes[size]
    const v = buttonVariants[variant]

    const isDisabled = !!disabled
    const bg = isDisabled && v.Disabled ? v.Disabled.Background : v.Background
    const textColor = isDisabled && v.Disabled ? v.Disabled.Color : v.Color

    return (
      <StyledButton
        ref={ref}
        bg={bg}
        height={s.height}
        radius={s.radius}
        paddingHorizontal={s.padding}
        disabled={isDisabled}
        style={style}
        accessibilityRole={accessibilityRole ?? 'button'}
        hitSlop={hitSlop ?? { top: 6, bottom: 6, left: 6, right: 6 }}
        {...rest}
      >
        <Text type={s.textType} color={textColor}>
          {children}
        </Text>
      </StyledButton>
    )
  }
)

export default memo(Button)

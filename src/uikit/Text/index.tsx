import styled from '@emotion/native'
import { TextProps } from './types'
import { Typography, fontWeightMap } from 'styles'

export type TextStyle = keyof typeof Typography

const Text = styled.Text<TextProps>(({ type = 'body1', weight, color = '#111' }) => {
  const t = Typography[type]
  const appliedWeight = weight ?? t.weight
  const fontFamily = fontWeightMap[appliedWeight]

  return {
    fontFamily,
    fontSize: t.fontSize,
    lineHeight: t.lineHeight,
    color,
  }
})

export default Text

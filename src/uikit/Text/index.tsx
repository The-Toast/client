import styled from '@emotion/native'
import { Typography, fontWeightMap, type FontWeight } from 'styles'

export type TextStyle = keyof typeof Typography

export type TextProps = {
  type?: TextStyle
  weight?: FontWeight
  color?: string
}

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

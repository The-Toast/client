import styled from '@emotion/native'
import { Typography } from 'styles'
import { fontWeightMap, FontWeight } from '@/styles/tokens/fonts'

export type TextStyle = keyof typeof Typography

type TextProps = {
  type?: TextStyle
  weight?: FontWeight
  color? : string
}

const StyledText = styled.Text<TextProps>`
  ${({ type = 'body1', weight, color = '#111' }) => {
    const t = Typography[type]
    const appliedWeight = weight ?? t.weight
    const fontFamily = fontWeightMap[appliedWeight]
    return `
      font-family: ${fontFamily};
      font-size: ${t.fontSize}px;
      line-height: ${t.lineHeight}px;
      color: ${color};
    `
  }}
`

export default StyledText
import styled from '@emotion/native'
import { typography } from 'styles/typography'
import { fontWeightMap, FontWeight, defaultWeightByType } from 'styles/fonts'

export type TextStyle = keyof typeof typography

type TextProps = {
  type?: TextStyle
  weight?: FontWeight
  color? : string
}

const StyledText = styled.Text<TextProps>`
  ${({ type = 'body1', weight, color = '#111' }) => {
    const t = typography[type]
    const appliedWeight = weight ?? defaultWeightByType[type] ?? 'regular'
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
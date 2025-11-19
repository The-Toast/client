import type { FontWeight } from './fonts'

type TypographyToken = {
  fontSize: number
  lineHeight: number
  weight: FontWeight
}

export const typography: Record<string, TypographyToken> = {
  // HeadLine
  headline1: { fontSize: 32, lineHeight: 40, weight: 'semibold' },
  headline2: { fontSize: 28, lineHeight: 36, weight: 'semibold' },
  headline3: { fontSize: 24, lineHeight: 32, weight: 'semibold' },

  // Title
  title1: { fontSize: 24, lineHeight: 28, weight: 'semibold' },
  title2: { fontSize: 20, lineHeight: 24, weight: 'semibold' },
  title3: { fontSize: 18, lineHeight: 20, weight: 'semibold' },

  // Body
  body1: { fontSize: 16, lineHeight: 24, weight: 'regular' },
  body2: { fontSize: 14, lineHeight: 20, weight: 'regular' },

  // Button
  button1: { fontSize: 16, lineHeight: 24, weight: 'semibold' },
  button2: { fontSize: 14, lineHeight: 20, weight: 'semibold' },
  button3: { fontSize: 12, lineHeight: 18, weight: 'semibold' },

  // Label
  label1: { fontSize: 16, lineHeight: 24, weight: 'medium' },
  label2: { fontSize: 14, lineHeight: 20, weight: 'medium' },
  label3: { fontSize: 12, lineHeight: 18, weight: 'regular' },

  // Caption
  caption1: { fontSize: 16, lineHeight: 24, weight: 'regular' },
  caption2: { fontSize: 14, lineHeight: 20, weight: 'regular' },
  caption3: { fontSize: 11, lineHeight: 16, weight: 'regular' }
}
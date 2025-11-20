import type { FontWeight } from './fonts'

export type TypographyToken = {
  fontSize: number
  lineHeight: number
  weight: FontWeight
}

export type TypographyKey =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'button1'
  | 'button2'
  | 'button3'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'caption1'
  | 'caption2'
  | 'caption3'

const t = (fontSize: number, lineHeight: number, weight: FontWeight): TypographyToken => ({
  fontSize,
  lineHeight,
  weight,
})

export const typography: Record<TypographyKey, TypographyToken> = {
  // Headline
  headline1: t(32, 40, 'SemiBold'),
  headline2: t(28, 36, 'SemiBold'),
  headline3: t(24, 32, 'SemiBold'),

  // Title
  title1: t(24, 28, 'SemiBold'),
  title2: t(20, 24, 'SemiBold'),
  title3: t(18, 20, 'SemiBold'),

  // Body
  body1: t(16, 24, 'Regular'),
  body2: t(14, 20, 'Regular'),

  // Button
  button1: t(16, 24, 'SemiBold'),
  button2: t(14, 20, 'SemiBold'),
  button3: t(12, 18, 'SemiBold'),

  // Label
  label1: t(16, 24, 'Medium'),
  label2: t(14, 20, 'Medium'),
  label3: t(12, 18, 'Regular'),

  // Caption
  caption1: t(16, 24, 'Regular'),
  caption2: t(14, 20, 'Regular'),
  caption3: t(11, 16, 'Regular')
}
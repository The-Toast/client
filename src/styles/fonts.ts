export const fontWeightMap = {
  regular: 'Pretendard',
  medium: 'Pretendard-Medium',
  semibold: 'Pretendard-SemiBold'
} as const

export type FontWeight = keyof typeof fontWeightMap

// styles/fonts.ts

export const defaultWeightByType: Record<string, FontWeight> = {
  // Headline
  headline1: 'semibold',
  headline2: 'semibold',
  headline3: 'semibold',

  // Title
  title1: 'semibold',
  title2: 'semibold',
  title3: 'semibold',

  // Body
  body1: 'regular',
  body2: 'regular',

  // Label
  label1: 'medium',
  label2: 'medium',
  label3: 'regular',

  // Caption
  caption1: 'regular',
  caption2: 'regular',
  caption3: 'regular',
}
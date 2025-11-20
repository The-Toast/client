export const fontWeightMap = {
  Regular: 'Pretendard-Regular',
  Medium: 'Pretendard-Medium',
  SemiBold: 'Pretendard-SemiBold'
} as const

export type FontWeight = keyof typeof fontWeightMap
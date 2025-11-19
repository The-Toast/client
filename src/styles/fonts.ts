export const fontWeightMap = {
  regular: 'Pretendard',
  medium: 'Pretendard-Medium',
  semibold: 'Pretendard-SemiBold'
} as const

export type FontWeight = keyof typeof fontWeightMap
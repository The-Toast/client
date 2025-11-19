export const buttonSizes = {
  large: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    radius: 0,
    textType: 'button1',
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    radius: 0,
    textType: 'button2',
  },
  small: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    radius: 8,
    textType: 'button3',
  },
} as const;

export const buttonVariants = {
  primary: {
    bg: '#111',
    textColor: '#fff',
    disabledBg: '#F0F0F0',
    disabledText: '#9B9B9B'
  }
} as const

export type ButtonSize = keyof typeof buttonSizes
export type ButtonVariant = keyof typeof buttonVariants
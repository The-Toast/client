export const buttonSizes = {
  small: {
    height: 32,
    padding: 10,
    radius: 8,
    textType: 'button3'
  },
  medium: {
    height: 38,
    padding: 16,
    radius: 10,
    textType: 'button2',
  },
  large: {
    height: 48,
    padding: 16,
    radius: 14,
    textType: 'button1',
  },
  xlarge: {
    height: 56,
    padding: 28,
    radius: 16,
    textType: 'button1'
  }
} as const

export const buttonVariants = {
  primary: {
    Background: '#111',
    Color: '#fff',
    Disabled: {
      Background: '#F0F0F0',
      Color: '#9B9B9B'
    }
  }
} as const

export type ButtonSize = keyof typeof buttonSizes
export type ButtonVariant = keyof typeof buttonVariants
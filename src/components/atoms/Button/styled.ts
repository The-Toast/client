import styled from '@emotion/native'
import { Pressable } from 'react-native'

export const StyledButton = styled(Pressable)<{
  bg: string
  paddingVertical: number
  paddingHorizontal: number
  radius: number
  disabled?: boolean
}>`
  // Layout
  display: flex;
  width: fit-content;
  padding: ${({ paddingVertical, paddingHorizontal }) =>
  `${paddingVertical}px ${paddingHorizontal}px`};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  // Style
  background-color: ${({ bg }) => bg};
  border-radius: ${({ radius }) => radius}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`
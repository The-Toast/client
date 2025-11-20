import React from 'react'
import styled from '@emotion/native'
import { StyleProp, ViewStyle } from 'react-native'
import Button, { type ButtonProps } from '../Button'

export type BottomCTAProps = Omit<ButtonProps, 'size'> & {
  containerStyle?: StyleProp<ViewStyle>
}

const Container = styled.View({
  padding: 20,
  width: '100%'
})

export default function Index({ children, style, containerStyle, ...rest }: BottomCTAProps) {
  return (
    <Container style={containerStyle}>
      <Button
        size={'xlarge'}
        style={[{ width: '100%', alignSelf: 'stretch' }, style]}
        {...rest}
      >
        {children}
      </Button>
    </Container>
  )
}

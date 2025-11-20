import React from 'react'
import styled from '@emotion/native'
import { StyleProp, ViewStyle } from 'react-native'
import BottomCTA, { type BottomCTAProps } from '../index'

export type FixedBottomCTAProps = BottomCTAProps & {
  containerStyle?: StyleProp<ViewStyle>
}

const Container = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: 'transparent'
})

export default function FixedBottomCTA({ children, style, containerStyle, ...rest }: FixedBottomCTAProps) {
  return (
    <Container
      style={containerStyle}
    >
      <BottomCTA style={[{ width: '100%', alignSelf: 'stretch' }, style]}
        {...rest}
      >
        {children}
      </BottomCTA>
    </Container>
  )
}

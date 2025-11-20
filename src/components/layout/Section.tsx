import React from 'react'
import styled from '@emotion/native'
import type { ViewProps, StyleProp, ViewStyle } from 'react-native'

export const Container = styled.View({
  paddingHorizontal: 20,
  width: '100%',
})

export const Content = styled.View({
  paddingTop: 60,
  width: '100%',
})

export type SectionProps = ViewProps & {
  containerStyle?: StyleProp<ViewStyle>
}

export default function Section({ children, style, containerStyle, ...rest }: SectionProps) {
  return (
    <Container style={containerStyle ?? style} {...rest}>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
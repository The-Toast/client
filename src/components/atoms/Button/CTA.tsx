import Button from '.'
import type { ButtonProps } from './index'

export default function CTA(props: ButtonProps) {
  const { children, ...rest } = props
  return (
    <Container>
      <Content>
        <StyledCTA {...rest}>
          {children}
        </StyledCTA>
      </Content>
    </Container>
  )
}

import styled from '@emotion/native'

const Container = styled.View`
  // Layout
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  // Layout
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`

const StyledCTA = styled(Button)`
  // Layout
  height: 52px;
  width: 100%;
  
  // Style
  border-radius: 12px;
`
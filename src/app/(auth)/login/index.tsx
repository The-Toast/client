import { SafeArea } from 'components/layout'
import { Button } from 'uikit'

/**
 * components/layout/SafeArea.tsx 코드 테스트중
 * */

export default function LoginScreen() {
  return (
    <SafeArea>
      <Button size={'medium'} disabled={true}>Login</Button>
    </SafeArea>
  )
}
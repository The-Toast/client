import { SafeArea } from 'components/layout'
import { FixedBottomCTA } from 'uikit'

/**
 * components/layout/SafeArea.tsx 코드 테스트중
 * */

export default function LoginScreen() {
  return (
    <SafeArea adjustBottomInset={true} style={{ width: '100%', height: '100%' }}>
      <FixedBottomCTA disabled={false}>다음</FixedBottomCTA>
    </SafeArea>
  )
}
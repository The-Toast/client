import { SafeArea } from 'components/layout'
import { FixedBottomCTA, Text } from 'uikit'

/**
 * components/layout/SafeArea.tsx 코드 테스트중
 * */

export default function LoginScreen() {
  return (
    <SafeArea style={{ width: '100%', height: '100%' }}>
      <Text type={'title2'}>이메일을 입력하세요</Text>
      <FixedBottomCTA disabled={false}>다음</FixedBottomCTA>
    </SafeArea>
  )
}